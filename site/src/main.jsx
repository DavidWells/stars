import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
})

const DEFAULT_SORT = { key: 'starredAt', direction: 'desc' }
const SEARCH_DEBOUNCE_MS = 180
const QUERY_PARAM = 'query'

const columns = [
  { key: 'repo', label: 'Repo', defaultDirection: 'asc' },
  { key: 'description', label: 'Description', defaultDirection: 'asc' },
  { key: 'language', label: 'Language', defaultDirection: 'asc' },
  { key: 'stars', label: 'Stars', defaultDirection: 'desc' },
  { key: 'starredAt', label: 'Starred On', defaultDirection: 'desc' },
]

function formatDate(value) {
  if (!value) return ''
  return dateFormatter.format(new Date(value))
}

function normalize(value) {
  return String(value || '').toLowerCase()
}

function escapeMarkdownCell(value) {
  return String(value || '')
    .replace(/\r?\n/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\|/g, '\\|')
    .trim()
}

function getSearchText(star) {
  return [
    star.repo,
    star.description,
    star.language,
    star.license,
    star.homepage,
    star.branch,
    star.starredAt,
    star.createdAt,
    star.updatedAt,
    ...(star.tags || []),
  ].join(' ')
}

function getQueryFromUrl() {
  return new URLSearchParams(window.location.search).get(QUERY_PARAM) || ''
}

function getSortValue(star, key) {
  if (key === 'starredAt' || key === 'createdAt' || key === 'updatedAt') {
    return star[key] ? new Date(star[key]).getTime() : 0
  }

  if (key === 'stars') {
    return Number(star.stars || 0)
  }

  return normalize(star[key])
}

function compareStars(a, b, sort) {
  const aValue = getSortValue(a, sort.key)
  const bValue = getSortValue(b, sort.key)

  if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1
  if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1
  return normalize(a.repo).localeCompare(normalize(b.repo))
}

function createMarkdownTable(stars) {
  let markdown = '| Repo | Description | Language | Stars | Starred On |\n'
  markdown += '| --- | --- | --- | ---: | --- |\n'

  stars.forEach((star) => {
    const repo = `[${escapeMarkdownCell(star.repo)}](${star.url || `https://github.com/${star.repo}`})`
    const tags = star.tags?.length ? ` Tags: ${star.tags.map((tag) => `#${tag}`).join(' ')}` : ''
    const description = escapeMarkdownCell(`${star.description || ''}${tags}`)
    const language = escapeMarkdownCell(star.language || '')
    const starsCount = Number(star.stars || 0).toLocaleString('en-US')
    const starredOn = `[${formatDate(star.starredAt)}](./stars/${star.repo}.md)`

    markdown += `| ${repo} | ${description} | ${language} | ${starsCount} | ${starredOn} |\n`
  })

  return markdown
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.setAttribute('readonly', '')
  textArea.style.position = 'fixed'
  textArea.style.left = '-9999px'
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}

function SortButton({ column, sort, onSort }) {
  const active = sort.key === column.key
  const direction = active ? sort.direction : null
  const label = active ? `${column.label} (${direction})` : column.label

  return (
    <button
      className="sort-button"
      type="button"
      onClick={() => onSort(column.key)}
      aria-label={`Sort by ${column.label}`}
    >
      <span>{column.label}</span>
      <span className="sort-indicator">{active ? direction : ''}</span>
    </button>
  )
}

function App() {
  const [stars, setStars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [inputValue, setInputValue] = useState(getQueryFromUrl)
  const [query, setQuery] = useState(getQueryFromUrl)
  const [sort, setSort] = useState(DEFAULT_SORT)
  const [copyState, setCopyState] = useState('idle')

  useEffect(() => {
    let cancelled = false

    async function loadStars() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}stars.json`)
        if (!response.ok) {
          throw new Error(`Unable to load stars.json (${response.status})`)
        }

        const data = await response.json()
        if (!cancelled) {
          setStars(Array.isArray(data.stars) ? data.stars : [])
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadStars()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const timeout = window.setTimeout(() => setQuery(inputValue), SEARCH_DEBOUNCE_MS)
    return () => window.clearTimeout(timeout)
  }, [inputValue])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    if (query) {
      params.set(QUERY_PARAM, query)
    } else {
      params.delete(QUERY_PARAM)
    }

    const search = params.toString()
    const nextUrl = `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`
    window.history.replaceState(null, '', nextUrl)
  }, [query])

  useEffect(() => {
    function handlePopState() {
      const nextQuery = getQueryFromUrl()
      setInputValue(nextQuery)
      setQuery(nextQuery)
      setCopyState('idle')
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && (inputValue || query)) {
        setInputValue('')
        setQuery('')
        setCopyState('idle')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [inputValue, query])

  useEffect(() => {
    if (copyState !== 'copied') return undefined

    const timeout = window.setTimeout(() => setCopyState('idle'), 1600)
    return () => window.clearTimeout(timeout)
  }, [copyState])

  const filteredStars = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean)

    return stars
      .filter((star) => {
        if (!terms.length) return true
        const searchText = normalize(getSearchText(star))
        return terms.every((term) => searchText.includes(term))
      })
      .sort((a, b) => compareStars(a, b, sort))
  }, [stars, query, sort])

  function handleSort(key) {
    setSort((current) => {
      if (current.key !== key) {
        const column = columns.find((item) => item.key === key)
        return { key, direction: column?.defaultDirection || 'asc' }
      }

      return {
        key,
        direction: current.direction === 'asc' ? 'desc' : 'asc',
      }
    })
  }

  async function handleCopyResults() {
    try {
      await copyTextToClipboard(createMarkdownTable(filteredStars))
      setCopyState('copied')
    } catch (err) {
      setCopyState('failed')
    }
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <h1>David's {loading ? '...' : stars.length.toLocaleString()} GitHub Stars</h1>
        <nav className="header-links" aria-label="Page links">
          <a href="https://github.com/DavidWells/stars">View on GitHub</a>
          <a href={`${import.meta.env.BASE_URL}README.md`}>Markdown index</a>
        </nav>
      </header>

      <section className="toolbar" aria-label="Star filters">
        <div className="toolbar-header">
          <label className="search-label" htmlFor="star-search">
            Search
          </label>
          <div className="stats-line">
            {loading ? 'Loading stars...' : `${filteredStars.length.toLocaleString()} of ${stars.length.toLocaleString()} stars`}
          </div>
        </div>
        <div className="search-row">
          <input
            id="star-search"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value)
              setCopyState('idle')
            }}
            placeholder="Filter by repo, language, description, tags, date..."
            type="search"
          />
          <button className="copy-button" type="button" onClick={handleCopyResults} disabled={loading || Boolean(error)}>
            {copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy Results to MD'}
          </button>
          {inputValue ? (
            <button
              className="clear-button"
              type="button"
              onClick={() => {
                setInputValue('')
                setQuery('')
                setCopyState('idle')
              }}
            >
              Clear
            </button>
          ) : null}
        </div>
      </section>

      {error ? <p className="status-message">{error}</p> : null}

      {!error && !loading ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} aria-sort={sort.key === column.key ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}>
                    <SortButton column={column} sort={sort} onSort={handleSort} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStars.map((star) => (
                <tr key={star.repo}>
                  <td className="repo-cell">
                    <a href={star.url} target="_blank" rel="noreferrer">
                      {star.repo}
                    </a>
                    <span className="repo-meta">
                      {star.createdAt ? `Created ${formatDate(star.createdAt)}` : ''}
                      {star.isArchived ? ' Archived' : ''}
                    </span>
                  </td>
                  <td className="description-cell">
                    {star.description || ''}
                    {star.tags?.length ? <span className="tags">{star.tags.map((tag) => `#${tag}`).join(' ')}</span> : null}
                  </td>
                  <td>{star.language || ''}</td>
                  <td className="numeric-cell">{Number(star.stars || 0).toLocaleString()}</td>
                  <td className="date-cell">
                    <a href={`${import.meta.env.BASE_URL}stars/${star.repo}.md`}>{formatDate(star.starredAt)}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filteredStars.length ? <p className="status-message">No stars match that filter.</p> : null}
        </div>
      ) : null}
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)

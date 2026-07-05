import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
})

const DEFAULT_SORT = { key: 'starredAt', direction: 'desc' }

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
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState(DEFAULT_SORT)

  useEffect(() => {
    let cancelled = false

    async function loadStars() {
      try {
        const response = await fetch('./stars.json')
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

  return (
    <main className="page-shell">
      <header className="page-header">
        <h1>David's GitHub Stars</h1>
        <nav className="header-links" aria-label="Page links">
          <a href="https://github.com/DavidWells/stars">View on GitHub</a>
          <a href="./README.md">Markdown index</a>
        </nav>
      </header>

      <section className="toolbar" aria-label="Star filters">
        <label className="search-label" htmlFor="star-search">
          Search
        </label>
        <div className="search-row">
          <input
            id="star-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter by repo, language, description, tags, date..."
            type="search"
          />
          {query ? (
            <button className="clear-button" type="button" onClick={() => setQuery('')}>
              Clear
            </button>
          ) : null}
        </div>
        <div className="stats-line">
          {loading ? 'Loading stars...' : `${filteredStars.length.toLocaleString()} of ${stars.length.toLocaleString()} stars`}
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
                    <a href={`./stars/${star.repo}.md`}>{formatDate(star.starredAt)}</a>
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

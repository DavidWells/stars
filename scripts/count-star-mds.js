import { getSavedMdFilePaths } from '../src/utils/github-api.js'

async function countStarMdFiles() {
  try {
    const savedFiles = await getSavedMdFilePaths()
    
    // Get counts
    const totalFiles = savedFiles.length
    const orgCounts = savedFiles.reduce((acc, file) => {
      acc[file.org] = (acc[file.org] || 0) + 1
      return acc
    }, {})

    // Sort organizations by count
    const sortedOrgs = Object.entries(orgCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([org, count]) => ({ org, count }))

    // Print results
    console.log('\nStar Count Summary:')
    console.log('==================')
    console.log(`Total starred repos: ${totalFiles}`)
    // console.log('\nTop organizations:')
    // console.log('----------------')
    
    sortedOrgs.forEach(({ org, count }) => {
      // console.log(`${org}: ${count} repos`)
    })

    return {
      total: totalFiles,
      organizations: sortedOrgs
    }
  } catch (error) {
    console.error('Error counting stars:', error)
    return {
      total: 0,
      organizations: []
    }
  }
}


// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const result = await countStarMdFiles()
  console.log(result)
}

export { countStarMdFiles } 
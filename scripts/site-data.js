process.env.GITHUB_USERNAME ||= process.argv[2] || 'DavidWells'
process.env.CI ||= 'true'

const { writeSiteData } = await import('../src/utils/generate-site.js')
const username = process.env.GITHUB_USERNAME
const { stars } = await writeSiteData(username)

console.log(`Wrote site/public/stars.json with ${stars.length} public stars.`)

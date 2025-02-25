# GitHub Stars

Get all your starred repositories, save their README files in Markdown and generate an index. 

<!-- doc-gen TOC collapse=true -->
<details>
<summary>Table of Contents</summary>

- [Stars by date](#stars-by-date)
- [About this repo](#about-this-repo)
  - [Features](#features)
  - [Usage](#usage)
  - [Props](#props)

</details>
<!-- end-doc-gen -->

## Stars by date

I fancy myself a GitHub spelunker. Through my journeys I find a lot of cool packages. 

Below is an index to quickly CTRL+F to find them.

Total Stars: <!-- doc-gen STAR_COUNT -->6,328<!-- end-doc-gen -->

Full list here: https://davidwells.github.io/github-stars

<!-- doc-gen ALL_STARS_TABLE -->
<table>
  <tr>
  <th align="left">Repo</th>
  <th align="center">Starred On</th>
  </tr>
  <tr>
  <td><a href="https://github.com/samvera/serverless-iiif">samvera/serverless-iiif</a><sup><sub> - JavaScript - Jun 19, 2019</sub></sup><br/><sup><sub>Tags: #aws-apigateway #aws-lambda #aws-serverless #iiif #iiif-image #image-processing #libvips #sharp</sub></sup><br/>IIIF Image API 2.1 &amp; 3.0 server in an AWS Serverless Application. </td>
  <td><a href="./stars/samvera/serverless-iiif.md">Feb 25, 2025</a><br/>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<br/></td>
  </tr>
  <tr>
  <td><a href="https://github.com/okeeffed/spike-aws-cdk-apigw-file-based-routing">okeeffed/spike-aws-cdk-apigw-file-based-routing</a><sup><sub> - TypeScript - Feb 24, 2024</sub></sup></td>
  <td><a href="./stars/okeeffed/spike-aws-cdk-apigw-file-based-routing.md">Feb 25, 2025</a><br/>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<br/></td>
  </tr>
  <tr>
  <td><a href="https://github.com/newjersey/navigator.business.nj.gov">newjersey/navigator.business.nj.gov</a><sup><sub> - TypeScript - Dec 21, 2018</sub></sup><br/>NJ Office of Innovation is building a one-stop dashboard to better help New<br/>Jerseyans with starting and managing a business. </td>
  <td><a href="./stars/newjersey/navigator.business.nj.gov.md">Feb 25, 2025</a><br/>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<br/></td>
  </tr>
</table>
<!-- end-doc-gen -->


## About this repo

### Features

- Automatically obtain all starred repository information
- Convert and save the README file to Markdown format
- Keep the basic information of the repository (project name, number of stars, description, etc.)
- Automatically run backups every week (via GitHub Actions)
- Contains error handling and retry mechanisms

### Usage

1. [Fork](https://github.com/davidwells/github-stars/fork) this repository
2. Create non-expiring Fine-grained personal access tokens, required permissions
   1. User permissions
      - Read access to starring
   2. Repository permissions
      - Read access to metadata
      - Read and Write access to code
3. Configure GitHub Actions keys `GH_TOKEN`
4. Run Actions

Initial seed is delayed for 30 seconds to avoid rate limiting.

```bash
export GH_TOKEN=your_token
export INITIAL_SEED=TRUE
node index.js
```

Some readmes have "secrets" in them and you might see this error. You need to use the link to whitelist the false positives. I don't make the rules.

```bash
remote: error: GH013: Repository rule violations found for refs/heads/master.        
remote: 
remote: - GITHUB PUSH PROTECTION        
remote:   —————————————————————————————————————————        
remote:     Resolve the following violations before pushing again        
remote: 
remote:     - Push cannot contain secrets        
remote: 
remote:             
remote:      (?) Learn how to resolve a blocked push        
remote:      https://docs.github.com/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-from-the-command-line#resolving-a-blocked-push        
remote:             
remote:             
remote:       —— Amazon AWS Access Key ID ——————————————————————————        
remote:        locations:        
remote:          - commit: ab84a97196687a7dfa9d6b58dfe6902fc02327be        
remote:            path: stars/PrecursorApp/precursor.md:39        
remote:             
remote:        (?) To push, remove secret from commit(s) or follow this URL to allow the secret.        
remote:        https://github.com/DavidWells/github-stars/security/secret-scanning/unblock-secret/2tJrr7ebPsFeLOVRA8ZN5oXfwXx        
remote:             
remote:             
```

### Props

Fork of https://github.com/ccbikai/github-stars/tree/master
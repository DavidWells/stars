---
repo: pomber/git-history
url: 'https://github.com/pomber/git-history'
homepage: 'https://githistory.xyz/'
starredAt: '2019-02-07T05:15:49Z'
createdAt: '2019-02-04T21:00:39Z'
updatedAt: '2025-02-25T16:25:44Z'
language: JavaScript
license: MIT
branch: master
stars: 13597
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:47.424Z'
description: Quickly browse the history of a file from any git repository
tags:
  - animation
  - blame
  - cli
  - commit
  - git
  - github
  - history
  - log
  - text
  - vscode
  - vscode-extension
---

<div align="center">
<a href="https://github.githistory.xyz/torvalds/linux/blob/master/kernel/up.c">
<img alt="demo" src="https://user-images.githubusercontent.com/1911623/54575634-9b10b000-49d3-11e9-8a19-56e40636e45d.gif" width="600" />
</a>
</div>

# [Git History](https://githistory.xyz)

Quickly browse the history of files in any git repo:

1. Go to a file in **GitHub** (or **GitLab**, or **Bitbucket**)
1. Replace `github.com` with `github.githistory.xyz`
1. There's no step three

[Try it](https://github.githistory.xyz/babel/babel/blob/master/packages/babel-core/test/browserify.js)

> If you like this project consider [backing my open source work on Patreon!](https://patreon.com/pomber)  
> And follow [@pomber](https://twitter.com/pomber) on twitter for updates.

## Extensions

### Browsers

You can also add an `Open in Git History` button to GitHub, GitLab and Bitbucket with the [Chrome](https://chrome.google.com/webstore/detail/github-history-browser-ex/laghnmifffncfonaoffcndocllegejnf) and [Firefox](https://addons.mozilla.org/firefox/addon/github-history/) extensions.

<details><summary>Or you can use a bookmarklet.</summary>

```javascript
javascript: (function() {
  var url = window.location.href;
  var regEx = /^(https?\:\/\/)(www\.)?(github|gitlab|bitbucket)\.(com|org)\/(.*)$/i;
  if (regEx.test(url)) {
    url = url.replace(regEx, "$1$3.githistory.xyz/$5");
    window.open(url, "_blank");
  } else {
    alert("Not a Git File URL");
  }
})();
```

</details>

### Local Repos

You can use Git History for local git repos with the [CLI](https://github.com/pomber/git-history/tree/master/cli) or with the [VS Code extension](https://marketplace.visualstudio.com/items?itemName=pomber.git-file-history).

## Support Git History

### Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/git-history#sponsor)]

<a href="https://github.com/selefra/selefra" target="_blank"><img src="https://github.com/selefra.png" style="border-radius: 50%" alt="selefra" title="Selefra" width="100"></a>

<a href="https://opencollective.com/git-history/sponsor/0/website" target="_blank"><img src="https://opencollective.com/git-history/sponsor/0/avatar.svg"></a>

### Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/git-history#backer)]

<a href="https://opencollective.com/git-history#backers" target="_blank"><img src="https://opencollective.com/git-history/backers.svg?width=890"></a>

### Thanks

<p>Browser testing via <a href="https://www.lambdatest.com/" target="_blank"><picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://www.lambdatest.com/resources/images/logo-white.svg">
  <img alt="LambdaTest" src="https://www.lambdatest.com/resources/images/logos/logo.svg" style="vertical-align: middle;margin-left:5px" width="147" height="26" >
</picture></a></p>

### Credits

Based on these amazing projects:

- [Prism](https://github.com/PrismJS/prism) by [Lea Verou](https://twitter.com/leaverou)
- [jsdiff](https://github.com/kpdecker/jsdiff) by [Kevin Decker](https://twitter.com/kpdecker)
- [Night Owl](https://github.com/sdras/night-owl-vscode-theme) by [Sarah Drasner](https://twitter.com/sarah_edo)

## License

MIT

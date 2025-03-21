---
repo: RomuloOliveira/commit-messages-guide
url: 'https://github.com/RomuloOliveira/commit-messages-guide'
homepage: null
starredAt: '2025-01-18T18:26:08Z'
createdAt: '2018-02-25T23:59:43Z'
updatedAt: '2025-02-25T17:58:49Z'
language: null
license: CC-BY-4.0
branch: master
stars: 6747
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:11.936Z'
description: >-
  A guide to understand the importance of commit messages and how to write them
  well
tags: []
---

# Commit messages guide

[![Say Thanks!](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg)](https://saythanks.io/to/RomuloOliveira)

A guide to understanding the importance of commit messages and how to write them well.

It may help you to learn what a commit is, why it is important to write good messages, best practices and some tips to plan and (re)write a good commit history.

## Available languages

- [English](README.md)
- [Português](README_pt-BR.md)
- [Deutsch](README_de-DE.md)
- [Español](README_es-AR.md)
- [Italiano](README_it-IT.md)
- [한국어](README_ko-KR.md)
- [Русский](README_ru-RU.md)
- [简体中文](README_zh-CN.md)
- [日本語](README_ja-JP.md)
- [Українська](README_ua-UA.md)
- [Türkçe](README_tr-TR.md)
- [ngôn ngữ tiếng Việt](README_vi-VN.md)
- [繁體中文](README_zh-TW.md)
- [ελληνικά](README_gr-GR.md)
- [Française](README_fr-FR.md)
- [پارسی](README_fa-IR.md)
- [Polish](README_pl-PL.md)
- [Azərbaycanca](README_az-AZ.md)

## What is a "commit"?

In simple terms, a commit is a _snapshot_ of your local files, written in your local repository.
Contrary to what some people think, [git doesn't store only the difference between the files, it stores a full version of all files](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F#_snapshots_not_differences).
For files that didn't change from one commit to another, git stores just a link to the previous identical file that is already stored.

The image below shows how git stores data over time, in which each "Version" is a commit:

![](https://i.stack.imgur.com/AQ5TG.png)

## Why are commit messages important?

- To speed up and streamline code reviews
- To help in the understanding of a change
- To explain "the whys" that cannot be described only with code
- To help future maintainers figure out why and how changes were made, making troubleshooting and debugging easier

To maximize those outcomes, we can use some good practices and standards described in the next section.

## Good practices

These are some practices collected from my experiences, internet articles, and other guides. If you have others (or disagree with some) feel free to open a Pull Request and contribute.

### Use imperative form

```
# Good
Use InventoryBackendPool to retrieve inventory backend
```

```
# Bad
Used InventoryBackendPool to retrieve inventory backend
```

_But why use the imperative form?_

A commit message describes what the referenced change actually **does**, its effects, not what was done.


### Capitalize the first letter

```
# Good
Add `use` method to Credit model
```

```
# Bad
add `use` method to Credit model
```

The reason that the first letter should be capitalized is to follow the grammar rule of using capital letters at the beginning of sentences.

The use of this practice may vary from person to person, team to team, or even from language to language.
Capitalized or not, an important point is to stick to a single standard and follow it.

### Try to communicate what the change does without having to look at the source code

```
# Good
Add `use` method to Credit model

```

```
# Bad
Add `use` method
```

```
# Good
Increase left padding between textbox and layout frame
```

```
# Bad
Adjust css
```

It is useful in many scenarios (e.g. multiple commits, several changes and refactors) to help reviewers understand what the committer was thinking.

### Use the message body to explain "why", "for what", "how" and additional details

Focus on the "why" instead of "what" (although "what" and "how" are still important).
If, for example, your commit message is a restatement of the diff, it may be important to
rethink it.

```
# Good
Fix method name of InventoryBackend child classes

Classes derived from InventoryBackend were not
respecting the base class interface.

It worked because the cart was calling the backend implementation
incorrectly.
```

```
# Good
Serialize and deserialize credits to json in Cart

Convert the Credit instances to dict for two main reasons:

  - Pickle relies on file path for classes and we do not want to break up
    everything if a refactor is needed
  - Dict and built-in types are pickleable by default
```

```
# Good
Add `use` method to Credit

Change from namedtuple to class because we need to
setup a new attribute (in_use_amount) with a new value
```

The subject and the body of the messages are separated by a blank line.
Additional blank lines are considered as a part of the message body.

Characters like `-`, `*` and \` are elements that improve readability.

### Avoid generic messages or messages without any context

```
# Bad
Fix this

Fix stuff

It should work now

Change stuff

Adjust css
```

### Avoid language such as "this PR", "this commit", "this patch"

You don't have to refer to the commit by itself. We **know** that this is a patch, commit or PR.

```
# Bad
This commit does x and y...

This PR does x and y...

This Patch x and y...

# Good

X and y are done...
```

### Avoid personal language (e.g. pronouns)

A thing that can be learned from academic writing and brought to commit messages is to avoid using personal
language.

```
# Bad
I fixed the problem.

# Good
The problem has been fixed by doing x and y...
```

### Limit the number of characters

[It's recommended](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project#_commit_guidelines) to use a maximum of 50 characters for the subject and 72 for the body.

### Keep language consistency

For project owners: Choose a language and write all commit messages using that language. Ideally, it should match the code comments, default translation locale (for localized projects), etc.

For contributors: Write your commit messages using the same language as the existing commit history.

```
# Good
ababab Add `use` method to Credit model
efefef Use InventoryBackendPool to retrieve inventory backend
bebebe Fix method name of InventoryBackend child classes
```

```
# Good (Portuguese example)
ababab Adiciona o método `use` ao model Credit
efefef Usa o InventoryBackendPool para recuperar o backend de estoque
bebebe Corrige nome de método na classe InventoryBackend
```

```
# Bad (mixes English and Portuguese)
ababab Usa o InventoryBackendPool para recuperar o backend de estoque
efefef Add `use` method to Credit model
cdcdcd Agora vai
```

### Template

This is a template, [written originally by Tim Pope](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html), which appears in the [_Pro Git Book_](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project).

```
Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequences of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

 - Bullet points are okay, too

 - Typically a hyphen or asterisk is used for the bullet, preceded
   by a single space, with blank lines in between, but conventions
   vary here

If you use an issue tracker, put references to them at the bottom,
like this:

Resolves: #123
See also: #456, #789
```

## Notes on PR messages and cover letters

Most developers open Pull Requests (PR) on a Git repo through a platform (Github, Gitlab),
while kernel developers  and people who send patches through email ([yes, that's a
thing](https://git-scm.com/docs/git-send-email/2.45.0) refer to it as "cover letter".

A good cover letter, or PR message, will summarize, give background and context to a series of
commits that are related. Good writing on this part will help to "sell" your commit series to
the maintainers of a project, as they'll be able to understand why you are presenting such changes
together.

If you're writing a smaller (single or a few commits) change, treat the first commit as a cover letter.
Github, for example, uses this first commit as the default PR message.

Here's an [example](https://lore.kernel.org/lkml/20230414225551.858160935@linutronix.de/) of a good cover
letter sent on the Linux kernel mailing list. It contains:

- A description of the overall changes and why they were made;

- Background, or any important information that is needed to understand these changes;

- A breakdown of the solution and the approach taken to reach such solution;

- Caveats, or things that could go wrong and must be considered before applying such changes;

- Possible enhancements, a section describing opportunities for future changes that are out of the scope
  for the current commit set;

## Signing off your commits and following guidelines

Open source projects often require you to sign your code and follow some guidelines. One such example is
the Developer Certificate of Origin (DCO)[https://developercertificate.org/], which you have to abide to
when contributing to projects by The Linux Foundation, the Cloud Native Computing Foundation and many
others.

This means that you have to use your **real name** (i.e. a name that identifies you, _not necessarily your
legal name_) and to sign off your commits. Avoid pseudonyms or false names. Further reading about real names
[here](https://www.mail-archive.com/kernelnewbies@kernelnewbies.org/msg22178.html).

Use `git config` to set your name and email.

``` sh
# You can apply these changes locally, to a single repo
git config --local user.name "Jane Doe"
git config --local user.email "janedoe@janedoe.com"

# Or globally
git config --global user.name "Jane Doe"
git config --global user.email "janedoe@janedoe.com"
```

When doing a commit, add the `-s` flag to `git commit` and that will add a `Signed-off-by: ` line to your
commit.

Aside from adding this line to the commit, it's also important to use GPG for signing your commits.

GPG, or GNU Privacy Guard, is a tool that allows you to encrypt and tamperproof documents. You can use it,
for example, to sign emails and ensure that they haven't been modified without your consent. In the git
world, this is how you tell that a commit has been made by you and has not been tampered before reaching
other people.

Github has more [information](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account)
about how to generate and add a GPG key to your account. [This documentation](https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key)
teaches how to use gpgsign for commits.

More information about working with GPG [here](https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work).

For even more security, you can setup [pinentry](https://www.gnupg.org/related_software/pinentry/index.html)
to add physical layers of security to GPG, such as signing your commits with Yubikey of Touch ID.

## Rebase vs. Merge

This section is a **TL;DR** of Atlassian's excellent tutorial, ["Merging vs. Rebasing"](https://www.atlassian.com/git/tutorials/merging-vs-rebasing).

![](https://wac-cdn.atlassian.com/dam/jcr:01b0b04e-64f3-4659-af21-c4d86bc7cb0b/01.svg?cdnVersion=hq)

### Rebase

**TL;DR:** Applies your branch commits, one by one, upon the base branch, generating a new tree.

![](https://wac-cdn.atlassian.com/dam/jcr:5b153a22-38be-40d0-aec8-5f2fffc771e5/03.svg?cdnVersion=hq)

### Merge

**TL;DR:** Creates a new commit, called (appropriately) a _merge commit_, with the differences between the two branches.

![](https://wac-cdn.atlassian.com/dam/jcr:e229fef6-2c2f-4a4f-b270-e1e1baa94055/02.svg?cdnVersion=hq)

### Why do some people prefer to rebase over merge?

I particularly prefer to rebase over merge. The reasons include:

- It generates a "clean" history, without unnecessary merge commits
- _What you see is what you get_, i.e., in a code review all changes come from a specific and entitled commit, avoiding changes hidden in merge commits
- More merges are resolved by the committer, and every merge change is in a commit with a proper message
  - It's unusual to dig in and review merge commits, so avoiding them ensures all changes have a commit where they belong

### When to squash

"Squashing" is the process of taking a series of commits and condensing them into a single commit.

It's useful in several situations, e.g.:

- Reducing commits with little or no context (typo corrections, formatting, forgotten stuff)
- Joining separate changes that make more sense when applied together
- Rewriting _work in progress_ commits

### When to avoid rebase or squash?

Avoid rebase and squash in public commits or in shared branches where multiple people work on.
Rebase and squash rewrite history and overwrite existing commits, doing it on commits that are on shared branches (i.e., commits pushed to a remote repository or that comes from others branches) can cause confusion and people may lose their changes (both locally and remotely) because of divergent trees and conflicts.

## Useful git commands

### rebase -i

Use it to squash commits, edit messages, rewrite/delete/reorder commits, etc.

```
pick 002a7cc Improve description and update document title
pick 897f66d Add contributing section
pick e9549cf Add a section of Available languages
pick ec003aa Add "What is a commit" section"
pick bbe5361 Add source referencing as a point of help wanted
pick b71115e Add a section explaining the importance of commit messages
pick 669bf2b Add "Good practices" section
pick d8340d7 Add capitalization of first letter practice
pick 925f42b Add a practice to encourage good descriptions
pick be05171 Add a section showing good uses of message body
pick d115bb8 Add generic messages and column limit sections
pick 1693840 Add a section about language consistency
pick 80c5f47 Add commit message template
pick 8827962 Fix triple "m" typo
pick 9b81c72 Add "Rebase vs Merge" section

# Rebase 9e6dc75..9b81c72 onto 9e6dc75 (15 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into the previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

#### fixup

Use it to clean up commits easily and without needing a more complex rebase.
[This article](http://fle.github.io/git-tip-keep-your-branch-clean-with-fixup-and-autosquash.html) has very good examples of how and when to do it.

### cherry-pick

It is very useful to apply that commit you made on the wrong branch, without the need to code it again.

Example:

```
$ git cherry-pick 790ab21
[master 094d820] Fix English grammar in Contributing
 Date: Sun Feb 25 23:14:23 2018 -0300
 1 file changed, 1 insertion(+), 1 deletion(-)
```

### add/checkout/reset [--patch | -p]

Let's say we have the following diff:

```diff
diff --git a/README.md b/README.md
index 7b45277..6b1993c 100644
--- a/README.md
+++ b/README.md
@@ -186,10 +186,13 @@ bebebe Corrige nome de método na classe InventoryBackend
 ``
 # Bad (mixes English and Portuguese)
 ababab Usa o InventoryBackendPool para recuperar o backend de estoque
-efefef Add `use` method to Credit model
 cdcdcd Agora vai
 ``

+### Template
+
+This is a template, [written originally by Tim Pope](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html), which appears in the [_Pro Git Book_](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project).
+
 ## Contributing

 Any kind of help would be appreciated. Example of topics that you can help me with:
@@ -202,3 +205,4 @@ Any kind of help would be appreciated. Example of topics that you can help me wi

 - [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
 - [Pro Git Book - Commit guidelines](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project#_commit_guidelines)
+- [A Note About Git Commit Messages](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
```

We can use `git add -p` to add only the patches we want to, without the need to change the code that is already written.
It's useful to split a big change into smaller commits or to reset/checkout specific changes.

```
Stage this hunk [y,n,q,a,d,/,j,J,g,s,e,?]? s
Split into 2 hunks.
```

#### hunk 1

```diff
@@ -186,7 +186,6 @@
 ``
 # Bad (mixes English and Portuguese)
 ababab Usa o InventoryBackendPool para recuperar o backend de estoque
-efefef Add `use` method to Credit model
 cdcdcd Agora vai
 ``

Stage this hunk [y,n,q,a,d,/,j,J,g,e,?]?
```

#### hunk 2

```diff
@@ -190,6 +189,10 @@
 ``
 cdcdcd Agora vai
 ``

+### Template
+
+This is a template, [written originally by Tim Pope](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html), which appears in the [_Pro Git Book_](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project).
+
 ## Contributing

 Any kind of help would be appreciated. Example of topics that you can help me with:
Stage this hunk [y,n,q,a,d,/,K,j,J,g,e,?]?

```

#### hunk 3

```diff
@@ -202,3 +205,4 @@ Any kind of help would be appreciated. Example of topics that you can help me wi

 - [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
 - [Pro Git Book - Commit guidelines](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project#_commit_guidelines)
+- [A Note About Git Commit Messages](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
```

## Other interesting stuff

- https://whatthecommit.com/
- https://gitmoji.carloscuesta.me/

## Like it?

[Say thanks!](https://saythanks.io/to/RomuloOliveira)

## Contributing

Any kind of help would be appreciated. Example of topics that you can help me with:

- Grammar and spelling corrections
- Translation to other languages
- Improvement of source referencing
- Incorrect or incomplete information

## Inspirations, sources and further reading

- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
- [Pro Git Book - Commit guidelines](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project#_commit_guidelines)
- [A Note About Git Commit Messages](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
- [Merging vs. Rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)
- [Pro Git Book - Rewriting History](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)
- [Philosophy of Linux kernel patches](https://kernelnewbies.org/PatchPhilosophy)
- [The perfect patch](https://www.ozlabs.org/~akpm/stuff/tpp.txt)

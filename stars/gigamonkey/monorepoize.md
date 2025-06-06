---
repo: gigamonkey/monorepoize
url: 'https://github.com/gigamonkey/monorepoize'
homepage: null
starredAt: '2022-01-25T00:20:34Z'
createdAt: '2020-04-23T23:16:10Z'
updatedAt: '2024-11-02T18:06:37Z'
language: Shell
license: NA
branch: main
stars: 424
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:18.536Z'
description: Bash scripts for creating a monorepo out of smaller repos.
tags: []
---

This repo contains code to combine multiple git repos into a single
monolithic repo (a.k.a. a monorepo) while preserving full history,
branches, and tags.

The contents of each sub-repo are incorporated with their original
history (i.e. every commit to the original repo will exist in the new
repo with the same SHA) and all branches and tags will be added,
renamed to be prefixed by the name of the repo being added. So if the
subrepo is `foo.git` and it contains a branch `whatever`, in the
monorepo the SHA pointed to by the branch `whatever` in the original
repo will now be pointed to by a branch named `foo/whatever`.

Additionally the contents of `main` branch from each sub-repo will be
added in a subdirectory named for the sub-repo and merged to the
monorepo's `main` branch. (Or you can specify a different default
branch as the second argument to the `build` script.)

# To create a monorepo.

- Make a file containing the git URLs of the repos you want to
  combine. These can be paths to bare repos (ideally created with `git
  clone --mirror`) or `git@github.com:` URLs. This file should be
  named `something.repos` where `something` is the name of the new
  monorepo you want to create.

- Run `./build something.repos`. It will create a directory named
  `something` and incorporate all the repos listed in the
  `something.repos` file.

- After the monorepo is built, look for `empty-repo.txt` and
  `no-branch.txt` files in the subdirectories. These are created if
  the repo incorporated had either no changes (`empty-repo.txt`) or no
  `main` branch. In the latter case the `no-branch.txt` file will
  contain a list of the refs from the repo. If there's an appropriate
  branch (say the repo used `prod` instead of `main`) you can fix
  things up with the `pushdown` script. In the monorepo remove the
  `no-branch.txt` and then run `./pushdown foo/prod` to put the
  contents of the `foo/prod` branch into the `foo` subdirectory and
  merge them to `main`.


# Pushing to GitHub

After you've built your monorepo, you'll probably want to push it to
GitHub. In the normal case you can probably just create a repo on
GitHub and then do the normal:

```
git remote add origin git@github.com:<whatever>
```

Then to push everything:

```
git push --all origin
git push --tags origin
```

However, if you made a really big repo, you might get an error about
pack files or something when you try to push. This probably means your
repo is too big to push in one go. To get around that just push
specific branches one at a time. Because your repo was built from
smaller repos one good thing to try is pushing the original main
branch from each sub repo. For example within the repo you could make
a list of all the `main` branches (except the top-level main which
would drag in almost everything at once) with this command.

```
git branch | grep main | cut -c 3- | egrep -v '^main$' > mains.txt
```


Then use the `slow_push` script to push one branch at a time:

```
cat mains.txt | ./slow_push
```

This might not push everything (if there were branches in the sub
repos that never got merged to main) but it should get most things so
that you can then do a:

```
git push --all origin
```

to push all the objects and branches.

If the `git push --tags origin` fails, you may need to push fewer tags
at a time. Here's a way to do that assuming you don't already have
files named `tags.txt` or starting with `tags-` in the root directory
of you repo (which you shouldn`t if you just built it).

```
git tag --list > tags.txt
split -l 100 tags.txt tags-
for f in tags-*; do git push origin $(cat $f); done
rm tags-*
rm tags.txt
```

---
repo: hraban/tomono
url: 'https://github.com/hraban/tomono'
homepage: 'https://tomono.0brg.net'
starredAt: '2021-01-02T02:25:46Z'
createdAt: '2016-01-11T12:28:17Z'
updatedAt: '2025-02-24T04:17:05Z'
language: CSS
license: AGPL-3.0
branch: master
stars: 876
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:11.885Z'
description: Multi- To Mono-repository merge
tags:
  - emacs
  - git
  - literate-programming
  - monorepo-tooling
  - monorepository
  - noweb
  - org-babel
---

#+TITLE:        Multi- to Monorepo Migration
#+DESCRIPTION:  Migrate your multirepo to a monorepo using a bash script
#+AUTHOR:       Hraban Luyat
#+EMAIL:        hraban@0brg.net
#+PROPERTY:     header-args       :noweb no-export :eval never
#+EXPORT_FILE_NAME: index.html
#+html_head:    <link rel=stylesheet href=./style.css>
#+options: html-link-use-abs-url:nil html-postamble:auto html-preamble:t ':t toc:nil
#+options: html-scripts:t html-style:t html5-fancy:t tex:html creator:t date:t author:nil
#+html_doctype: html5
#+html_container: div
#+html_head_extra: <meta name=color-scheme content="light dark">
#+BIND: org-html-validation-link: nil

This script merges multiple independent tiny repositories into a single "monorepo". Every original repo is moved into its own subdirectory, branches with the same name are all merged. See [[#example][Example]] for the details.

Download the =tomono= script on [[https://github.com/hraban/tomono][github.com/hraban/tomono]].

#+TOC: headlines 1

* Features

- 🕙 Full history of all your prior repos is intact, no changes to checksums
- #️⃣ Signatures of old repos stay valid
- 🔁 Create the monorepo and keep pulling in changes from your minirepos later
- 🔀 Pull in entire new repos as you go, no need to prepare the whole thing at once
- 🏷 Tags are namespaced to avoid clashes, but tag signatures remain valid
- 🉑 Branches with weird names (slashes, etc)
- 👥 No conflicts between files with the same name
- 📁 Every project gets its own subdirectory

* Usage
#+TOC: headlines 1 local

Run the =tomono= script with your config on stdin, in the following format:

#+begin_example
$ cat my-repos.txt
git@github.com:mycompany/my-repo-abc.git  abc
git@github.com:mycompany/my-repo-def.git  def
git@github.com:mycompany/my-lib-uuu.git   uuu  lib/uuu
git@github.com:mycompany/my-lib-zzz.git   zzz  lib/zzz
https://gitee.com/shijie/zhongguo.git     中国
#+end_example

Concrete example:

#+begin_src shell :exports code
$ cat my-repos.txt | /path/to/tomono
#+end_src

That should be all ✅.

#+begin_comment
Yes #uselessuseofcat but it is clearer than < > ! # $) &&*!&♨±⌘︎ to newbies.
#+end_comment

** Custom name for monorepo directory

Don’t like =core=? Set a different name through an envvar before running the script:

#+begin_src shell
export MONOREPO_NAME=the-big-repo
#+end_src

** Custom “master” / “main” branch name

No need to do anything. This script does not handle any master / main branch in any special way. It just merges whatever branches exist. Don’t have a “master” branch? None will be created.

Make sure your own computer has the right branch set up in its =init.defaultBranch= setting.

** Continue existing migration

Large teams can’t afford to “stop the world” while a migration is in progress. You’ll be fixing stuff and pulling in new repositories as you go.

Here’s how to pull in an entirely new set of repositories:

#+begin_src shell :exports code
/path/to/tomono --continue < my-new-repos.txt
#+end_src

Make sure you have your environment set up exactly the same as above. Particularly, you must be in the parent dir of the monorepo.

** Tags

Tags are namespaced per remote, to avoid clashes. If your remote =foo= and =bar= both have a tag =v1.0.0=, your monorepo ends up with =foo/v1.0.0= and =bar/v1.0.0= pointing at their relevant commits.

If you don’t like this rewriting, you can fetch all tags from a specific remote to the top-level of the monorepo:

#+begin_src shell :export code :results none
$ git fetch --tags foo
#+end_src

Be prepared to deal with any conflicts.

*** Lightweight vs. Annotated Tags

N.B.: This namespacing works for all tags: lightweight, annotated, signed. However, for the latter two, there is one snag: an annotated tag contains its own tag name as part of the commit. I have chosen not to modify the object itself, so the annotated tag object thinks it still has its old name. This is a mixed bag: it depends on your case whether that’s a feature or a bug. One major advantage of this approach is that signed tags remain valid. But you will occasionally get messages like:

#+begin_example
$ git describe linux/v5.9-rc4
warning: tag 'linux/v5.9-rc4' is externally known as 'v5.9-rc4'
v5.9-rc4-0-gf4d51dffc6c0
#+end_example

If you know what you’re doing, you can force update all signed and annotated tags to their (nested) ref tag name with the following snippet:

#+begin_src shell :export code :results none
git for-each-ref --format '%(objecttype) %(refname:lstrip=2)' | \
    sed -ne 's/^tag //p' |
    GIT_EDITOR=true xargs -I + -n 1 -- git tag -f -a + +^{}
#+end_src

N.B.: this will convert all signed tags to regular annotated tags (their signatures would fail anyway).

Source: [[https://github.com/mwasilew2/tomono/commit/16aa7918aa9d912a30b563152bda62c77414cbe1][GitHub user mwasilew2]].

* Example
:PROPERTIES:
:CUSTOM_ID: example
:END:
#+TOC: headlines 1 local

Run these commands to set up a fresh directory with git monorepos that you can later merge:

** Initial setup of fake repos

#+begin_src shell :exports code :eval never-export :results none :noweb-ref test-setup
d="$(mktemp -d)"
echo "Setting up fresh multi-repos in $d"
cd "$d"

mkdir foo
(
    cd foo
    git init
    git commit -m "foo’s empty root" --allow-empty
    echo "This is foo" > i-am-foo.txt
    git add -A
    git commit -m "foo’s master"
    git tag v1.0
    git checkout -b branch-a
    echo "I am a new foo feature" > feature-a.txt
    git add -A
    git commit -m "foo’s feature branch A"
)

mkdir 中文
(
    cd 中文
    git init
    echo "你好" > 你好.txt
    git add -A
    git commit -m "中文的root"
    git tag v1.0
    git checkout -b branch-a
    echo "你好 from feature-a" > feature-a.txt
    git add -A
    git commit -m "new 中文 feature branch A"
    git branch branch-b master
    git checkout branch-b
    echo "I am an entirely new 中文 feature: B" > feature-b.txt
    git add -A
    git commit -m "中文’s feature branch B"
)
#+end_src

You now have two directories:

- =foo= (branches: =master=, =branch-a=)
- =中文= (branches: =master=, =branch-a=, =branch-b=)

** Combine into monorepo

Assuming the =tomono= script is in your =$PATH=, you can invoke it like this, from that same directory:

#+begin_src shell :exports code :eval never-export :results none :noweb-ref test-run
tomono <<EOF
$PWD/foo foo
$PWD/中文 中文
EOF
#+end_src

This will create a new directory, =core=, where you can find a git tree which looks somewhat like this:

#+begin_example
,*   b742af2 Merge 中文/branch-a (branch-a)
|\
| * c05c53c new 中文 feature branch A (中文/branch-a)
,* |   a51d138 Merge foo/branch-a
|\ \
| * | ebb490a foo’s feature branch A (foo/branch-a)
,* | | a08fa18 Root commit for monorepo branch branch-a
 / /
| | *   c53bf94 Merge 中文/branch-b (branch-b)
| | |\
| | | * 5e7f4f5 中文’s feature branch B (中文/branch-b)
| | |/
| |/|
| | * 2738327 Root commit for monorepo branch branch-b
| |
| | *   9a4b33a Merge 中文/master (HEAD -> master)
| | |\
| | |/
| |/|
| * | a9841a8 中文的root (tag: 中文/v1.0, 中文/master)
|  /
| *   b75840e Merge foo/master
| |\
| |/
|/|
,* | 1515265 foo’s master (tag: foo/v1.0, foo/master)
,* | f71fcde foo’s empty root
 /
,* 7803cf5 Root commit for monorepo branch master
#+end_example

** Pull in new changes from a remote

It’s possible that while you’re working on setting up your fresh monorepo, new changes have been pushed to the existing single repos:

#+begin_src shell :exports code :eval never-export :results none
(
    cd foo
    echo New changes >> i-am-foo.txt
    git commit -va -m 'New changes to foo'
)
#+end_src

Because their history was imported verbatim and nothing has been rewritten, you can import those changes into the monorepo.

First, fetch the changes from the remote:

#+begin_src shell :exports code :results none
$ cd core
$ git fetch foo
#+end_src

Now merge your changes using subtree merge:

#+begin_src shell
git checkout master
git merge -X subtree=foo/ foo/master
#+end_src

And the updates should be reflected in the monorepo:

#+begin_src shell :exports code :results none
$ cat foo/i-am-foo.txt
This is foo
New changes
#+end_src

I used the branch master in this example, but any branch works the same way.

** Continue

Now imagine you want to pull in a third repository into the monorepo:

#+begin_src shell :exports code :eval never-export :results none :noweb-ref test-setup
mkdir zimlib
(
    cd zimlib
    git init
    echo "This is zim" > i-am-zim.txt
    git add -A
    git commit -m "zim’s master"
    git checkout -b branch-a
    echo "I am a new zim feature" > feature-a.txt
    git add -A
    git commit -m "zim’s feature branch A"
    # And some more weird stuff, to mess with you
    git checkout master
    git checkout -d
    echo top secret > james-bond.txt
    git add -A
    git commit -m "I am unreachable"
    git tag leaking-you HEAD
    git checkout --orphan empty-branch
    git rm --cached -r .
    git clean -dfx
    git commit -m "zim’s tricky empty orphan branch" --allow-empty
)
#+end_src

Continue importing it:

#+begin_src shell :exports code :eval never-export :results none :noweb-ref test-run
echo "$PWD/zimlib zim lib/zim" | tomono --continue
#+end_src

Note that we used a different name for this subrepo, inside the =lib= dir.

The result is that it gets imported into the existing monorepo, alongside the existing two projects:

#+begin_example
$ cd core
$ git checkout master
Switched to branch 'master'
$ tree
.
├── foo
│   └── i-am-foo.txt
├── lib
│   └── zim
│       └── i-am-zim.txt
└── 中文
    └── 你好.txt

4 directories, 3 files
$ git checkout branch-a
Switched to branch 'branch-a'
$ tree
.
├── foo
│   ├── feature-a.txt
│   └── i-am-foo.txt
├── lib
│   └── zim
│       ├── feature-a.txt
│       └── i-am-zim.txt
└── 中文
    ├── feature-a.txt
    └── 你好.txt

4 directories, 6 files
$ head **/feature-a.txt
==> foo/feature-a.txt <==
I am a new foo feature

==> lib/zim/feature-a.txt <==
I am a new zim feature

==> 中文/feature-a.txt <==
你好 from feature-a
#+end_example

* Implementation
:PROPERTIES:
:CUSTOM_ID: implementation
:END:

#+begin_quote
(This section is best viewed in [[https://tomono.0brg.net/#implementation][HTML form]]; the GitHub Readme viewer misses some info.)
#+end_quote

#+TOC: headlines 1 local

The outer program structure is a flat bash script which loops over every repo supplied over stdin:

#+CAPTION: top-level
#+NAME: top-level
#+BEGIN_SRC shell :tangle tomono :shebang "#!/usr/bin/env bash" :references yes
<<init>>

# Note this is top-level in the script so it’s reading from the script’s stdin
while <<windows-fix>> read -r repourl reponame repopath; do
    if [[ -z "$repopath" ]]; then
        repopath="$reponame"
    fi

    <<handle-remote>>
done

<<finalize>>

# <<copyright>>
#+END_SRC

** Per repository

Every repository is fetched and fully handled individually, and sequentially:

1. fetch all the data related to this repository,
2. immediately check out and initialise every single branch which belongs to that repository.

#+CAPTION: handle-remote
#+NAME: handle-remote
#+BEGIN_SRC shell :references yes
git remote add "$reponame" "$repourl"
git config --add "remote.$reponame.fetch" "+refs/tags/*:refs/tags/$reponame/*"
git config "remote.$reponame.tagOpt" --no-tags
git fetch --atomic "$reponame"

<<list-branches>> | while read -r branch ; do
    <<handle-branch>>
done
#+END_SRC

The remotes are configured to make sure that a default fetch always fetch all tags, and also puts them in their own namespace. The default refspec for tags is =+refs/tags/*:refs/tags/*=, as you can see that puts everything from the remote at the same level in your monorepo. Obviously that will cause clashes, so we add the reponame as an extra namespace.

The =--no-tags= option is the complement to =--tags=, which has that default refspec we don’t want. That’s why we disable it and roll our own, entirely.

** Per branch (this is where the magic happens)

In the context of /a single repository,/ every branch is independently read into a subdirectory for that repository, and merged into the monorepo.

This is the money shot.

#+CAPTION: handle-branch
#+NAME: handle-branch
#+BEGIN_SRC shell
<<move-files-to-subdirectory>>
<<ensure-on-target-branch-in-monorepo>>

git read-tree --prefix "$repopath" "refs/remotes/$reponame/$branch"
tree="$(git write-tree)"
merge_commit="$(git commit-tree \
    "$tree" \
    -p "$branch" \
    -p "$move_commit" \
    -m "Merge $reponame/$branch")"
git reset -q "$merge_commit"
#+END_SRC

Source: [[https://git-scm.com/book/en/v2/Git-Internals-Git-Objects]]

*** Move files to a subdirectory

The files are moved in a separate, isolated pre-merge step: this helps keep the merge commit a "pure" merge and helps =git log --follow= heuristics.

#+name: move-files-to-subdirectory
#+caption: move-files-to-subdirectory
#+begin_src shell
git read-tree "$empty_tree"
git read-tree --prefix "$repopath" "refs/remotes/$reponame/$branch"
tree="$(git write-tree)"
move_commit="$(git commit-tree \
    "$tree" \
    -p "refs/remotes/$reponame/$branch" \
    -m "Move all files to $repopath/")"
#+end_src

Source: https://stackoverflow.com/a/17440474/4359699


*** Ensure we are on the right branch

In this snippet, we ensure that we are ready to merge fresh code from a subrepo into this branch: either we checkout an existing branch in the monorepo by this name, or we create a fresh one.

We are given the variable =$branch= which is the final name of the branch we want to operate on. It is the same as the name of the branch in each individual target repo.

#+CAPTION: ensure-on-target-branch-in-monorepo
#+NAME: ensure-on-target-branch-in-monorepo
#+BEGIN_SRC shell
if ! git show-ref --verify --quiet "refs/heads/$branch"; then
    root_commit="$(git commit-tree \
        "$empty_tree" \
        -m "Root commit for monorepo branch $branch")"
    git branch -- "$branch" "$root_commit"
fi
git symbolic-ref HEAD "refs/heads/$branch"
git reset -q
#+END_SRC

Instead of using =git checkout --orphan= and trying to create a new empty commit from the index, we create the empty commit directly and point the new branch to it. Then, we read the branch, new or existing, into the index. Now we have the current index representing the branch, and HEAD pointing at the branch. This allows us to stay in the index and avoid the worktree.

Working with HEAD feels odd, and it requires using =git reset= to update the branch, rather than =git branch -f ...=, because the branch is checked out. This is still more reliable than not pointing HEAD at the branch, because HEAD is always pointing at /some/ branch (e.g. “master”), so it is easier to just assume you’re /always/ pointing at the “current” branch.

Sources:
- [[https://stackoverflow.com/q/9765453]]
- [[https://stackoverflow.com/a/6070417]]

*** Non-goal: merging into root

GitHub user @woopla proposed in [[https://github.com/hraban/tomono/pull/42][#42]] the ability to merge a minirepo into the monorepo root, as if you used =.= as the subdirectory. We ended up not going for it, but it was interesting to investigate how to do this with =git read-tree=. The closest I got was:

#+begin_src shell
if [[ "$repopath" == "." ]]; then
    # Experimental—is this how git read-tree works? I find it very confusing.
    git read-tree "$branch" "$reponame/$branch"
else
    git read-tree --prefix "$repopath" "$reponame/$branch"
fi
#+end_src

I must to confess I find the [[https://git-scm.com/docs/git-read-tree][git read-tree]] man page too daunting to fully stand by this. I mostly figured it out by trial and error. It seems to work?

If anyone could explain to me exactly what this tool is supposed to do, what those separate stages are (it talks about “stage 0” to “stage 3” in its 3 way merge), and how you would cleanly do this, just for argument’s sake, I’d love to know.

But, as it turned out, this tool already has a way to merge a repo into the root: just make it the monorepo, and use it as a target for a =--continue= operation. That solves that.

** Set up the monorepo directory

We create a fresh directory for this script to run in, or continue on an existing one if the =--continue= flag is passed.

#+CAPTION: prep-dir
#+NAME: prep-dir
#+BEGIN_SRC shell
# Poor man’s arg parse :/
arg="${1-}"
: "${MONOREPO_NAME:=core}"

case "$arg" in
    "")
        if [[ -d "$MONOREPO_NAME" ]]; then
            >&2 echo "monorepo directory $MONOREPO_NAME already exists"
            exit 1
        fi
        mkdir "$MONOREPO_NAME"
        cd "$MONOREPO_NAME"
        git init
        ;;

    "--continue")
        if [[ ! -d "$MONOREPO_NAME" ]]; then
            >&2 echo "Asked to --continue, but monorepo directory $MONOREPO_NAME doesn’t exist"
            exit 1
        fi
        cd "$MONOREPO_NAME"
        if git status --porcelain | grep . ; then
            >&2 echo "Git status shows pending changes in the repo. Cannot --continue."
            exit 1
        fi
        # There isn’t anything special about --continue, really.
        ;;

    "--help" | "-h" | "help")
        cat <<EOF
Usage: tomono [--continue]

For more information, see the documentation at "https://tomono.0brg.net".
EOF
        exit 0
        ;;

    ,*)
        >&2 echo "Unexpected argument: $arg"
        >&2 echo
        >&2 echo "Usage: tomono [--continue]"
        exit 1
        ;;
esac
#+END_SRC

Most of this rigmarole is about UI, and preventing mistakes. As you can see, there is functionally no difference between continuing and starting fresh, beyond =mkdir= and =git init=. At the end of the day, every repo is read in greedily, and whether you do that on an existing monorepo, or a fresh one, doesn’t matter: every repo name you read in, is in fact itself like a =--continue= operation.

It’s horrible and kludgy but I just want to get something working out the door, for now.

** List individual branches

I want a single branch name per line on stdout, for a single specific remote:

#+CAPTION: list-branches
#+NAME: list-branches
#+BEGIN_SRC shell
git branch -r --no-color --list "$reponame/*" --format "%(refname:lstrip=3)"
#+END_SRC

*** Implementations that didn’t make the cut

Solutions I abandoned, due to one short-coming or another:

**** =git branch -r= with grep

The most straight-forward way to list branch names:

#+begin_src shell :exports code :results none
$ git branch -r
  bar/branch-a
  bar/branch-b
  bar/master
  foo/branch-a
  foo/master
#+end_src

This could be combined with =grep= to filter all branches for a specific remote, and filter out the name. It’s very close, but how do you reliably remove an unknown string?

**** =find .git/refs/hooks=

#+begin_src shell
( cd ".git/refs/remotes/$reponame" && find . -type f -mindepth 1 | sed -e s/..// )
#+end_src

Closer, but ugly, and I got reports that it missed some branches (although I was never able to repro)

**** =git ls-remote=

#+begin_src shell
git ls-remote --heads --refs "$reponame" | sed 's_[^ ]* *refs/heads/__'
#+end_src

Originally suggested in a [[https://github.com/hraban/tomono/pull/39][PR 39]], I’ve decided not to use this because =git-ls-remote= actively queries the remote to list its branches, rather than inspecting the local state of whatever we just fetched. That feels like a race condition at best, and becomes very annoying if you’re dealing with password protected remotes or otherwise inaccessible repos.

** Init & finalize

Initialization is what you’d expect from a shell script:

#+caption: init
#+name: init
#+begin_src shell :references yes
<<set-flags>>

<<prep-dir>>

empty_tree="$(git hash-object -t tree /dev/null)"
#+end_src

On the other side, when done, update the working tree to whatever the current branch is to avoid any confusion:

#+caption: finalize
#+name: finalize
#+begin_src shell
git checkout .
#+end_src

*** Error flags, warnings, debug

Various sh flags allow us to control the behaviour of the shell: treat
any unknown variable reference as an error, treat any non-zero exit
status in a pipeline as an error (instead of only looking at the last
program), and treat any error as fatal and quit. Additionally, if the
=DEBUGSH= environment variable is set, enable "debug" mode by echoing
every command before it gets executed.

#+CAPTION: set-flags
#+NAME: set-flags
#+BEGIN_SRC shell
set -euo pipefail ${DEBUGSH+-x}

if ((BASH_VERSINFO[0] > 4 || (BASH_VERSINFO[0] == 4 && BASH_VERSINFO[1] >= 4))); then
	shopt -s inherit_errexit
fi
#+END_SRC

Also contains a monstrosity which is essentially a version guard around the =inherit_errexit= option, which was only introduced in Bash 4.4. Notably Mac’s default bash doesn’t support it so the version guard is useful.

*** Windows newline fix

On Windows the config file could contain windows newline endings (CRLF). Bash doesn’t handle those as proper field separators. Even on Windows...

We force it by adding CR as a field separator:

#+caption: windows-fix
#+name: windows-fix
#+begin_src shell
IFS=$'\r'"$IFS"
#+end_src

It can’t hurt to do this on other computers, because who has a carriage return in their repo name or path? Nobody does.

The real question is: why is this not standard in Bash for Windows? Who knows. I’d add it to my .bashrc if I were you 🤷‍♀️.

* Building the code                                                :noexport:

This is for tomono development only—end users can directly use the =tomono= script from this repo without building anything.

** Nix

To build a stand-alone executable:

#+begin_src shell :results none :eval never-export
nix build .#dist
#+end_src

Find the executable in =./result/bin/=, and the documentation in =./result/doc=.

To test the code

#+begin_src shell :results none
nix flake check .
#+end_src

Troubleshooting: If you don’t have flakes enabled, add this flag just after the =nix= command:

#+begin_src shell :results none
nix --extra-experimental-features "nix-command flakes" ...
#+end_src

** Manually using Emacs

You can use Emacs to build the code manually:

Most of the code in this repository is generated from this readme file. This can be done in stock Emacs, by opening this file and calling =M-x org-babel-tangle=.

This file can also be exported to HTML. You can use the code below (and its exported command =literate-html-export=) to add some flourish to the HTML.

#+BEGIN_SRC emacs-lisp :exports code :results none :tangle literate-html.el :eval never-export :noweb yes
;;; literate-html.el --- Export org file to HTML -*- lexical-binding: t; -*-

;; Author: Hraban Luyat <hraban@0brg.net>
;; Keywords: lisp
;; Version: 0.0.1
;; Package-Requires: ((emacs "27.1") (dash "2.19.1"))
;; URL: https://tomono.0brg.net/

;; <<copyright>>

;;; Commentary:

;; Slightly more elaborate HTML export for literate programming in Org, aka
;; babel + noweb. Adds references between listings.

;;; Code:

(require 'cl-lib)
(require 'dash)
(require 's)
(require 'org)
(require 'ox-html) ;; For the dynamic config vars

(defun literate-html--org-info-name (info)
  (nth 4 info))

(defun literate-html--insert-ln (&rest args)
  (apply #'insert args)
  (newline))

(defun literate-html--should-reference (info)
  "Determine if this info block is a referencing code block"
  (not (memq (alist-get :noweb (nth 2 info))
             '(nil "no"))))

(defun literate-html--re-findall (re str &optional offset)
  "Find all matches of a regex in the given string"
  (let ((start (string-match re str offset))
        (end (match-end 0)))
    (when (numberp start)
      (cons (substring str start end) (literate-html--re-findall re str end)))))

;; Match groups are the perfect tool to achieve this but EL's regex is
;; inferior and it's not worth the hassle. Blag it manually.

(defun literate-html--strip-delimiters (s prefix suffix)
  "Strip a PREFIX and SUFFIX delimiter from S.

(literate-html--strip-delimiters \"<a>\" \"<\" \">\")
=> \"a\"

Note this function trusts the input string has those delimiters"
  (substring s (length prefix) (- (length suffix))))

(defun literate-html--strip-noweb-delimiters (s)
  "Strip the org noweb link delimiters from S, usually << and >>"
  (literate-html--strip-delimiters s
                        org-babel-noweb-wrap-start
                        org-babel-noweb-wrap-end))

(defun literate-html--extract-refs (body)
  (mapcar #'literate-html--strip-noweb-delimiters
          (literate-html--re-findall (org-babel-noweb-wrap) body)))

(defun literate-html--add-to-hash-list (k elem hash)
  "Assuming the HASH values are lists, add this ELEM to K’s list"
  (puthash k (cons elem (gethash k hash)) hash))

(defvar literate-html--forward-refs)
(defvar literate-html--back-refs)

(defun literate-html--register-refs (name refs)
  (puthash name refs literate-html--forward-refs)
  ;; Add a backreference to every ref
  (mapc (lambda (ref)
          (literate-html--add-to-hash-list ref name literate-html--back-refs))
        refs))

(defun literate-html--parse-blocks ()
  (let ((literate-html--forward-refs (make-hash-table :test 'equal))
        (literate-html--back-refs (make-hash-table :test 'equal)))
    (org-babel-map-src-blocks nil
      ;; Probably not v efficient, but should be memoized anyway?
      (let* ((info (org-babel-get-src-block-info full-block))
             (name (literate-html--org-info-name info)))
        (when (and name (literate-html--should-reference info))
          (literate-html--register-refs name (literate-html--extract-refs body)))))
    (list literate-html--forward-refs literate-html--back-refs)))

(defun literate-html--format-ref (ref)
  (format "[[%s][%s]]" ref ref))

(defun literate-html--insert-references-block (info title refs)
  (when refs
    (insert title)
    (->> refs (mapcar 'literate-html--format-ref) (s-join ", ") literate-html--insert-ln)
    (newline)))

(defun literate-html--insert-references (info forward back)
  (when (or forward back)
    (newline)
    (literate-html--insert-ln ":REFERENCES:")
    (literate-html--insert-references-block info "References: " forward)
    (literate-html--insert-references-block info "Used by: " back)
    (literate-html--insert-ln ":END:")))

(defun literate-html--fix-references (backend)
  "Append a references section to every noweb codeblock"
  (cl-destructuring-bind (forward-refs back-refs) (literate-html--parse-blocks)
    (org-babel-map-src-blocks nil
      (let ((info (org-babel-get-src-block-info full-block)))
        (when (literate-html--should-reference info)
          (let ((name (literate-html--org-info-name info)))
            (goto-char end-block)
            (literate-html--insert-references
             info
             (gethash name forward-refs)
             (gethash name back-refs))))))))

(defun literate-html-export ()
  "Export current org buffer to HTML"
  (interactive)
  (add-hook 'org-export-before-parsing-hook 'literate-html--fix-references nil t)

  ;; The HTML output
  (let ((org-html-htmlize-output-type 'css))
    (org-html-export-to-html)))

(provide 'literate-html)
#+END_SRC

* Tests
:PROPERTIES:
:CUSTOM_ID: tests
:END:

#+begin_quote
(This section is best viewed in [[https://tomono.0brg.net/#tests][HTML form]]; the GitHub Readme viewer misses some info.)
#+end_quote

The examples from this document can be combined into a test script:

#+name: test
#+BEGIN_SRC shell :tangle test :shebang "#!/usr/bin/env bash" :noweb yes :references yes
<<set-flags>>
# In tests always echo the command:
set -x
export DEBUGSH=true

# The tomono script is tangled right next to the test script
export PATH="$PWD:$PATH"

# Ensure testing always works even on unconfigured CI etc
export GIT_AUTHOR_NAME="Test"
export GIT_AUTHOR_EMAIL="test@test.com"
export GIT_COMMITTER_NAME="Test"
export GIT_COMMITTER_EMAIL="test@test.com"

<<test-setup>>
<<test-run>>
<<test-evaluate>>

<<test-extra>>
#+END_SRC

#+begin_comment
I’ve chosen to export the fully tangled script to HTML export and hide the separate test implementation below, because I think it makes more sense as a single large script.

Another note: I originally organized the code in this "1. implementation, 2. example code (aka test setup), 3. test & checks" order during the rewrite, but I now realise that was "writer-first" thinking, not "reader-first". The natural flow of this text, it is now becoming clear, is to organize all code by subject, aka by which problem it’s solving. When you find a new bug, you want both the explanation of the bug, the code that solves it, and the tests that check it, to all live in one single location. And again that top-level "test setup, test run, test evaluate": that’s more top-level writer-first organization. As a reader you want tiny independent chunks.
#+end_comment

All we needed to write was the code that actually evaluates the tests and fixtures.

#+name: test-evaluate
#+begin_src shell :exports none :results none :eval never-export :references yes
(
cd core

echo "Checking branch list"
diff -u <(git branch --no-color --list --format "%(refname:lstrip=2)" | sort) <(cat <<EOF
branch-a
branch-b
empty-branch
master
EOF
)

echo "Checking master"
git checkout master
diff -u <(find . -name '*.txt' | sort | xargs head) <(cat <<EOF
==> ./foo/i-am-foo.txt <==
This is foo

==> ./lib/zim/i-am-zim.txt <==
This is zim

==> ./中文/你好.txt <==
你好
EOF
)

echo "Checking branch-a"
git checkout branch-a
diff -u <(find . -name '*.txt' | sort | xargs head) <(cat <<EOF
==> ./foo/feature-a.txt <==
I am a new foo feature

==> ./foo/i-am-foo.txt <==
This is foo

==> ./lib/zim/feature-a.txt <==
I am a new zim feature

==> ./lib/zim/i-am-zim.txt <==
This is zim

==> ./中文/feature-a.txt <==
你好 from feature-a

==> ./中文/你好.txt <==
你好
EOF
)
)
#+end_src

I use that weird =diff -u <(..)= trick instead of a string compare like ~[[ "foo" == "..." ]]~ , because the diff shows you where the problem is, instead of just failing the test without comment.

** Edge case: same branch and tag name

If you have a branch and tag with the same name in a git repo, you will be familiar with this error:

#+begin_quote
warning: refname 'foo' is ambiguous.
#+end_quote

See [[https://github.com/hraban/tomono/issues/53][#53]]. This happens whenever you refer to the tag or branch by its bare name, without specifying whether it’s a tag or a branch. To fix this, the monorepo script must always use =refs/heads/...= to specify the branch name.

Example:

#+begin_src shell :exports code :eval never-export :results none :noweb-ref test-extra
mkdir duplicates
(
  cd duplicates
  git init -b check-dupes
  echo a > a
  echo b > b
  git add -A
  git commit -m commit1 a
  git tag check-dupes
  git commit -m commit2 b
)
#+end_src

We now have a =duplicates= repository with a branch /and/ tag =check-dupes=, pointing at different revisions. After including it in the monorepo:

#+begin_src shell :exports code :eval never-export :results none :noweb-ref test-extra
echo "$PWD/duplicates duplicates" | tomono --continue
#+end_src

We should get:

#+begin_src shell :exports both :eval never-exports :results none :noweb-ref test-extra
(
  cd core
  git checkout check-dupes
  # This file must exist
  diff -u duplicates/a <(echo a)
  # This file too
  diff -u duplicates/b <(echo b)
)
#+end_src

* Copyright and license

This is a cleanroom reimplementation of the tomono.sh script, originally written with copyright assigned to Ravelin Ltd., a UK fraud detection company. There were some questions around licensing, and it was unclear how to go forward with maintenance of this project given its dispersed copyright, so I went ahead and rewrote the entire thing for a fresh start.

The license and copyright attribution of this entire document can now be set:

#+CAPTION: copyright
#+NAME: copyright
#+BEGIN_SRC fundamental
Copyright © 2020, 2022–2024 Hraban Luyat

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
#+END_SRC

I did not look at the original implementation at all while developing this.

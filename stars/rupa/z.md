---
repo: rupa/z
url: 'https://github.com/rupa/z'
homepage: ''
starredAt: '2020-06-28T21:01:26Z'
createdAt: '2009-06-25T22:31:23Z'
updatedAt: '2025-02-25T16:24:33Z'
language: Shell
license: WTFPL
branch: master
stars: 16547
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:46.951Z'
description: z - jump around
tags: []
---

Z(1)                             User Commands                            Z(1)



NAME
       z - jump around

SYNOPSIS
       z [-chlrtx] [regex1 regex2 ... regexn]

AVAILABILITY
       bash, zsh

DESCRIPTION
       Tracks your most used directories, based on 'frecency'.

       After  a  short  learning  phase, z will take you to the most 'frecent'
       directory that matches ALL of the regexes given on the command line, in
       order.

       For example, z foo bar would match /foo/bar but not /bar/foo.

OPTIONS
       -c     restrict matches to subdirectories of the current directory

       -e     echo the best match, don't cd

       -h     show a brief help message

       -l     list only

       -r     match by rank only

       -t     match by recent access only

       -x     remove the current directory from the datafile

EXAMPLES
       z foo         cd to most frecent dir matching foo

       z foo bar     cd to most frecent dir matching foo, then bar

       z -r foo      cd to highest ranked dir matching foo

       z -t foo      cd to most recently accessed dir matching foo

       z -l foo      list all dirs matching foo (by frecency)

NOTES
   Installation:
       Put something like this in your $HOME/.bashrc or $HOME/.zshrc:

              . /path/to/z.sh

       cd around for a while to build up the db.

       PROFIT!!

       Optionally:
              Set $_Z_CMD to change the command name (default z).
              Set $_Z_DATA to change the datafile (default $HOME/.z).
              Set  $_Z_MAX_SCORE  lower  to  age  entries  out faster (default
              9000).
              Set $_Z_NO_RESOLVE_SYMLINKS to prevent symlink resolution.
              Set $_Z_NO_PROMPT_COMMAND to handle PROMPT_COMMAND/precmd  your-
              self.
              Set $_Z_EXCLUDE_DIRS to an array of directory trees to  exclude.
              Set $_Z_OWNER to allow usage when in 'sudo -s' mode.
              (These  settings  should  go  in  .bashrc/.zshrc before the line
              added above.)
              Install the provided man page z.1  somewhere  in  your  MANPATH,
              like /usr/local/man/man1.

   Aging:
       The rank of directories maintained by z undergoes aging based on a sim-
       ple formula. The rank of each entry is incremented  every  time  it  is
       accessed.  When the sum of ranks is over 9000, all ranks are multiplied
       by 0.99. Entries with a rank lower than 1 are forgotten.

   Frecency:
       Frecency is a portmanteau of 'recent' and 'frequency'. It is a weighted
       rank  that depends on how often and how recently something occurred. As
       far as I know, Mozilla came up with the term.

       To z, a directory that has low ranking but has been  accessed  recently
       will  quickly  have  higher rank than a directory accessed frequently a
       long time ago.

       Frecency is determined at runtime.

   Common:
       When multiple directories match all queries, and they all have a common
       prefix, z will cd to the shortest matching directory, without regard to
       priority.  This has been in effect, if  undocumented,  for  quite  some
       time, but should probably be configurable or reconsidered.

   Tab Completion:
       z  supports tab completion. After any number of arguments, press TAB to
       complete on directories that match each argument. Due to limitations of
       the  completion  implementations,  only  the last argument will be com-
       pleted in the shell.

       Internally, z decides you've requested a completion if the  last  argu-
       ment  passed  is  an  absolute  path to an existing directory. This may
       cause unexpected behavior if the last argument to z begins with /.

ENVIRONMENT
       A function _z() is defined.

       The contents of the variable $_Z_CMD is aliased to _z 2>&1. If not set,
       $_Z_CMD defaults to z.

       The  environment  variable $_Z_DATA can be used to control the datafile
       location. If it is not defined, the location defaults to $HOME/.z.

       The environment variable $_Z_NO_RESOLVE_SYMLINKS can be set to  prevent
       resolving  of  symlinks.  If  it  is  not  set,  symbolic links will be
       resolved when added to the datafile.

       In bash, z appends a command to the PROMPT_COMMAND environment variable
       to maintain its database. In zsh, z appends a function _z_precmd to the
       precmd_functions array.

       The environment variable $_Z_NO_PROMPT_COMMAND can be set if  you  want
       to handle PROMPT_COMMAND or precmd yourself.

       The  environment  variable  $_Z_EXCLUDE_DIRS  can be set to an array of
       directory trees to exclude from tracking.  $HOME  is  always  excluded.
       Directories must be full paths without trailing slashes.

       The  environment  variable  $_Z_OWNER  can  be set to your username, to
       allow usage of z when your sudo environment keeps $HOME set.

FILES
       Data is stored in $HOME/.z. This  can  be  overridden  by  setting  the
       $_Z_DATA  environment variable. When initialized, z will raise an error
       if this path is a directory, and not function correctly.

       A man page (z.1) is provided.

SEE ALSO
       regex(7), pushd, popd, autojump, cdargs

       Please file bugs at https://github.com/rupa/z/



z                                January 2013                             Z(1)

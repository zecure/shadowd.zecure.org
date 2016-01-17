---
date: 2015-01-01
menu:
  main:
    parent: development
title: Contributing
longtitle: Contributing to the Shadow Daemon development
weight: 10
---

All contributions to Shadow Daemon are welcome.
If you think that you can improve one of the modules or this documentation you can fork it from Github, make your changes and propose them.
Please keep the [roadmap]({{< ref "about/roadmap.md" >}}) in mind before starting to work on changes.
If you are unsure about something you can also contact us in the [forum](https://forum.zecure.org) or at <contact@zecure.org>.

## Procedure

 1. Fork the repository from https://github.com/zecure
 2. Unless you are fixing a critical bug change to the dev branch (`git checkout dev`)
 3. Create your feature branch (`git checkout -b my-new-branch`)
 4. Commit your changes (`git commit -am 'Changed this and that.'`)
 5. Squash commits into a single (or logically grouped) commits (`git rebase -i`)
 6. Push to the branch (`git push origin my-new-branch`)
 7. Create new Pull Request

## Documentation

You can find a developer documentation/programming reference for shadowd [here](https://shadowd.zecure.org/references/current/).

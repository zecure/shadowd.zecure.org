---
date: 2015-01-01
menu:
  main:
    parent: getting started
    Identifier: AboutShadowd
title: Shadowd
longtitle: Getting Started with the Shadow Daemon Server
weight: 20
---

## Installation
Installing Shadow Daemon is easy!

### Requirements
Install [Docker CE](https://docs.docker.com/install/), [docker-compose](https://docs.docker.com/compose/install/), and [git](https://git-scm.com/).

### Commands
You install and control Shadow Daemon through `shadowdctl`, a simple docker-compose wrapper.

    git clone https://github.com/zecure/packaging
    cd packaging/docker/compose
    sudo ./shadowdctl up -d

Wait until the shadowd_ui container is started (15-30 seconds) and add a user account.

    sudo ./shadowdctl exec web php app/console swd:register --admin --name=arg (--email=arg)

For more information about commands check out the [docker-compose manual](https://docs.docker.com/compose/).

## What's next?
You have to add an application [profile]({{< ref "overview/user_interface.md" >}})) with the user interface.

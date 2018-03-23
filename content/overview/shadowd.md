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

Install [Docker CE](https://docs.docker.com/install/), [Docker Compose](https://docs.docker.com/compose/install/), and [git](https://git-scm.com/).

### Setup

You install and control Shadow Daemon through `shadowdctl`, a simple docker-compose wrapper. Modify the file `docker-compose.yml` for fine-grained control.

    git clone https://github.com/zecure/packaging
    cd packaging/docker/compose
    sudo ./shadowdctl up -d

Wait until the `shadowd_ui` container is ready. On the first start this takes about 15-30 seconds since the database has to be initialized. Once the initialization is done you have to add a user account for the web interface.

    sudo ./shadowdctl exec web php app/console swd:register --admin --name=arg (--email=arg)

For more information about other commands and configuration options check out the [Docker Compose manual](https://docs.docker.com/compose/).

## What's next?

You have to add an application [profile]({{< ref "overview/user_interface.md" >}}) with the user interface.

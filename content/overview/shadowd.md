---
date: 2022-07-30
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

To begin with the installation you need [Docker CE](https://docs.docker.com/install/), [Docker Compose](https://docs.docker.com/compose/install/), and [git](https://git-scm.com/).

### Setup

You install and control Shadow Daemon through `shadowdctl`, a simple [docker-compose](https://docs.docker.com/compose/) wrapper.
You can modify the file `docker-compose.yml` for fine-grained control.
To start Shadow Daemon execute the following commands.

    git clone https://github.com/zecure/shadowdctl.git
    cd shadowdctl
    sudo ./shadowdctl up -d

Wait until the `shadowd_ui` container is completely started.
Once the initialization is done you have to add a user account for the web interface.

    sudo ./shadowdctl exec web ./app/console swd:register --admin --name=admin

For more information about commands and configuration options check out the [Docker Compose manual](https://docs.docker.com/compose/).

## What's next?

You have to add an application profile with the [user interface]({{< ref "overview/user_interface.md" >}}).

---
date: 2022-12-10
menu:
  main:
    parent: getting started
    Identifier: AboutShadowd
title: Shadowdctl
longtitle: Getting Started with the Shadow Daemon Server
weight: 20
aliases:
    - /overview/shadowd/
---

## Installation

Installing Shadow Daemon is easy!

### Requirements

To begin with the installation you need [Docker](https://docs.docker.com/install/), [Docker Compose](https://docs.docker.com/compose/install/other/), and [Git](https://git-scm.com/).

### Setup

You can install and control Shadow Daemon through `shadowdctl`, a simple [docker-compose](https://docs.docker.com/compose/) wrapper.
Modify the file `docker-compose.yml` for fine-grained control.
To start Shadow Daemon execute the following commands.

    git clone https://github.com/zecure/shadowdctl.git
    cd shadowdctl
    sudo ./shadowdctl up -d

Wait until the `web` container is completely started.
Once the initialization is done you have to add a user account for the web interface.

    sudo ./shadowdctl exec web ./app/console swd:register --admin --name=admin

By default, all services are bound to localhost only.
This behavior can be changed in `docker-compose.yml` but it is recommended to make the services not publicly available.
For more information about commands and configuration options check out the [Docker Compose manual](https://docs.docker.com/compose/).

## What's next?

You have to add an application profile with the [user interface]({{< ref "overview/user_interface.md" >}}).

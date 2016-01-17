---
date: 2015-01-01
menu:
  main:
    parent: getting started
    Identifier: AboutShadowd
title: Shadowd
longtitle: Getting started with the Shadow Daemon server
weight: 20
---

## Installation

The easiest way to install the main component of Shadow Daemon - the background server - is to use the packet manager of your distribution or [Docker]({{< ref "#docker" >}}).

### Debian / Ubuntu {#debian}

The package is still [awaiting sponsorship](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=776012), so it is not possible to install it with *apt-get* from the official repositories yet.
Please [download](https://shadowd.zecure.org/files/debian/) and install the *deb* package manually instead.

    dpkg -i shadowd_2.0.0-1_*.deb
    apt-get -f install

On Ubuntu you can also use [PPA](https://help.ubuntu.com/community/PPA) to install the package:

    add-apt-repository ppa:zit-hb/shadowd
    apt-get update
    apt-get install shadowd

### Red Hat / CentOS {#redhat}

The package is still [awaiting sponsorship](https://bugzilla.redhat.com/show_bug.cgi?id=1185662), so it is not possible to install it with *yum* from the official repositories yet.
Please [download](https://shadowd.zecure.org/files/redhat/) and install the *rpm* package manually instead.
For some of the dependencies you will need the EPEL repository (extra packages for enterprise linux).

    yum install epel-release
    yum localinstall shadowd-2.0.0-1.*.rpm
    systemctl enable shadowd

### Docker {#docker}

You can also use Docker to download and install shadowd.
This is a good solution for distributions with outdated packets.

#### Option 1: Docker for everything

This is the *easiest* and *fastest* way to completely install Shadow Daemon (except connectors).
So if you are using Docker anyway why not use it for everything?

    docker pull zecure/shadowd_database
    docker run -d --name shadowd_database zecure/shadowd_database
    docker pull zecure/shadowd_ui
    docker run -d -p 1337:80 --link shadowd_database:db zecure/shadowd_ui
    docker pull zecure/shadowd
    docker run -d -p 9115:9115 --link shadowd_database:db zecure/shadowd

{{% note title="Docker specifics" type="info" %}}
You will not have to add a new user, because the database container ships with a default user account: the username and password are **admin**.
Make sure to change it as soon as possible.
{{% /note %}}

If you choose this method you can directly jump to the [usage of the interface]({{< ref "overview/user_interface.md#usage" >}}).
You can access the web interface on port *1337*.

#### Option 2: Docker for shadowd

If you only want to use Docker for shadowd you simply have to run:

    wget -r -nd --no-parent https://shadowd.zecure.org/files/docker/
    vim shadowd.ini
    docker build -t shadowd_custom .
    docker run -d -p 9115:9115 shadowd_custom

This creates a new image based on [zecure/shadowd](https://registry.hub.docker.com/u/zecure/shadowd/) with a customized configuration file and starts it.

## Manual Installation

If you do not can or do not want to use a package you can also install shadowd manually by compiling it from source.
If you are using a package you can skip this section and directly jump to the setup of the [database]({{< ref "#database" >}}).

### Dependencies

The server is written in C++. To compile it on a Unix-like system you need:

 * g++
 * make
 * cmake

Several libraries are also required:

 * libssl
 * libboost
  * asio
  * thread
  * regex
  * program options
 * libjsoncpp
 * libcrypto++
 * libdbi
 * libdbd-mysql / libdbd-pgsql

### Download

Stable releases of the source code can be found at the [download page]({{< ref "downloads/archives.md#shadowd" >}}) or at <a target="_blank" href="https://github.com/zecure/shadowd">Github</a>.

    git clone https://github.com/zecure/shadowd.git

### Preparation

Use cmake to configure and prepare the project.
It is a good idea to create a separate directory for this.
A typical installation might look like this.

    mkdir build
    cd build
    cmake -DCMAKE_INSTALL_PREFIX:PATH=/usr -DCMAKE_BUILD_TYPE=Release ..

### Compilation

If cmake is successful it creates a makefile.
Use it to compile and install the project.

    make shadowd
    make install

### Autostart

If you compile shadowd from source it will not start automatically on boot, so you will have to set this up manually.
How exactly this is done depends on your operating system.
You can find init scripts for the most common Linux distributions in the [packaging repository](https://github.com/zecure/packaging).

It is recommended to not run shadowd with root privileges, so you should add a new user and group.

    useradd shadowd

This user needs access to the configuration file.

    chown root:shadowd /etc/shadowd/shadowd.ini
    chmod 640 /etc/shadowd/shadowd.ini

## Database {#database}

Install and configure a database server.
At the moment shadowd officially supports PostgreSQL and MySQL.
Afterwards create a new user and database for shadowd and import the correct layout.

If you are using PostgreSQL you can use `psql` to import the layout.

    psql -Ushadowd shadowd < /usr/share/shadowd/pgsql_layout.sql

If you are using MySQL you can use `mysql` to import the layout. The user requires the `CREATE ROUTINE` privilege.

    mysql -ushadowd -p shadowd < /usr/share/shadowd/mysql_layout.sql

## Configuration {#configuration}

The installer creates a configuration file at */etc/shadowd/shadowd.ini* that has to be edited.
The file is annotated and should be self-explanatory.

{{% note title="Verify the file permissions!" type="warning" %}}
The configuration file contains your database password, so make sure that it is only readable by the shadowd user.
{{% /note %}}

## What's next?
You have to install the [user interface]({{< ref "overview/user_interface.md" >}}) to add profiles and rules for web applications.

---
date: 2015-01-01
menu:
  main:
    parent: getting started
    Identifier: AboutShadowd
title: Shadowd
weight: 20
---

## Installation

The easiest way to install the server is to use the packet manager of your distribution or [Docker]({{< ref "#docker" >}}).

### Debian / Ubuntu {#debian}

The package is still [awaiting sponsorship](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=776012), so it is not possible to install it with *apt-get* from the official repositories yet.
Please [download](https://shadowd.zecure.org/files/debian/) and install the *deb* package manually instead.

    dpkg -i shadowd_1.1.2-1_*.deb
    apt-get -f install

On Ubuntu you can also use [PPA](https://help.ubuntu.com/community/PPA) to install the package:

    add-apt-repository ppa:zit-hb/shadowd
    apt-get update
    apt-get install shadowd

### Red Hat / CentOS / Fedora {#redhat}

The package is still [awaiting sponsorship](https://bugzilla.redhat.com/show_bug.cgi?id=1185662), so it is not possible to install it with *yum* from the official repositories yet.
Please [download](https://shadowd.zecure.org/files/redhat/) and install the *rpm* package manually instead.

    rpm -i shadowd-1.1.2-1.*.rpm

### Docker {#docker}

You can also use Docker to download and install shadowd.
This is a good solution for distributions with outdated packets.
If you only want to run shadowd as a Docker container you simply have to run:

    wget -r -nd --no-parent https://shadowd.zecure.org/files/docker/
    vim shadowd.ini
    docker build -t shadowd_custom .
    docker run -d -p 9115:9115 shadowd_custom

This creates a new image based on [zecure/shadowd](https://registry.hub.docker.com/u/zecure/shadowd/) with a customized configuration file and starts it.

It is also possible to use Docker for the database and the web interface.
This is the *easiest* and *fastest* way to completely install Shadow Daemon (except connectors):

    docker pull zecure/shadowd_database
    docker run -d --name shadowd_database zecure/shadowd_database
    docker pull zecure/shadowd_ui
    docker run -d -p 1337:80 --link shadowd_database:db zecure/shadowd_ui
    docker pull zecure/shadowd
    docker run -d -p 9115:9115 --link shadowd_database:db zecure/shadowd

If you choose this method you can directly jump to the [usage of the interface]({{< ref "overview/user_interface.md#usage" >}}).

<div class="note info">
<h1>Docker specifics</h1>
<p>Please note that you will have to use the IP address of the Docker network device as <i>server IP</i> when you add a profile in the web interface (e.g. docker0: 172.17.42.1).
Also, you will not have to add a new user, because the database container ships with a default user account: username <b>admin</b> and password <b>admin</b>.
</p>
</div>

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

Stable releases of the source code can be found at the [download page]({{< ref "downloads/archives.md#shadowd" >}}).
If you want the newest and freshest version you should use Github to download the source code:

    git clone https://github.com/zecure/shadowd.git

### Preparation

Use cmake to configure and prepare the project.
It is a good idea to create a separate directory for this.
A typical installation might look like this:

    mkdir build
    cd build
    cmake -DCMAKE_INSTALL_PREFIX:PATH=/usr -DCMAKE_BUILD_TYPE=Release ..

### Compilation

If cmake is successful it creates a makefile.
Use it to compile and install the project:

    make
    make install

## Database {#database}

Install and configure a database server.
At the moment shadowd officially supports PostgreSQL and MySQL.
If you are done create a new user and database and import the correct layout, e.g.:

    psql -Ushadowd shadowd < /usr/share/shadowd/pgsql_layout.sql
    mysql -ushadowd -p shadowd < /usr/share/shadowd/mysql_layout.sql

## Configuration {#configuration}

The installer creates a configuration file at */etc/shadowd/shadowd.ini* that has to be edited.
The config is annotated and should be self-explanatory.

<div class="note warning">
<h1>Verify the file permissions!</h1>
<p>The configuration file contains your database password, so make sure that it is only readable by the shadowd user.</p>
</div>

## What's next?
You have to install the [user interface]({{< ref "overview/user_interface.md" >}}) to add profiles for web applications.

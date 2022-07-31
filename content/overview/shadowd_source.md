---
date: 2018-01-28
menu:
  main:
    parent: getting started
    Identifier: AboutShadowdSource
title: Shadowd (Source)
longtitle: Getting Started with the Shadow Daemon Server (From Source)
weight: 70
---

## Installation

It is highly recommended to use [shadowdctl]({{< ref "overview/shadowd.md" >}}) to install Shadow Daemon.
If this is not an option you can also compile shadowd yourself.
Be aware though that it is much more work to install shadowd from source.

### Dependencies

The server is written in C++. To compile it on a Unix-like system you need the following tools.

 * g++
 * make
 * cmake

Several libraries are also required.

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

Stable releases of the source code can be found at the [download page]({{< ref "downloads/projects.md" >}}) or at <a target="_blank" href="https://github.com/zecure/shadowd">Github</a>.

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

If you compile shadowd from source it will not start automatically on boot, so you will have to set up the autostart manually as well.
How exactly this is done depends on your operating system.
You can find init scripts for the most common Linux distributions in the [packaging repository](https://github.com/zecure/packaging).

It is recommended to not run shadowd with root privileges, so you should add a new user and group.

    sudo useradd shadowd

This user needs access to the configuration file.

    sudo chown root:shadowd /etc/shadowd/shadowd.ini
    sudo chmod 640 /etc/shadowd/shadowd.ini

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
You have to install the [user interface]({{< ref "overview/user_interface_source.md" >}}) to add profiles and rules for web applications.

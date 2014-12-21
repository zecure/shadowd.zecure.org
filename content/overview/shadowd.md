---
date: 2015-01-01
menu:
  main:
    parent: getting started
title: Shadowd
weight: 20
---

## Installation (Package)

TODO: Explain package manager


If you are using a distribution package you can skip the next section and directly jump to [database](#database).

## Installation (Source)

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

Stable releases can be found at the [download page](/download).
If you want the newest and freshest version you should use Github to download the source code.

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
    sudo make install

## Database {#database}

Install and configure a database server.
At the moment shadowd officially supports PostgreSQL and MySQL.
If you are done create a new user and database and import the correct layout, e.g.:

    psql -Ushadowd shadowd < /usr/share/shadowd/pgsql_layout.sql
    mysql -ushadowd -p shadowd < /usr/share/shadowd/mysql_layout.sql

## Configuration {#configuration}

The installer creates a configuration at */etc/shadowd/shadowd.ini* which has to be edited.
The config is annotated and should be self-explanatory, but if you are stuck you can find more information in the [documentation](/documentation/shadowd#configuration).

<div class="note warning">
<h5>Verify the file permissions!</h5>
<p>The configuration file contains your database password, so make sure that it is only readable by the shadowd user.</p>
</div>

## What's next?
You have to install the [user interface](/overview/user_interface) to add profiles for web applications.

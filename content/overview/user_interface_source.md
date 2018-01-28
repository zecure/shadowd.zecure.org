---
date: 2018-01-28
menu:
  main:
    parent: getting started
    Identifier: AboutUserInterfaceSource
title: User Interface (Source)
longtitle: Getting Started with the Shadow Daemon User Interface (From Source)
weight: 71
---

## Dependencies

You need a [database]({{< ref "overview/shadowd_source.md#database" >}}) and a web server with PHP support as well as the PHP command line interface.

 * Apache / Lighttpd / NGINX / ...
 * PHP CGI + CLI

## Download

Stable releases of the source code can be found at the [download page]({{< ref "downloads/archives.md#user_interface" >}}) or at <a target="_blank" href="https://github.com/zecure/shadowd_ui">Github</a>.

    git clone https://github.com/zecure/shadowd_ui.git

## Preparation

Move the user interface to a directory of your choice, e.g., */var/shadowd_ui*.
Change the root directory of the web server or vhost to the *web* folder, e.g., */var/shadowd_ui/web*.
Make sure that *app/cache* and *app/logs* are writeable by the web server user.

### Rewrite

You should rewrite requests to *app.php*.

#### Apache

If you are using Apache the rewrite is done automatically by an *.htaccess file* in the *web* folder.
The only requirements are that the module *rewrite* is loaded and that *AllowOverride* is *All*.

#### Lighttpd

If you are using Lighttpd you can use the module *rewrite* as well to do this, you have to add the following directive manually though.

    url.rewrite-if-not-file = ( "(.+)" => "/app.php$1" )

#### NGINX

Rewriting requests is slightly more complicated for NGINX.
The configuration should look similar to [this](https://www.nginx.com/resources/wiki/start/topics/recipes/symfony/).

    rewrite ^/app\.php/?(.*)$ /$1 permanent;

    location / {
        index app.php;
        try_files $uri @rewriteapp;
    }

    location @rewriteapp {
        rewrite ^(.*)$ /app.php/$1 last;
    }

    location ~ ^/(app|app_dev|config)\.php(/|$) {
        fastcgi_pass phpfcgi;
        fastcgi_split_path_info ^(.+\.php)(/.*)$;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

{{% note title="In the case of an error..." type="info" %}}
The web interface uses the PHP framework **Symfony 2**.
So if you are not able to install the interface for some reason you will most likely find a solution to your problem with the help of a search engine, e.g., <a href="https://duckduckgo.com/?q=symfony+cpanel" target="_blank">Symfony and cPanel</a>.
Alternatively you can also use the Docker container <a href="https://registry.hub.docker.com/u/zecure/shadowd_ui/" target="_blank">zecure/shadowd_ui</a> that ships with an own web server.
{{% /note %}}

## Installation

Open a terminal and navigate to the root folder of the user interface.
To install the web application you have to download *composer* first.
It is recommended to do the installation without root privileges.

    curl -s https://getcomposer.org/installer | php

Composer is an executable PHAR file which downloads the dependencies and creates a configuration file.
You can start the installation by running:

    php composer.phar install

The installer asks you for a database driver.
The default value is *pdo_pgsql* for PostgreSQL.
If you are using MySQL change this value to *pdo_mysql*.
Set the other settings accordingly for the database you set up on the previous page.
It is highly recommended to change the secret token to a completely random string.

You can test if everything works by visiting */config.php*.

## Setup

You have to add a new user for the web interface.

    php app/console swd:register --env=prod --admin --name=arg (--email=arg)

The email address is optional and only used for the report command at the moment.

## What's next?

You have to add an application [profile]({{< ref "overview/user_interface.md" >}}) with the user interface.

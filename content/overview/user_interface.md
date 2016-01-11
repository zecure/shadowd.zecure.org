---
date: 2015-01-01
menu:
  main:
    parent: getting started
    Identifier: AboutUserInterface
title: User Interface
weight: 30
---

The web-based user interface is used to configure and manage the daemon.

## Dependencies

You need a [database]({{< ref "overview/shadowd.md#database" >}}) and a web server with PHP support as well as the PHP command line interface.

 * apache / lighttpd / ...
 * php5-cgi
 * php5-cli
 * php5-mysql / php5-pgsql

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

If you are using Apache this is done automatically with an .htaccess file in the *web* folder.
The only requirements are that the module *rewrite* is loaded and that *AllowOverride* is not *None*.

#### Lighttpd

If you are using Lighttpd you can use the module *rewrite* as well to do this, you have to add the following directive manually though.

    url.rewrite-if-not-file = ( "(.+)" => "/app.php$1" )

#### Nginx

It is slightly more complicated for NGINX.
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
The web interface uses the PHP framework **Symfony**.
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

## Usage {#usage}

First add a new admin user:

    php app/console swd:register --env=prod --admin --name=arg (--email=arg)

The email address is optional and only used for the report command at the moment.

Use this user to login into the web interface.
Navigate to *Management*, *Profile* and click the *Add* button at the bottom of the page.
Use the form to add a new profile:

 * You can set the IP address of the connector as *server IP* to only allow connections from this source.
 * You have to add a name for the profile.
 * You have to add a secure and unique *key* to authorize requests.
 * You should set the mode to *passive* for now, until you are sure that the system works correctly.
 * You should also disable the *whitelist* and *integrity* check for now, because they need rules to work.
 * You can enable the *blacklist* and *flooding* check, because they are instantly ready for use.

{{% note title="What is a good blacklist threshold?" type="info" %}}
If the threshold of the blacklist is too low there will be lots of false-positives.
If the threshold is too high it might miss some attacks.
Normally a good (secure) threshold lies between 5 and 10.
You should start with a low global value and only increase it over time if there are way too many false-positives.
If there are only single exceptions it is best to add blacklist rules that allow you to increase the threshold for very specific input.
{{% /note %}}

## What's next?

You have to install connectors ([PHP]({{< ref "overview/php_connector.md" >}}), [Perl]({{< ref "overview/perl_connector.md" >}}), [Python]({{< ref "overview/python_connector.md" >}})) to connect your web applications with shadowd.

---
date: 2016-05-18
menu:
  main:
    parent: getting started
    Identifier: AboutUserInterface
title: User Interface
longtitle: Getting Started with the Shadow Daemon User Interface
weight: 30
---

## Dependencies

You need a [database]({{< ref "overview/shadowd.md#database" >}}) and a web server with PHP support as well as the PHP command line interface.

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

## Usage {#usage}

First add a new admin user:

    php app/console swd:register --env=prod --admin --name=arg (--email=arg)

The email address is optional and only used for the report command at the moment.

Go to the web interface and login with your newly created admin user.
Navigate to *Management*, *Profile* and click the *Add* button at the bottom of the page.
Use the form to add a new profile.
The default values should be reasonable for most new installations.

 * You can set the IP address of the connector as *server IP* to only allow connections from this source.
  * You can use asterisk as a wildcard.
 * You have to add a name for the profile.
 * You have to add a secure and unique *key* to authorize requests from connectors.
  * The key has to be added to the configuration file of the connector later on.
 * You should set the mode to *passive* for now, until you are sure that the system works correctly.
  * In passive mode shadowd will never tell a connector to modify or stop a request.
 * You should disable the *whitelist* and *integrity* checks for now, because they need well-fitting rules to work.
 * You can enable the *blacklist* and *flooding* checks, because they are instantly ready for use.
  * The [blacklist]({{< ref "documentation/blacklist.md" >}}) checks user input for malicious patterns and compares their total impact to the threshold.
  * The flooding protection limits the amount of *attacks* that are stored and analyzed by Shadow Daemon. It does not count non-malicious requests.

{{% note title="What is a good blacklist threshold?" type="info" %}}
If the threshold of the blacklist is too low there will be lots of false-positives.
If the threshold is too high it might miss some attacks.
Normally a good (secure) threshold lies between 5 and 10.
You should start with a low global value and only increase it over time if there are way too many false-positives.
If there are only single exceptions it is best to add blacklist rules that allow you to increase the threshold for very specific input.
{{% /note %}}

## What's next?

You have to install connectors ([PHP]({{< ref "overview/php_connector.md" >}}), [Perl]({{< ref "overview/perl_connector.md" >}}), [Python]({{< ref "overview/python_connector.md" >}})) to connect your web applications with shadowd.

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

Stable releases of the source code can be found at the [download page]({{< ref "downloads/archives.md#user_interface" >}}) or at <a target="_blank" href="https://github.com/zecure/shadowd_ui">Github</a>:

    git clone https://github.com/zecure/shadowd_ui.git

## Installation

Move the user interface to a directory of your choice, e.g., */var/shadowd_ui*.
Make the *web* folder accessible via your web server, but nothing else, e.g., change the root directory of the web server to */var/shadowd_ui/web*.
Make sure that *app/cache* and *app/logs* are writeable by the web server user.

Open a terminal and navigate to the root folder of the user interface.
To install the web application you have to download *composer* first.
It is recommended to do the installation without admin privileges.

    curl -s https://getcomposer.org/installer | php

Composer is an executable PHAR file which downloads the dependencies and creates a configuration.
You can start the installation by running:

    php composer.phar install

The installer asks you for a database driver.
The default value is *pdo_pgsql* for PostgreSQL.
If you are using MySQL change this value to *pdo_mysql*.
It is highly recommended to change the secret token to a random string.

You can test if everything works by visiting */config.php*.

{{% note title="In the case of an error..." type="info" %}}
The web interface uses the PHP framework **Symfony**.
So if you are not able to install the interface for some reason you will most likely find a solution to your problem with the help of a search engine, e.g., <a href="https://duckduckgo.com/?q=symfony+cpanel" target="_blank">Symfony and cPanel</a>.
Alternatively you can also use the Docker container <a href="https://registry.hub.docker.com/u/zecure/shadowd_ui/" target="_blank">zecure/shadowd_ui</a> that ships with an own web server.
{{% /note %}}

## Usage {#usage}

First add a new admin user:

    php app/console swd:register --env=prod --admin --name=arg (--email=arg)

The email address is optional and only used for the report command at the moment.

Use this user to login into the web interface.
Navigate to *Profile* and click the *Add* button at the bottom of the page.
Use the form to add a new profile:

 * Add the IP address of the connector as *server IP* to allow connections from this source.
 * Add a secure and unique *key* to authorize requests.
 * Disable *learning* and the *whitelist* for now.
 * Enable the *blacklist*, because it is instantly ready for use.
 * Enter a *blacklist threshold* to set the sensitivity.
 * Set a *flooding time* and *threshold* to protect the firewall from getting flooded with garbage data.

{{% note title="What is a good blacklist threshold?" type="info" %}}
If the threshold of the blacklist is too low there will be lots of false-positives.
If the threshold is too high it might miss some attacks.
Normally, a good (secure) threshold lies between 5 and 20.
You should start with a low global value and only increase it over time if there are way too many false-positives.
If there are only single exceptions it is best to add blacklist rules that allow you to increase the threshold for very specific input.
{{% /note %}}

## What's next?

You have to install connectors ([PHP]({{< ref "overview/php_connector.md" >}}), [Perl]({{< ref "overview/perl_connector.md" >}}), [Python]({{< ref "overview/python_connector.md" >}})) to connect your web applications with shadowd.

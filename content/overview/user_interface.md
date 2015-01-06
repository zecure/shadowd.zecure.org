---
date: 2015-01-01
menu:
  main:
    parent: getting started
title: User Interface
weight: 30
---

## Dependencies

You need a [database](/overview/shadowd#database) and a web server with PHP support as well as the PHP command line interface.

 * apache / lighttpd / ...
 * php5-cgi
 * php5-cli
 * php5-mysql / php5-pgsql

## Download

Stable releases can be found at the [download page](/download).
Make sure to use a compatible version, i.e. if you downloaded shadowd from Github you should also download the user interface from Github.

    git clone https://github.com/zecure/shadowd_ui.git

## Installation

Move the user interface to a directory of your choice, e.g., */var/shadowd_ui*.
Make the *web* folder accessible via your web server, but nothing else, e.g., change the root directory of the web server to */var/shadowd_ui/web*.
Make sure that *app/cache* and *app/logs* are writeable by the web server user.

Open a terminal and navigate to the root folder of the user interface.
To install the web application you have to download *composer* first:

    curl -s https://getcomposer.org/installer | php

Composer is an executable PHAR file which downloads the dependencies and creates a configuration.
You can start the installation by running:

    php composer.phar install

You can test if everything works by visiting */config.php*.

## Usage

First add a new admin user:

    php app/console swd:register --admin <name> <email>

If you do not wish to receive messages you can leave the email empty.
Use this user to login into the web interface.
Navigate to *Profile* and click the *Add* button at the bottom of the page.
Use the form to add a new profile:

 * Set the address of the connector as *server IP*.
 * Set a secure and unique *key* to authorize requests.
 * Disable *learning* and the *whitelist* for now.
 * Enable the *blacklist*, because it is instantly ready for use.
 * Set the *blacklist threshold* to determine its sensivity.

<div class="note info">
<h1>What is a good blacklist threshold?</h1>
<p>If the threshold of the blacklist is too low there will be lots of false-positives.
If the threshold is too high it might miss some attacks.</p>
<p>A good threshold lies between 15 and 25.
You should start with a low value and increase it over time if there are too many false-positives.</p>
</div>

## What's next?

You have to install the connector ([PHP](/overview/php_connector), [Perl](/overview/perl_connector)) to connect the web application with shadowd.

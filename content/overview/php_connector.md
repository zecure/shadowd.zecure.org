---
date: 2022-07-31
menu:
  main:
    parent: getting started
title: PHP Connector
longtitle: Getting Started with the Shadow Daemon PHP Connector
weight: 40
---

## Download

Stable releases of the source code can be found at the [download page]({{< ref "downloads/projects.md" >}}) or at <a target="_blank" href="https://github.com/zecure/shadowd_php">Github</a>.

    wget https://shadowd.zecure.org/files/shadowd_php-{{< param shadowd_php-version >}}.tar.gz

## Installation

To install the connector you have to extract it and move the content to a location that is accessible by the web server, e.g., */usr/share/shadowd/php*.

    tar -xvf shadowd_php-{{< param shadowd_php-version >}}.tar.gz
    sudo mkdir /usr/share/shadowd
    sudo mv shadowd_php-{{< param shadowd_php-version >}} /usr/share/shadowd/php
    sudo chown -R root:root /usr/share/shadowd/php

PHP provides a setting with the name [auto_prepend_file](http://php.net/manual/en/ini.core.php#ini.auto-prepend-file) to automatically load additional PHP files every time the PHP binary is called.
This can be used to load the connector on every request before the actual script is executed without having to change a single line of code.

### Apache

If you are using Apache you can use *php_value* to set *auto_prepend_file* for specific vhosts or directories.

    php_value  auto_prepend_file  "/usr/share/shadowd/php/shadowd.php"

### Nginx

If you are using NGINX you can use *fastcgi_param* to set *auto_prepend_file* for specific vhosts or directories.

    fastcgi_param  PHP_ADMIN_VALUE  "auto_prepend_file=/usr/share/shadowd/php/shadowd.php";

### Global

If you want to enable Shadow Daemon globally you can set *auto_prepend_file* to */usr/share/shadowd/php/shadowd.php* in your *php.ini* file (for example, `/etc/php/7.2/cgi/php.ini`).
The change will take effect after you restart your web server, but you should wait with that until the configuration of the module is completely done.
This option is not recommended since the used configuration file depends on the PHP version, so updating PHP will result in an unloaded connector.

## Configuration

Copy the configuration file from *misc/examples/connectors.ini* to */etc/shadowd/connectors.ini* and edit it.
The file is annotated and should be self-explanatory, but if you are stuck you can find more information in the [documentation]({{< ref "documentation/connectors.md" >}}).
Make sure that it is readable by the web server user, otherwise your site will not work anymore.

    sudo mkdir /etc/shadowd
    sudo cp /usr/share/shadowd/php/misc/examples/connectors.ini /etc/shadowd
    sudo chown root:www-data /etc/shadowd/connectors.ini
    sudo chmod 640 /etc/shadowd/connectors.ini

If you plan to protect multiple applications you can use the environment variable *SHADOWD_CONNECTOR_CONFIG* to specify different configuration files for every target.

{{% note title="Ignore sensitive input!" type="warning" %}}
You should use the [ignore]({{< ref "documentation/connectors.md#ignore" >}}) function of the connector to disregard very sensitive input, e.g., passwords.
{{% /note %}}

## What's next?

You have successfully installed Shadow Daemon, now you can start with the configuration.
If you do not know how to configure Shadow Daemon check out the tutorial about [rules]({{< ref "tutorials/rules.md" >}}).

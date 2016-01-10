---
date: 2015-01-01
menu:
  main:
    parent: getting started
title: PHP Connector
weight: 40
---

## Download

Stable releases of the source code can be found at the [download page]({{< ref "downloads/archives.md#php_connector" >}}) or at <a target="_blank" href="https://github.com/zecure/shadowd_php">Github</a>.

    git clone https://github.com/zecure/shadowd_php.git

## Installation

PHP provides the setting [auto_prepend_file](http://php.net/manual/en/ini.core.php#ini.auto-prepend-file) to automatically load additional PHP files every time the PHP binary is called.
This can be used to load the connector on every request before the actual code is executed.

To do this move *src* to a directory of your choice, e.g., */usr/share/shadowd/php*.
Afterwards edit your *php.ini* and set *auto_prepend_file* to */usr/share/shadowd/Connector.php* to load the connector globally.
The change will take effect after you restart your web server, but you should wait with that until the configuration of the module is completely done.

### Apache

If you are using Apache you do not have to enable the connector globally, you can easily load it for single vhosts only:

    <VirtualHost *:80>
        DocumentRoot "/www/example"
        ServerName www.example.com
      
        php_value  auto_prepend_file  "/usr/share/shadowd/shadowd_connector.php"
    </VirtualHost>

Apache servers can also use *.htaccess* files to set *auto_prepend_file* for specific directories only.

### Nginx

The same is true for Nginx, you do not have to set the PHP setting globally.
To set it up for a single vhost or directory only just add:

    fastcgi_param  PHP_ADMIN_VALUE  "auto_prepend_file=/usr/share/shadowd/shadowd_connector.php";

## Configuration

Copy the configuration file from *misc/examples/connectors.ini* to */etc/shadowd/connectors.ini* and edit it.
The file is annotated and should be self-explanatory, but if you are stuck you can find more information in the [documentation]({{< ref "documentation/connectors.md" >}}).
Make sure that it is readable by the web server user, otherwise your site will not work anymore.

{{% note title="Ignore sensitive input!" type="warning" %}}
You should use the [ignore]({{< ref "documentation/connectors.md#ignore" >}}) function of the connector to disregard very sensitive input, e.g., passwords.
{{% /note %}}

## What's next?

You have successfully installed Shadow Daemon, now you can start with the configuration.
If you do not know how to configure Shadow Daemon check out the tutorial about [rules]({{< ref "tutorials/rules.md" >}}).

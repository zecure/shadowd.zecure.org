---
date: 2015-01-01
menu:
  main:
    parent: getting started
title: PHP Connector
weight: 40
---

## Download

Stable releases can be found at the [download page]({{< ref "downloads/archives.md#php_connector" >}}).
Make sure to use a compatible version, i.e. if you downloaded shadowd from Github you should also download the connector from Github:

    git clone https://github.com/zecure/shadowd_php.git

## Installation

PHP provides the setting [auto_prepend_file](http://php.net/manual/en/ini.core.php#ini.auto-prepend-file) to include additional files.
This can be used to automatically load the connector on every request.

To do this move the content of *src* to a directory of your choice, e.g., */usr/share/shadowd*.
Afterwards edit your *php.ini* and set *auto_prepend_file* to */usr/share/shadowd/shadowd_connector.php*.
The change will take effect after you restart your web server, but you should wait with that until the configuration of the module is completely done.

Apache servers can also use a *.htaccess* file to set *auto_prepend_file* for specific directories only.
There is an example for this at *misc/examples/.htaccess*.

## Examples

### Apache

If you are using Apache you can easily load the connector for single vhosts only:

    <VirtualHost *:80>
        DocumentRoot "/www/example"
        ServerName www.example.com
      
        php_value  auto_prepend_file  "/usr/share/shadowd/shadowd_connector.php"
    </VirtualHost>

It is also possible to use *php_value* inside a *.htaccess* file to enable the connector for specific directories.
This method is well suited for shared hosting.

## Configuration

Copy the configuration from *misc/examples/connectors.ini* to */etc/shadowd/connectors.ini* and edit it.
The config is annotated and should be self-explanatory, but if you are stuck you can find more information in the [documentation]({{< ref "documentation/connectors.md" >}}).

<div class="note warning">
<h1>Ignore sensitive input!</h1>
<p>You should use the <a href="/documentation/connectors#ignore">ignore</a> function of the connector to disregard very sensitive input, e.g., passwords.</p>
</div>

## What's next?

You have successfully installed Shadow Daemon and the web application is protected by the blacklist.
If you like it fast and simple you are done now!

If you want the maximum security you should consider enabling the whitelist.
The whitelist protects to some degree against unknown attack vectors as well as backdoors.
There are tutorials that explain how to secure web applications with [existing rules sets]({{< ref "tutorials/protect_wordpress.md" >}}) and how to generate [custom rules]({{< ref "tutorials/protect_applications.md" >}}) for arbitrary web applications.

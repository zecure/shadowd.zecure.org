---
date: 2015-01-01
menu:
  main:
    parent: getting started
title: PHP Connector
weight: 40
---

## Download

Stable releases can be found at the [download page](/download).
Make sure to use a compatible version, i.e. if you downloaded shadowd from Github you should also download the connector from Github.

    git clone https://github.com/zecure/shadowd_php.git

## Installation

PHP provides the setting [auto_prepend_file](http://php.net/manual/en/ini.core.php#ini.auto-prepend-file) to include additional files.
This can be used to automatically load the connector on every request.

To do this move the content of *src* to a directory of your choice, e.g., */usr/share/shadowd*.
Afterwards edit your *php.ini* and set *auto_prepend_file* to */usr/share/shadowd/shadowd_php_connector.php*.
The change will take effect after you restart your web server, but you should wait with that until the configuration of the module is completly done.

Apache servers can also use a *.htaccess* file to set *auto_prepend_file* for specific directories only.
There is an example for this at *misc/examples/htaccess*.

## Configuration

Copy the configuration from *misc/examples/connectors.ini* to */etc/shadowd/connectors.ini* and edit it.
The config is annotated and should be self-explanatory, but if you are stuck you can find more information in the [documentation](/documentation/php_connector#configuration).

<div class="note warning">
<h5>Ignore sensitive input!</h5>
<p>You should use the <a href="/documentation/php_connector#ignore">ignore</a> function of the connector to disregard very sensitive input, e.g., passwords.</p>
</div>

## What's next?

You have successfully installed Shadow Daemon and the web application is protected by the blacklist.
If you like it fast and simple you are done now!

If you want the maximum security you should consider enabling the whitelist.
The whitelist protects to some degree against unknown attack vectors as well as backdoors.
There are tutorials that explain how to secure web applications with [existing rules sets](/tutorials/protect_wordpress) and how to generate [custom rules](/tutorials/protect_applications) for arbitrary web applications.
You should also read the [documentation](/documentation/user_interface) if you need more information about how to configure the whitelist.
---
date: 2015-01-01
menu:
  main:
    parent: getting started
title: Python Connector
weight: 60
---

## Download

Stable releases can be found at the [download page](/download).
Make sure to use a compatible version, i.e. if you downloaded shadowd from Github you should also download the connector from Github.

    git clone https://github.com/zecure/shadowd_python.git

If you are using Pypi to install the package you do not have to download it manually.

## Installation

You can install the package with easy_install or pip:

    easy_install swd
    pip install swd

If you prefer to install the package manually you have to execute setup.py:

    python setup.py install

### CGI

To protect CGI applications you simply have to load the module:

    import swd.cgi_connector

## Configuration

Copy the configuration from *misc/examples/connectors.ini* to */etc/shadowd/connectors.ini* and edit it.
The config is annotated and should be self-explanatory, but if you are stuck you can find more information in the [documentation](/documentation/connectors).

<div class="note warning">
<h1>Ignore sensitive input!</h1>
<p>You should use the <a href="/documentation/connectors#ignore">ignore</a> function of the connector to disregard very sensitive input, e.g., passwords.</p>
</div>

## What's next?

You have successfully installed Shadow Daemon and the web application is protected by the blacklist.
If you like it fast and simple you are done now!

If you want the maximum security you should consider enabling the whitelist.
The whitelist protects to some degree against unknown attack vectors as well as backdoors.
There are tutorials that explain how to secure web applications with [existing rules sets](/tutorials/protect_wordpress) and how to generate [custom rules](/tutorials/protect_applications) for arbitrary web applications.
You should also read the [documentation](/documentation/user_interface) if you need more information about how to configure the whitelist.

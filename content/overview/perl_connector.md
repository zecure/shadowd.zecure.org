---
date: 2015-01-01
menu:
  main:
    parent: getting started
title: Perl Connector
weight: 50
---

## Download

Stable releases can be found at the [download page](/download).
Make sure to use a compatible version, i.e. if you downloaded shadowd from Github you should also download the connector from Github.

    git clone https://github.com/zecure/shadowd_perl.git

If you are using CPAN to install the module you do not have to download it manually.

## Installation

You can install the modules with CPAN:

    cpan -i Shadowd::Connector

Or by hand:

    perl Makefile.PL
    make
    make install

### CGI

To protect CGI applications you simply have to load the module:

    use Shadowd::Connector::CGI;

This can be automated by executing Perl scripts with:

    perl -mShadowd::Connector::CGI

### Mojolicious

Mojolicious applications require a small modification. It is necessary to create a hook to intercept requests:

    use Shadowd::Connector::Mojolicious;
    
    sub startup {
      my $app = shift;
    
      $app->hook(before_dispatch => sub {
        my $self = shift;
        return Shadowd::Connector::Mojolicious->new($self)->start();
      });

      # ...
    }

### Mojolicious::Lite

Mojolicious::Lite applications require a small change as well:

    use Shadowd::Connector::Mojolicious;
    
    under sub {
      my $self = shift;
      return Shadowd::Connector::Mojolicious->new($self)->start();
    };

The connector is only executed if the request matches a route.

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

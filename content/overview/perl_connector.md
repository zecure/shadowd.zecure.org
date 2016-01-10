---
date: 2015-01-01
menu:
  main:
    parent: getting started
title: Perl Connector
weight: 50
---

## Download

If you are using CPAN to install the module you do not have to download the source code manually.
Stable releases of the source code can be found at the [download page]({{< ref "downloads/archives.md#perl_connector" >}}) or at <a target="_blank" href="https://github.com/zecure/shadowd_perl">Github</a>.

    git clone https://github.com/zecure/shadowd_perl.git

## Installation

You can install the modules with CPAN:

    cpan -i Shadowd::Connector

Or by hand:

    perl Makefile.PL
    make
    make install

### CGI

To protect CGI applications you simply have to load the module.

    use Shadowd::Connector::CGI;

This can be automated by executing Perl scripts with:

    perl -mShadowd::Connector::CGI

### Mojolicious

Mojolicious applications require a small modification. It is necessary to create a hook to intercept requests.

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

Mojolicious::Lite applications require a small change as well.

    use Shadowd::Connector::Mojolicious;
    
    under sub {
      my $self = shift;
      return Shadowd::Connector::Mojolicious->new($self)->start();
    };

The connector is only executed if the request matches a route.

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

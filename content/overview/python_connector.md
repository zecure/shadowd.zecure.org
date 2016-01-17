---
date: 2015-01-01
menu:
  main:
    parent: getting started
title: Python Connector
longtitle: Getting started with the Shadow Daemon Python connector
weight: 60
---

## Download

If you are using Pypi to install the package you do not have to download the source code manually.
Stable releases of the source code can be found at the [download page]({{< ref "downloads/archives.md#php_connector" >}}) or at <a target="_blank" href="https://github.com/zecure/shadowd_python">Github</a>.

    git clone https://github.com/zecure/shadowd_python.git

## Installation

You can install the package from Pypi with easy_install or pip.

    easy_install shadowd
    pip install shadowd

Or by hand.

    python setup.py install

### CGI

To protect CGI applications you simply have to load the module.

    import shadowd.cgi_connector

### Django

Django applications require a small modification.
It is necessary to create a hook to intercept requests.
To do this create the file *middleware/shadowdconnector.py* in the application directory.

    from shadowd.django_connector import InputDjango, OutputDjango, Connector
    
    class ShadowdConnectorMiddleware(object):
        def process_request(self, request):
            input = InputDjango(request)
            output = OutputDjango()
    
            status = Connector().start(input, output)
            if not status == True:
                return status

There also has to be an empty *\_\_init\_\_.py* file in the middleware directory.
Next you have to register the middleware in the *settings.py* file of your application.

    MIDDLEWARE_CLASSES = (
        'middleware.shadowdconnector.ShadowdConnectorMiddleware',
        # ...
    )

The connector should be at the beginning of the *MIDDLEWARE_CLASSES* list.

### Flask

Flask applications require a small modification as well.
It is necessary to create a hook to intercept requests.

    from shadowd.flask_connector import InputFlask, OutputFlask, Connector

    @app.before_request
    def before_req():
        input = InputFlask(request)
        output = OutputFlask()

        Connector().start(input, output)

## Configuration

Copy the configuration file from *misc/examples/connectors.ini* to */etc/shadowd/connectors.ini* and edit it.
The file is annotated and should be self-explanatory, but if you are stuck you can find more information in the [documentation]({{< ref "documentation/connectors.md" >}}).
Make sure that it is readable by the web server user, otherwise your site will not work anymore.

If you plan to protect multiple applications you can use the environment variable *SHADOWD_CONNECTOR_CONFIG* to specify different configuration files for every target.

{{% note title="Ignore sensitive input!" type="warning" %}}
You should use the [ignore]({{< ref "documentation/connectors.md#ignore" >}}) function of the connector to disregard very sensitive input, e.g., passwords.
{{% /note %}}

## What's next?

You have successfully installed Shadow Daemon, now you can start with the configuration.
If you do not know how to configure Shadow Daemon check out the tutorial about [rules]({{< ref "tutorials/rules.md" >}}).

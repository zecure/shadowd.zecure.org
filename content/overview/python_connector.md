---
date: 2015-01-01
menu:
  main:
    parent: getting started
title: Python Connector
weight: 60
---

## Download

Stable releases can be found at the [download page](/downloads/archives#python_connector).
Make sure to use a compatible version, i.e. if you downloaded shadowd from Github you should also download the connector from Github:

    git clone https://github.com/zecure/shadowd_python.git

If you are using Pypi to install the package you do not have to download it manually.

## Installation

You can install the package from Pypi with easy_install or pip:

    easy_install shadowd
    pip install shadowd

Or by hand:

    python setup.py install

### CGI

To protect CGI applications you simply have to load the module:

    import shadowd.cgi_connector

### Django

Django applications require a small modification.
It is necessary to create a hook to intercept requests.
To do this create the file *middleware/shadowdconnector.py* in the application directory:

    from shadowd.django_connector import InputDjango, OutputDjango, Connector
    
    class ShadowdConnectorMiddleware(object):
        def process_request(self, request):
            input = InputDjango(request)
            output = OutputDjango()
    
            status = Connector().start(input, output)
            if not status == True:
                return status

There also has to be an empty *\_\_init\_\_.py* file in the middleware directory.
Next you have to register the middleware in the *settings.py* file of your application:

    MIDDLEWARE_CLASSES = (
        'middleware.shadowdconnector.ShadowdConnectorMiddleware',
        # ...
    )

The connector should be at the beginning of the *MIDDLEWARE_CLASSES* list.

### Flask

Flask applications require a small modification as well.
It is necessary to create a hook to intercept requests:

    from shadowd.flask_connector import InputFlask, OutputFlask, Connector

    @app.before_request
    def before_req():
        input = InputFlask(request)
        output = OutputFlask()

        Connector().start(input, output)

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

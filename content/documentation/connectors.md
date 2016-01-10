---
date: 2015-01-01
menu:
  main:
    parent: documentation
    Identifier: DocumentationConnectors
title: Connectors
weight: 40
---

## Description

A connector connects a web application with a background server.
The connector is executed everytime a request arrives.
It gathers all user input, encodes it and sends it to the server.
The server analyzes and processes the input and returns the names of all dangerous parameters.
The connector uses this names to remove the parameters.
Afterwards the execution of the original scripts continues with the defused input.

## Configuration

The default path of the configuration file is */etc/shadowd/connectors.ini*.
The path can be overwritten with the environment variable *SHADOWD_CONNECTOR_CONFIG*.

### Profile

The profile is a numeric id that allows the management of different servers and applications with a single web interface.
In general it is best to have one profile for every virtual host.
For small web servers it is also possible to share one profile with every web application.

### Key

Every profile is protected by a key.
Messages from the connector to the server are authenticated with a message authentication code.
This is a password authentication without having to send the actual password.

The key should be unique, private and non-guessable.

### Host

By default the connectors will try to connect to the localhost.
If you are running shadowd on a different machine set the IP address or domain name of the server here.
Do not forget to change the bind address of the shadowd server to something other than *127.0.0.1*, otherwise it will not be possible to connect.

### Port

The default port of the shadowd server is 9115.

### SSL

If shadowd is running with SSL activated this parameter has to point to the SSL certificate of the server.
The certificate is used to verify the identity of the server and is very important, otherwise it would be possible for an attacker to commit a man-in-the-middle attack.
Use the full path of the certificate.

### Observe {#observe}

By default the connector will remove threats from requests.
If you do not want to do that activate *observe*.
This setting can be used to test new rules or to turn the web application firewall into a high-interaction web honeypot.

### Debug

If *debug* is activated status messages are written to a log file.
If possible the log file of the web server is used.
This is not always possible though, so some connectors write the messages to a separate file.

### Log

The default path for the log file is */var/log/shadowd.log*.
It can be changed by setting this value.
Not every connector uses a custom log file.

### Ignore {#ignore}

The ignore file can be used to *not* send specific user input to the Shadow Daemon server.
It is a security feature that should be used to protect very sensitive input, e.g., passwords.

An ignore file contains a JSON encoded list of dictionaries.
Every entry needs a caller and/or a path, i.e.:

    [
      {"caller": "..."},
      {"path": "..."},
      {"caller": "...", "path": "..."}
    ]

Wildcards are not supported, every value has to match exactly.

### Client IP

Some connectors allow to change the source of the client IP.
This is intended for web servers that are behind a proxy.

### Caller

Some connectors allow to change the source of the caller.
In most cases the path and name of the executed script is the caller, but sometimes everything is routed through a single file.
In such a case it might be a good idea to change the caller to the requested route.

## Problems

### The connector can't connect

If you have problems to connect a web application with shadowd you should enable debugging in the configuration file.
The error messages will help you to identify the cause of the problems in no time.

#### config error

If you get a config error the configuration file is either invalid or not readable by the web server user.

#### xxx in config missing

A required configuration value is not set, so make sure that it is set and not commented out by a semicolon.

#### could not open ignore file

An ignore file is set in the configuration file, but it is not possible to open it.
This file has to be readable by the web server user.

#### ignore file is corrupted

The ignore file does not contain valid json-encoded data.

#### profile id not integer

Only numerical identifiers for profiles are possible, so if the id is not an integer the connection can not succeed.
The id of the profile is automatically assigned by your database software when you add a new profile.

#### network error: xxx

It was not possible to establish a connection with the shadowd server.

#### unknown network error

It was not possible to establish a connection with the shadowd server.
The reason is not known.

#### bad request

There are multiple reasons why the request could be bad: the flood protection blocked the request, there is no matching profile or something has gone horribly wrong.
For security reasons shadowd does not tell the connector exactly why the request is bad.
To see what went wrong you have to look in the log file of shadowd itself.

#### bad signature

The signature is bad if the key in your connector configuration file does not match the profile key that is saved in the database.
Make sure that the keys match and that the profile id is correct.

#### bad json

It should not happen that the json data is invalid.
The most likely explanation is a mismatch of shadowd and connector versions.

#### processing error

It should not happen that the output of shadowd can not be processed.
The most likely explanation is a crash of shadowd.
If this is the case make sure to create a [Github issue](https://github.com/zecure/shadowd/issues), because shadowd should never crash under any circumstances.

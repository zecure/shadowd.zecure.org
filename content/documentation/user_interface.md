---
date: 2015-01-29
menu:
  main:
    parent: documentation
    Identifier: DocumentationUserInterface
title: User Interface
weight: 20
---

## Configuration

The configuration file is located at *app/config/parameters.yml*.
It is recommended to use composer to edit the [configuration](https://getcomposer.org/doc/03-cli.md#config).

    php composer.phar config --list
    php composer.phar config [setting-key] [setting-value1] ... [setting-valueN]

## Commands

### Register

    php app/console swd:register <name> [<email>]
      --admin

This command registers a new user.
If the admin switch is not set the user is not able to change anything besides his own user settings.

### Clean

    php app/console swd:clean
      -t [ --time_frame ] arg (-1 month)

This command deletes all requests and parameters that are older than the time frame.
It can be used to automatically clean up the database.

### Report

    php app/console swd:report
      -t [ --time_frame ] arg (-24 hours)

This command sends a report about recent attacks to all users with a valid e-mail address.
No e-mail is send if there are no logged requests.
The content of the message is located in *src/Swd/AnalyzerBundle/Resources/views/Report/email.txt.twig*.

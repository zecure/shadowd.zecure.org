---
date: 2015-01-29
menu:
  main:
    parent: documentation
    Identifier: DocumentationUserInterface
title: User Interface
weight: 30
---

## Description

## Configuration

The configuration is located at *app/config/parameters.yml*.
Either edit the file manually or use [composer](https://getcomposer.org/doc/03-cli.md#config).

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
No e-mails are send if there are no logged attacks in the time frame.

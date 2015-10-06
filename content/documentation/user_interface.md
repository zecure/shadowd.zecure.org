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

The user interface for Shadow Daemon is important, because it is required to set up the firewall.
It can be also used to analyze attacks manually, learn about attackers and improve the rules based on that new knowledge.

At the moment there is only a web interface, but CLI/GUI applications are a possibility as well (at a later time).

## Configuration

The configuration file is located at *app/config/parameters.yml*.

## Commands

### Register {#register}

    php app/console swd:register -e prod
      -A [ --admin ]
      -N [ --name ] arg
      -E [ --email ] arg

This command registers a new user.
If the admin switch is not set the user is not able to change anything besides his own user settings.

### Clean {#clean}

    php app/console swd:clean -e prod
      -t [ --time_frame ] arg (-1 month)

This command deletes all requests and parameters that are older than the time frame.
It can be used to automatically clean up the database.

### Report {#report}

    php app/console swd:report -e prod
      -t [ --time_frame ] arg (-24 hours)

This command sends a report about recent attacks to all users with a valid e-mail address.
No e-mails are send if there are no logged attacks in the time frame.

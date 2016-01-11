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

The user interface is required to configure Shadow Daemon.
It can be also used to analyze attacks, learn about attackers and improve the rules based on that new knowledge.

## Configuration

The configuration file is located at *app/config/parameters.yml*.

## Profiles

### Key

The key is used by [connectors]({{< ref "documentation/connectors.md#key" >}}) to authenticate.
It should be unique and non-guessable.

### Modes

#### Active

This mode should be used in a productive system.
Attacks are recorded and threats are removed.

#### Passive

This mode should be used to test new rules.
Attacks are recorded but threats are not removed.

#### Learning

This mode disables the protection and every request is recorded, no matter if it contains threats or not.
It is used to gather learning data for the rules generator.
Be cautious, if there are too many requests that have to be saved this mode could drastically slow down your site!

## Filters

The user interface provides powerful filters to help you quickly find information you are interested in or hide information you are not interested in.

### Include

If you specify an *include* filter only results are shown that match this filter.
Different *include* filters are combined with a logical `AND`, while *include* filters of the same type are combined with a logical `OR`.

### Exclude

If you specify an *exclude* filter only results are shown that do not match this filter.
Both *exclude* filters of the same type and different *exclude* filters are combined with a logical `OR`.

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

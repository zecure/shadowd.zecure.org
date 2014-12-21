---
date: 2015-01-01
linktitle: Prevent Flooding
menu:
  main:
    parent: tutorials
title: How to prevent flooding
weight: 20
---

## Introduction

If you want to prevent flooding of the logs and mass scans you can use *fail2ban* to temporary ban attackers.

## Prerequisites

This tutorial assumes that you already have [installed and configured](/overview/shadowd) Shadow Daemon.
The rules should be well-tested and not result in false-positives, otherwise the bans will be very frustrating for your visitors.

## Banning Flooders

You have to enable the debugging mode of the connector to write the client ip into the web server log every time an attack is detected.
fail2ban can collect this entries and ban clients that are too active in a short period of time.
Be aware though that users can be forced to attack a site without their knowledge by embedding an iframe into another site.
To avoid abuse the ban time should be very short, e.g., 60 seconds.
This is less frustrating for incorrectly banned clients than waiting 60 minutes or longer to get access again and still makes flooding and mass scans by single clients effectively impossible.

First you have to create a fail2ban filter, e.g., */etc/fail2ban/filter.d/shadowd.conf*:

    [INCLUDES]
    before      = common.conf
    [Definition]
    _daemon     = inetd
    failregex   = shadowd: removed threat from client: <HOST>
    ignoreregex =

Next you have to edit the fail2ban configuration to utilize the filter, e.g., append the following code to */etc/fail2ban/jail.local*:

    [shadowd]
    enabled  = true
    filter   = shadowd
    action   = iptables-allports[name=shadowd, protocol=all]
    logpath  = /var/log/lighttpd/error.log
    maxretry = 3
    bantime  = 60
    findtime = 60

Do not forget to change *logpath*.
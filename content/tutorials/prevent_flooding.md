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

If you want to prevent automated mass scans and flooding of the logs you can use fail2ban to temporarily ban attackers.

## Prerequisites

This tutorial assumes that you already have [installed and configured](/overview/shadowd) Shadow Daemon.
The rules should be well-tested and not result in false-positives, otherwise the bans will be very frustrating for your visitors.

## Banning Flooders

You have to enable the debugging mode of the connector to write the client ip into the log file every time an attack is detected.
fail2ban can collect this entries and ban clients that are too active in a short period of time.
Be aware though that users can be forced to attack a site without their knowledge by embedding an iframe into another site.
Thus the ban time should be very short, because this is less frustrating for incorrectly banned clients and still makes flooding and mass scans by single clients effectively impossible.

To use fail2ban in combination with Shadow Daemon you have to create a new filter, e.g., */etc/fail2ban/filter.d/shadowd.conf*:

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
    logpath  = /var/log/shadowd.log
    maxretry = 3
    bantime  = 60
    findtime = 60

Do not forget to change *logpath* to the error log of your web server if you are using the PHP connector.

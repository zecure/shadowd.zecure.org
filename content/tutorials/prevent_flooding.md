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

Some attackers use automated tools that try to find vulnerabilities in web applications by injecting different payloads into every parameter and analyzing the output.
Shadow Daemon will detect a vast majority of this probes, but there are still two problems:
First, Shadow Daemon detects a vast majority, but not necessarily all probes.
It is possible that some parameters are not protected correctly, because of misconfigurations or edge cases.
So if every parameter is checked it is possible that vulnerable parameters are found by the tools.
And second, a mass scan will result in a lot of database entries.
If there are millions of database entries this can decrease the performance of the firewall.

Luckily it is easy to prevent automated mass scans and flooding of the logs by using *fail2ban* to temporarily ban very active attackers.

## Prerequisites

This tutorial assumes that you already have [installed and configured](/overview/shadowd) Shadow Daemon.
The rules should be well-tested and not result in false-positives, otherwise the bans will be very frustrating for your visitors.

## Banning Flooders

You have to enable the debugging mode of the connector to write the client IP address into the log file every time an attack is detected.
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

## Conclusion

Using fail2ban is a good and resource-friendly way to stop flooding, because banned clients do not reach the web application anymore.
So neither the web application has to do any computation, nor the web application firewall.

Additionally it is a good idea to add a cron job that executes the [clean command](/documentation/user_interface#clean) on a regular basis.
This deletes old database entries that are not required anymore and makes room for new data.

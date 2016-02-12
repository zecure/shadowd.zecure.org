---
date: 2016-01-20
menu:
  main:
    parent: tutorials
title: Honeypots
longtitle: How to turn Shadow Daemon into a Honeypot?
weight: 20
---

## Introduction

Today, many open source honeypot systems are available which focus on web attacks.
Most web honeypots are well-suited to attract malicious clients and protocol their behaviour if they decide to attack, but they fail at one critical task.
They are not convincing targets, thus some clients will not even start to attack after inspecting the output of the honeypots.
In comparison to more traditional network services a dynamic web application discloses a lot of information, e.g., it is easy to see and test if a bulletin board or a blog is in active use or not.
The existing web honeypots are using applications that are not in active use and thus they are not interesting targets.
Emulated web applications are even less interesting.
They look and behave very artificial and can be detected easily.
As a result of that the existing solutions are mainly suited to gather information about trustworthy self-propagating malware, the low hanging fruits.
This is only a fraction of all attacks though and thus the gathered data is incomplete and not conclusive.
To compensate for this problems a system is required that can detect and record malicious requests on production servers, because a real target is the only convincing target.
The gathered information are more meaningful and suitable for studies, because they are not distorted.

By default Shadow Daemon acts as a web application firewall and blocks malicious requests, but it was also designed to be used as a high-interaction honeypot.
With some simple modifications to the configuration files the protections can be disabled and the system hides in the shadows.

## Prerequisites

This tutorial assumes that you have already [installed]({{< ref "overview/shadowd.md" >}}) and [configured]({{< ref "tutorials/rules.md" >}}) Shadow Daemon and the web application you want to observe.

## Configuration

### Connector

You should enable [observe]({{< ref "documentation/connectors.md#observe" >}}) in the configuration file of your connector.
This setting makes sure that Shadow Daemon has no effect on requests.
In other words, it turns on the read-only mode to make it as hard as possible for attackers to detect the honeypot.
Even errors will not result in an unusable application.

### User interface

If your web application is a pure honeypot you should completely disable the flooding protection for the corresponding profile.
This is not a good idea for production systems though, because large quantities of parallel attacks that have to be stored in the database could drastically slow down the application.
You should still consider to loosen up the flooding protection and allow more attacks than the default configuration, e.g., 5 attacks every 10 seconds.
After all, you don't want to miss important bits of an attack just because there were a few too many requests.

### Shadowd

If your web application is a pure honeypot you should also consider disabling the parameter limitations *max-parameters*, *max-length-path* and *max-length-value* in the configuration file of shadowd.
In any case it is a good idea to at least increase the values and thus make it less likely to miss attacks.

## Conclusion

As you can see using Shadow Daemon as a honeypot is very easy.
All you have to do is to disable the protections and you end up with a passive system that only monitors attacks.
The user interface makes it possible to sift through a large amount of data and find the interesting information in seconds.
You can also combine Shadow Daemon with other honeypot systems and integrate it into honeynets as an additional source of information.

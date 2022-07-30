---
date: 2016-08-15
menu:
  main:
    parent: getting started
title: Introduction
longtitle: Shadow Daemon Open-Source Web Application Firewall
weight: 5
---

<img id="logo" src="/img/logo_small.png" />

## What is Shadow Daemon?

*Shadow Daemon* is a collection of tools to *detect*, *record*, and *block* *attacks* on *web applications*.
Technically speaking, Shadow Daemon is a *web application firewall* that intercepts requests and filters out malicious parameters.
It is a modular system that separates web application, analysis, and interface to increase security, flexibility, and expandability.

Shadow Daemon is <a target="_blank" href="https://www.gnu.org/philosophy/free-sw.html">free software</a>. It is released under the license [GPLv2]({{< ref "about/license.md" >}}), so it is open source and the code can be examined, modified, and distributed by everyone.

## What differentiates Shadow Daemon?

### Ease of use

Shadow Daemon is easy to install and can be managed with a clear and structured web interface that lets you examine attacks in great detail.

The interface also comes with shell scripts that can be used to send weekly reports via e-mail, rotate the logs, and the like.

{{% note title="Try out the demo!" type="info" %}}
Shadow Daemon monitors and protects the Wordpress blog <a target="_blank" href="http://zecure.me/">zecure.me</a>.
You can try out its web interface at <a target="_blank" href="https://demo.shadowd.zecure.org/">demo.shadowd.zecure.org</a>.
{{% /note %}}

### High coverage

Shadow Daemon uses small connectors on application level to intercept requests.
This guarantees that the analyzed data is exactly the same as the input data of the web application, a task many firewalls fail to do properly.
The installation of the connectors is easy and does not require coding abilities.

At the moment the following programming languages, libs, and frameworks are supported:

 * PHP
 * Perl
   * CGI
   * Mojolicious
   * Mojolicious::Lite
 * Python
   * CGI
   * Django
   * Werkzeug
   * Flask

Additional connectors are planned and will be released at some point in the future.
If you want to [contribute]({{< ref "development/contributing.md" >}}) why not develop a new [connector]({{< ref "documentation/connectors.md" >}})?

### Accurate detection

Shadow Daemon combines [blacklisting]({{< ref "documentation/blacklist.md" >}}), [whitelisting]({{< ref "documentation/whitelist.md" >}}), and [integrity checking]({{< ref "documentation/integrity.md" >}}) to accurately detect malicious requests.
The blacklist makes use of sophisticated regular expressions to search for known attack patterns in the user input.
The whitelist on the other hand searches for irregularities in the user input based on strict rules that define how the input should look like.
The integrity check compares cryptographically secure checksums of the executed scripts against predefined values.

Together they can detect almost any attack on a web application and still have a very low false-positive rate.

Shadow Daemon is able to detect common attacks like:

 * SQL injections
 * XML injections
 * Code injections
 * Command injections
 * Cross-site scripting
 * Local/remote file inclusions
 * Backdoor access
 * And more ...

### Discreet protection

Unlike many other web application firewalls Shadow Daemon does not completely block malicious requests if possible.
Instead it only filters out the dangerous parts of a request and lets it proceed afterwards.
This makes attacks impossible, but does not unnecessary frustrate visitors in the case of false-positives.

### Secure architecture

Shadow Daemon is closer to the application than most other web application firewalls.
It receives *exactly* the same input that the web application receives and thus it is almost impossible to bypass the detection by obfuscating the attack.
However, the most complex parts of Shadow Daemon are separated from the web application to guarantee a certain standard of security.

## How do I install Shadow Daemon?

*Getting Started* contains everything you need to know. Start by reading [shadowd]({{< ref "overview/shadowd.md" >}}).
Installing Shadow Daemon is easy and only takes some minutes, really.

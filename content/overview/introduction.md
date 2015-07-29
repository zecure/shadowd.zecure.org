---
date: 2015-01-01
menu:
  main:
    parent: getting started
title: Introduction
weight: 5
---

## What is Shadow Daemon?

*Shadow Daemon* is a collection of tools to *detect*, *protocol* and *prevent* *attacks* on *web applications*.
Technically speaking, Shadow Daemon is a *web application firewall* that intercepts requests and filters out malicious parameters.
It is a modular system that separates web application, analysis and interface to increase security, flexibility and expandability.

Shadow Daemon is [free software](https://www.gnu.org/philosophy/free-sw.html). It is released under the license [GPLv2]({{< ref "about/license.md" >}}), so its source code can be examined, modified and distributed by everyone.

## What differentiates Shadow Daemon?

### Ease Of Use

Shadow Daemon is easy to install and can be managed with a clear and structured web interface.
The interface lets you examine attacks in great detail.
If you just want to protect your site, but otherwise do not care about attacks you can forget about the web interface once Shadow Daemon is installed and configured.
The interface also comes with shell scripts that can be used to send weekly reports via e-mail, rotate the logs and the like.

{{% note title="Try out the demo!" type="info" %}}
Shadow Daemon monitors and protects the blog <a target="_blank" href="http://zecure.me/">zecure.me</a>.
You can try out its web interface at <a target="_blank" href="https://demo.shadowd.zecure.org/">demo.shadowd.zecure.org</a>.
{{% /note %}}

### High Coverage

Shadow Daemon strives to be a single solution for all popular web languages.
At the moment the following programming languages are supported:

 * PHP
 * Perl
 * Python

Additional connectors are planned and will be released at some point in the future.
If you want to [contribute]({{< ref "development/contributing.md" >}}) why not develop a new [connector]({{< ref "documentation/connectors.md" >}})?

### Accurate Detection

Shadow Daemon combines [white- and blacklisting]({{< ref "documentation/architecture.md#analyzer" >}}) to accurately detect malicious requests.
The blacklist makes use of sophisticated regular expressions to search for known attack patterns in the user input.
The whitelist on the other hand searches for irregularities in the user input based on strict rules that define how the input should look like.
Together they can detect almost any attack on a web application and still have a very low false-positive rate.

Shadow Daemon is able to detect common attacks like:

 * SQL Injections
 * XML Injections
 * Code Injections
 * Command Injections
 * Cross-Site Scripting
 * Local/Remote File Inclusions
 * Backdoor Access
 * And more ...

### Discreet Protection

Unlike many other web application firewalls Shadow Daemon does not completely block malicious requests.
Instead it only filters out the dangerous parts of a request and lets it proceed afterwards.
This makes attacks impossible, but does not unnecessary frustrate visitors in the case of false-positives.

### Secure Architecture

Shadow Daemon is closer to the application than most other web application firewalls.
It receives exactly the same input that the web application receives and thus it is almost impossible to bypass the detection by obfuscating the attack.
However, the most complex parts of Shadow Daemon are separated from the web application to guarantee a certain standard of security.

## Who should use Shadow Daemon?

Shadow Daemon is for people who want to run their own dynamic website without constantly having to worry about attacks and vulnerabilities.

Shadow Daemon is for people who want to know if and how their website is attacked.

Shadow Daemon is for people who do not want to blindly place their trust in closed-source software that does its work in secret and costs a fortune.

## How do I install Shadow Daemon?

*Getting Started* contains everything you need to know. Start by reading [shadowd]({{< ref "overview/shadowd.md" >}}).
Installing Shadow Daemon is easy and only takes some minutes, really.

## How can I follow the development of Shadow Daemon?

The development of Shadow Daemon takes place at [Github](https://github.com/zecure).
Announcements are published via [Twitter](https://twitter.com/zecureit).
Make sure to star/follow to stay up to date.


<figure class="intro-icon">
 <a href="https://github.com/zecure">
  <img src="/img/octocat.png" height="100px" />
  <figcaption><h4>Github</h4></figcaption>
 </a>
</figure>

<figure class="intro-icon">
 <a href="https://twitter.com/zecureit">
  <img src="/img/twitter.png" height="90px" />
  <figcaption><h4>Twitter</h4></figcaption>
 </a>
</figure>

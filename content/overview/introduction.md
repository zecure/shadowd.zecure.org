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

Shadow Daemon is [free software](https://www.gnu.org/philosophy/free-sw.html). It is released under the license [GPLv2](/about/license), so its source code can be examined, modified and distributed by everyone.

## What does Shadow Daemon do?

### Modularity

Shadow Daemon separates tasks into three categories:

 * Analysis and storage of requests with *shadowd*
 * Management of shadowd with *user interfaces*
 * Communication between web applications and shadowd with *connectors*

Interfaces and connectors can be replaced by other modules that speak the same protocol, so it is easy to extend the functionality of Shadow Daemon.

### Attack Detection

Shadow Daemon combines [white- and blacklisting](/documentation/architecture) to deliver the best detection results.
The blacklist makes use of the sophisticated PHPIDS filters and searches for known attack patterns in the user input.
The whitelist on the other hand searches for irregularities in the user input based on strict rules that define how the input should look like.
Together they can detect almost any attack on a web application and still have a very low false-positive rate.
Both systems are optional, e.g., it is possible to disable the whitelist and only rely on the blacklist to simplify the installation.

### Web Interface

Shadow Daemon can be managed with a clear and structured web interface.
The interface lets you examine attacks in great detail.
Discover the techniques, vulnerabilities and goals of your attackers!
Keep in mind that this is optional, you do not have to use it.
If you just want to protect your site, but otherwise do not care about attacks you can forget about the web interface once Shadow Daemon is installed and configured.

<div class="note info">
<h1>Try out the demo!</h1>
<p>Shadow Daemon monitors and protects the blog <a target="_blank" href="http://zecure.me/">zecure.me</a>.
You can try out its web interface at <a target="_blank" href="https://demo.shadowd.zecure.org/">demo.shadowd.zecure.org</a>.</p>
</div>

Command line and other interfaces are planned, but have a low priority.

### Supported Languages

At the moment there are Shadow Daemon connectors for the following programming languages:

 * PHP
 * Perl
 * Python

Additional connectors are planned and will be released at some point.
If you want to [contribute](/development/contributing) why not develop a new [connector](/documentation/connectors)?

## What differentiates Shadow Daemon?

Shadow Daemon is closer to the application than most other web application firewalls.
It receives exactly the same input that the web application receives and thus it is almost impossible to bypass the detection by obfuscating the attack.
Despite its closeness the complex parts are still separated from the targeted application which results in better security than other firewalls that use this approach.

Another important distinction of Shadow Daemon are its attack detection algorithms.
Most web application firewalls use simple keyword or signature based approaches that are either easy to bypass or that have a lot of false-positives.
Shadow Daemon uses a keyword based approach as well, but unlike many other firewalls it does not directly block input that matches a single keyword.
Instead its algorithm makes use of a dynamic threshold that allows to adjust the sensitivity of attack detection based on the context.
This way it is possible to ensure good attack detection and simultaneously decrease the rate of false-positives.

Shadow Daemon also makes use of an algorithm that detects abnormalities in request.
This is a well-explored approach to find malicious user input, but is not used in many web application firewalls because of its expenditure.
To reduce the required work as much as possible Shadow Daemon offers many handy tools to manage, generate and reuse rules.

Shadow Daemon also does not completly block malicious requests.
Instead it only filters out the dangerous parts and lets the rest proceed.
This makes attacks impossible and does not unnecessary frustrate visitors in the case of false-positives.

## Who should use Shadow Daemon?

Shadow Daemon is for people who want to run their own dynamic website without constantly having to worry about attacks and vulnerabilities.

Shadow Daemon is for people who want to know if and how their website is attacked to learn from it.

Shadow Daemon is for people who do not want to blindly place their trust in non-free software that does its work in secret.

## How do I install Shadow Daemon?

*Getting Started* contains everything you need to know. Start by reading [shadowd](/overview/shadowd).
Installing Shadow Daemon is easy and only takes some minutes, really.

## How can I follow the development of Shadow Daemon?

The development of Shadow Daemon takes place at [Github](https://github.com/zecure).
Announcements are published via [Twitter](https://twitter.com/zecureit).
Make sure to star/follow to stay up to date.

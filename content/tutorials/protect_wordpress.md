---
date: 2015-01-01
linktitle: Protect Wordpress
menu:
  main:
    parent: tutorials
title: How to protect Wordpress 4.0
weight: 10
---

## Introduction

Installing Shadow Daemon and protecting applications with only the blacklist is easy and requires almost no work.
The blacklist does a decent job at identifying threats with the help of known attack signatures, but its detection is not flawless.
The whitelist can compensate for most of these deficiencies, but unlike the blacklist it is a lot of work to set it up [from scratch](/tutorials/protect_applications).
Luckily in many cases it is not necessary to set it up from scratch.
It is possible to import [existing rules](https://github.com/zecure/shadowd_rules) instead and thus make the configuration of the whitelist child's play.

This tutorial demonstrates how to set up the whitelist with the help of [Wordpress 4.0](https://github.com/zecure/shadowd_rules/tree/master/src/wordpress/4.0).

## Prerequisites

This tutorial assumes that you already have [installed and configured](/overview/shadowd) the Shadow Daemon server and PHP connector.

## Whitelist

First you have to download the rules repository:

    git clone https://github.com/zecure/shadowd_rules.git

Open the Shadow Daemon interface and click on *Whitelist*.
At the bottom of the page there is a button with the caption *Import*.
Click it as well.

{{% figure src="/img/tutorials/wordpress1.jpg" title="Figure 1: Navigating to the whitelist rules import." %}}

To enable the whitelist you have to import two sets.
First import *common/cgi-headers_w.txt*.
Do not forget to select the correct profile.
The base parameter is not used and should be empty.
Next import *wordpress/4.0/wordpress-4.0_w.txt*.
Unlike the server headers this set requires a base, e.g., if the root directory of your blog is at */var/www/blog/* this has to be the base for the set.

{{% figure src="/img/tutorials/wordpress2.jpg" title="Figure 2: Importing the whitelist rules." %}}

Now all the necessary rules are imported, but they are not active yet.
To fix this you should use the mass action functionality at the bottom of the whitelist page.
Simply check the box in the table header and all rules on the page should be selected.
Since Wordpress has a lot of rules it is a good idea to increase the row limit to 1000.

{{% figure src="/img/tutorials/wordpress3.jpg" title="Figure 3: Activating the new rules." %}}

Finally you have to click on *Profiles* and enable the *whitelist* for the desired profile.

<div class="note info">
<h1>Test your rules!</h1>
<p>If you are using plugins or a different version of the blog it is possible that some rules have to be adjusted or added. To not scare away your visitors in such a case you should enable <i>observe</i> in the connector at the beginning of the deployment. This disables the protection and allows you to test the new rules.</p>
</div>

## Conclusion

If there are existing rules for your web application it is not hard to use the whitelist.
And it is worth it, because combined with the blacklist it makes your blog almost unhackable.
If there are no existing rules it is much more work to configure the whitelist, but as you will see in the [next tutorial](/tutorials/protect_applications) Shadow Daemon has some handy helpers to automate this process to a certain degree.


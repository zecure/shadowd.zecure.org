---
date: 2015-01-01
linktitle: Protect Applications
menu:
  main:
    parent: tutorials
title: How to protect custom applications
weight: 15
---

## Introduction

Installing Shadow Daemon and protecting applications with only the blacklist is easy and requires almost no work.
The blacklist does a decent job at identifying threats with the help of known attack patterns, but its detection is not flawless.
The whitelist can compensate for most of these deficiencies, but unlike the blacklist it is a lot of work to set it up from scratch.
Luckily Shadow Daemon is able to generate rules and thus automate this process to a certain degree.

This tutorial explains how you can create whitelist rules for arbitrary web applications with the help of the learning mode and the generator.

## Prerequisites

This tutorial assumes that you already have [installed and configured]({{< ref "overview/shadowd.md" >}}) the Shadow Daemon server and the appropriate connector.

## Generation

Open the Shadow Daemon interface and click on *Profiles*.
Enable the learning mode for the profile of your choice, but be aware that this disables the protection.
When the learning mode is enabled every request is saved in the database, no matter if it contains threats or not.
This data is used by the generator to create rules based on statistics and probability, e.g., if a certain input is an integer value 99% of the time it is likely that it always should be an integer value.
Logically this means that the result of the generator is only good if the learning data is sufficient.
It is recommended that the learning mode stays enabled for multiple days, but this heavily depends on how complex the web application is and how many visitors you have.
The more data you have, the better are the results.

{{% figure src="/img/tutorials/application1.jpg" title="Figure 1: Enabling the learning mode." %}}

Once you think that you have enough data click on *Whitelist* and *Generator* on the bottom.
The generator interface lets you change some of the thresholds, but the default values should be acceptable.
If you want to know more about the generator settings have a look at the documentation.
To start the process click on *Generate*.
This should redirect you to the whitelist table again.

{{% figure src="/img/tutorials/application2.jpg" title="Figure 2: Generating new rules." %}}

The new rules are pending and have to be enabled.
To do this you should use the mass action functionality at the bottom of the whitelist page.
Simply check the box in the table header and all rules on the page should be selected.
If some of the new rules are in conflict with existing rules this is displayed in the table.
You should fix conflicts before activating the new rules.

Finally you have to click on *Profiles* and enable the *whitelist* for the desired profile.

{{% note title="Test your rules!" type="info" %}}
It is possible that some rules have to be adjusted or added.
To not scare away your visitors in such a case you should enable [observe]({{< ref "documentation/connectors.md#observe" >}}) in the connector at the beginning of the deployment.
This disables the protection and allows you to test the new rules.
{{% /note %}}

If the rules are tested and working well you should also delete the training data of the profile to clean up the database.

## Conclusion

The generation of rules takes some time, but it is not very difficult.
How much time it takes and how difficult it is depends on the complexity of the web application.

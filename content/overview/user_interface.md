---
date: 2018-01-28
menu:
  main:
    parent: getting started
    Identifier: AboutUserInterface
title: User Interface
longtitle: Getting Started with the Shadow Daemon User Interface
weight: 30
---

## Usage {#usage}

Go to the web interface and log in with your admin user.
By default you can reach it at port 8080, for example [http://127.0.0.1:8080](http://127.0.0.1:8080) if it is running on localhost.

<img src="/img/overview/ui_add_profile1.png" title="Profiles" />

Navigate to *Management*, *Profiles*, and click the *Add* button at the bottom of the page.
Use the form to add a new profile.
The default values should be reasonable for most new installations.
The only required values that are not added by default are the *name* and the *key*.

 * You can set the *IP* address of the connector to only allow connections to `shadowd` from this source.
  * **Important:** If you use `shadowdctl` keep the default value `*` (allow all) because `shadowd` is started in a virtual network and does not receive the real addresses of its clients by default.
 * You have to add a *name* for the profile.
 * You have to add a secure and unique *key* to authorize requests from connectors.
  * The key has to be added to the configuration file of the connector later on.
 * You should set the mode to *passive* for now until you are sure that the system works correctly.
  * In passive mode `shadowd` will never tell a connector to modify or stop a request.
 * You should disable the *whitelist* and *integrity* checks for now because they need well-fitting rules to work.
 * You can enable the *blacklist* and *flooding* checks, because they are instantly ready for use.
  * The [blacklist]({{< ref "documentation/blacklist.md" >}}) checks user input for malicious patterns and compares their total impact to the threshold.
  * The flooding protection limits the amount of *attacks* that are stored and analyzed by Shadow Daemon. It does not count non-malicious requests.

<img src="/img/overview/ui_add_profile2.png" title="Profile" />

{{% note title="What is a good blacklist threshold?" type="info" %}}
If the threshold of the blacklist is too low there will be lots of false-positives.
If the threshold is too high it might miss some attacks.
Normally a good (secure) threshold lies between 5 and 10.
You should start with a low global value and only increase it over time if there are way too many false-positives.
If there are only single exceptions it is best to add blacklist rules that allow you to increase the threshold for very specific input.
{{% /note %}}

## What's next?

You have to install connectors ([PHP]({{< ref "overview/php_connector.md" >}}), [Perl]({{< ref "overview/perl_connector.md" >}}), [Python]({{< ref "overview/python_connector.md" >}})) to connect your web applications with shadowd.

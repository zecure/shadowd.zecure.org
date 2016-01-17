---
date: 2016-01-01
menu:
  main:
    parent: tutorials
title: Rules
longtitle: How to create Shadow Daemon rules?
weight: 10
---

## Introduction

Shadow Daemon requires good rules to work properly.
The rules differ from application to application, so there is no universal solution.
Creating rules is not hard though and this tutorial shows you how it is done.

{{% note title="Test your rules!" type="info" %}}
When working on rules you should always enable the *passive* mode for the corresponding profile.
This disables the protection and allows you to observe and adjust your new rules without breaking the site in the case of misconfigurations.
Do not switch back to the *active* mode until you are sure that your rules work properly.
{{% /note %}}

## Repository

Before you start investing time in the creation of new rules you should check if somebody else already made rules for your application.
The official repository for Shadow Daemon rules is located at [zecure/shadowd_rules](https://github.com/zecure/shadowd_rules).
Feel free to submit your own rules as well.
The more people do this, the less work it becomes to properly set up the firewall.

The rules can be imported via the web interface.
You should still test them before activating the protection, because there could be mismatches caused by plugins, different languages and similar things.

## Blacklist

Blacklist rules are used to overwrite the global threshold for specific user input.
The necessity for this is obvious: the more content user input contains, the more likely it becomes that the blacklist detects non-existent attacks.
For example, the blacklist detects certain combinations of words that are used for SQL injections, but the same combinations could occur in a normal text.
The blacklist searches for `UNION ... SELECT` and `SELECT ... FROM` to detect attacks like *"UNION SELECT name,pass FROM users"*, but the same patterns would match the text *"Start an union and select representatives from the employees"*.

To compensate for this you can add exceptions for the (normally very few) parameters in a web application that contain huge amounts of user input and thus are more likely to generate false-positives.
This way you can have a low global threshold to make sure that even obfuscated attacks are detected most of the time and still eliminate a vast majority of false-positives.
You can easily identify such parameters by submitting multiple examples from the [blacklist documentation]({{< ref "documentation/blacklist.md#filters" >}}) at once and thus trigger the blacklist intentionally.

## Whitelist

Whitelist rules are used to define which user input is allowed and how this input should look like.
This approach has a big advantage compared to the blacklist, but also a big disadvantage.
For one it is impossible to bypass the check if the rules are tight.
It does not need information about attack techniques and it never outdates.
On the other hand it can be a lot of work to set it up.
Modern web applications have a lot of parameters and every one of them requires a correct rule.
Because of this it is not recommended to add the rules by hand.
Instead use the [generator]({{< ref "#generator" >}}) to create rules out of learning data and only fix incorrect or missing rules by hand.

## Integrity

Integrity rules are used to define which checksums are allowed and what this checksums should be, so it is also using a whitelisting approach.
This is the reason why it is recommended to use the [generator]({{< ref "#generator" >}}) to create rules out of learning data.

## Generator

The generator is a handy tool to turn learning data into rules.
The results are not perfect, but if you have good data they are not bad either.
In practise this means that it is often necessary to improve the generated rules by hand, but you still save most of the work.
To collect learning data you have to enable the *learning* mode of the desired profile, but be aware that this saves every request in the database.

The generator has [settings]({{< ref "documentation/user_interface.md#generator" >}}) that allow you to influence the results.
Some settings produce secure rules, while other settings produce insecure rules.
On the other hand, the secure rules are more likely to be incomplete, while insecure rules tend to include most of the input.
So there is a trade-off and you have to choose: Better security or less work?
There are predefined profiles that reflect this settings.
The default profile - moderate security - is pretty secure and results in an acceptable amount of work, so it is recommended to keep this setting.

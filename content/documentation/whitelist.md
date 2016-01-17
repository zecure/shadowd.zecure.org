---
date: 2016-01-01
menu:
  main:
    parent: documentation
    Identifier: DocumentationWhitelist
title: Whitelist
longtitle: The whitelist algorithm and filters of Shadow Daemon
weight: 12
---

## Description

The whitelist algorithm is one of the three methods of Shadow Daemon to identify malicious requests.
It compares user input to rules that specify how the input should look like.

## Layout

![Flowchart Whitelist](/img/documentation/whitelist.svg)

The whitelist algorithm does multiple things.
First it checks if the parameter has a rule.
The term whitelist implies that every parameter requires a matching rule, otherwise it is considered a threat.
If there is a rule the algorithm checks if the rule has a length restriction and if the restriction is adhered to.
Finally the algorithm tests the character set of the input with the help of regular expressions.

## Filters

The following character set filters for the whitelist are available (case-insensitive):

|Name|Characters|
|---|---|
|Numeric|0123456789|
|Numeric (Extended)|-0123456789.,|
|Hexadecimal|0123456789abcdef|
|Alphanumeric|0123456789abcdefghijklmnopqrstuvwxyz|
|Base64|0123456789abcdefghijklmnopqrstuvwxyz=+/\s|
|Special Characters|0123456789abcdefghijklmnopqrstuvwxyz.,:-+_\s|
|Everything|*Absolutely everything*|

Direct user input always has to be checked with the filter *everything*.
Only use the other, secure filters for input that always matches the same regular expression, e.g., passive user input like ids or category identifiers.

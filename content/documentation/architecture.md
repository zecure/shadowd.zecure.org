---
date: 2015-01-01
menu:
  main:
    parent: documentation
    Identifier: DocumentationArchitecture
title: Architecture
weight: 10
---

## Layout

The following diagram represents the layout and communication of Shadow Daemon.
The PHP connector is used as an example, other connectors behave accordingly.

![Layout](/img/documentation/layout.png)

The connector is executed every time a client requests a PHP file.
It establishs a TCP connection with the server and transmits the client ip, the caller and the user input.
The server processes and analyzes the data and returns the identifiers of dangerous input.
The connector uses the identifiers to defuse all threats and the originally requested PHP script is executed.

## Analyzer

### Blacklist

![Flowchart Blacklist](/img/documentation/blacklist.png)

The blacklist uses regular expressions to identify known attack patterns.
Every filter has a numerical impact that tries to specify the dangerousness and its unambiguity.
The impacts of all matching filters are aggregated and compared to a threshold.
If the total impact is greater than the threshold the input is classified as a threat.

### Whitelist

![Flowchart Whitelist](/img/documentation/whitelist.png)

The whitelist does multiple things.
First it checks if the input has a rule.
The term whitelist implies that every input requires a matching rule, otherwise the input is considered a threat.
If there is a rule the whitelist checks if the rule has a length restriction and if the restriction is adhered to.
Finally the whitelist tests the character set of the input with the help of regular expressions.

---
date: 2016-01-01
menu:
  main:
    parent: documentation
    Identifier: DocumentationIntegrity
title: Integrity
weight: 13
---

The integrity algorithm is one of the three methods of Shadow Daemon to identify malicious requests.
It compares cryptographically secure checksums of the executed script to rules that specify what the checksums should be.

# Layout

![Flowchart Whitelist](/img/documentation/integrity.svg)

The integrity algorithm also uses a whitelisting approach.
First it checks if the request has a rule.
The term whitelist implies that every request requires a matching rule, otherwise it is considered a threat.
If there is a rule the algorithm checks if the request has a digest for it.
Finally the algorithm tests if the digest of the request matches the digest of the rule.

# Security

Be aware that the integrity check only validates the integrity of the executed script, but not the integrity of dynamically included code.
The purpose of this check is to prevent the execution of unintended scripts in CGI-like environments like PHP, not to make code injections completely impossible.

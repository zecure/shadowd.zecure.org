---
date: 2022-11-28
menu:
  main:
    parent: documentation
    Identifier: DocumentationArchitecture
title: Architecture
longtitle: Architecture of Shadow Daemon
weight: 10
---

## Layout

Shadow Daemon intercepts requests after they are parsed by the target language or framework but before they are processed by the target application.
This is achieved by loading a small module, called a connector, in the application that forwards the user input and other relevant information about the request to the shadowd server.
The server processes and analyzes the data with the [blacklist]({{< ref "documentation/blacklist.md" >}}), [whitelist]({{< ref "documentation/whitelist.md" >}}) and [integrity]({{< ref "documentation/integrity.md" >}}) check and returns the identifiers of dangerous input.
The connector uses the identifiers to defuse all threats and the originally requested resource is loaded.

![Layout](/img/documentation/layout.svg)

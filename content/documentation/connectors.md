---
date: 2015-01-01
menu:
  main:
    parent: documentation
title: Connectors
weight: 30
---

## Description

## Configuration

### Ignore {#ignore}

The ignore file can be used to *not* send specific user input to the Shadow Daemon server.
It is a security feature that should be used to protect very sensitive input, e.g., passwords.

An ignore file contains a JSON encoded list of dictionaries.
Every entry needs a caller and/or a path, i.e.:

    [
      {"caller": "..."},
      {"path": "..."},
      {"caller": "...", "path": "..."}
    ]

---
date: 2022-11-28
menu:
  main:
    parent: documentation
    Identifier: DocumentationProtocol
title: Protocol
longtitle: Network Protocol of Shadow Daemon
weight: 11
---

## Description

A TCP-based plain text protocol is used for the communication between the connectors and shadowd.

### Request

The server expects a numerical id, an alphanumerical hash and JSON encoded data.
Every value is separated by a single newline character and the server closes the connection after the third newline character.
The server closes the connection prematurely though if the profile id is not numerical or if the hash is not alphanumerical.

    profile_id
    sha256_hmac(json_data)
    json_data

The following JSON structure is expected, but without the additional newlines that are added here for readability.

    {
        "version": "...",
        "client_ip": "...",
        "caller": "...",
        "resource": "...",
        "input": {
            "...": "..."
        },
        "hashes": {
            "...": "..."
        }
    }

The dictionary *input* contains identifiers/pathes and the associated values of all user input.
The dictionary *hashes* contains algorithms and the associated values of the executed script file.

### Response

The server sends the following response, but without the additional newlines that are added here for readability.

    {
        "status": ...,
        "threats": [
            "..."
        ]
    }

The integer *status* is one of the following values:

 * OK: 1
 * BAD_REQUEST: 2
 * BAD_SIGNATURE: 3
 * BAD_JSON: 4
 * ATTACK: 5
 * CRITICAL_ATTACK: 6

The array *threats* contains the identifiers/pathes of tagged user input.

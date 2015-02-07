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

## Protocol {#protocol}

The following network protocol is used for the communication between the connectors and shadowd.

### Request

The server expects a numerical id, an alphanumerical hash and JSON encoded data.
Every value is separated by a single newline character and the server closes the connection after the third newline character.
The server closes the connection prematurely though if the profile id is not numerical or if the hash is not alphanumerical.

    profile id
    sha256_hmac(json_data)
    json_data

The following JSON structure is expected, but without the additional newlines that are added here for readability.

    {
        "version": "...",
        "client_ip": "...",
        "caller": "...",
        "input": {
            "...": "..."
        }
    }

The dictionary *input* contains identifiers/pathes and the associated values of all user input.

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

The array *threats* contains the identifiers/pathes of tagged user input.

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

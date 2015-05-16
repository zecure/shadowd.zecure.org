---
date: 2015-01-01
menu:
  main:
    parent: about
title: Changelog
weight: 10
---

## Shadowd {#shadowd}

### **1.1.3** May 16, 2015

The last performance improvement introduced a small bug in the storage queue. If many requests are pushed to the storage queue at the same time it is possible that a small percentage of them are not saved permanently. This is not a critical bug, but it still should not happen.

 * Fixed bug in storage queue
 * Improved flooding database queries to allow to disable check

### **1.1.2** May 02, 2015

This update introduces two non-critical patches:

 * Replaced sleep in storage consumer thread with condition variable to improve performance
 * Added mutex for log just in case

### **1.1.1** Apr. 08, 2015

This update fixes a minor bug in the storage queue:

 * Added graceful shut down for storage thread

### **1.1.0** Mar. 26, 2015

This update improves the performance and attack detection:

 * Added native flood protection
 * Optimized storage with a queue and database modifications
 * Revised blacklist filters

### **1.0.0** Jan. 18, 2015

 * Added blacklist rules to overwrite default threshold
 * Added switch for whitelist and blacklist in the profile
 * Decoupled whitelist from learning
 * Enhanced debugging messages

## User Interface {#user_interface}

### **1.2.0** May 16, 2015

This update does not change any major things in the interface, but it should make the overall experience much more enjoyable.

 * Added validation groups and improved ui layout and behaviour
 * Added reasons (why the request is a threat) to requests list
 * Added default values for threshold and length in rules forms
 * Lowered the default blacklist threshold
 * Deactivated learning and whitelist by default

### **1.1.0** Mar. 26, 2015

 * Added flood protection to profile
 * Simplified whitelist rules generation
 * Fixed some minor bugs

### **1.0.1** Jan. 30, 2015

 * Updated link to documentation
 * Updated the register command

### **1.0.0** Jan. 18, 2015

 * Added blacklist rules to overwrite default threshold
 * Added import and export for blacklist rules
 * Added import and export for whitelist rules
 * Added switch for whitelist and blacklist in the profile
 * Added command to e-mail report
 * Added command to clean database

## PHP Connector {#php_connector}

### **1.0.0** Jan. 18, 2015

 * Restructured code
 * Added extended ignore function

## Perl Connector {#perl_connector}

### **1.0.0** Jan. 18, 2015

 * Initial release

## Python Connector {#python_connector}

### **1.2.0** May. 05, 2015

This update improves old and adds new Python connectors:

 * Added werkzeug support
 * Added Flask support
 * Improved threat removal in Django connector

### **1.1.0** Feb. 03, 2015

 * Added Django support

### **1.0.0** Jan. 18, 2015

 * Initial release

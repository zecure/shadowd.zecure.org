---
date: 2015-01-01
menu:
  main:
    parent: about
title: Changelog
weight: 10
---

## Shadowd

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

## User Interface

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

## PHP Connector

### **1.0.0** Jan. 18, 2015

 * Restructured code
 * Added extended ignore function

## Perl Connector

### **1.0.0** Jan. 18, 2015

 * Initial release

## Python Connector

### **1.1.0** Feb. 03, 2015

 * Added Django support

### **1.0.0** Jan. 18, 2015

 * Initial release

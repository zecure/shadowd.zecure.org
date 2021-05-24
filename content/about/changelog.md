---
date: 2021-05-24
menu:
  main:
    parent: about
title: Changelog
longtitle: Changes in the Official Shadow Daemon Modules
weight: 10
---

## Shadowd {#shadowd}

### **2.1.0** May. 24, 2021

 * Add additional error messages to the reply to help identify problems

### **2.0.2** Sep. 06, 2020

 * Enable PIE
 * Refactor tests for newer Boost versions

### **2.0.1** Mar. 06, 2016

This update fixes a critical bug that is caused by null-bytes.
You can find more information about the update in [this](http://blog.zecure.org/post/shadowd_2.0.1/) blog post.

### **2.0.0** Jan. 11, 2016

 * Added integrity check
 * Replaced blacklist filters with completely new filters
 * Added cache for database access
 * Added security limitations for requests and parameters
 * Updated signature code to use timing independent comparison
 * Removed unnecessary indices from database
 * Replaced wildcards with stored procedures
 * Added wildcard support to profile server ip
 * Changed model structure
 * Added resource to request
 * Replaced learning with more general mode
 * Added unit tests
 * Added Travis-CI integration
 * Added const-correctness

### **1.1.3** May 16, 2015

The last performance improvement introduced a small bug in the storage queue.
If many requests are pushed to the storage queue at the same time it is possible that a small percentage of them are not saved permanently.
This is not a critical bug, but it still should not happen.

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

### **2.0.4** Nov 16, 2019

* Update dependencies because of CVE-2019-10909 (precautionary, no expected impact)

### **2.0.3** Nov 09, 2019

* Optimize code to access last request

### **2.0.2** Jan 03, 2018

* Integerated demo system
* Manually check filters if request is not GET

### **2.0.1** May 16, 2016

This patch release fixes quite a lot (non-critical) bugs.

* Fixed last attack filter name
* Fixed home table position
* Renamed last attack to last request
* Fixed naming collisions of filter subselects
* Fixed wrong bind name for date-exclude filters in request
* Fixed wrong table name in getExcludeBrokenIntegrityRule
* Replaced outdated include-path method in blacklist export
* Replaced outdated threshold column in profile
* Changed profile mode filter to dropdown
* Get jQuery via https (Composer)
* Delete a user even when there are no settings

### **2.0.0** Jan. 11, 2016

 * Added more advanced filter system for data
 * Replaced filter shortcuts
 * Updated profile defaults to less error-prone values
 * Replaced learning with more general mode
 * Added resource to request
 * Replaced icons with Font Awesome
 * Updated themes and layout
 * Added localization support
 * Added Chinese, Dutch and German translations
 * Added right-to-left support
 * Added integrity rules
 * Updated and improved rules generator
 * Added conflicts for blacklist and integrity rules
 * Added cache integration and invalidation
 * Added new logo to home page
 * Simplified configuration by removing dev parameters
 * Updated export file names
 * Fixed date update in quick actions

### **1.2.1** Oct. 06, 2015

This update fixes a small bug that happens in certain situations with PHP versions prior to 5.5.

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

### **2.1.0** May. 24, 2021

This update adds proper error pages instead of a generic error.

**Warning:**

  * Instead of `src/Connector.php` now the file `shadowd.php` has to be auto-loaded
  * Composer has to be used to initialize the connector unless the prepared distribution is used

### **2.0.2** Apr. 19, 2016

This update acknowledges $_COOKIE in $_REQUEST when removing threats.

### **2.0.1** Jan. 27, 2016

shadowd_php uses `spl_autoload_register`. As a result of that `__autoload` is not called anymore.

 * Added fix for __autoload

### **2.0.0** Jan. 11, 2016

 * Added resource to request data
 * Added hashes for integrity check
 * Added critical attacks
 * Added request variable to cleansing
 * Changed cleansing to remove variables instead of clearing them
 * Added the names of file uploads to user input
 * Added raw user input
 * Updated the code structure
 * Added unit tests
 * Added Travis-CI integration
 * Fixed bug with ssl connections
 * Added error message for corrupted ignore files

### **1.0.0** Jan. 18, 2015

 * Restructured code
 * Added extended ignore function

## Perl Connector {#perl_connector}

### **2.0.0** Jan. 11, 2016

 * Added resource to request data
 * Added hashes for integrity check
 * Added critical attacks
 * Added unit tests
 * Added Travis-CI integration
 * Added file upload support

### **1.0.0** Jan. 18, 2015

 * Initial release

## Python Connector {#python_connector}

### **2.0.0** Jan. 11, 2016

 * Added resource to request data
 * Added hashes for integrity check
 * Added critical attacks
 * Added unit tests
 * Added Travis-CI integration
 * Added file upload support

### **1.2.0** May. 05, 2015

This update improves old and adds new Python connectors:

 * Added werkzeug support
 * Added Flask support
 * Improved threat removal in Django connector

### **1.1.0** Feb. 03, 2015

 * Added Django support

### **1.0.0** Jan. 18, 2015

 * Initial release

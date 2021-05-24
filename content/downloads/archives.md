---
date: 2021-05-24
menu:
  main:
    parent: downloads
title: Archives
longtitle: Files and Archives of Shadow Daemon
weight: 10
---

Official projects of Shadow Daemon are hosted at *shadowd.zecure.org* and *github.com/zecure*.

# Current {#current}

## Shadowd {#shadowd}

 * https://shadowd.zecure.org/files/shadowd-2.1.0.tar.gz
 * https://shadowd.zecure.org/files/shadowd-2.1.0.tar.gz.DIGESTS
 * https://shadowd.zecure.org/files/shadowd-2.1.0.tar.gz.DIGESTS.asc

## User Interface {#user_interface}

 * https://shadowd.zecure.org/files/shadowd_ui-2.0.4.tar.gz
 * https://shadowd.zecure.org/files/shadowd_ui-2.0.4.tar.gz.DIGESTS
 * https://shadowd.zecure.org/files/shadowd_ui-2.0.4.tar.gz.DIGESTS.asc

## PHP Connector {#php_connector}

 * https://shadowd.zecure.org/files/shadowd_php-2.1.0.tar.gz
 * https://shadowd.zecure.org/files/shadowd_php-2.1.0.tar.gz.DIGESTS
 * https://shadowd.zecure.org/files/shadowd_php-2.1.0.tar.gz.DIGESTS.asc

## Perl Connector {#perl_connector}

 * https://shadowd.zecure.org/files/shadowd_perl-2.0.0.tar.gz
 * https://shadowd.zecure.org/files/shadowd_perl-2.0.0.tar.gz.DIGESTS
 * https://shadowd.zecure.org/files/shadowd_perl-2.0.0.tar.gz.DIGESTS.asc

## Python Connector {#python_connector}

 * https://shadowd.zecure.org/files/shadowd_python-2.0.0.tar.gz
 * https://shadowd.zecure.org/files/shadowd_python-2.0.0.tar.gz.DIGESTS
 * https://shadowd.zecure.org/files/shadowd_python-2.0.0.tar.gz.DIGESTS.asc

# Signatures

The [DIGESTS](http://en.wikipedia.org/wiki/Cryptographic_hash_function) and [DIGESTS.asc](https://en.wikipedia.org/wiki/Digital_signature) files can be used to validate the integrity and authenticity of the downloaded archives:

    # Import the public key
    gpg --recv-keys 0x08672A08415EAC5B
    
    # Test the authenticity of the hashes
    gpg --verify *.DIGESTS.asc
    
    # Test the integrity of the archives
    sha512sum -c *.DIGESTS
    whirlpoolsum -c *.DIGESTS

---
date: 2015-01-01
menu:
  main:
    parent: downloads
title: Archives
weight: 10
---

Official projects of Shadow Daemon are hosted at *shadowd.zecure.org* and *github.com/zecure*.
The [DIGESTS](http://en.wikipedia.org/wiki/Cryptographic_hash_function) and [DIGESTS.asc](https://en.wikipedia.org/wiki/Digital_signature) files can be used to validate the integrity and authenticity of the downloaded archives:

    # Import the public key
    gpg --recv-keys 0x08672A08415EAC5B
    
    # Test the authenticity of the hashes
    gpg --verify *.DIGESTS.asc
    
    # Test the integrity of the archives
    sha512sum -c *.DIGESTS
    whirlpooldeep -c *.DIGESTS

# Current

## Shadowd {#shadowd}

 * https://shadowd.zecure.org/files/shadowd-1.0.0.tar.gz
 * https://shadowd.zecure.org/files/shadowd-1.0.0.tar.gz.DIGESTS
 * https://shadowd.zecure.org/files/shadowd-1.0.0.tar.gz.DIGESTS.asc
 * https://github.com/zecure/shadowd/releases/tag/v1.0.0

## User Interface {#user_interface}

 * https://shadowd.zecure.org/files/shadowd_ui-1.0.0.tar.gz
 * https://shadowd.zecure.org/files/shadowd_ui-1.0.0.tar.gz.DIGESTS
 * https://shadowd.zecure.org/files/shadowd_ui-1.0.0.tar.gz.DIGESTS.asc
 * https://github.com/zecure/shadowd_ui/releases/tag/v1.0.0

## PHP Connector {#php_connector}

 * https://shadowd.zecure.org/files/shadowd_php-1.0.0.tar.gz
 * https://shadowd.zecure.org/files/shadowd_php-1.0.0.tar.gz.DIGESTS
 * https://shadowd.zecure.org/files/shadowd_php-1.0.0.tar.gz.DIGESTS.asc
 * https://github.com/zecure/shadowd_php/releases/tag/v1.0.0

## Perl Connector {#perl_connector}

 * https://shadowd.zecure.org/files/shadowd_perl-1.0.3.tar.gz
 * https://shadowd.zecure.org/files/shadowd_perl-1.0.3.tar.gz.DIGESTS
 * https://shadowd.zecure.org/files/shadowd_perl-1.0.3.tar.gz.DIGESTS.asc
 * https://github.com/zecure/shadowd_perl/releases/tag/v1.0.3

## Python Connector {#python_connector}

 * https://shadowd.zecure.org/files/shadowd_python-1.0.0.tar.gz
 * https://shadowd.zecure.org/files/shadowd_python-1.0.0.tar.gz.DIGESTS
 * https://shadowd.zecure.org/files/shadowd_python-1.0.0.tar.gz.DIGESTS.asc
 * https://github.com/zecure/shadowd_python/releases/tag/v1.0.0

# Archives {#archives}

 * https://shadowd.zecure.org/files/
 * https://github.com/zecure/shadowd/releases
 * https://github.com/zecure/shadowd_ui/releases
 * https://github.com/zecure/shadowd_php/releases
 * https://github.com/zecure/shadowd_perl/releases
 * https://github.com/zecure/shadowd_python/releases

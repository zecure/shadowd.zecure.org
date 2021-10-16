---
date: 2021-10-16
menu:
  main:
    parent: downloads
title: Projects
longtitle: Files of Shadow Daemon
weight: 10
aliases:
    - /downloads/archives/
---

Official projects of Shadow Daemon are hosted at *shadowd.zecure.org* and *github.com/zecure*.


<table class="table">
  <thead>
    <td>Project</td>
    <td>Latest</td>
    <td>Docker</td>
  </thead>
  <tbody>
    <tr>
      <td>Shadowd</td>
      <td>
        <a href="https://shadowd.zecure.org/files/shadowd-2.1.0.tar.gz">shadowd-2.1.0.tar.gz</a>
        <a href="https://shadowd.zecure.org/files/shadowd-2.1.0.tar.gz.DIGESTS" class="signature">[DIGESTS]</a>
        <a href="https://shadowd.zecure.org/files/shadowd-2.1.0.tar.gz.DIGESTS.asc" class="signature">[asc]</a>
      </td>
      <td>
        <a href="https://hub.docker.com/r/zecure/shadowd">zecure/shadowd</a>
      </td>
    </tr>
    <tr>
      <td>User Interface</td>
      <td>
        <a href="https://shadowd.zecure.org/files/shadowd_ui-2.0.5.tar.gz">shadowd_ui-2.0.5.tar.gz</a>
        <a href="https://shadowd.zecure.org/files/shadowd_ui-2.0.5.tar.gz.DIGESTS" class="signature">[DIGESTS]</a>
        <a href="https://shadowd.zecure.org/files/shadowd_ui-2.0.5.tar.gz.DIGESTS.asc" class="signature">[asc]</a>
      </td>
      <td>
        <a href="https://hub.docker.com/r/zecure/shadowd_ui">zecure/shadowd_ui</a>
      </td>
    </tr>
    <tr>
      <td>PHP Connector</td>
      <td>
        <a href="https://shadowd.zecure.org/files/shadowd_php-2.1.0.tar.gz">shadowd_php-2.1.0.tar.gz</a>
        <a href="https://shadowd.zecure.org/files/shadowd_php-2.1.0.tar.gz.DIGESTS" class="signature">[DIGESTS]</a>
        <a href="https://shadowd.zecure.org/files/shadowd_php-2.1.0.tar.gz.DIGESTS.asc" class="signature">[asc]</a>
      </td>
    </tr>
    <tr>
      <td>Perl Connector</td>
      <td>
        <a href="https://shadowd.zecure.org/files/shadowd_perl-2.0.0.tar.gz">shadowd_perl-2.0.0.tar.gz</a>
        <a href="https://shadowd.zecure.org/files/shadowd_perl-2.0.0.tar.gz.DIGESTS" class="signature">[DIGESTS]</a>
        <a href="https://shadowd.zecure.org/files/shadowd_perl-2.0.0.tar.gz.DIGESTS.asc" class="signature">[asc]</a>
      </td>
    </tr>
    <tr>
      <td>Python Connector</td>
      <td>
        <a href="https://shadowd.zecure.org/files/shadowd_python-3.0.1.tar.gz">shadowd_python-3.0.1.tar.gz</a>
        <a href="https://shadowd.zecure.org/files/shadowd_python-3.0.1.tar.gz.DIGESTS" class="signature">[DIGESTS]</a>
        <a href="https://shadowd.zecure.org/files/shadowd_python-3.0.1.tar.gz.DIGESTS.asc" class="signature">[asc]</a>
      </td>
    </tr>
  </tbody>
</table>

# Signatures

The [DIGESTS](http://en.wikipedia.org/wiki/Cryptographic_hash_function) and [DIGESTS.asc](https://en.wikipedia.org/wiki/Digital_signature) files can be used to validate the integrity and authenticity of the downloaded archives:

    # Import the public key
    gpg --recv-keys 0x08672A08415EAC5B
    
    # Test the authenticity of the hashes
    gpg --verify *.DIGESTS.asc
    
    # Test the integrity of the archives
    sha512sum -c *.DIGESTS
    whirlpoolsum -c *.DIGESTS

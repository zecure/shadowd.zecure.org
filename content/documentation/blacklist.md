---
date: 2016-01-01
menu:
  main:
    parent: documentation
    Identifier: DocumentationBlacklist
title: Blacklist
weight: 11
---

The blacklist algorithm is one of the three methods of Shadow Daemon to identify malicious requests.
It searches for known attack patterns in the user input.

# Layout

![Flowchart blacklist](/img/documentation/blacklist.svg)

The blacklist uses regular expressions to identify known attack patterns.
Every filter has a numerical impact that tries to specify the dangerousness and its unambiguity.
The impacts of all matching filters are aggregated and compared to a threshold.
If the total impact is greater than the threshold the input is classified as a threat.


# Security

Be aware that a blacklist does not guarantee perfect security.
It is good at detecting a majority of common attack patterns, but there will be always techniques it does not know and therefore does not detect.
Once attackers are able to execute own code they have many ways to obfuscate their payloads and thus decrease the impact value even further.
To compensate for this make sure to use a very low global impact threshold and only increase it via rules for specific user input if necessary.


# Filters

The base impact of a filter is determined by the dangerousness of successful exploitation.
A low risk of false-positives is rewarded, whereas a high risk of false-positives is penalized.
If multiple filters are overlapping this is also penalized, depending on how big the chances are that the same pattern is detected more than once.


## 1

Regular Expression: {{< regex >}}\(\)\s*\{.*?;\s*\}\s*;{{< /regex >}}

Description: Shellshock (CVE-2014-6271)

Tags:

 * rce
 * bash

Impact: 9

 * Command execution [8]
 * Low risk of false-positives [1]

Resources:

 * <https://en.wikipedia.org/wiki/Shellshock_(software_bug)>

Examples:

 * {{< example >}}env x='() { :;}; echo vulnerable' bash -c &quot;echo this is a test&quot;{{< /example >}}


## 2

Regular Expression: {{< regex >}}\(\)\s*\{.*?\(.*?\).*?=&gt;.*?\\'{{< /regex >}}

Description: Shellshock (CVE-2014-7169)

Tags:

 * rce
 * bash

Impact: 9

 * Command execution [8]
 * Low risk of false-positives [1]

Resources:

 * <https://en.wikipedia.org/wiki/Shellshock_(software_bug)>

Examples:

 * {{< example >}}env X='() { (a)=&gt;\' bash -c &quot;echo date&quot;; cat echo{{< /example >}}


## 3

Regular Expression: {{< regex >}}\{\{.*?\}\}{{< /regex >}}

Description: Flask template

Tags:

 * rce
 * id

Impact: 4

 * Command execution [6]
 * Mediocre risk of false-positives [-2]

Resources:

 * <https://nvisium.com/blog/2015/12/07/injecting-flask/>

Examples:

 * {{< example >}}{{foo.bar}}{{< /example >}}


## 5

Regular Expression: {{< regex >}}[&quot;'].*?&gt;{{< /regex >}}

Description: HTML breaking

Tags:

 * xss

Impact: 3

 * Cross-site scripting [6]
 * Mediocre risk of false-positives [-2]
 * Overlaps with rule 6 [-1]

Examples:

 * {{< example >}}&quot;&gt;{{< /example >}}


## 6

Regular Expression: {{< regex >}}[^\w\s]\s*\/&gt;{{< /regex >}}

Description: HTML breaking

Tags:

 * xss

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-3]
 * Overlaps with rule 5 [-1]

Examples:

 * {{< example >}}&quot; /&gt;{{< /example >}}


## 7

Regular Expression: {{< regex >}}[&quot;'].*?={{< /regex >}}

Description: HTML breaking

Tags:

 * xss

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}&quot;={{< /example >}}


## 8

Regular Expression: {{< regex >}}#.+?\)[&quot;\s]*&gt;{{< /regex >}}

Description: HTML breaking

Tags:

 * xss

Impact: 6

 * Cross-site scripting [6]
 * Low risk of false-positives [0]

Examples:

 * {{< example >}}#foo)&quot;&gt;{{< /example >}}


## 9

Regular Expression: {{< regex >}}['&quot;][,;\s]+\w*[\[\(]{{< /regex >}}

Description: HTML breaking

Tags:

 * xss

Impact: 6

 * Cross-site scripting [6]
 * Low risk of false-positives [0]

Examples:

 * {{< example >}}&quot;; foo({{< /example >}}


## 10

Regular Expression: {{< regex >}}&gt;[\w\s]*&lt;\s*\/?[\w\s]+&gt;{{< /regex >}}

Description: Unquoted HTML breaking with closing tag

Tags:

 * xss

Impact: 6

 * Cross-site scripting [6]
 * Low risk of false-positives [0]

Examples:

 * {{< example >}}&gt;&lt;/foo&gt;{{< /example >}}


## 11

Regular Expression: {{< regex >}}\W\s*hash\s*[^\w\s-]{{< /regex >}}

Description: JavaScript hash

Tags:

 * xss

Impact: 4

 * Hidden payload [6]
 * Mediocre risk of false-positives [-2]

Examples:

 * {{< example >}}location.hash.slice(1){{< /example >}}


## 12

Regular Expression: {{< regex >}}\bwith\b\s*\(.+?\)[\s\w]+\({{< /regex >}}

Description: Self-contained payload

Tags:

 * xss

Impact: 6

 * Hidden payload [6]
 * Low risk of false-positives [0]

Resources:

 * <https://security.stackexchange.com/questions/10006/how-bad-is-a-self-contained-xss-attack#10009>
 * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/With>

Examples:

 * {{< example >}}with(location)with(hash)eval(substring(1)){{< /example >}}


## 13

Regular Expression: {{< regex >}}(\b(do|while|for)\b.*?\([^)]*\).*?\{)|(\}.*?\b(do|while|for)\b.*?\([^)]*\)){{< /regex >}}

Description: C-style loops

Tags:

 * rce
 * xss
 * dos

Impact: 2

 * Very common code pattern [6]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}while (true) {fork();}{{< /example >}}
 * {{< example >}}{fork();} while (true);{{< /example >}}


## 14

Regular Expression: {{< regex >}}[=(].+?\?.+?:{{< /regex >}}

Description: C-style ternary operator

Tags:

 * rce
 * xss

Impact: 2

 * Very common code pattern [6]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}1=1 ? true : false{{< /example >}}


## 15

Regular Expression: {{< regex >}}\\u00[a-f0-9]{2}{{< /regex >}}

Description: Octal entities

Tags:

 * rce
 * xss

Impact: 1

 * Common code pattern [5]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}\u00ff{{< /example >}}


## 16

Regular Expression: {{< regex >}}\\x0*[a-f0-9]{2}{{< /regex >}}

Description: Hex entities

Tags:

 * rce
 * xss

Impact: 1

 * Common code pattern [5]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}\x0ff{{< /example >}}


## 17

Regular Expression: {{< regex >}}\\\d{2,3}{{< /regex >}}

Description: Unicode entities

Tags:

 * rce
 * xss

Impact: 1

 * Common code pattern [5]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}\01{{< /example >}}


## 18

Regular Expression: {{< regex >}}[\/\\]?\.+[\/\\]{{< /regex >}}

Description: Directory traversal

Tags:

 * lfi

Impact: 4

 * Information disclosure / command execution [8]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}../../../../etc/passwd{{< /example >}}


## 19

Regular Expression: {{< regex >}}%(c0\.|af\.|5c\.){{< /regex >}}

Description: Directory traversal unicode + urlencoding

Tags:

 * lfi

Impact: 4

 * Information disclosure / command execution [8]
 * High risk of false-positives [-4]

Resources:

 * <https://security.stackexchange.com/questions/48879/why-does-directory-traversal-attack-c0af-work/48890#48890>

Examples:

 * {{< example >}}%c0.{{< /example >}}
 * {{< example >}}%af.{{< /example >}}
 * {{< example >}}%5c.{{< /example >}}


## 20

Regular Expression: {{< regex >}}%2e%2e[\/\\]{{< /regex >}}

Description: Directory traversal urlencoding

Tags:

 * lfi

Impact: 4

 * Information disclosure / command execution [8]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}%2e%2e/%2e%2e/%2e%2e/%2e%2e/etc/passwd{{< /example >}}


## 21

Regular Expression: {{< regex >}}%c0%ae[\/\\]{{< /regex >}}

Description: Directory traversal unicode + urlencoding

Tags:

 * lfi

Impact: 4

 * Information disclosure / command execution [8]
 * High risk of false-positives [-4]

Resources:

 * <http://www.technicalinfo.net/papers/URLEmbeddedAttacks.html>

Examples:

 * {{< example >}}%c0%ae/%c0%ae/%c0%ae/%c0%ae/etc/passwd{{< /example >}}


## 22

Regular Expression: {{< regex >}}\.(ht(access|passwd|group))|(apache|httpd)\d?\.conf{{< /regex >}}

Description: Common sensitive Apache files

Tags:

 * lfi

Impact: 4

 * Information disclosure [6]
 * Mediocre risk of false-positives [-2]

Examples:

 * {{< example >}}../.htaccess{{< /example >}}
 * {{< example >}}/etc/apache/apache2.conf{{< /example >}}


## 23

Regular Expression: {{< regex >}}\/etc\/[.\/]*(passwd|shadow|master\.passwd){{< /regex >}}

Description: Common sensitive Unix files

Tags:

 * lfi
 * unix

Impact: 4

 * Information disclosure [6]
 * Mediocre risk of false-positives [-2]

Examples:

 * {{< example >}}/etc/shadow{{< /example >}}


## 24

Regular Expression: {{< regex >}}\bdata:.*?,{{< /regex >}}

Description: Data URI scheme

Tags:

 * xss

Impact: 2

 * Obfuscated payload [6]
 * High risk of false-positives [-4]

Resources:

 * <https://en.wikipedia.org/wiki/Data_URI_scheme>

Examples:

 * {{< example >}}data:image/png;base64,foo{{< /example >}}


## 25

Regular Expression: {{< regex >}};base64|base64,{{< /regex >}}

Description: Data URI scheme base64

Tags:

 * xss

Impact: 2

 * Obfuscated payload [6]
 * High risk of false-positives [-4]

Resources:

 * <https://en.wikipedia.org/wiki/Data_URI_scheme>

Examples:

 * {{< example >}}data:image/png;base64,foo{{< /example >}}


## 26

Regular Expression: {{< regex >}}php:\/\/filter{{< /regex >}}

Description: PHP input/output stream filters

Tags:

 * lfi
 * rce
 * php

Impact: 4

 * Obfuscated payload / file disclosure [6]
 * Mediocre risk of false-positives [-2]

Resources:

 * <https://secure.php.net/manual/en/wrappers.php.php>

Examples:

 * {{< example >}}php://filter/convert.base64-encode/resource=config.php{{< /example >}}


## 27

Regular Expression: {{< regex >}}php:\/\/input{{< /regex >}}

Description: PHP input stream

Tags:

 * rce
 * php

Impact: 4

 * Obfuscated payload [6]
 * Mediocre risk of false-positives [-2]

Resources:

 * <https://secure.php.net/manual/en/wrappers.php.php>


## 28

Regular Expression: {{< regex >}}php:\/\/output{{< /regex >}}

Description: PHP output stream

Tags:

 * xss
 * php

Impact: 4

 * Obfuscated payload [6]
 * Mediocre risk of false-positives [-2]

Resources:

 * <https://secure.php.net/manual/en/wrappers.php.php>


## 29

Regular Expression: {{< regex >}}convert\.base64-(de|en)code{{< /regex >}}

Description: PHP input/output stream filters

Tags:

 * lfi
 * rce
 * php

Impact: 4

 * Obfuscated payload / file disclosure [6]
 * Mediocre risk of false-positives [-2]

Resources:

 * <https://secure.php.net/manual/en/filters.convert.php>

Examples:

 * {{< example >}}php://filter/convert.base64-encode/resource=config.php{{< /example >}}


## 30

Regular Expression: {{< regex >}}zlib\.(de|in)flate{{< /regex >}}

Description: PHP input/output stream filters

Tags:

 * lfi
 * rce
 * php

Impact: 4

 * Obfuscated payload / file disclosure [6]
 * Mediocre risk of false-positives [-2]

Resources:

 * <https://secure.php.net/manual/en/filters.compression.php>

Examples:

 * {{< example >}}php://filter/zlib.deflate/resource=config.php{{< /example >}}


## 31

Regular Expression: {{< regex >}}@import\b{{< /regex >}}

Description: CSS import

Tags:

 * xss
 * css

Impact: 3

 * Hidden payload [6]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://developer.mozilla.org/en-US/docs/Web/CSS/@import>

Examples:

 * {{< example >}}@import url(http://foo/bar);{{< /example >}}


## 32

Regular Expression: {{< regex >}}\burl\b\s*\(.+?\){{< /regex >}}

Description: CSS pointer to a resource

Tags:

 * xss
 * rfi
 * css

Impact: 2

 * Hidden payload [6]
 * High risk of false-positives [-4]

Resources:

 * <https://developer.mozilla.org/en-US/docs/Web/CSS/url>

Examples:

 * {{< example >}}@import url(http://foo/bar);{{< /example >}}


## 33

Regular Expression: {{< regex >}}\/\s*\/*+\/{{< /regex >}}

Description: URL

Tags:

 * rfi

Impact: 1

 * Hidden payload [6]
 * Very high risk of false-positives [-5]

Examples:

 * {{< example >}}http://foobar.org/shell.txt{{< /example >}}


## 34

Regular Expression: {{< regex >}}\)\s*\[{{< /regex >}}

Description: JavaScript language construct

Tags:

 * xss

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-4]


## 35

Regular Expression: {{< regex >}}&lt;\?(?!xml\s){{< /regex >}}

Description: PHP opening tag

Tags:

 * rce
 * php

Impact: 3

 * Command execution [8]
 * High risk of false-positives [-5]

Examples:

 * {{< example >}}<?php{{< /example >}}
 * {{< example >}}<?{{< /example >}}


## 36

Regular Expression: {{< regex >}}%SYSTEM(DRIVE|ROOT)%{{< /regex >}}

Description: Common Windows environment variables

Tags:

 * lfi
 * win

Impact: 2

 * File disclosure [5]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://en.wikipedia.org/wiki/Environment_variable#Default_values>


## 37

Regular Expression: {{< regex >}}%WINDIR%{{< /regex >}}

Description: Common Windows environment variables

Tags:

 * lfi
 * win

Impact: 2

 * File disclosure [5]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://en.wikipedia.org/wiki/Environment_variable#Default_values>


## 38

Regular Expression: {{< regex >}}%USER(DOMAIN|PROFILE|NAME)%{{< /regex >}}

Description: Common Windows environment variables

Tags:

 * lfi
 * win

Impact: 2

 * File disclosure [5]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://en.wikipedia.org/wiki/Environment_variable#Default_values>


## 39

Regular Expression: {{< regex >}}%HOME(DRIVE|PATH)%{{< /regex >}}

Description: Common Windows environment variables

Tags:

 * lfi
 * win

Impact: 2

 * File disclosure [5]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://en.wikipedia.org/wiki/Environment_variable#Default_values>


## 40

Regular Expression: {{< regex >}}%((LOCAL)?APP|PROGRAM)DATA%{{< /regex >}}

Description: Common Windows environment variables

Tags:

 * lfi
 * win

Impact: 2

 * File disclosure [5]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://en.wikipedia.org/wiki/Environment_variable#Default_values>


## 41

Regular Expression: {{< regex >}}%\w+%{{< /regex >}}

Description: Common Windows environment variables pattern

Tags:

 * lfi
 * win

Impact: 1

 * File disclosure [5]
 * High risk of false-positives [-3]
 * Overlaps with 36-40 [-1]

Resources:

 * <https://en.wikipedia.org/wiki/Environment_variable#Default_values>


## 42

Regular Expression: {{< regex >}}--.+?{{< /regex >}}

Description: Common SQL comment syntax

Tags:

 * sqli

Impact: 1

 * SQL injection [6]
 * Very high risk of false-positives [-5]


## 43

Regular Expression: {{< regex >}}\[\$(?:ne|eq|lte?|gte?|n?in|mod|all|size|exists|type|slice|or)\]{{< /regex >}}

Description: MongoDB SQL commands

Tags:

 * sqli

Impact: 5

 * SQL injection [6]
 * Low risk of false-positives [-1]


## 44

Regular Expression: {{< regex >}}\/\/{{< /regex >}}

Description: Common C-style comment syntax

Tags:

 * sqli

Impact: 1

 * SQL injection [6]
 * Very high risk of false-positives [-5]


## 45

Regular Expression: {{< regex >}}\/\*.*?\*\/{{< /regex >}}

Description: Common C-style comment syntax

Tags:

 * sqli

Impact: 1

 * SQL injection [6]
 * Very high risk of false-positives [-5]


## 46

Regular Expression: {{< regex >}}&lt;!-.+?--&gt;{{< /regex >}}

Description: Common XML comment syntax

Tags:

 * xss
 * xxe

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-4]


## 47

Regular Expression: {{< regex >}}&lt;\bbase\b.+?\bhref\b.+?&gt;{{< /regex >}}

Description: Base URL

Tags:

 * xss

Impact: 8

 * Cross-site scripting [6]
 * Low risk of false-positives [-2]

Resources:

 * <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base>

Examples:

 * {{< example >}}&lt;base href=&quot;http://foo/&quot;&gt;{{< /example >}}


## 48

Regular Expression: {{< regex >}}&lt;!(element|entity|\[CDATA){{< /regex >}}

Description: XML entity injections

Tags:

 * xss
 * xxe

Impact: 8

 * File disclosure [6]
 * Low risk of false-positives [2]

Examples:

 * {{< example >}}&lt;![CDATA[&lt;]]&gt;script&lt;![CDATA[&gt;]]&gt;{{< /example >}}
 * {{< example >}}&lt;!ENTITY xxe SYSTEM &quot;file:///dev/random&quot; &gt;]&gt;{{< /example >}}


## 49

Regular Expression: {{< regex >}}&lt;(applet|object|embed|audio|video|img|svg){{< /regex >}}

Description: Common JavaScript injection points (media)

Tags:

 * xss

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-4]


## 50

Regular Expression: {{< regex >}}&lt;\ba\b.+?\bhref\b{{< /regex >}}

Description: Common JavaScript injection points (links)

Tags:

 * xss

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-4]


## 51

Regular Expression: {{< regex >}}&lt;(form|button|input|keygen|textarea|select|option){{< /regex >}}

Description: Common JavaScript injection points (forms)

Tags:

 * xss

Impact: 4

 * Cross-site scripting [6]
 * Mediocre risk of false-positives [-2]


## 52

Regular Expression: {{< regex >}}&lt;(html|body|meta|link|i?frame|script|map){{< /regex >}}

Description: Common JavaScript injection points

Tags:

 * xss

Impact: 4

 * Cross-site scripting [6]
 * Mediocre risk of false-positives [-2]


## 53

Regular Expression: {{< regex >}}(?&lt;!\w)(boot\.ini|global\.asa|sam)\b{{< /regex >}}

Description: Common sensitive Windows files

Tags:

 * lfi
 * win

Impact: 4

 * Information disclosure [6]
 * Mediocre risk of false-positives [-2]

Examples:

 * {{< example >}}C:\boot.ini{{< /example >}}


## 54

Regular Expression: {{< regex >}}[^\w]on(\w+)(\s*)={{< /regex >}}

Description: Event handlers

Tags:

 * xss

Impact: 3

 * Cross-site scripting [6]
 * Mediocre risk of false-positives [-3]

Examples:

 * {{< example >}}&lt;img onerror=&quot;foo&quot;/&gt;{{< /example >}}


## 55

Regular Expression: {{< regex >}}(chrome|file):\/\/{{< /regex >}}

Description: Local file inclusion

Tags:

 * lfi

Impact: 3

 * Information disclosure [6]
 * Mediocre risk of false-positives [-3]

Examples:

 * {{< example >}}file:///etc/passwd{{< /example >}}


## 56

Regular Expression: {{< regex >}}&amp;#?(\w+);{{< /regex >}}

Description: HTML escaped characters

Tags:

 * xss

Impact: 3

 * Cross-site scripting [6]
 * Mediocre risk of false-positives [-3]

Examples:

 * {{< example >}}&amp;amp;{{< /example >}}


## 57

Regular Expression: {{< regex >}}^(\s*)\||\|(\s*)${{< /regex >}}

Description: Perl command injection

Tags:

 * rce
 * perl

Impact: 5

 * Command injection [8]
 * Mediocre risk of false-positives [-3]

Examples:

 * {{< example >}}|id{{< /example >}}
 * {{< example >}}id|{{< /example >}}


## 58

Regular Expression: {{< regex >}}&lt;!--\W*?#\W*?(cmd|echo|exec|include|printenv)\b{{< /regex >}}

Description: Apache server-side include

Tags:

 * rce
 * xss
 * lfi

Impact: 6

 * Command injection / file disclosure [8]
 * Low risk of false-positives [-2]


## 59

Regular Expression: {{< regex >}}\{\s*\w+\s*:\s*[+-]?\s*\d+\s*:.*?\}{{< /regex >}}

Description: Serialized PHP objects

Tags:

 * php

Impact: 5

 * Everything is possible [8]
 * Mediocre risk of false-positives [-3]


## 60

Regular Expression: {{< regex >}}[\n\r]\s*\b(?:to|b?cc)\b\s*:.*?\@{{< /regex >}}

Description: Email injection

Tags:

 * spam

Impact: 5

 * Spam [4]
 * Low risk of false-positives [1]


## 61

Regular Expression: {{< regex >}}\bcall_user_func\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP functions

Tags:

 * rce
 * php

Impact: 5

 * Command execution [8]
 * Mediocre risk of false-positives [-3]


## 62

Regular Expression: {{< regex >}}\bcreate_function\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP functions

Tags:

 * rce
 * php

Impact: 5

 * Command execution [8]
 * Mediocre risk of false-positives [-3]


## 63

Regular Expression: {{< regex >}}\beval\b.*?(\(.+?\)|\{.+?\}){{< /regex >}}

Description: Critical functions

Tags:

 * rce
 * php
 * perl

Impact: 4

 * Command execution [8]
 * High risk of false-positives [-4]


## 64

Regular Expression: {{< regex >}}\bexec\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP functions

Tags:

 * rce
 * php

Impact: 4

 * Command execution [8]
 * High risk of false-positives [-4]


## 65

Regular Expression: {{< regex >}}\bf(get|open|read|write)\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP functions

Tags:

 * rce
 * php

Impact: 5

 * Command execution / file disclosure [8]
 * Mediocre risk of false-positives [-3]


## 66

Regular Expression: {{< regex >}}\bfile_(get|put)_contents\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP functions

Tags:

 * rce
 * php

Impact: 5

 * Command execution / file disclosure [8]
 * Mediocre risk of false-positives [-3]


## 67

Regular Expression: {{< regex >}}\bmove_uploaded_file\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP functions

Tags:

 * rce
 * php

Impact: 5

 * Command execution [8]
 * Mediocre risk of false-positives [-3]


## 68

Regular Expression: {{< regex >}}\bpassthru\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP functions

Tags:

 * rce
 * php

Impact: 5

 * Command execution [8]
 * Mediocre risk of false-positives [-3]


## 69

Regular Expression: {{< regex >}}\bp(roc_)?open\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP functions

Tags:

 * rce
 * php

Impact: 5

 * Command execution [8]
 * Mediocre risk of false-positives [-3]


## 70

Regular Expression: {{< regex >}}\breadfile\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP functions

Tags:

 * lfi
 * php

Impact: 4

 * File disclosure [7]
 * Mediocre risk of false-positives [-3]


## 71

Regular Expression: {{< regex >}}\bshell_exec\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP functions

Tags:

 * rce
 * php

Impact: 5

 * Command execution [8]
 * Mediocre risk of false-positives [-3]


## 72

Regular Expression: {{< regex >}}\bsystem\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP functions

Tags:

 * rce
 * php

Impact: 5

 * Command execution [8]
 * Mediocre risk of false-positives [-3]


## 73

Regular Expression: {{< regex >}}\bpreg_(replace|match)\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP functions

Tags:

 * rce
 * php

Impact: 5

 * Command execution [8]
 * Mediocre risk of false-positives [-3]


## 74

Regular Expression: {{< regex >}}\binclude(_once)?\b.*?;{{< /regex >}}

Description: Critical PHP functions

Tags:

 * rce
 * php

Impact: 3

 * Command execution [8]
 * High risk of false-positives [-5]

Examples:

 * {{< example >}}include('/etc/passwd');{{< /example >}}
 * {{< example >}}include_once '/etc/passwd';{{< /example >}}


## 75

Regular Expression: {{< regex >}}\brequire(_once)?\b.*?;{{< /regex >}}

Description: Critical PHP functions

Tags:

 * rce
 * php

Impact: 3

 * Command execution [8]
 * High risk of false-positives [-5]

Examples:

 * {{< example >}}require('/etc/passwd');{{< /example >}}
 * {{< example >}}require_once '/etc/passwd';{{< /example >}}


## 76

Regular Expression: {{< regex >}}\{\s*\$\s*\{.+?\}\s*\}{{< /regex >}}

Description: Complex curly syntax

Tags:

 * rce
 * php

Impact: 8

 * Command execution [8]
 * Low risk of false-positives [0]

Resources:

 * <https://secure.php.net/manual/en/language.types.string.php>

Examples:

 * {{< example >}}{${phpinfo()}}{{< /example >}}


## 77

Regular Expression: {{< regex >}}@(cc_on|set)[\s@,&quot;=]{{< /regex >}}

Description: Conditional compilation tokens

Tags:

 * xss

Impact: 3

 * Command execution [6]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://en.wikipedia.org/wiki/Conditional_comment#Conditional_comments_in_JScript>


## 78

Regular Expression: {{< regex >}}\bfirefoxurl\s*:{{< /regex >}}

Description: Firefox firefoxurl URI handler

Tags:

 * xss

Impact: 3

 * Cross-site scripting [6]
 * Mediocre risk of false-positives [-3]

Resources:

 * <http://www.mozillazine.org/talkback.html?article=22198>


## 79

Regular Expression: {{< regex >}}\bwyciwyg\s*:{{< /regex >}}

Description: Firefox wyciwyg URI handler

Tags:

 * xss

Impact: 3

 * Cross-site scripting [6]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://en.wikipedia.org/wiki/WYCIWYG>


## 80

Regular Expression: {{< regex >}}\bdocument\b.*?\.{{< /regex >}}

Description: Common JavaScript functions

Tags:

 * xss

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-4]

Resources:

 * <https://developer.mozilla.org/en-US/docs/Web/API/document>


## 81

Regular Expression: {{< regex >}}\bwindow\b.*?\.{{< /regex >}}

Description: Common JavaScript functions

Tags:

 * xss

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-4]

Resources:

 * <https://developer.mozilla.org/en-US/docs/Web/API/window>


## 82

Regular Expression: {{< regex >}}=\s*\w+\s*\+\s*['&quot;]{{< /regex >}}

Description: Common concatenation patterns

Tags:

 * xss

Impact: 1

 * Cross-site scripting [6]
 * High risk of false-positives [-5]


## 83

Regular Expression: {{< regex >}}\+=\s*\(\s*['&quot;]{{< /regex >}}

Description: Common concatenation patterns

Tags:

 * xss

Impact: 1

 * Cross-site scripting [6]
 * High risk of false-positives [-5]


## 84

Regular Expression: {{< regex >}}['&quot;]\s*\+\s*['&quot;]{{< /regex >}}

Description: Common concatenation patterns

Tags:

 * xss

Impact: 1

 * Cross-site scripting [6]
 * High risk of false-positives [-5]


## 85

Regular Expression: {{< regex >}}\|\(\w+={{< /regex >}}

Description: LDAP

Tags:

 * ldap

Impact: 3

 * Information disclosure [6]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://www.blackhat.com/presentations/bh-europe-08/Alonso-Parada/Whitepaper/bh-eu-08-alonso-parada-WP.pdf>


## 86

Regular Expression: {{< regex >}}\bfunction\b[^(]*\([^)]*\){{< /regex >}}

Description: Common function declarations

Tags:

 * xss
 * rce

Impact: 3

 * Common code pattern [6]
 * Mediocre risk of false-positives [-3]


## 87

Regular Expression: {{< regex >}}\bbenchmark\b.*?\(.+?,.+?\){{< /regex >}}

Description: Blind SQL

Tags:

 * sqli
 * mysql

Impact: 6

 * SQL injection [6]
 * Low risk of false-positives [0]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/information-functions.html#function_benchmark>


## 88

Regular Expression: {{< regex >}}\bsleep\b.*?\(.+?\){{< /regex >}}

Description: Blind SQL

Tags:

 * sqli
 * dos

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/miscellaneous-functions.html#function_sleep>


## 89

Regular Expression: {{< regex >}}\bload_file\b.*?\(.+?\){{< /regex >}}

Description: MySQL file disclosure

Tags:

 * sqli
 * mysql

Impact: 7

 * SQL injection / file disclosure [7]
 * Low risk of false-positives [0]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_load-file>


## 90

Regular Expression: {{< regex >}}\bload\b.*?\bdata\b.*?\binfile\b.*?\binto\b.*?\btable\b{{< /regex >}}

Description: MySQL file disclosure

Tags:

 * sqli
 * mysql

Impact: 7

 * SQL injection / file disclosure [7]
 * Low risk of false-positives [0]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/load-data.html>


## 91

Regular Expression: {{< regex >}}\bselect\b.*?\binto\b.*?\b(out|dump)file\b{{< /regex >}}

Description: MySQL file write

Tags:

 * sqli
 * mysql

Impact: 8

 * SQL injection / file write [8]
 * Low risk of false-positives [0]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/select-into.html>


## 92

Regular Expression: {{< regex >}}\b(group_)?concat(_ws)?\b.*?\(.+?\){{< /regex >}}

Description: Common MySQL functions

Tags:

 * sqli
 * mysql

Impact: 3

 * SQL injection [6]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_concat>


## 93

Regular Expression: {{< regex >}}\bfrom\b.*?\binformation_schema\b{{< /regex >}}

Description: MySQL information disclosure

Tags:

 * sqli
 * mysql

Impact: 5

 * SQL injection [6]
 * Low risk of false-positives [-1]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/information-schema.html>


## 94

Regular Expression: {{< regex >}}\bpg_sleep\b.*?\(.+?\){{< /regex >}}

Description: Blind SQL

Tags:

 * sqli
 * dos
 * pgsql

Impact: 6

 * SQL injection [6]
 * Low risk of false-positives [0]

Resources:

 * <http://www.postgresql.org/docs/9.0/static/functions-datetime.html#FUNCTIONS-DATETIME-DELAY>


## 95

Regular Expression: {{< regex >}}\bwaitfor\b.*?\b(delay|time(out)?)\b{{< /regex >}}

Description: Blind SQL

Tags:

 * sqli
 * dos
 * tsql

Impact: 4

 * SQL injection [6]
 * Mediocre risk of false-positives [-2]

Resources:

 * <https://msdn.microsoft.com/en-us/library/ms187331.aspx>


## 96

Regular Expression: {{< regex >}}\b(char_|bit_)?length\b.*?\(.+?\){{< /regex >}}

Description: Common SQL functions

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_length>
 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_bit-length>


## 96

Regular Expression: {{< regex >}}\bfind_in_set\b.*?\(.+?,.+?\){{< /regex >}}

Description: Common MySQL functions

Tags:

 * sqli
 * mysql

Impact: 6

 * SQL injection [6]
 * Low risk of false-positives [0]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_find-in-set>


## 97

Regular Expression: {{< regex >}}\b(un)?hex\b.*?\(.+?\){{< /regex >}}

Description: Common SQL functions

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_hex>


## 98

Regular Expression: {{< regex >}}\b(from|to)_base64\b.*?\(.+?\){{< /regex >}}

Description: Common MySQL functions

Tags:

 * sqli

Impact: 4

 * SQL injection [6]
 * Low risk of false-positives [-2]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_from-base64>


## 99

Regular Expression: {{< regex >}}\bsubstr(ing(_index)?)?\b.*?\(.+?,.+?\){{< /regex >}}

Description: Common SQL functions

Tags:

 * sqli

Impact: 3

 * SQL injection [6]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_substr>


## 100

Regular Expression: {{< regex >}}\b(current_)?user\b.*?\(\){{< /regex >}}

Description: Common MySQL functions

Tags:

 * sqli

Impact: 2

 * SQL injection / information disclosure [6]
 * High risk of false-positives [-4]


## 101

Regular Expression: {{< regex >}}\bversion\b.*?\(\){{< /regex >}}

Description: Common MySQL functions

Tags:

 * sqli

Impact: 2

 * SQL injection / information disclosure [6]
 * High risk of false-positives [-4]


## 102

Regular Expression: {{< regex >}}@@.+?{{< /regex >}}

Description: MySQL system variables

Tags:

 * sqli

Impact: 1

 * SQL injection / information disclosure [6]
 * High risk of false-positives [-5]


## 103

Regular Expression: {{< regex >}}\boct\b.*?\(.+?\){{< /regex >}}

Description: Common SQL functions

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_oct>


## 104

Regular Expression: {{< regex >}}\bord\b.*?\(.+?\){{< /regex >}}

Description: Common SQL functions

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_ord>


## 105

Regular Expression: {{< regex >}}\bascii\b.*?\(.+?\){{< /regex >}}

Description: Common SQL functions

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_ascii>


## 106

Regular Expression: {{< regex >}}\bbin\b.*?\(.+?\){{< /regex >}}

Description: Common SQL functions

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_bin>


## 107

Regular Expression: {{< regex >}}\bcha?r\b.*?\(.+?\){{< /regex >}}

Description: Common SQL functions

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_char>


## 108

Regular Expression: {{< regex >}}\bwhere\b.+?(\b(not_)?(like|regexp)\b|[=&lt;&gt;]){{< /regex >}}

Description: Common SQL comparisons

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-comparison-functions.html#operator_like>
 * <https://dev.mysql.com/doc/refman/5.7/en/regexp.html#operator_regexp>


## 109

Regular Expression: {{< regex >}}\bif\b.*?\(.+?,.+?,.+?\){{< /regex >}}

Description: Common SQL functions

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/control-flow-functions.html#function_if>


## 110

Regular Expression: {{< regex >}}\b(ifnull|nullif)\b.*?\(.+?,.+?\){{< /regex >}}

Description: Common SQL functions

Tags:

 * sqli

Impact: 3

 * SQL injection [6]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/control-flow-functions.html#function_ifnull>
 * <https://dev.mysql.com/doc/refman/5.7/en/control-flow-functions.html#function_nullif>


## 111

Regular Expression: {{< regex >}}\bwhere\b.+?(\b(n?and|x?or|not)\b|(\&amp;\&amp;|\|\|)){{< /regex >}}

Description: Common SQL comparisons

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]


## 112

Regular Expression: {{< regex >}}\bcase\b.+?\bwhen\b.+?\bend\b.+?\bcase\b{{< /regex >}}

Description: Common MySQL comparisons

Tags:

 * sqli

Impact: 4

 * SQL injection [6]
 * Low risk of false-positives [-2]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/case.html>


## 113

Regular Expression: {{< regex >}}\bexec\b.+?\bxp_cmdshell\b{{< /regex >}}

Description: MSSQL code execution

Tags:

 * sqli
 * rce
 * mssql

Impact: 9

 * SQL injection / code execution [8]
 * Low risk of false-positives [1]


## 113

Regular Expression: {{< regex >}}\bexec\b.+?\bxp_cmdshell\b{{< /regex >}}

Description: MSSQL code execution

Tags:

 * sqli
 * rce
 * mssql

Impact: 9

 * SQL injection / code execution [8]
 * Low risk of false-positives [1]


## 114

Regular Expression: {{< regex >}}\bcreate\b.+?\b(procedure|function)\b.*?\(.*?\){{< /regex >}}

Description: Common SQL commands

Tags:

 * sqli

Impact: 4

 * SQL injection [6]
 * Mediocre risk of false-positives [-2]


## 115

Regular Expression: {{< regex >}}\binsert\b.+?\binto\b.*?\bvalues\b.*?\(.+?\){{< /regex >}}

Description: Common SQL commands

Tags:

 * sqli

Impact: 4

 * SQL injection [6]
 * Mediocre risk of false-positives [-2]


## 116

Regular Expression: {{< regex >}}\bselect\b.+?\bfrom\b{{< /regex >}}

Description: Common SQL commands

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]


## 117

Regular Expression: {{< regex >}}\bunion\b.+?\bselect\b{{< /regex >}}

Description: Common SQL commands

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]


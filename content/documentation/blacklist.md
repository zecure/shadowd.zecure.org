---
date: 2016-01-01
menu:
  main:
    parent: documentation
    Identifier: DocumentationBlacklist
title: Blacklist
longtitle: Blacklist Algorithm and Filters of Shadow Daemon
weight: 11
---

## Description

The blacklist algorithm is one of the three methods of Shadow Daemon to identify malicious requests.
It searches for known attack patterns in the user input.

## Layout

![Flowchart blacklist](/img/documentation/blacklist.svg)

The blacklist algorithm uses regular expressions to identify known attack patterns.
Every filter has a numerical impact that tries to specify the dangerousness and its unambiguity.
The impacts of all matching filters are aggregated and compared to a threshold.
If the total impact is greater than the threshold the input is classified as a threat.


## Security

Be aware that a blacklist does not guarantee perfect security.
It is good at detecting a majority of common attack patterns, but there will be always techniques it does not know and therefore does not detect.
Once attackers are able to execute own code they have many ways to obfuscate their payloads and thus decrease the impact value even further.
To compensate for this make sure to use a very low global impact threshold and only increase it via rules for specific user input if necessary.


## Filters

The base impact of a filter is determined by the dangerousness of successful exploitation.
A low risk of false-positives is rewarded, whereas a high risk of false-positives is penalized.
If multiple filters are overlapping this is also penalized, depending on how big the chances are that the same pattern is detected more than once.

If you have suggestions for existing or new filters feel free to open an [issue](https://github.com/zecure/shadowd.zecure.org/issues).

### 1

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


### 2

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


### 3

Regular Expression: {{< regex >}}\{\{.*?\}\}{{< /regex >}}

Description: Flask curly syntax

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


### 4

Regular Expression: {{< regex >}}\bfind_in_set\b.*?\(.+?,.+?\){{< /regex >}}

Description: Common MySQL function "find_in_set"

Tags:

 * sqli
 * mysql

Impact: 6

 * SQL injection [6]
 * Low risk of false-positives [0]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_find-in-set>

Examples:

 * {{< example >}}SELECT FIND_IN_SET('b','a,b,c,d'){{< /example >}}


### 5

Regular Expression: {{< regex >}}[&quot;'].*?&gt;{{< /regex >}}

Description: HTML breaking

Tags:

 * xss

Impact: 3

 * Cross-site scripting [6]
 * Mediocre risk of false-positives [-3]

Examples:

 * {{< example >}}&quot;&gt;{{< /example >}}


### 6

Regular Expression: {{< regex >}}\bsqlite_master\b{{< /regex >}}

Description: SQLite information disclosure "sqlite_master"

Tags:

 * sqli
 * sqlite

Impact: 7

 * SQL injection [6]
 * Low risk of false-positives [1]

Examples:

 * {{< example >}}SELECT name FROM sqlite_master{{< /example >}}


### 7

Regular Expression: {{< regex >}}\bmysql.*?\..*?user\b{{< /regex >}}

Description: MySQL information disclosure "mysql.user"

Tags:

 * sqli
 * mysql

Impact: 3

 * SQL injection [6]
 * Mediocre risk of false-positives [-3]

Examples:

 * {{< example >}}SELECT user FROM mysql.user{{< /example >}}


### 8

Regular Expression: {{< regex >}}#.+?\)[&quot;\s]*&gt;{{< /regex >}}

Description: HTML breaking

Tags:

 * xss

Impact: 5

 * Cross-site scripting [6]
 * Low risk of false-positives [-1]

Examples:

 * {{< example >}}#foo)&quot;&gt;{{< /example >}}


### 9

Regular Expression: {{< regex >}}['&quot;][,;\s]+\w*[\[\(]{{< /regex >}}

Description: HTML breaking

Tags:

 * xss

Impact: 3

 * Cross-site scripting [6]
 * Mediocre risk of false-positives [-3]

Examples:

 * {{< example >}}&quot;; foo({{< /example >}}


### 10

Regular Expression: {{< regex >}}&gt;.*?&lt;\s*\/?[\w\s]+&gt;{{< /regex >}}

Description: Unquoted HTML breaking with closing tag

Tags:

 * xss

Impact: 3

 * Cross-site scripting [6]
 * Mediocre risk of false-positives [-3]

Examples:

 * {{< example >}}&gt;&lt;/foo&gt;{{< /example >}}


### 11

Regular Expression: {{< regex >}}\blocation\b.*?\..*?\bhash\b{{< /regex >}}

Description: JavaScript "location.hash"

Tags:

 * xss

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}location.hash.slice(1){{< /example >}}


### 12

Regular Expression: {{< regex >}}\bwith\b\s*\(.+?\)[\s\w]+\({{< /regex >}}

Description: Self-contained payload

Tags:

 * xss

Impact: 6

 * Cross-site scripting [6]
 * Low risk of false-positives [0]

Resources:

 * <https://security.stackexchange.com/questions/10006/how-bad-is-a-self-contained-xss-attack#10009>
 * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/With>

Examples:

 * {{< example >}}with(location)with(hash)eval(substring(1)){{< /example >}}


### 13

Regular Expression: {{< regex >}}(\b(do|while|for)\b.*?\([^)]*\).*?\{)|(\}.*?\b(do|while|for)\b.*?\([^)]*\)){{< /regex >}}

Description: C-style loops

Tags:

 * rce
 * xss
 * dos

Impact: 4

 * Common code pattern [6]
 * Mediocre risk of false-positives [-2]

Examples:

 * {{< example >}}while (true) {fork();}{{< /example >}}
 * {{< example >}}{fork();} while (true);{{< /example >}}


### 14

Regular Expression: {{< regex >}}[=(].+?\?.+?:{{< /regex >}}

Description: C-style ternary operator

Tags:

 * rce
 * xss

Impact: 2

 * Common code pattern [6]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}1=1 ? true : false{{< /example >}}


### 15

Regular Expression: {{< regex >}}\\u00[a-f0-9]{2}{{< /regex >}}

Description: Octal entity

Tags:

 * rce
 * xss

Impact: 1

 * Common code pattern [5]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}\u00ff{{< /example >}}


### 16

Regular Expression: {{< regex >}}\\x0*[a-f0-9]{2}{{< /regex >}}

Description: Hex entity

Tags:

 * rce
 * xss

Impact: 1

 * Common code pattern [5]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}\x0ff{{< /example >}}


### 17

Regular Expression: {{< regex >}}\\\d{2,3}{{< /regex >}}

Description: Unicode entity

Tags:

 * rce
 * xss

Impact: 1

 * Common code pattern [5]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}\01{{< /example >}}


### 18

Regular Expression: {{< regex >}}\.\.[\/\\]{{< /regex >}}

Description: Directory traversal

Tags:

 * lfi

Impact: 4

 * Information disclosure / command execution [8]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}../../etc/passwd{{< /example >}}


### 19

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


### 20

Regular Expression: {{< regex >}}%2e%2e[\/\\]{{< /regex >}}

Description: Directory traversal urlencoding

Tags:

 * lfi

Impact: 4

 * Information disclosure / command execution [8]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}%2e%2e/%2e%2e/etc/passwd{{< /example >}}


### 21

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

 * {{< example >}}%c0%ae/%c0%ae/etc/passwd{{< /example >}}


### 22

Regular Expression: {{< regex >}}\.(ht(access|passwd|group))|(apache|httpd)\d?\.conf{{< /regex >}}

Description: Common Apache files

Tags:

 * lfi

Impact: 4

 * Information disclosure [6]
 * Mediocre risk of false-positives [-2]

Examples:

 * {{< example >}}../.htaccess{{< /example >}}
 * {{< example >}}/etc/apache/httpd.conf{{< /example >}}
 * {{< example >}}/etc/apache2/apache2.conf{{< /example >}}


### 23

Regular Expression: {{< regex >}}\/etc\/[.\/]*(passwd|shadow|master\.passwd){{< /regex >}}

Description: Common Unix files

Tags:

 * lfi
 * unix

Impact: 4

 * Information disclosure [6]
 * Mediocre risk of false-positives [-2]

Examples:

 * {{< example >}}/etc/shadow{{< /example >}}
 * {{< example >}}/etc/./passwd{{< /example >}}


### 24

Regular Expression: {{< regex >}}\bdata:.*?,{{< /regex >}}

Description: Data URI scheme

Tags:

 * xss

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-4]

Resources:

 * <https://en.wikipedia.org/wiki/Data_URI_scheme>

Examples:

 * {{< example >}}data:image/png;base64,foo{{< /example >}}


### 25

Regular Expression: {{< regex >}};base64|base64,{{< /regex >}}

Description: Data URI scheme "base64"

Tags:

 * xss

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-4]

Resources:

 * <https://en.wikipedia.org/wiki/Data_URI_scheme>

Examples:

 * {{< example >}}data:image/png;base64,foo{{< /example >}}


### 26

Regular Expression: {{< regex >}}php:\/\/filter{{< /regex >}}

Description: PHP input/output stream filter

Tags:

 * lfi
 * rce
 * php

Impact: 6

 * Obfuscation / file disclosure [6]
 * Low risk of false-positives [0]

Resources:

 * <https://secure.php.net/manual/en/wrappers.php.php>

Examples:

 * {{< example >}}php://filter/convert.base64-encode/resource=config.php{{< /example >}}


### 27

Regular Expression: {{< regex >}}php:\/\/input{{< /regex >}}

Description: PHP input stream

Tags:

 * rce
 * php

Impact: 6

 * Obfuscation [6]
 * Low risk of false-positives [0]

Resources:

 * <https://secure.php.net/manual/en/wrappers.php.php>

Examples:

 * {{< example >}}include('php://input');{{< /example >}}


### 28

Regular Expression: {{< regex >}}php:\/\/output{{< /regex >}}

Description: PHP output stream

Tags:

 * xss
 * php

Impact: 6

 * Cross-site scripting [6]
 * Low risk of false-positives [0]

Resources:

 * <https://secure.php.net/manual/en/wrappers.php.php>

Examples:

 * {{< example >}}file_put_contents('php://output', 'foo');{{< /example >}}


### 29

Regular Expression: {{< regex >}}convert\.base64-(de|en)code{{< /regex >}}

Description: PHP input/output stream filter "base64"

Tags:

 * lfi
 * rce
 * php

Impact: 6

 * Obfuscation / file disclosure [6]
 * Low risk of false-positives [0]

Resources:

 * <https://secure.php.net/manual/en/filters.convert.php>

Examples:

 * {{< example >}}php://filter/convert.base64-encode/resource=config.php{{< /example >}}


### 30

Regular Expression: {{< regex >}}zlib\.(de|in)flate{{< /regex >}}

Description: PHP input/output stream filter "zlib"

Tags:

 * lfi
 * rce
 * php

Impact: 6

 * Obfuscation / file disclosure [6]
 * Low risk of false-positives [0]

Resources:

 * <https://secure.php.net/manual/en/filters.compression.php>

Examples:

 * {{< example >}}php://filter/zlib.deflate/resource=config.php{{< /example >}}


### 31

Regular Expression: {{< regex >}}@import\b{{< /regex >}}

Description: CSS "import"

Tags:

 * xss
 * css

Impact: 3

 * Obfuscation [6]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://developer.mozilla.org/en-US/docs/Web/CSS/@import>

Examples:

 * {{< example >}}@import url(http://foo/bar);{{< /example >}}


### 32

Regular Expression: {{< regex >}}\burl\s*\(.+?\){{< /regex >}}

Description: CSS pointer to resource

Tags:

 * xss
 * rfi
 * css

Impact: 2

 * Obfuscation [6]
 * High risk of false-positives [-4]

Resources:

 * <https://developer.mozilla.org/en-US/docs/Web/CSS/url>

Examples:

 * {{< example >}}@import url(http://foo/bar);{{< /example >}}


### 33

Regular Expression: {{< regex >}}\/\/.+?\/{{< /regex >}}

Description: URL

Tags:

 * rfi

Impact: 1

 * Obfuscation [6]
 * Very high risk of false-positives [-5]

Examples:

 * {{< example >}}http://foobar.org/{{< /example >}}


### 34

Regular Expression: {{< regex >}}\)\s*\[{{< /regex >}}

Description: JavaScript language construct

Tags:

 * xss

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}) [{{< /example >}}


### 35

Regular Expression: {{< regex >}}&lt;\?(?!xml\s){{< /regex >}}

Description: PHP opening tag

Tags:

 * rce
 * php

Impact: 3

 * Command execution [8]
 * High risk of false-positives [-5]

Examples:

 * {{< example >}}&lt;?php{{< /example >}}
 * {{< example >}}&lt;?{{< /example >}}


### 36

Regular Expression: {{< regex >}}%(HOME(DRIVE|PATH)|SYSTEM(DRIVE|ROOT)|WINDIR|USER(DOMAIN|PROFILE|NAME)|((LOCAL)?APP|PROGRAM)DATA)%{{< /regex >}}

Description: Common Windows environment variable

Tags:

 * lfi
 * win

Impact: 2

 * File disclosure [5]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://en.wikipedia.org/wiki/Environment_variable#Default_values>

Examples:

 * {{< example >}}%WINDIR%\\cmd.exe{{< /example >}}


### 37

Regular Expression: {{< regex >}}%\w+%{{< /regex >}}

Description: Windows environment variable pattern

Tags:

 * lfi
 * win

Impact: 1

 * File disclosure [5]
 * High risk of false-positives [-3]
 * Overlaps with 36 [-1]

Examples:

 * {{< example >}}%FOO%{{< /example >}}


### 38

Regular Expression: {{< regex >}}\bunion\b.+?\bselect\b{{< /regex >}}

Description: Common SQL command "union select"

Tags:

 * sqli

Impact: 3

 * SQL injection [7]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}' UNION SELECT user()-- -{{< /example >}}


### 39

Regular Expression: {{< regex >}}\bupdate\b.+?\bset\b{{< /regex >}}

Description: Common SQL command "update"

Tags:

 * sqli

Impact: 3

 * SQL injection [7]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}UPDATE users SET permissions='admin'{{< /example >}}


### 40

Regular Expression: {{< regex >}}\bdrop\b.+?\b(database|table)\b{{< /regex >}}

Description: Common SQL command "drop"

Tags:

 * sqli

Impact: 3

 * SQL injection [7]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}DROP TABLE users{{< /example >}}
 * {{< example >}}DROP DATABASE blog{{< /example >}}


### 41

Regular Expression: {{< regex >}}\bdelete\b.+?\bfrom\b{{< /regex >}}

Description: Common SQL command "delete"

Tags:

 * sqli

Impact: 3

 * SQL injection [7]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}DELETE FROM users{{< /example >}}


### 42

Regular Expression: {{< regex >}}--.+?{{< /regex >}}

Description: Common SQL comment syntax

Tags:

 * sqli

Impact: 1

 * SQL injection [6]
 * Very high risk of false-positives [-5]

Examples:

 * {{< example >}}' OR 1-- -{{< /example >}}


### 43

Regular Expression: {{< regex >}}\[\$(ne|eq|lte?|gte?|n?in|mod|all|size|exists|type|slice|or)\]{{< /regex >}}

Description: MongoDB SQL commands

Tags:

 * sqli
 * mongo

Impact: 5

 * SQL injection [6]
 * Low risk of false-positives [-1]

Examples:

 * {{< example >}}[$ne]{{< /example >}}


### 44

Regular Expression: {{< regex >}}\$\(.+?\){{< /regex >}}

Description: jQuery selector

Tags:

 * xss

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}$('#login'){{< /example >}}


### 45

Regular Expression: {{< regex >}}\/\*.*?\*\/{{< /regex >}}

Description: C-style comment syntax

Tags:

 * sqli

Impact: 3

 * SQL injection [6]
 * Mediocre risk of false-positives [-3]

Examples:

 * {{< example >}}/**/{{< /example >}}


### 46

Regular Expression: {{< regex >}}&lt;!-.+?--&gt;{{< /regex >}}

Description: XML comment syntax

Tags:

 * xss
 * xxe

Impact: 3

 * Cross-site scripting [6]
 * Mediocre risk of false-positives [-3]

Examples:

 * {{< example >}}&lt;!- --&gt;{{< /example >}}


### 47

Regular Expression: {{< regex >}}&lt;base\b.+?\bhref\b.+?&gt;{{< /regex >}}

Description: Base URL

Tags:

 * xss

Impact: 6

 * Cross-site scripting [6]
 * Low risk of false-positives [0]

Resources:

 * <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base>

Examples:

 * {{< example >}}&lt;base href=&quot;http://foo/&quot;&gt;{{< /example >}}


### 48

Regular Expression: {{< regex >}}&lt;!(element|entity|\[CDATA){{< /regex >}}

Description: XML entity injections

Tags:

 * xss
 * xxe

Impact: 6

 * File disclosure [6]
 * Low risk of false-positives [0]

Examples:

 * {{< example >}}&lt;![CDATA[&lt;]]&gt;script&lt;![CDATA[&gt;]]&gt;{{< /example >}}
 * {{< example >}}&lt;!ENTITY xxe SYSTEM &quot;file:///dev/random&quot; &gt;]&gt;{{< /example >}}


### 49

Regular Expression: {{< regex >}}&lt;(applet|object|embed|audio|video|img|svg){{< /regex >}}

Description: Common JavaScript injection points (media)

Tags:

 * xss

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}&lt;img onerror=&quot;&quot; /&gt;{{< /example >}}


### 50

Regular Expression: {{< regex >}}&lt;a\b.+?\bhref\b{{< /regex >}}

Description: Common JavaScript injection points (links)

Tags:

 * xss

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}&lt;a href=&quot;&quot;&gt;&lt;/a&gt;{{< /example >}}


### 51

Regular Expression: {{< regex >}}&lt;(form|button|input|keygen|textarea|select|option){{< /regex >}}

Description: Common JavaScript injection points (forms)

Tags:

 * xss

Impact: 4

 * Cross-site scripting [6]
 * Mediocre risk of false-positives [-2]

Examples:

 * {{< example >}}&lt;form&gt;&lt;/form&gt;{{< /example >}}


### 52

Regular Expression: {{< regex >}}&lt;(html|body|meta|link|i?frame|script|map){{< /regex >}}

Description: Common JavaScript injection points

Tags:

 * xss

Impact: 4

 * Cross-site scripting [6]
 * Mediocre risk of false-positives [-2]

Examples:

 * {{< example >}}&lt;script&gt;&lt;/script&gt;{{< /example >}}


### 53

Regular Expression: {{< regex >}}(?&lt;!\w)(boot\.ini|global\.asa|sam)\b{{< /regex >}}

Description: Common Windows files

Tags:

 * lfi
 * win

Impact: 4

 * Information disclosure [6]
 * Mediocre risk of false-positives [-2]

Examples:

 * {{< example >}}C:\boot.ini{{< /example >}}


### 54

Regular Expression: {{< regex >}}\bon\w+\s*={{< /regex >}}

Description: HTML event handler

Tags:

 * xss

Impact: 3

 * Cross-site scripting [6]
 * Mediocre risk of false-positives [-3]

Examples:

 * {{< example >}}&lt;img onerror=&quot;&quot; /&gt;{{< /example >}}


### 55

Regular Expression: {{< regex >}}\b(chrome|file):\/\/{{< /regex >}}

Description: Local file inclusion

Tags:

 * xss
 * lfi

Impact: 3

 * Information disclosure [6]
 * Mediocre risk of false-positives [-3]

Examples:

 * {{< example >}}file:///etc/passwd{{< /example >}}


### 56

Regular Expression: {{< regex >}}&amp;#?(\w+);{{< /regex >}}

Description: HTML escaped character

Tags:

 * xss

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}&amp;amp;{{< /example >}}


### 57

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


### 58

Regular Expression: {{< regex >}}&lt;!--\W*?#\W*?(cmd|echo|exec|include|printenv)\b{{< /regex >}}

Description: Apache server-side include

Tags:

 * rce
 * xss
 * lfi

Impact: 6

 * Command injection / file disclosure [8]
 * Low risk of false-positives [-2]

Examples:

 * {{< example >}}&lt;!--#include{{< /example >}}


### 59

Regular Expression: {{< regex >}}\{\s*\w+\s*:\s*[+-]?\s*\d+\s*:.*?\}{{< /regex >}}

Description: Serialized PHP objects

Tags:

 * php

Impact: 5

 * Everything is possible [8]
 * Mediocre risk of false-positives [-3]

Examples:

 * {{< example >}}O:3:&quot;foo&quot;:1:{s:8:&quot;foobar&quot;;s:3:&quot;quz&quot;;}{{< /example >}}


### 60

Regular Expression: {{< regex >}}[\n\r]\s*\b(?:to|b?cc)\b\s*:.*?\@{{< /regex >}}

Description: Email injection

Tags:

 * spam

Impact: 5

 * Spam [4]
 * Low risk of false-positives [1]

Examples:

 * {{< example >}}\nto: foo@bar.de{{< /example >}}


### 61

Regular Expression: {{< regex >}}\bcall_user_func\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP function "call_user_func"

Tags:

 * rce
 * php

Impact: 7

 * Command execution [8]
 * Low risk of false-positives [-1]

Resources:

 * <https://secure.php.net/manual/function.call-user-func.php>

Examples:

 * {{< example >}}call_user_func('foo', $a);{{< /example >}}


### 62

Regular Expression: {{< regex >}}\bcreate_function\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP function "create_function"

Tags:

 * rce
 * php

Impact: 7

 * Command execution [8]
 * Low risk of false-positives [-1]

Resources:

 * <https://secure.php.net/manual/function.create-function.php>

Examples:

 * {{< example >}}create_function('$a', 'return $a;');{{< /example >}}


### 63

Regular Expression: {{< regex >}}\beval\b.*?(\(.+?\)|\{.+?\}){{< /regex >}}

Description: Critical function "eval"

Tags:

 * rce
 * php
 * perl

Impact: 4

 * Command execution [8]
 * High risk of false-positives [-4]

Resources:

 * <https://secure.php.net/manual/function.eval.php>
 * <http://perldoc.perl.org/functions/eval.html>

Examples:

 * {{< example >}}eval('foo');{{< /example >}}
 * {{< example >}}eval { foo(); }{{< /example >}}


### 64

Regular Expression: {{< regex >}}\bexec\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP function "exec"

Tags:

 * rce
 * php

Impact: 4

 * Command execution [8]
 * High risk of false-positives [-4]

Resources:

 * <https://secure.php.net/manual/function.exec.php>

Examples:

 * {{< example >}}exec('cat /etc/passwd');{{< /example >}}


### 65

Regular Expression: {{< regex >}}\bf(get|open|read|write)\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP function "fopen/fget/fread/fwrite"

Tags:

 * rce
 * lfi
 * php

Impact: 5

 * Command execution / file disclosure [8]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://secure.php.net/manual/function.fopen.php>

Examples:

 * {{< example >}}fopen('/etc/passwd', 'r');{{< /example >}}


### 66

Regular Expression: {{< regex >}}\bfile_(get|put)_contents\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP function "file_get_contents/file_put_contents"

Tags:

 * rce
 * lfi
 * php

Impact: 7

 * Command execution / file disclosure [8]
 * Low risk of false-positives [-1]

Resources:

 * <https://secure.php.net/manual/function.file-get-contents.php>
 * <https://secure.php.net/manual/function.file-put-contents.php>

Examples:

 * {{< example >}}file_get_contents('/etc/passwd');{{< /example >}}
 * {{< example >}}file_put_contents('/etc/passwd', 'foo');{{< /example >}}


### 67

Regular Expression: {{< regex >}}\bmove_uploaded_file\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP function "move_uploaded_file"

Tags:

 * rce
 * php

Impact: 7

 * Command execution [8]
 * Low risk of false-positives [-1]

Resources:

 * <https://secure.php.net/manual/function.move-uploaded-file.php>

Examples:

 * {{< example >}}move_uploaded_file($tmp_name, $name);{{< /example >}}


### 68

Regular Expression: {{< regex >}}\bpassthru\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP function "passthru"

Tags:

 * rce
 * php

Impact: 7

 * Command execution [8]
 * Low risk of false-positives [-1]

Resources:

 * <https://secure.php.net/manual/function.passthru.php>

Examples:

 * {{< example >}}passthru('cat /etc/passwd');{{< /example >}}


### 69

Regular Expression: {{< regex >}}\bp(roc_)?open\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP function "popen/proc_open"

Tags:

 * rce
 * php

Impact: 6

 * Command execution [8]
 * Mediocre risk of false-positives [-2]

Resources:

 * <https://secure.php.net/manual/function.proc-open.php>

Examples:

 * {{< example >}}proc_open('cat', $descriptorspec, $pipes, $cwd, $env);{{< /example >}}


### 70

Regular Expression: {{< regex >}}\breadfile\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP function "readfile"

Tags:

 * lfi
 * php

Impact: 5

 * File disclosure [7]
 * Mediocre risk of false-positives [-2]

Resources:

 * <https://secure.php.net/manual/function.readfile.php>

Examples:

 * {{< example >}}readfile('/etc/passwd');{{< /example >}}


### 71

Regular Expression: {{< regex >}}\bshell_exec\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP function "shell_exec"

Tags:

 * rce
 * php

Impact: 7

 * Command execution [8]
 * Low risk of false-positives [-1]

Resources:

 * <https://secure.php.net/manual/function.shell-exec.php>

Examples:

 * {{< example >}}shell_exec('cat /etc/passwd');{{< /example >}}


### 72

Regular Expression: {{< regex >}}\bsystem\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP function "system"

Tags:

 * rce
 * php

Impact: 5

 * Command execution [8]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://secure.php.net/manual/function.system.php>

Examples:

 * {{< example >}}system('cat /etc/passwd');{{< /example >}}


### 73

Regular Expression: {{< regex >}}\bpreg_(replace|match)\b.*?\(.+?\){{< /regex >}}

Description: Critical PHP function "preg_match/preg_replace"

Tags:

 * rce
 * php

Impact: 7

 * Command execution [8]
 * Low risk of false-positives [-1]

Resources:

 * <https://secure.php.net/manual/function.preg-replace.php>
 * <https://secure.php.net/manual/function.preg-match.php>

Examples:

 * {{< example >}}preg_replace('//e', 'phpinfo()', $x);{{< /example >}}


### 74

Regular Expression: {{< regex >}}\binclude(_once)?\b.*?;{{< /regex >}}

Description: Critical PHP function "include"

Tags:

 * rce
 * lfi
 * php

Impact: 4

 * Command execution [8]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}include('/etc/passwd');{{< /example >}}
 * {{< example >}}include_once '/etc/passwd';{{< /example >}}


### 75

Regular Expression: {{< regex >}}\brequire(_once)?\b.*?;{{< /regex >}}

Description: Critical PHP function "require"

Tags:

 * rce
 * lfi
 * php

Impact: 4

 * Command execution [8]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}require('/etc/passwd');{{< /example >}}
 * {{< example >}}require_once '/etc/passwd';{{< /example >}}


### 76

Regular Expression: {{< regex >}}\{\s*\$\s*\{.+?\}\s*\}{{< /regex >}}

Description: PHP complex curly syntax

Tags:

 * rce
 * php

Impact: 8

 * Command execution / information disclosure [8]
 * Low risk of false-positives [0]

Resources:

 * <https://secure.php.net/manual/en/language.types.string.php>

Examples:

 * {{< example >}}{${phpinfo()}}{{< /example >}}


### 77

Regular Expression: {{< regex >}}@(cc_on|set)\b{{< /regex >}}

Description: Conditional compilation token

Tags:

 * xss

Impact: 3

 * Command execution [6]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://en.wikipedia.org/wiki/Conditional_comment#Conditional_comments_in_JScript>

Examples:

 * {{< example >}}@cc_on{{< /example >}}


### 78

Regular Expression: {{< regex >}}\bfirefoxurl\s*:{{< /regex >}}

Description: Firefox "firefoxurl" URI handler

Tags:

 * xss

Impact: 3

 * Cache poisoning [6]
 * Mediocre risk of false-positives [-3]

Resources:

 * <http://www.mozillazine.org/talkback.html?article=22198>

Examples:

 * {{< example >}}firefoxurl://{{< /example >}}


### 79

Regular Expression: {{< regex >}}\bwyciwyg\s*:{{< /regex >}}

Description: Firefox "wyciwyg" URI handler

Tags:

 * xss

Impact: 3

 * Cache poisoning [6]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://en.wikipedia.org/wiki/WYCIWYG>

Examples:

 * {{< example >}}wyciwyg://{{< /example >}}


### 80

Regular Expression: {{< regex >}}\bdocument\b.*?\.{{< /regex >}}

Description: JavaScript attribute "document"

Tags:

 * xss

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-4]

Resources:

 * <https://developer.mozilla.org/en-US/docs/Web/API/document>

Examples:

 * {{< example >}}document.cookie{{< /example >}}


### 81

Regular Expression: {{< regex >}}\bwindow\b.*?\.{{< /regex >}}

Description: JavaScript attribute "window"

Tags:

 * xss

Impact: 2

 * Cross-site scripting [6]
 * High risk of false-positives [-4]

Resources:

 * <https://developer.mozilla.org/en-US/docs/Web/API/window>

Examples:

 * {{< example >}}window.content{{< /example >}}


### 82

Regular Expression: {{< regex >}}=\s*\w+\s*\+\s*['&quot;]{{< /regex >}}

Description: Common concatenation pattern

Tags:

 * xss

Impact: 1

 * Cross-site scripting [6]
 * High risk of false-positives [-5]

Examples:

 * {{< example >}}= foo + '{{< /example >}}


### 83

Regular Expression: {{< regex >}}\+=\s*\(\s*['&quot;]{{< /regex >}}

Description: Common concatenation pattern

Tags:

 * xss

Impact: 1

 * Cross-site scripting [6]
 * High risk of false-positives [-5]

Examples:

 * {{< example >}}+= ('{{< /example >}}


### 84

Regular Expression: {{< regex >}}['&quot;]\s*\+\s*['&quot;]{{< /regex >}}

Description: Common concatenation pattern

Tags:

 * xss

Impact: 1

 * Cross-site scripting [6]
 * High risk of false-positives [-5]

Examples:

 * {{< example >}}' + '{{< /example >}}


### 85

Regular Expression: {{< regex >}}\|\(\w+={{< /regex >}}

Description: LDAP

Tags:

 * ldap

Impact: 3

 * Information disclosure [6]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://www.blackhat.com/presentations/bh-europe-08/Alonso-Parada/Whitepaper/bh-eu-08-alonso-parada-WP.pdf>

Examples:

 * {{< example >}}|(foo={{< /example >}}


### 86

Regular Expression: {{< regex >}}\bfunction\b[^(]*\([^)]*\){{< /regex >}}

Description: Common function declaration

Tags:

 * xss
 * rce

Impact: 3

 * Common code pattern [6]
 * Mediocre risk of false-positives [-3]

Examples:

 * {{< example >}}function foo() {}{{< /example >}}


### 87

Regular Expression: {{< regex >}}\bbenchmark\b.*?\(.+?,.+?\){{< /regex >}}

Description: Blind MySQL "benchmark"

Tags:

 * sqli
 * mysql

Impact: 6

 * SQL injection [6]
 * Low risk of false-positives [0]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/information-functions.html#function_benchmark>

Examples:

 * {{< example >}}SELECT BENCHMARK(1000000,ENCODE('hello','goodbye')){{< /example >}}


### 88

Regular Expression: {{< regex >}}\bsleep\b.*?\(.+?\){{< /regex >}}

Description: Blind SQL "sleep"

Tags:

 * sqli
 * dos

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/miscellaneous-functions.html#function_sleep>

Examples:

 * {{< example >}}SELECT SLEEP(1000){{< /example >}}


### 89

Regular Expression: {{< regex >}}\bload_file\b.*?\(.+?\){{< /regex >}}

Description: MySQL file disclosure "load_file"

Tags:

 * sqli
 * mysql

Impact: 7

 * SQL injection / file disclosure [7]
 * Low risk of false-positives [0]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_load-file>

Examples:

 * {{< example >}}SELECT LOAD_FILE('/etc/passwd'){{< /example >}}


### 90

Regular Expression: {{< regex >}}\bload\b.*?\bdata\b.*?\binfile\b.*?\binto\b.*?\btable\b{{< /regex >}}

Description: MySQL file disclosure "load data"

Tags:

 * sqli
 * mysql

Impact: 7

 * SQL injection / file disclosure [7]
 * Low risk of false-positives [0]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/load-data.html>

Examples:

 * {{< example >}}LOAD DATA INFILE 'foo' INTO TABLE bar{{< /example >}}


### 91

Regular Expression: {{< regex >}}\bselect\b.*?\binto\b.*?\b(out|dump)file\b{{< /regex >}}

Description: MySQL file write "into outfile"

Tags:

 * sqli
 * mysql

Impact: 8

 * SQL injection / file write [8]
 * Low risk of false-positives [0]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/select-into.html>

Examples:

 * {{< example >}}SELECT 'foo' INTO OUTFILE 'bar'{{< /example >}}
 * {{< example >}}SELECT 'foo' INTO DUMPFILE 'bar'{{< /example >}}


### 92

Regular Expression: {{< regex >}}\b(group_)?concat(_ws)?\b.*?\(.+?\){{< /regex >}}

Description: MySQL function "concat"

Tags:

 * sqli
 * mysql

Impact: 3

 * SQL injection [6]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_concat>

Examples:

 * {{< example >}}SELECT CONCAT(foo, ':', bar){{< /example >}}
 * {{< example >}}SELECT GROUP_CONCAT(foo){{< /example >}}


### 93

Regular Expression: {{< regex >}}\binformation_schema\b{{< /regex >}}

Description: MySQL information disclosure

Tags:

 * sqli
 * mysql

Impact: 7

 * SQL injection [6]
 * Low risk of false-positives [1]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/information-schema.html>

Examples:

 * {{< example >}}SELECT schema_name FROM information_schema.schemata{{< /example >}}


### 94

Regular Expression: {{< regex >}}\bpg_sleep\b.*?\(.+?\){{< /regex >}}

Description: Blind PgSQL "pg_sleep"

Tags:

 * sqli
 * dos
 * pgsql

Impact: 6

 * SQL injection [6]
 * Low risk of false-positives [0]

Resources:

 * <http://www.postgresql.org/docs/9.0/static/functions-datetime.html#FUNCTIONS-DATETIME-DELAY>

Examples:

 * {{< example >}}SELECT pg_sleep(1.5){{< /example >}}


### 95

Regular Expression: {{< regex >}}\bwaitfor\b.*?\b(delay|time(out)?)\b{{< /regex >}}

Description: Blind TSQL "waitfor"

Tags:

 * sqli
 * dos
 * tsql

Impact: 4

 * SQL injection [6]
 * Mediocre risk of false-positives [-2]

Resources:

 * <https://msdn.microsoft.com/en-us/library/ms187331.aspx>

Examples:

 * {{< example >}}WAITFOR { DELAY '1000' }{{< /example >}}
 * {{< example >}}WAITFOR { TIME '1000' }{{< /example >}}


### 96

Regular Expression: {{< regex >}}\b(char_|bit_)?length\b.*?\(.+?\){{< /regex >}}

Description: Common SQL function "length"

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_length>
 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_bit-length>

Examples:

 * {{< example >}}SELECT LENGTH('foo'){{< /example >}}
 * {{< example >}}SELECT CHAR_LENGTH('foo'){{< /example >}}
 * {{< example >}}SELECT BIT_LENGTH('foo'){{< /example >}}

### 97

Regular Expression: {{< regex >}}\b(un)?hex\b.*?\(.+?\){{< /regex >}}

Description: Common SQL function "hex/unhex"

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_hex>
 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_unhex>

Examples:

 * {{< example >}}SELECT HEX('foo'){{< /example >}}
 * {{< example >}}SELECT UNHEX('00'){{< /example >}}


### 98

Regular Expression: {{< regex >}}\b(from|to)_base64\b.*?\(.+?\){{< /regex >}}

Description: Common MySQL function "from_base64/to_base64"

Tags:

 * sqli

Impact: 4

 * SQL injection [6]
 * Low risk of false-positives [-2]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_from-base64>
 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_to-base64>

Examples:

 * {{< example >}}SELECT TO_BASE64('foo'){{< /example >}}
 * {{< example >}}SELECT FROM_BASE64('foo'){{< /example >}}


### 99

Regular Expression: {{< regex >}}\bsubstr(ing(_index)?)?\b.*?\(.+?,.+?\){{< /regex >}}

Description: Common SQL function "substr"

Tags:

 * sqli

Impact: 3

 * SQL injection [6]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_substr>

Examples:

 * {{< example >}}SELECT SUBSTR('foo',1){{< /example >}}
 * {{< example >}}SELECT SUBSTRING('foo',1){{< /example >}}
 * {{< example >}}SELECT SUBSTRING_INDEX('foo',1){{< /example >}}


### 100

Regular Expression: {{< regex >}}\b(current_)?user\b.*?\(.*?\){{< /regex >}}

Description: Common SQL function "user"

Tags:

 * sqli

Impact: 2

 * SQL injection / information disclosure [6]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}SELECT user(){{< /example >}}
 * {{< example >}}SELECT current_user(){{< /example >}}


### 101

Regular Expression: {{< regex >}}\bversion\b.*?\(.*?\){{< /regex >}}

Description: Common SQL function "version"

Tags:

 * sqli

Impact: 2

 * SQL injection / information disclosure [6]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}SELECT version(){{< /example >}}


### 102

Regular Expression: {{< regex >}}@@.+?{{< /regex >}}

Description: SQL system variable

Tags:

 * sqli

Impact: 1

 * SQL injection / information disclosure [6]
 * High risk of false-positives [-5]

Examples:

 * {{< example >}}SELECT @@user{{< /example >}}


### 103

Regular Expression: {{< regex >}}\boct\b.*?\(.+?\){{< /regex >}}

Description: Common SQL function "oct"

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_oct>

Examples:

 * {{< example >}}SELECT OCT(12){{< /example >}}


### 104

Regular Expression: {{< regex >}}\bord\b.*?\(.+?\){{< /regex >}}

Description: Common SQL function "ord"

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_ord>

Examples:

 * {{< example >}}SELECT ORD('2'){{< /example >}}


### 105

Regular Expression: {{< regex >}}\bascii\b.*?\(.+?\){{< /regex >}}

Description: Common SQL function "ascii"

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_ascii>

Examples:

 * {{< example >}}SELECT ASCII('2'){{< /example >}}


### 106

Regular Expression: {{< regex >}}\bbin\b.*?\(.+?\){{< /regex >}}

Description: Common SQL function "bin"

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_bin>

Examples:

 * {{< example >}}SELECT BIN(12){{< /example >}}


### 107

Regular Expression: {{< regex >}}\bcha?r\b.*?\(.+?\){{< /regex >}}

Description: Common SQL function "char"

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_char>

Examples:

 * {{< example >}}SELECT CHAR(77,121,83,81,76){{< /example >}}


### 108

Regular Expression: {{< regex >}}\bwhere\b.+?(\b(not_)?(like|regexp)\b|[=&lt;&gt;]){{< /regex >}}

Description: Common SQL comparison "where"

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/string-comparison-functions.html#operator_like>
 * <https://dev.mysql.com/doc/refman/5.7/en/regexp.html#operator_regexp>

Examples:

 * {{< example >}}SELECT foo FROM bar WHERE name LIKE '%admin%'{{< /example >}}


### 109

Regular Expression: {{< regex >}}\bif\b.*?\(.+?,.+?,.+?\){{< /regex >}}

Description: Common SQL comparison "if"

Tags:

 * sqli

Impact: 2

 * SQL injection [6]
 * High risk of false-positives [-4]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/control-flow-functions.html#function_if>

Examples:

 * {{< example >}}SELECT IF(1>2,2,3){{< /example >}}


### 110

Regular Expression: {{< regex >}}\b(ifnull|nullif)\b.*?\(.+?,.+?\){{< /regex >}}

Description: Common SQL comparison "ifnull"

Tags:

 * sqli

Impact: 3

 * SQL injection [6]
 * Mediocre risk of false-positives [-3]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/control-flow-functions.html#function_ifnull>
 * <https://dev.mysql.com/doc/refman/5.7/en/control-flow-functions.html#function_nullif>

Examples:

 * {{< example >}}SELECT IFNULL(1,0){{< /example >}}
 * {{< example >}}SELECT NULLIF(1,1){{< /example >}}


### 111

Regular Expression: {{< regex >}}\bwhere\b.+?(\b(n?and|x?or|not)\b|(\&amp;\&amp;|\|\|)){{< /regex >}}

Description: Common SQL comparison "where"

Tags:

 * sqli

Impact: 3

 * SQL injection [7]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}SELECT foo FROM bar WHERE id = 1 OR id = 2{{< /example >}}


### 112

Regular Expression: {{< regex >}}\bcase\b.+?\bwhen\b.+?\bend\b{{< /regex >}}

Description: Common SQL comparison "case"

Tags:

 * sqli

Impact: 4

 * SQL injection [6]
 * Low risk of false-positives [-2]

Resources:

 * <https://dev.mysql.com/doc/refman/5.7/en/case.html>

Examples:

 * {{< example >}}CASE case_value WHEN when_value THEN statement_list END CASE{{< /example >}}


### 113

Regular Expression: {{< regex >}}\bexec\b.+?\bxp_cmdshell\b{{< /regex >}}

Description: MSSQL code execution "xp_cmdshell"

Tags:

 * sqli
 * rce
 * mssql

Impact: 9

 * SQL injection / code execution [8]
 * Low risk of false-positives [1]

Examples:

 * {{< example >}}exec master..xp_cmdshell 'echo foo'{{< /example >}}


### 114

Regular Expression: {{< regex >}}\bcreate\b.+?\b(procedure|function)\b.*?\(.*?\){{< /regex >}}

Description: Common SQL command "create"

Tags:

 * sqli

Impact: 4

 * SQL injection [7]
 * Mediocre risk of false-positives [-3]

Examples:

 * {{< example >}}CREATE PROCEDURE foo(){{< /example >}}


### 115

Regular Expression: {{< regex >}}\binsert\b.+?\binto\b.*?\bvalues\b.*?\(.+?\){{< /regex >}}

Description: Common SQL command "insert"

Tags:

 * sqli

Impact: 5

 * SQL injection [7]
 * Mediocre risk of false-positives [-2]

Examples:

 * {{< example >}}INSERT INTO table (col1,col2) VALUES('foo','bar'){{< /example >}}


### 116

Regular Expression: {{< regex >}}\bselect\b.+?\bfrom\b{{< /regex >}}

Description: Common SQL command "select"

Tags:

 * sqli

Impact: 3

 * SQL injection [7]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}SELECT foo FROM bar{{< /example >}}


### 117

Regular Expression: {{< regex >}}\bpg_user\b{{< /regex >}}

Description: PgSQL information disclosure "pg_user"

Tags:

 * sqli
 * pgsql

Impact: 7

 * SQL injection [6]
 * Low risk of false-positives [1]

Examples:

 * {{< example >}}SELECT * FROM pg_user{{< /example >}}


### 118

Regular Expression: {{< regex >}}\bpg_database\b{{< /regex >}}

Description: PgSQL information disclosure "pg_database"

Tags:

 * sqli
 * pgsql

Impact: 7

 * SQL injection [6]
 * Low risk of false-positives [1]

Examples:

 * {{< example >}}SELECT * FROM pg_database{{< /example >}}


### 119

Regular Expression: {{< regex >}}\bpg_shadow\b{{< /regex >}}

Description: PgSQL information disclosure "pg_shadow"

Tags:

 * sqli
 * pgsql

Impact: 7

 * SQL injection [6]
 * Low risk of false-positives [1]

Examples:

 * {{< example >}}SELECT * FROM pg_shadow{{< /example >}}


### 120

Regular Expression: {{< regex >}}\b(current_)?database\b.*?\(.*?\){{< /regex >}}

Description: Common SQL function "database"

Tags:

 * sqli

Impact: 2

 * SQL injection / information disclosure [6]
 * High risk of false-positives [-4]

Examples:

 * {{< example >}}SELECT database(){{< /example >}}
 * {{< example >}}SELECT current_database(){{< /example >}}

## Tags

Each filter has tags associated which are typically abbreviations of attacks. These stand for:

- bash: Bash-related attacks
- css: Cascading Style Sheets
- dos: Denial of Service
- id: Information Disclosure
- ldap: LDAP protocol
- lfi: Local File Inclusions
- mongo: MongoDB injections
- mssql: MSSQL injections
- mysql: MySQL injections
- perl: Perl-related attacks
- pgsql: PostgreSQL injections
- php: PHP-related attacks
- rce: Remote Code Execution
- rfi: Remote File Inclusion
- spam: Attempts to send spam
- sqli: SQL injections
- sqlite: SQLite injections
- tsql: Transact-SQL injections
- unix: \*nix-related attacks (Linux, Unix, etc.)
- win: Windows-related attacks
- xss: Cross-Site Scripting
- xxe: XML External Entity attacks


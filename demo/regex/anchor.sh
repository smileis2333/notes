#!/bin/bash

#文本
#hello world
#hi hello
#hello, hj


# 行锚^$
# 匹配文本中所有存在hello的行
grep "hello" regex

# 只匹配行首是hello的
grep "^hello" regex

# 只匹配行尾的
grep "hello^" regex

# 整行只有hello
grep "^hello$" regex

# 匹配空行
grep "^$" regex

#词锚\<, \>，等价于\b
# 词首
# 文本
#abchello world
#abc helloabc abc
#abc abchelloabc abc

grep --color "\<hello" REG # grep --color "\bhello" REG

# 词尾
grep --color "hello\>" REG # grep --color "hello\b" REG

#只要hello不是词头均可以匹配，与\b相反
grep --color "\Bhello" REG

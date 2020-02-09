#!/bin/bash

# 文本
#a a
#aa
#a aa
#bb
#bbb
#c cc ccc
#dddd d dd ddd
#ab abc abcc
#ef eef eeef

# 连续次数的匹配
# 匹配a连续出现>=2次的行
grep --color -n "b\{2\}" regex.txt

# 匹配刚好单词是两个b的行
grep --color -n "\bb\{2\}\b" regex.txt

# 匹配出现2到4的行(2,3,4)
grep --color -n "d\{2,4\}" regex.txt

#\{x,\}大于等于x次
#\{,x\}小于等于x次
# *等价于\{0,\}
# \?等于与\{,1\}
# \+等于与\{1,\}

# .匹配任意字符(换行符除外)
grep --color -n "ee.." regex.txt

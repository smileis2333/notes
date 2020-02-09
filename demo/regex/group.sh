#/bin/bash
# hello为一组，代表hello出现两次, hellohello
\(hello\)\{2\}

# 分组嵌套， abefefabefef
\(ab\(ef\)\{2\}\)\{2\}

# 后向引用, hello world hello，\1,\2,\3同理，为从左边第一个`(`开始算起
\(hello\) world \1 # equal \(hello\) world \(hello\)




echo -n "Enter your commit message:"        #参数-n的作用是不换行，echo默认是换行
read  msg                                   #从键盘获取信息输入
echo "commit success!，your commit msg is $msg , welcome to my program"     

git add .

git commit -m "$msg"

# 上传到 gitee
git push origin master
# 上传到 github
git push origin_github master

# 不关闭当前窗口
exec /bin/bash
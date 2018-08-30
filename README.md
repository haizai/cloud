# cloud
个人云服务器
地址 已停止续费
``` 
npm install
```
安装所有依赖
```
npm install --production
```
安装生产坏境的依赖
```
npm run dev
```
本地测试环境，热更新。
```
npm run build
```
webpack打包，UglifyJs压缩

```
npm run server
```
生产坏境
```
npm run pm2
```
pm2生产坏境,遇到错误自动重启，允许多线程（虽然我的学生云服务器是单核单线程的...）

```
pm2 delate all
```
删除pm2坏境,其他pm2指令见pm2官网

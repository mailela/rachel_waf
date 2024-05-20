# Rachel WAF
`Rachel WAF是一个专门为AWD而生的PHP防火墙,采用PHP+JS+CSS编写而成,单文件设计模式,无任何外部依赖,其特点有将原始请求包拼凑出来而实现的内网转发,基于putenv和ld_preload的命令执行保护,一个漂亮的前端以及流量重放功能.`

# 功能介绍
`易于配置(单文件, 无需加载外部js/css)
可以随时开启/关闭某项防御`
# 更多文档
[文档](https://rachelwaf.apifox.cn/)

# 基本防御
- 数据库注入(sql injection)
- 文件上传(upload)
- 上传类型过滤
- 文件包含(lfi) 
- flag关键字
- PHP反序列化(unserialize)
- 命令执行(rce)
- 分布式拒绝服务攻击(ddos)
- 请求头,请求参数(GET/POST)关键字
- 特殊字符
- IP白名单
- IP黑名单

# 深度防御
- 响应检测/反向代理(默认将流量发送至本地服务器自检,可配置代理服务器IP及端口实现反代功能)
- 响应flag检测并返回虚假flag
- 基于open_basedir的PHP文件操作保护
- 基于LD_PRELOAD的指令执行保护

# 网页控制台
- 功能开关及配置
- 实时日志查看
- 日志流量重放, 可广播流量至指定网段
- RCE/文件上传/深度检测 防御通知(由于chrome无法允许不安全的网站(无SSL证书)显示通知,请使用Firefox并修改about:config中dom.webnotifications.allowinsecure为true

# 权限控制
    - 管理员账号密码
    - 管理员权限
    - 用户权限
    - 用户组
    - 用户组权限


# 安装及使用
在应用程序入口引入WAF.php文件即可使用
```
include_once 'WAF.php';
```
管理入口默认为: http://yourdomain/?WAF=ui

![登录界面](https://api.apifox.com/api/v1/projects/3772376/resources/438193/image-preview)


![系统初始化](https://api.apifox.com/api/v1/projects/3772376/resources/438194/image-preview)


![image.png](https://api.apifox.com/api/v1/projects/3772376/resources/438195/image-preview)


![image.png](https://api.apifox.com/api/v1/projects/3772376/resources/438196/image-preview)


![image.png](https://api.apifox.com/api/v1/projects/3772376/resources/438201/image-preview)


![image.png](https://api.apifox.com/api/v1/projects/3772376/resources/438202/image-preview)


![image.png](https://api.apifox.com/api/v1/projects/3772376/resources/438204/image-preview)


![image.png](https://api.apifox.com/api/v1/projects/3772376/resources/438205/image-preview)


![image.png](https://api.apifox.com/api/v1/projects/3772376/resources/438206/image-preview)



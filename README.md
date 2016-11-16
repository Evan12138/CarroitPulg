# CarroitPulg

插件集合

包含以下插件

1.发送验证码 SendSMS

2.窗体大小改变 Resize

3.文字字数统计/限制 WordCount


包含以下扩展方法

1.获取QueryString $.GetQueryString("name"); //对应的qs

2.替换全部 $.ReplaceAll("input","i","b"); //输出bnput

3.判断是否微信浏览器 $.IsWeiXin();//true OR false

4.是否移动设备 $.IsMobile();//true OR false

5.是否移动设备的另外一种方法 $.IsMobileUserAgent();//true OR false

6.是否安卓设备 $.IsAndroid();//true OR false

7.是否苹果设备 $.IsApple();//true OR false
    
8.加载CSS文件 $.LoadStyle("/a.css");
    
9.格式化时间 $.FormartDate("yyyy-MM-dd hh:mm:ss");//输出 2016-11-17 00:28:12

10.输出个性化时间

    a、< 60s, 显示为“刚刚”
    b、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
    c、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
    d、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
    e、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”

11.返回页面ScrollTop $.GetScrollTop();
    
12.金额大写转换 $.TransMoney("12.34"); //拾贰元叁角肆分

13.截取字符串 $.CutString("zhang",2,"..."); //输出 zh...

14.生成随机字符串 $.RadomStr();

15.给金额千分位加逗号 $.FormatMoney("12345"); //输出 12,345

16.获取农历 $.LunarCalendar("2016-01-01"); //时间格式 2016-01-01 or 2016/01/01 返回格式 丙申(猴)年 十月初九

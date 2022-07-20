### 计划的功能列表

- 替换默认的浏览器新标签页
  - 百度搜索引擎
  - 谷歌搜索引擎
  - 接管书签栏
- 指定网址加边框和标记
  - 边框和标记颜色需要能自行选择
  - 标记文本需要能自行修改
  - 网址需不需要自动填充用户名和密码
- 给页面注入 JSON 序列化打印方法

### 已有功能：

1、里面有一个方法叫`cj`，你可以用它打印`json`对象看看
例如：

```javascript
let obj = [
  {
    key: 0,
    name: "John Brown",
    age: "32",
    address: "New York No. 1 Lake Park",
  },
  {
    key: 1,
    name: "Jim Green",
    age: "42",
    address: "London No. 1 Lake Park",
  },
  {
    key: 2,
    name: "Joe Black",
    age: "32",
    address: "Sidney No. 1 Lake Park",
  },
];
cj(obj);
console.log(obj);
```

2、给某些你看不顺眼的网站加个边框，并打一个标记，以后当你每次都打开这个网站时，都会显示这个标记  
开发过程中，你可以很容易地区分是在生产环境还是在开发环境，或者是是在测试环境，由你来定咯

3、你一定遇到过没有登录 CSDN 时，想复制代码片段却无法复制，你可能会抓狂。。。  
别急，我能搞定 🤔🤔🤔🤔🤔🤔

### 用什么开发的

很简单，就一句话：Vite + Vue3 + Typescript + Naive-Ui

### 什么？你还想加自己的功能？？安排 👉👉👉👉

```shell
git clone https://github.com/1163895390wjh/chrome-extension-vite.git

#或者国内源
git clone https://gitee.com/mr-jinhui/chrome-extension-vite.git
npm install -g pnpm

pnpm install

# 开发调试
npm run dev

# 生产编译
npm run build

# 以上两条命令都会生成编译文件，在output目录下
# zips目录下都是已经编译好的文件
```

安装：

- 打开 Chrome 浏览器-->访问`chrome://extensions/`--->启用开发者模式--->加载已解压的扩展程序--->选择`output`目录--->选择
- 回到浏览器，右上角单击插件图标，进入设置页面可自行设置

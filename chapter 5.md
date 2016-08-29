## 5.4 
  把类名等于"popup"的链接添加onlick事件
```javascript
  var links = document.getElementsByTagName("a");
  for(var i = 0; i < links.length; i++){
    if(links[i].getAttribute("class") == "popup"){
      links[i].onclick = function(){
        popup(this.getAttribute("href"));
        return false;
      }
    }
  }
```
  这条语句将在JS文件被加载时立刻执行，但是如果JS文件是从HTML文档的head部分用script标签调用的，它将在HTML文档之前加载到浏览器。而此时并没有完整的DOM，所以getElementsByTagName就不能干活。解决的方法是通过onload事件来确定文档是否加载完成：
```javascript
  window.onload = prepareLinks;
  function prepareLinks(){
    for(var i = 0; i < links.length; i++){
      if(links[i].getAttribute("class") == "popup"){
        links[i].onclick = function(){
          popup(this.getAttribute("href"));
          return false;
        }
      }
    } 
  }
```
  文档被加载到一个浏览器窗口，document对象又是window对象的一个属性。当window对象触发onload事件时，document对象已经存在。上面的代码把JS打包在prepareLinks函数中，并把这个函数添加到window对象的onload事件里。
  
## 5.5 向后兼容
### 5.5.1 对象检测
  例如检测getElementsByTagName是否可用那么用下面的语句：
```javascript
  if(!document.getElementsByTagName) return false;
```
### 5.5.2 浏览器嗅探技术
  这种技术是指通过提取浏览器供应商提供的信息俩解决向后兼容的问题。理论上可以通过JS来获取浏览器品牌和版本的信息。
  但是风险非常大，因为浏览器会撒谎而且有的浏览器允许用户修改这些信息！！
## 5.6 性能考虑
### 5.6.1 尽量少访问DOM和尽量减少标记
  访问DOM的方式对脚本性能产生非常大的影响，看下面的例子：
```javascript
  if(document.getElementsByTagName("a").length > 0){
    var links = document.getElementsByTagName("a");
    for(var i = 0; i < links.length; i++){
      //do something
    }
  }
```
  上面的代码会遍历两次DOM，改变的方法是把第一次的遍历保存在一个变量里！
### 5.6.3 压缩脚本
  把脚本文件中不必要的字节如空格，注释， 甚至会重写一些变量名字等等来提高加载速度！
  

  
  

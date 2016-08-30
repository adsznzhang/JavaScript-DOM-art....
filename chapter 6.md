### 6.3.1 添加事件处理函数
需要一个函数把有关操作关联到onlick事件上，函数命名为prepareGallery.
  下面是这个函数好完成的工作：
  - 检查浏览器是否理解getElementsByTagName
  - 检查浏览器是否理解getElementById
  - 检查是否存在一个ID为imagegallery的元素
  - 遍历imagegallery元素中的链接
  - 设置onclick事件，让它在有关链接被点击时完成下面的操作：
   把这个链接作为参数传递给showPic函数,取消链接被点击时的默认行为，不让浏览器打开这个链接。
   


这个函数的代码如下：
```javascript
  function prepareGallery(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for(var i = 0; i < links.length; i++){
      links[i].onclick = function(){
        showPic(this);
        return false;
      }
    }
  }
```
###6.3.2 共享onload事件
  必须执行prepareGallery函数才能对onclick事件进行绑定。如果在HTML文档完成加载前执行脚本，此时的DOM是不完整的。幸运地是前辈们把网页完成加载时会触发一个onload事件，这个事件与window对象相关联。为了函数正常执行，必须把prepareGallery绑定到这个事件上：
```javascript
  window.onload = prepareGallery;
```
  上面代码的不足之处是假设有两个或以上的函数，如果想让他们在页面加载时执行，当逐一绑定到onload事件上时，只有最后那个才会被实际执行！
```javascript
  window.onload = firstFunction;
  window.onload = secondFunction;
```
  上面的代码只有secondFunction才会被执行。解决方法是创建一个匿名函数来容纳这两个函数，然后把匿名函数绑定到onload事件上如下：
```javascript
  window.onload = function(){
    firstFunction();
    secondFunction;
  }
```
另一个更为弹性的解决办法是不管有在页面加载完毕时执行多少个函数，他都可以正常执行，代码如下：
```javascript
  function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != "function"){
      window.onload = func;
    }
    else {
      window.onload = function(){
        oldonload();
        func();
        }
    }
  }
```
## 6.4 showPic函数
  showPic函数主要完成两件事：
  - 找出ID属性是placeholder的图片并修改src
  - 找出ID属性是description的元素并修改其第一个子元素firstchild的nodeValue属性
  

```javascript 
  function showPic(whichpic){
    if(!document.getElementById("placeholder")) return false;
    var sorce = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    if(document.getElementById("description")){
      var text = whichpic.getAttribute("title");
      var description = document.getElementById("description");
      description.firstChild.nodeValue = text;
    }
    return true;
  }
  ```
    还存在一个问题：如果把placeholder图片从标记文档里删掉并在浏览器里刷新这页面，就会出现这种情况，无论点击imagegallery清单里的哪一个链接，都没有反应。是否要返回一个false值以取消onclick事件的默认行为，其实应该由showPic函数决定，如果图片切换成功，返回true。可以添加下面的代码
```javascript
    function prepareGallery(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for(var i = 0; i < links.length; i++){
     link[i].onclick = function(){
      return !showPic(this)
      }
    }
  }
```
##6.5 优化
  showPic函数里需要处理的几个假设：
- 检查title属性是否真的存在
- 检查palceholde元素是否存在
- 检查description 元素的第一个子元素是否是文本节点通过nodeType来检测



引入上面几个检测后的代码如下：
```javascript
  

### 7.1.1 document.write
  利用DOM方法在WEB中往文档添加标记时的两种技术分别是document.write和innerHTML。例子：
```javascript
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8"/>
    <title>Test</title>
  </head>
  <body>
    <script>
      document.wirte("<p>This is inserted.</p>");
    </script>
  </body>
  </html>
```
document.write的最大缺点是它违背了行为与表现分离的原则。即使把document.wirte语句挪到外部函数里，也还是需要在标记的body部分使用script
标签才能调用那个函数！所以尽量避免使用document.write方法！

### 7.1.2 innerHTML属性
  innerHTML属性可以用来读或者写某给定元素里的HTML内容。例子：
```javascript
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8"/>
    <title>Test</title>
  </head>
  <body>
    <script>
      document.wirte("<p>This is inserted.</p>");
    </script>
    <div id="textdiv">
      <p>This is <em>my</em>content.</p>
    </div>
  </body>
  </html>
  //就innerHTML属性来看，id为testdiv的标记里面只有一个值为<p>This is <em>my</em>content.</p>的HTML字符串
```
  编辑test.html文件，让id属性值等于testdiv的元素变成空白：
```javascript
  <div id="textdiv">
  </div>
  //把下面这段JS放到example.js文件中，就可以把一段HTML内容插入到<div>标签内了
  window.onload = function(){
    var testdiv = document.getElementById("testdiv");
    testdiv.innerHTML = "<p>This is <em>my</em>content.</p>";
  }
```
innerHTML属性不会返回任何对刚插入内容的引用。如果想对刚插入内容进行处理，则需要使用DOM。
类似于document.write方法，innerHTML属性也是HTML专有属性，不能用于任何其他标记语言文档！在任何时候，标准的DOM都可以用来替代innerHTml
虽说往往需要编写一些代码，但DOM提供了更高的精确性和功能！
## 7.2 DOM方法
  DOM不仅可以获取文档的内容，还可以更新文档的内容，但是并未改变文档的物理内容，在编辑器中打开文档我们将看不到任何变化，因为在浏览器
  看来DOM节点树才是文档，我们并不是在创建标记，而是在改变DOM节点树！！
###7.2.1 createElement方法
  编辑test.html文件如下：
```javascript
  <div id="testdiv">
  </div>
```
如果想把一段文本插入testdiv元素，就是把一个P元素节点插入到div作为一个子节点，div元素已经有一个子节点，那是一个id属性节点，值是textdiv
步骤如下：
- 创建一个新元素p
- 把p插入到节点树种
```javascript
  document.createElement(nodeName);
  document.createElement("p");
  //最好把创建的元素赋给一个变量
  var para = document.createElement("p");
```
现在para变量包含着一个指向刚创建出来p元素的引用。但它还不是任何一棵DOM节点树的组成部分。这种情况称为document fragment.
### 7.2.2 appendChild方法
  方法如下：
```javascript
  var testdiv = document.getElementById("testdiv");
  var para = document.createElemnt("p");
  testdiv.appendChild(para);
```
### 7.2.3 createTextNode方法
  由于太简单我直接写代码了：
```javascript
  window.onload = function(){
    var para = document.createElement("p");
    var testdiv = document.getElementById("testdiv");
    testdiv.appendChild(para);
    var txt = document.createTestNode("Hello world");
    para.appendChild(txt);
  }
```
把上面代码放到example.js文件中魔法就产生啦！！

### 7.2.4 一个更复杂的组合
  用DOM来实现下面的文档：
```javascript
  <p>This is <em>my</em> content.</p>
```
首先要搞清楚它包含哪些节点：
- 一个文本节点，内容是“This is”
- 一个元素节点“em”,这个元素节点本身还包含一个文本节点内容是“my”
- 一个文本节点，其内容是“content”



然后制定流程：
- 创建一个p元素节点并把它赋给变量para
- 创建一个文本节点并把它赋给变量txt1
- 把txt1插入para
- 创建一个em元素节点并赋给emphasis
- 创建一个文本节点赋值给变量txt2
- 把txt2插入到emphasis
- 把emphasis插入para
- 创建一个文本节点赋值给变量txt3
- 把para追加到text.html文档中的testdiv元素上



整个代码如下：
```javascript
  window.onload = function(){
    var para = document.createElement("p");
    var txt1 = document.createTextNode("This is ");
    para.appendChild(txt1);
    var emphasis = document.createElment("em");
    var txt2 = document.createTextNode("my");
    emphasis.appendChild(txt2);
    para.appendChild(emphasis);
    var txt3 = document.createTextNode(" content.");
    para.appendChild(txt3);
    var testdiv = document.getElementById("testdiv");
    testdiv.appendChild(para);
  }
```
## 7.3用DOM重写图片库
  DOM实现步骤如下：
- 创建一个img元素节点
- 设置这个节点的id属性
- 设置src属性
- 设置这个节点alt属性
- 创建一个p元素节点
- 设置这个节点的id属性
- 创建一个文本节点
- 把这个文本节点追加到p元素上
- 把p元素和img元素插入到gallery.html文档

```javascript
  var placeholder = docuemnt.createElement("img");
  placeholder.setAttribute("id", "placeholder");
  placeholder.setAttribute("src","images/placeholder.gif");
  placeholder.setAttribute("alt", "my image agllery");
  var descritpion = document.createElement("p");
  description.setAttribute("id", "description");
  var desctext = document.creatTextNode("Choose an imgage");
  description.appendChild(desctext);
  //最后一步是把新建的元素插入文档，凑巧的是图片清单ul是文档的最后一个元素所以如果把placeholder和description加入body元素上
  //他们就会出现在清单的后面
  document.getElementsByTagName("body")[0].appendChild(placeholder);
  document.getElementsByTagName("body")[0].appendChild(description);
  
```
### 7.3.1在已有元素前插入一个新元素
  DOM提供了一个名为insertBefore()方法！你必须告诉他三个秘密：
- 新元素： 你想插入的元素
- 目标元素： 你想把这个新元素插入到哪个元素
- 父元素： 目标元素的父元素



比如下面的代码可以把placeholder和description插入到清单的:
```javascript
  var gallery = document.getElementById("imagegallery");
  gallery.parentNode.insertBefore(placeholder, gallery);
  //gallery的parentNode属性值是body元素，所以placeholder元素将被插入为body元素的新子元素，它被插入到兄弟元素gallery的前面
  gallery.parentNode.insertBefore(description, gallery);
```
### 7.3.2 在现有元素后插入
  DOM本身没有insertAfter所以创建的函数代码如下：
```javascript
  function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement) {
      parent.appendChild(newElement);  
    }
    else {
      parent.insertBefore(newElement, targetElement.nextSibling);
    }
  }
```
  使用insertAfter函数把placeholder插入到gallery后面，再把description插入到placeholder后面，当然要先判断新的DOM方法是否可用
```javascript
  function preparePlaceholder(){
    if(!document.createElement) return false;
    
  }
```
### 图片库的二次改进版
现在showPic.js文件包含5个不同的函数，他们是：
- addLoadEvent 函数
- insertAfter 函数
- preparePlaceholder
- prepareGallery
- showPic




**addLoadEvent和insertAfter属于通用型函数，他们在许多场合都能派上用场** 通过addLoadEvent函数来调用preparePlaceholder和prepareGallery函数
整个代码如下：
```javascript
  
```

## 7.4 Ajax
**Ajax的主要优势是对页面的请求以异步方式发送到服务器。而服务器不会用整个页面来响应请求，它会在后台处理请求，同时用户还能继续浏览页面与页面交互。你的脚步则可以按需加载和创建页面内容，而不会打断用户的浏览体验。**
### 7.4.1 XMLHttpRequest对象
**Ajax的核心是XMLHttpRequest对象!**
下面来个例子！
```javascript
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="utf-8">
    <title>Ajax</title>
  </head>
  <body>
  
    <div id="new"></div>
    
    <script src="scripts/addLoadEvent.js"></script>
    <script src="scripts/getHTTPObject.js"></script>
    <script src="scripts/getNewContent.js"></script>
  </body>
  </html>
```
为了模拟服务器的响应，在ajax.html文件旁边创建一个example.txt文件内容为：This was loaded asynchronously!
微软最早在IE5中以ActiveX对象的形式实现了一个名叫XMLHTTP的对象。在IE中创建新的对象需要下列代码：
```javascript
  var request = new ActiveXObject("Msxml2.XMLHTTP.3.0");
  //其他浏览器则基于XMLHtttpRequest来创建
  var request = new XMLHttpRequest();
  //为了兼容所有浏览器getHTTPObject.js文件中的getHTTPObject函数要这样来写：
  function getHTTPObject(){
    if(typeof XMLHttpRequest == "undefined")
      XMLHttpRequest = function(){
        try {return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
          catch(e){}
        try {return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
          catch(e){}
        try {return new ActiveXObject("Msxml2.XMLHTTP");}
          catch(e){}
        return false;
      }
      return new XMLHttpRequest();
  }
  
  //这样在脚本中使用XMLHttpRequest对象时，可以将这个新对象直接赋值给一个变量如下
  var request = getHTTPObject();
  
  
```

在getNewContent.js文件中添加下面的代码：
```javascript
  function getNewContent(){
    var request = getHTTPObject();
    if(request){
      request.open("GET","example.txt", true);
      //XMLHttpRequest对象有许多方法，其中最有用的是OPEN
      request.onreadystatechange = function(){
        if(request.readyState == 4){
          var para = document.createElement("p");
          var txt = document.createTextNode(request.responseText);
          para.appendChild(txt);
          document.getElemntById("new").appendChidl(para);
        }
      };
      request.send(null);
    }
    else {
      alert("Sorry, your browser doesn\'t support XMLHttpRequest");
    }
  }
  addLoadEvent(getNewContent);
```
  



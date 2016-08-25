## 4.1 标记
  把整个图片库的浏览链接集中安排在图片库主页里，只在用户点击了某个图片链接时才把相应图片显示！
  首先创建一个有序清单元素<ol>来标记图片的链接：
  ```javascript
  <!DOCTYPE html>
  <html land="en">
  <head>
    <meta charset="utf-8">
    <title>Image Gallery</title>
  </head>
  <body>
    <h1>Snapshots</h1>
    <ul>
      <li>
        <a href="images/fireworks.jpg" title="A fireworks display">Fireworks</a>
      </li>
      <li>
        <a href="images/fireworks.jpg" title="A fireworks display">Fireworks</a>
      </li>
      <li>
        <a href="images/fireworks.jpg" title="A fireworks display">Fireworks</a>
      </li>
      <li>
        <a href="images/fireworks.jpg" title="A fireworks display">Fireworks</a>
      </li>
    </ul>
    </body>
    </html>
```
what we want is ：
- 当点击某个链接时，留在当前网页而不是另一个窗口
- 当点击链接时，同时看到图片和图片清单。

what we need to do:
- 通过增加一个“占位符”图片的办法在主页上为图片留一个浏览区域
- 当点击某个链接时，拦截这个网页的默认行为
- 在点击链接时，把“占位符” 图片替换为与那个链接相对应的图片

### 解决占位符问题：
```
  <img id="placeholder" src="images/placeholder.gif" alt="my image gallery"/>
```

## 4.2 JavaScript部分
  
```javascript
  function showPic(whichpic){
    var source = whichpic.getAtrribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAtrribute("src", source);
  }
```

## 4.3 应用JS函数
  需要考虑事件处理函数，onclick会把用户带到图片查看窗口，如果要阻止此事件需要了解事件处理函数的机制。在给某个元素添加了事件处理函数后
  一旦事件发生，相应的JS代码就会执行。被调用的JS可以返回一个值，并把这个值传递给事件处理函数，我们可以让onlick返回false来阻止。例如：
```javascript
  <li>
    <a href="images/fireworks.jpg" onlick="showPic(this); return false;" title="A fireworks display">Fireworks</a>
  </li>
```
## 4.4 对这个函数进行扩展
  图片库文档里的每个图片链接都有一个title属性。可以把这个属性提取出来让它和相应的图片一同显示在网页上，提取title:
```javascript
  var text = whichpic.getAttribute("title");
```
  下一步需要考虑如何把它插入到HTML文档中！
  
### 4.4.1 childNodes 属性
      在一棵节点树上，childNodes属性可以用来获取任何一个元素的所有子元素，它是一个包含这个元素全部子元素的数组：
  ```javascript
    element.childNodes
  ```
      假设需要把某个文档的body元素全体子元素检索出来用下面方法获取body所有子元素：
  ```javascript
    var body_element = document.getElementsByTagName("body")[0].childNodes
  ```
      下面代码是弹出alert对话框显示body元素子元素的总个数：
  ```javascript
    function countBodyChildren(){
      var bodu_element = document.getElementsByTagName("body")[0];
      alert(body_element.childNodes.length);
    }
  ```
### 4.4.2 nodeType 属性
        根据gallery.html文件的结构，body元素应该有3个子元素分别是h1, ul和img元素。可是countBodyChildren()函数给出来的数字远
        大于此，这是因为文档树的节点类型并非只有元素节点一种。每一个节点都有nodeType属性，这个属性总共有12种，但其中常用的有三种：
        - 元素节点的nodeType属性值是1
        - 属性节点的nodeType属性值是2
        - 文本节点的nodeType属性值是3
### 4.4.3 在标记里增加一段描述
    在gallery.html文件里增加一个新的文本段。把它安排在img标签之后，为它设置一个ID方便JS引用：
```javascript
    <p id="description">Chosse an image.</p>
```
    下一步要做的是在点击链接时同时改变文本段和图片：）
### 4.4.4 用JS改变这段描述
    需要在showPic函数中添加两个变量一个储存title值一个储存段落元素：
```javascript
  function showPic(whichpic){
    var source = whichpic.getAtrribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
    var text = whichpic.getAttribute("title");
    var dexcription = document.getElementById("description");
  }
```
### 4.4.5 nodeValue属性
    nodeValue属性用来得到和设置一个节点的值，<p>元素本身的nodeValue属性是一个空值，包含在<p>元素里的文本是另一种节点，它是<p>元素的
    第一个子节点。因此想要得到段落的文本内容就要像下面这样：
```javascript
    alert(description.childNodes[0].nodeValue);
```
### firstChild和lastChild属性
    数组元素childNodes[0]更为直观的方法是写成node.firstChild同理node.lastChild你也懂得！
### 利用nodeValue属性刷新图片的描述
```javascript
    var text = whichpic.getAttribute("title");
    var description = document.getElementsById("description");
    description.firstChild.nodeValue = text;
```
    下面是最终的JS代码：
```javascript 
    function showPic(whichpic){
      var source = whichpic.getAtrribute("href");
      var placeholder = document.getElementsById("placeholder");
      placeholder.setAttribute("src", source);
      var text = whichpic.getAtrribute("title");
      var description = document.getElementsById("description");
      description.firstChild.nodeValue = text;
    }
```
  为了使页面变得好看我们可以应用下面的样式：
```
  body {
    font-family: "Helvetica", "Arial", serif;
    color: #333;
    backgroud-color: #ccc;
    margin: 1em 10%;
  }
  h1 {
    color: #333;
    background-color: transparent;
  }  
  a {
    color: #c60;
    background-color: transparent;
    font-weight: bold;
    text-decoration: none;
  }
  ul {
    padding: 0;
  }
  li {
    float: left;
    padding: 1em;
    list-style: none;
  }    
  img {
    display: block;
    clear: both;
  }

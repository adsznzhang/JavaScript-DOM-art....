# Position 
the following function will move "message" element:
```javascript
function moveMessage(){
    if(!document.getElmentById) return flase;
    if(!document.getElmentById("message")) return false;
    var elem = document.getElmentById("message");
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if(xpos == 200 && ypos == 100){
        return true;
    }
    if(xpos < 200){
        xpos++;
    }
    if(xpos > 200){
        xpos--;
    }
    if(ypos < 100){
        ypos++;
    }
    if(ypos > 100){
        ypos--;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    movement = setTimeout("movemessage()", 10);
}
```

### Make it abstract

```javascript
function moveElment(elementID, final_x, final_y,interval) {
    if(!document.getElementById) return false;
    if(!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if(xpos == final__x && ypos == final_y){
        return true;
    }
    if(xpos < final_x){
        xpos++;
    }
    if(xpos > final_x){
        xpos--;
    }
    if(ypos < final_y){
        ypos++;
    }
    if(ypos > final_y){
        ypos--;
    }
    elem.style.left = xpos + "px";
    elem.style.top = yoos + "px";
    var repeat = "moveElement('"+elementId+"',"+final_x+","+final_y+","+interval+")";
    movement = setTimeout(repeat,interval);
}
```
## 10.2 animation
A web site includes several links. When "onmouseover" it should show some picture to let user know where they will go! Basic html below:
```javascript
<!DOCTYPE html>
<html land="en";
<head>
    <meta charset = "utf-8" />
    <title>Web Design</title>
</head>
<body>
    <h1>Web Design</h1>
    <p>These are the things you should know.</p>
    <ol id = "linklist">
     <li>
        <a href= "structure.html">Structure</a>
     </li>
     <li>
        <a href = "presentation.html">Presentation</a>
     </li>
     <li>
        <a href = "behavior.html">Behavior</a>
     </li>
    </ol>
</body>
</html>
```
### 10.2.2 解决问题
- 为所有预览图片生成一张“集体照”形式的图片
- 隐藏绝大部分
- 当用户鼠标指针悬停在某个链接上时，只显示这张集体照图片的相应部分



```javascript
//把图片插入到list.html文档中
<img src="images/topics.gif" alt="building blocks of web design" id="preview" />
```
### 10.2.3 CSS
overflow属性用来处理一个元素的尺寸超出其容器尺寸的情况，可以取值4中：visible , hidden, scroll和auto
- visible:不裁剪溢出的内容，溢出内容会出现在其容器显示区域以外，全部内容可见！
- hidden: 隐藏溢出的内容，内容只显示在其容器元素的显示区域里
- scroll:类似与hidden,但显示一个滚动条可以滚动看到内容的其他部分
- auto:类似与scroll,但浏览器只在确实发生溢出的时候才显示滚动条！



首先把图片放到一个容器里，这里我们用DIV元素
```javascript
<div id="slideshow">
    <img src="images/topics.gif" alt="building blocks of web design" id="preview" />
 </div>
 
 //创建一个样式表layout.css放入styles文件夹
 #slideshow {
    width: 100px;
    height: 100px;
    position: relative;
    overflow: hidden;
 }
 //把position设置为relative很重要，因为要让子图片使用绝对位置来定位！
 
 //把样式表引入list.html
 <link rel="stylesheet" href="styles/layout.css" media="screen" />
 ```
 ### 10.2.4 Javascript部分
 使用moveElement函数来移动topics.gif图片。根据用户悬停在哪个链接上，将图片向左或者向右移动。
 ```javascript
 function prepareSlideshow() {
    //确保浏览器支持DOM方法
    if(!document.getElmentsByTagName) return false;
    if(!document.getElmentById) return false;
    //确保元素存在
    if(!document.getElmentById("linklist")) return false;
    if(!document.getElmentById("preview")) return flase;
    //为图片应用样式
    var preview = document.getElementById("preview");
    preview.style.position = "absolute";
    preview.style.left = opx";
    preview.style.top = "opx";
    //取得列表中的所有链接
    var list = document.getElmentById("linklist");
    var links = list.getElmentsByTagName("a");
    //为mouseover事件添加动画效果
    links[0].onmouseover = function(){
        moveElement("preview", -100,0,10);
    }
    links[1].onmouseover = function(){
        moveElement("preview", -200,0,10);
    }
    lins[2].onmouseover = function() {
        moveElement("preview", -300,0,10);
    }
    }
   ```
   不过上面的函数执行时：如果鼠标指针在链接间快速来回移动，动画效果将变得混乱起来。moveElement函数有写小bug
   
   ### 10.2.5 变量作用域问题
   每当用户把鼠标指针悬停在某个链接上，不管上一次调用是否已经把图片移动到位，moveElement函数都会被再次调用并试图把这个图片移动到另一个地方去！
   如果用户鼠标移动速度够快，积累在setTimeout队列里的事件就会导致动画产生滞后。为了消除滞后可以使用clearTimeout函数清楚积累在setTimeout队列里的事件！

    可是如果在还没有设置movement变量之前就执行这条语句，我们会收获一个错误，我不能使用局部变量：var movement = setTimeout(repeat,interval);
    如果这样做，clearTimeout函数调用语句将无法工作，因为局部变量movement在clearTimeout函数的上下文不存在。解决的方法时为元素创建属性
```javascript
if(elem.movement){
    clearTimeout(elem.movement);
}
elem.movement = setTimeout(repeat,interval);
```

### 10.2.6 改进动画

moveElement函数每次只移动一个像素的距离。移动效果平滑但速度有些慢！下面时让元素每次前进总距离的十分之一.
```javascript
dist =(final_x - xpos)/10;
xpos = xpos + dist;
//使用Math对象的ceil方法可以返回不小于dist值的一个整数
if(xpox < final_x){
    dist = Math.ceil((final_x - xpos)/10);
    xpos = xpos + dist;
}
```
 

## 何时使用DOM脚本设置样式
绝大多数场合应该使用CSS去声明样式。不过在使用CSS不方便的场合，可以利用DOM对文档的样式做一些增强！
现在CSS还无法根据元素之间的相对位置关系找出某个特定的元素，但这对DOM来说不怎么难。我们可以利用DOM轻而易举地找出文档中所有h1元素，然后再找出紧跟h1元素后面的那个元素，并添加样式！

```javascript
function addLoadEvent(func){
  var oldonload = window.onload;
  if (typeof window.onload != "function"){
    window.onload = func;
  }
  else {
    window.onload = function(){
      oldonload();
      func();
    }
  }
}

function styleHeaderSiblings(){
  if (!document.getElementsByTagName) return false;
  var headers = document.getElementsByTagName("h1");
  var elem;
  for(var i = 0; i < headers.length; i++) {
    elem = getNextElement(headers[i].nextSibling);
    elem.style.fontWeight = "bold";
    elem.style.fontSize = "1.2em";
  }
}
function getNextElement(node){
  if(node.nodeType == 1){
    return node;
  }
  if(node.nextSibling){
    return getNextElement(node.nextSibling);
  }
  return null;
}
```
为了看到styleHeaderSiblings函数的使用效果，写一个HTML文档，并在里面添加一些标题：

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Man bites dog</title>
</head>
<body>
  <h1>Hold the front page</h1>
  <p>This first paragraph leads you in.</p>
  <p>Now you get the nitty-gritty of story.</p>
  <p>The most important information is delivered first.</p>
  <h1>Extral Extra</h1>
  <p>Further developments are unfolding.</p>
  <p>You can read all about it here.</p>
</body>
</html>
```

### 根据某种条件反复设置某种样式
让表格形成斑马线效果，如果浏览器支持CSS3可以像下面这样：
```
tr:nth-child(odd) {background-color: #ffc;}
tr:nth-child(even) (background-color: #fff;)
```

使用JS编写函数实现同样的效果如下：
- 把文档里的所有table元素找出来
- 对每个table元素,创建odd变量并把他初始化为false.
- 遍历这个表格里的所有数据行。
- 如果变量odd的值是true,设置样式并把odd变量修改为false
- 如果变量odd的值是false, 不设置样式，但把odd变量修改为true




函数如下：
```javascript
function stripeTables(){
  if(!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName("table");
  var odd, rows;
  for( var i = 0; i < tables.length; i++){
    odd = false;
    rows = tables[i].getElementsByTagName("tr");
    for(var j = 0; j < rows.length; i++){
      if(odd == true){
        rows[j].style.backgroundColor = "#ffc";
        odd = false;
      }
      else {
        odd= true;
      }
    }
  }
}
//函数应该在页面加载时执行。用addLoadEvent（stripleTables）函数
```

###9.3.3 响应事件
下面hightlightRows函数在鼠标指针悬停在某个表格行的上方时，把该行文本加黑加粗
```javascript
function highligntRows(){
  if(!document.getElementsByTagName) retrun false;
  var rows = document.getElementsByTagName("tr");
  for(var i = 0; i < rows.length; i++){
    rows[i].onmouseover = function(){
      this.style.fontWeight = "bold";
    }
    rows[i].onmouseout = function(){
      this.style.fontWeight = "normal";
    }
  }
}
addLoadEvent(highlightRows);
```
##9.4 className

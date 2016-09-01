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
  

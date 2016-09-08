## 8.4 显示缩略语列表
要能把这些<abbr>标签中的title属性集中显示使用定义列表最合适啦！下面是希望的列表：
```javascript
<dl>
  <dt>W3C</dt>
  <dd>World Wide Web Consortium</dd>
  <dt>DOM</dt>
  <dd>Document Object Model</dd>
  <dt>API</dt>
  <dd>Application Programming Interface</dd>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>XML</dt>
  <dd>eXtensible Markup Language</dd>
</dl>
```
可以使用DOM来创建这个列表，具体步骤如下：
- 遍历这份文档所有abbr元素
- 保存每个abbr元素title属性
- 保存每个abbr元素包含的文本
- 创建一个“定义列表”元素dl
- 遍历刚才保存的title属性和abbr元素的文本
- 创建一个"定义标题"元素dt
- 把abbr元素的文本插入到dt元素
- 创建一个“定义描述”元素dd元素
- 把title属性插入dd
- 把dt元素追加到第四步创建的dl元素上
- 把dd元素追加到第四步创建的dl元素上
- 把dl元素追加的奥explanation.html文档的body元素上




### 8.4.4 displayAbbreviations 函数
函数如下：
```javascript
function displayAbbreviations(){
  var abbreviations = document.getElementsByTagName("abbr");
  if(abbreviations.length < 1) return false;
  var defs = new Array();
  for(var i = 0; i < abbreviations.length; i++){
    var current_abbr = abbreviations[i];
    var definition = current_abbr.getAttribute("title");
    var key = current_abbr.lastChild.nodeValue;
    defs[key] = definition;
  }
}
```
### 8.4.2 创建标记
定义列表是表现缩略语及其解释的理想结构。由一系列“定义标题”和相应的“定义描述”构成：
```javascript
<dl>
  <dt>Ttile 1</dt>
  <dd>Description 1</dd>
  <dt>Ttile 2</dt>
  <dd>Descritpion 2</dd>
</dl>
//用createElemnt方法创建这个定义列表，并把这个新创建的元素赋值给变量dlist;
var dlist = document.createElement("dl");
//使用for/in循环把某个数组的下标临时赋值给一个变量：
//for(variable in array)
//每次循环都需要创建一个dt元素和dd元素，我们还需要创建相应的文本节点并把他们分别添加到新创建的dt和dd元素中

for(key in defs){
  var definition = defs[key];
  var dtitle = document.createElement("dt");
  var dtitle_text = document.createTextNode(key);
  //使用appendChild()方法把dtitle_text文本节点添加到dtitle元素节点中
  dtitle.appendChild(dtitle_text);
  //重复这个过程创建dd元素
  var ddesc = document.createElement("dd");
  var ddesc_text = document.createTextNode(definition);
  ddesc.appendChild(ddesc_text);
  //把dt和dd追加到dl元素上！
  dlist.appendChild(dtitle);
  dlist.appendChild(ddesc);
}
```
与其把这个定义列表突兀地插入文档，不如给它加上一个描述性标题如下：
```javascript
var header = document.createElement("h2");
var header_text = document.createTextNode("Abbreviations");
header.appendChild(header_text);
//对于结构复杂的文档可能需要借助ID才能把创建的元素插入到文档的特定位置，引用body标签的具体做法有两种
document.getElementsByTagName("body")[0];
//第二种做法是使用HTML-DOM：
document.body.appendChild(header);
document.body.appendChild(dlist);
```
下面是完整的diaplayAbbreviations()函数代码：
```javascript
function displayAbbreviations(){
  var abbreviations =document.getElementsByTagName("abbr");
  if(abbreviations.length < 1) return false;
  var defs = new Array();
  for(var i = 0; i < abbreviations.length; i++){
    var current_abbr = abbreviations[i];
    var definition = current_abbr.getAttribute("title");
    var key = current_abbr.lastChild.nodeValue;
    defs[key] = definition;
  }
  var dlist = document.createElement("dl");
  for(key in defs){
    var definition = defs[key];
    var dtitle = document.createElement("dt");
    var dtitle_text = document.createTextNode(key);
    dtitl.appendChild(dtitle_text);
    var ddesc = document.createElement("dd");
    var ddexc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  var header = document.createElement("h2");
  var header_text = document.createTextNode("Abbreivaitions");
  header.appendChild(header_text);
  document.body.appendChild(header);
  document.body.appendChild(dlist);
}
```
检查兼容性：
```javascript
if(!document.geElementsByTagName) return false;
if(!document.createElement) return false;
if(!document.createTextNode) return false;
//把上面合并为一句
if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
//这个函数应该在页面加载时调用可以通过window.onload来实现
function addLoadEvent(func) {
  var oldonload = window.onload;
  if(typeof window.onload != "function"){
    window.onload = func;
  }
  else{
    window.onload = function(){
      oldonload();
      func();
    }
  }
}
```
### 8.4.3 万恶的IE浏览器
displayAbbreviations 在IE6或更早的版本可能会出错并无法显示“缩略语列表” 因为直到IE7才支持abbr元素。。。解决的办法是：从abbr元素提取title属性值和文本值得for循环里添加一条语句：
```javascript
for(var i = 0; i < abbreviations.length; i++){
  var current_abbr = abbreviations[i];
  if(current_abbr.childNodes.length < 1) continue;
  var definition = current_abbr.getAttribute("title");
  var key = current_abbr.lastChild.nodeValue;
  def[key] = definition;
}
```
因为IE浏览器在统计abbr元素的子节点个数时总会返回一个错误的值零，所以这条新语句就会让IE浏览器不再继续执行循环中的后续代码，因为defs数组是空的，所以它将不会创建任何dt和dd，还需要在for循环后面添加一条语句：如果缩略语dl元素没有任何子节点，则立刻退出！

```javascript
if(dlist.childNodes.length < 1) return false;
```

## 8.5 显示文献来源链接表
请看explanation.html文档中下面的标记：
```
<blockquote cite="http://www.w3.org/DOM/">
  <p>balabal</p>
</blockquote
```
浏览器会忽略blaockquote中的cite属性，可以通过JS和DOM来显示他们步骤如下：
- 遍历这个文档所有blockquote元素
- 从blockquote元素提取cite属性的值
- 创建一个标识文本是source的链接
- 把这个链接赋值为blocquote元素的cite属性值
- 把这个链接插入到文献节选的末尾




编写displayCiteations函数
```javascript
//找出所有blockquote元素，并用一个简单的测试检查本次循环中当前文献节选有没有这个属性
function displayCitations(){
  var quotes = document.getElementsByTagName("blockquote");
  for(var i = 0; i < quotes.length; i++){
    if(!quotes[i].getAttribute("cite")){
      continue;
    }
    var url quote[i].getAttribute("cite");
  }
}
```
我们想把文献来源链接放在blockquote元素的最后一个子元素节点之后，显然我们应该先找当前blockquote元素的lastChild属性！可是我们会遇到一个问题blockquote元素的最后一个子节点应该是p元素可以在他们之间还有一个换行符如下：
```</p>
</blockquote>
```
有些浏览器会把这个换行符解释为一个文本节点，所以我们要另寻方法，可以把blockquote元素里的所有元素节点找出来，如果用通配符“*”作为参数传递给getElementsByTagName，它就会返回所有元素！然后再用数组长度减一就是最后一个元素啦！！如下：
```javascript
var quoteElements = quotes[i].getElementsByTagName("*");
var elem = quoteElements[quoteElments.length - 1];
//与其假设quoteElements返回一个元素节点数组不如增加一项测试来检查它的长度是否小于1
if(quoteElements.length < 1) continue;
```
创建链接
```javascript
 var link = document.createElement("a");
 var link_text = document.creatTextNode("sorce");
 link.appendChild(link_text);
 link.setAttribute("href", url);
```
插入链接
```javascript
var superscript = document.createElement("sup");
superscript.appendChild(link);
//elem对应blockquote元素最后一个元素节点
elem.appendChild(superscript);
```
下面是完整的displayCitations函数：
```javascript

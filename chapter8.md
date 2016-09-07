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

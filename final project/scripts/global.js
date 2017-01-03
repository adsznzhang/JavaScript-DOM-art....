//添加几个在整个站点都会用到的函数！
function addLoadEvent(func){
  var oldonload = window.onload;
  if(typeof window.onload != "function"){
    window.onload = func;
  }else {
    window.onload = function(){
      oldonload();
      func();
    }
  }
}

//insertAfter 也很有用
function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  if(parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  }else{
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}
//最后是addClass函数

function addClass(element,value) {
  if(!element.className){
    element.className = value;
  }else {
    newClassName = element.className;
    newClassName+= " "
    newClassName+= value;
    element.className = newClassName;
  }
}
//页面突出函数
function highlightPage() {
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;
  var headers = document.getElementsByTagName("header");
  if(headers.length == 0) return false;
  var navs = headers[0].getElementsByTagName("nav");
  if(navs.length == 0) return false;
  var links = navs[0].getElmentsByTagName("a");
//这有吗？  for(var i = 0;i < links.length; i++){
    var linkurl;
    for(var i = 0; i<links.length; i++){
      linkurl = links[i].getAttribute("href");
      if(window.location.href.indexOf(linkurl) != -1){
        links[i].className = "here";
        var linktext = links[i].lastChild.nodeValue.toLowerCase();
        document.body.setAttribute("id",linktext);
      }
    }
}
addLoadEvent(highlightPage);

//12章里的幻灯片函数
function moveElement(elementID, final_x,final_y,interval){
  if(!document.getElementById) return false;
  if(!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  if(elem.movement){
    clearTimeout(elem.movement);
  }
  if(!elem.style.left){
    elem.style.left = "0px";
  }
  if(!elem.style.top){
    elem.style.top="0px";
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if(xpos == final_x && ypos == final_y){
    return true;
  }
  if(xpos < final_x){
    var dist = Math.ceil((final_x - xpos)/10);
    xpos = xpos + dist;
  }
  if(xpos > final_x){
    var dist = Math.ceil((xpos-final_x)/10);
    xpos = xpos - dist;
  }
  if(ypos < final_y){
    var dist = Math.ceil((final_y-ypos)/10);
    ypos = ypos + dist;
  }
  if(ypos > final_y){
    var dist = Math.ceil((ypos - final_y)/10)
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos +"px";
  var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
  elem.movement = setTimeout(repeat, interval);
}

//创建幻灯片并放在文档中INTRO 段落的后面
function prepareSlideshow(){
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;
  if(!document.getElementById("intro")) return false;
  var intro = document.getElementById("intro");
  var slideshow = document.creatElement("div");
  var frame = document.creatElement("img");
  frame.setAttribute("src","images/frame.gif");
  frame.setAttribute("alt","");
  frame.setAttribute("id","frame");
  slideshow.appendChild(frame);
  slideshow.setAttribute("id","slideshow");
  var preview = document.creatElement("img");
  preview.setAttribute("src","images/slideshow.gif");
  preview.setAttribute("alt","a glimpe of what awaits you");
  preview.setAttribute("id","preview");
  slideshow.appendChild(preview);
  insertAfter(slideshow,intro);
 //接着循环遍历INTRO段落中所有的链接，并根据当前鼠标所在的链接来移动preview元素，比如链接包含about.html，就把preview元素移动到-150px上
 //如果想让导航栏中的链接出现幻灯片，可用var links = document.getElementsByTagName("a");代替下面的代码
  var links = intro.getElementsByTagName("a");
  var destination;
  for(var i = 0; i<links.length;i++) {
    links[i].onmouseover = function(){
      destination = this.getAttribute("href");
      if(destination.indexOf("index.html") != -1){
        moveElement("preview",0,0,5);
      }
      if(destination.indexOf("about.html") != -1){
        moveElement("preview",-150,0,5);
      }
      if(destination.indexOf("photos.html") != -1){
        moveElement("preview", -300,0,5);
      }
      if(destination.indexOf("live.html") != -1){
        moveElement("preview",-450,0,5);
      }
      if(destination.indexOf("contact.html") != -1){
        moveElement("preview", -600,0,5);
      }
    } 
  }
}
addLoadEvent(prepareSlideshow);

//使用JS和DOM选择性的每次只显示一个部分SECTION，下面的函数可用根据指定的ID显示相应的SECTION，同时隐藏其他部分
function showSection(id){
  var sections = document.getElementsByTagName("section");
  for(var i = 0; i<sections.length;i++){
    if(sections[i].getAttribute("id") != id){
        sections[i].style.display = "none";
       }
    else {
      sections[i].style.display = "block";
    }
  }
}
//在ARTICLE 中的NAV所包含的链接被单击时调用showSection 函数
function prepareInternalnav(){
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;
  var articles = document.getElementsByTagName("article");
  if(articles.length == 0) return false;
  var navs = articles[0].getElementsByTagName("nav");
  if (navs.length == 0) return false;
  var nav = navs[0]
  var links = nav.getElementsByTagName("a");
  for(var i=0; i<links[i].length;i++){
    var sectionId = links[i].getAttribute("href").split("#")[1];
    if(!document.getElementById(sectionId)) continue;
    document.getElementById(sectionId).style.display = "none";
    links[i].destination = sectionId;
    links[i].onclick = function(){
      showSection(this.destination);
      return false;
    }
  }
}
addLoadEvent(prepareInternalnav);

//JS的图片库
function showPic(whicpic){
  if(!document.getElementById("placeholder")) return false;
  var source = whichpic.getAttribute("href");
  var placeholder = document.getelementById("placeholder");
  placeholder.setAttribute("src", source);
  if(!document.getElementById("description")) return false;
  if(whichpic.getAttribute("title")){
    var text = whichpic.getAttribute("title");
  }
  else {
    var text = "";
  }
  var description = document.getElementById("description");
  if(description.firstChild.nodeType = 3){
    description.firstChild.nodeValue = text;
  }
  return false;
}

function preparePlaceholder(){
  if(!document.createElment) return false;
  if(!document.createTextNode) return false;
  if(!document.getElementById) return false;
  if(!document.getElementById)("imagegallery")) return false;
  var placeholder = document.createElement("img");
  placeholder.setAttribute("id","placeholder");
  placeholder.setAttribute("src","images/placeholder.gif");
  placeholder.setAttribute("alt","my image gallery");
  var description = document.createElement("p");
  description.setAttribute("id","description");
  var desctest = document.createTextNode("Choose an image");
  description.appendChild(desctext);
  var gallery = document.getElementById("imagegallery");
  insertAfter(description, gallery);
  insertAfter(placeholder, description);
} 
function prepareGallery() {
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;
  if(!document.getElementById("imagellery")) return false;
  var gallery = document.getElementById("imagegallery");
  var links = gallery.getElementsByTagName("a");
  for(var i =0; i< links.length; i++){
    links[i].onclick = function(){
      return showPic(this);
    }
  }
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

//增强表格的函数
function stripeTables(){
  if(!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName("table");
  for(var i = 0;i<tables.length;i++){
    var odd = false;
    var rows = tables[i].getElementsByTagName("tr");
    for(var j = 0;j<rows.length;j++){
      if(odd == true){
 //这样判断奇数偶数吗
        addClass(rows[j],"odd");
        odd = false;
      }
      else{
        odd = true;
      }
    }
  }
}
function highlightRows(){
  if(!document.getElementsByTagName) return false;
  var rows = document.getElmentsByTagName("tr");
  for(var i = 0; i<rows.length; i++){
    rows[i].oldClassName = rows[i].className
    rows[i].onmouseover = function(){
      addClass(this,"highlight");
    }
    row[i].onmouseout = function(){
      this.className = this.oldClassName
    }   
  }
}

function displayAbbreviations(){
  if(!document.getElementsByTagNmae || !document.)
}

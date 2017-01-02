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
function inserAfter(newElement, targetElement) {
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
  var repeat = "moveElement()"
}

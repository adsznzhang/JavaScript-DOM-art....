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

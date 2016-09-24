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

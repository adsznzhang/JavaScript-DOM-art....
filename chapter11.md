## HTML5 中的CANVAS

使用<canvas>对象在浏览器中把一副彩色图片变成灰度图片。然后，当用户鼠标悬停到图片上时，再把它切换回原始的彩色图片。

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
  <title>Grayscale Canvas Example</title>
  <script src="script/modernizr-1.6.min.js"></script>
</head>
<body>
<img src="images/avatar.png" id="avatar" title="Jeffery Sambell" alt="My Avatar" />
<script src="script/grayscle.js"></script>
</body>
</html>

//创建一个grayscle.js文件包含下面的函数

function convertToGS(img) {
  if(!Modernizr.canvas) return;
 //存储原始彩色版图片
  img.color = img.src;
  //创建灰度版
  img.grayscle = createGSCanvas(img);
  img.onmouseover = function(){
    this.src = this.color;
  }
  img.onmouseout = function(){
    this.src = this.grayscale;
  }
  img.onmouseout();

}

function createGSCanvas(img){

  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height  = img.height;
  
    var ctx = canvas.getContext("2d");
  ctx.drawImage(img,0,0);

  var c = ctx.getImageData(0,0,img.width,img.height);
  for(i = 0;i < c.height; i ++){
        for(j = 0; j < c.width; j++){
              var x = (i*4)*c.width + (j*4);
              var r = c.data[x];
              var g = c.data[x+1];
              var b = c.data[x+2];
              c.data[x] =c.data[x+1]=c.data[x+2] = (r+g+b)/3;
              }
        }
  ctx.putImageData(c,0,0,0,c.width,c.height);
  retrun canvas.toTataURL();


}
window.onload = function(){
  convertToGS(document.getElementById("avatar"));  
}

```



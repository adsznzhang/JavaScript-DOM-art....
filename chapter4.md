## 4.1 标记
  把整个图片库的浏览链接集中安排在图片库主页里，只在用户点击了某个图片链接时才把相应图片显示！
  首先创建一个有序清单元素<ol>来标记图片的链接：
  ```javascript
  <!DOCTYPE html>
  <html land="en">
  <head>
    <meta charset="utf-8">
    <title>Image Gallery</title>
  </head>
  <body>
    <h1>Snapshots</h1>
    <ul>
      <li>
        <a href="images/fireworks.jpg" title="A fireworks display">Fireworks</a>
      </li>
      <li>
        <a href="images/fireworks.jpg" title="A fireworks display">Fireworks</a>
      </li>
      <li>
        <a href="images/fireworks.jpg" title="A fireworks display">Fireworks</a>
      </li>
      <li>
        <a href="images/fireworks.jpg" title="A fireworks display">Fireworks</a>
      </li>
    </ul>
    </body>
    </html>
```
what we want is ：
- 当点击某个链接时，留在当前网页而不是另一个窗口
- 当点击链接时，同时看到图片和图片清单。

what we need to do:
- 通过增加一个“占位符”图片的办法在主页上为图片留一个浏览区域
- 当点击某个链接时，拦截这个网页的默认行为
- 在点击链接时，把“占位符” 图片替换为与那个链接相对应的图片

### 解决占位符问题：
```
  <img id="placeholder" src="images/placeholder.gif" alt="my image gallery"/>
```

## 4.2 JavaScript部分
  

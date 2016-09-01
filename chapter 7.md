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

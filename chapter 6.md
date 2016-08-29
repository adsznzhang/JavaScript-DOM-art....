### 添加事件处理函数
需要一个函数把有关操作关联到onlick事件上，函数命名为prepareGallery.
  下面是这个函数好完成的工作：
  - 检查浏览器是否理解getElementsByTagName
  - 检查浏览器是否理解getElementsById
  - 检查是否存在一个ID为imagegallery的元素
  - 遍历imagegallery元素中的链接
  - 设置onclick事件，让它在有关链接被点击时完成下面的操作：
   把这个链接作为参数传递给showPic函数,取消链接被点击时的默认行为，不让浏览器打开这个链接。
   


将

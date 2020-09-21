# 《WebGL 编程指南》学习笔记

### 重要笔记说明目录：/md

### 笔记截图目录：/img

### 源码 demo 目录：/demo

### 原书籍路径：book/WebGL 编程指南.pdf

### 学习记录

##### 20200917

- WebGL 概述
- Canvas
- DrawRectangle
- HelloCanvas
- HelloPoint1
- 着色器是什么？
- WebGL 坐标系统
- HelloPoint2
- attribute 变量
- `gl.vertexAttrib3f()`以及同族函数

##### 20200918

- ClickedPoints
- ColoredPoints
- uniform 变量
- `gl.uniform4f()`以及同族函数
- MultiPoint
- `gl.createBuffer()`
- `gl.bindBuffer()`
- `gl.bufferData()`
- `gl.vertexAttribPointer()`
- `gl.enableVertexAttribArray()`
- `gl.drawArrays()` 第 2、3 个参数
- HelloTriangle
- HelloRectangle
- TranslatedTriangle 平移
- RotatedTriangle 旋转
- 变换矩阵：旋转 3\*3

##### 20200921

- 变换矩阵：平移、4\*4 选择矩阵、缩放
- 矩阵变换库：cuon-matrix.js
- 复合变换
- 动画
- requestAnimationFrame()
- 按钮控制旋转速度：通过修改每秒的旋转角度
- MultiAttributeSize.js
- 创建多个缓冲区 => `gl.vertexAttriPointer()` => MultiAttributeSize_Interleaved.js
- varying 变量 => MultiAttributeColor.js
- ColoredTriangle.js
- 几何形状的装配及光栅化 <= 片元着色器
- varying 的作用及内插过程

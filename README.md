# 《WebGL 编程指南》学习笔记

### 重要笔记说明目录：/md

### 笔记截图目录：/img

### 源码 demo 目录：/demo

### 原书籍路径：book/WebGL 编程指南.pdf

### 学习记录

#### 20200917

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

#### 20200918

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

#### 20200921

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

#### 20200922

- 纹理坐标
- TexturedQuad.js
- 设置纹理、配置和加载纹理、为 webgl 加载纹理
- 图像 Y 轴翻转
- `gl.activeTexture()`
- `gl.bindTexture()`
- `gl.texParameteri()`
- `gl.texImage2D()`
- `gl.uniform1i()`
- 片元着色器获取纹理颜色`texture2D()`
- MultiTexture.js
- OpenGL ES 着色器语法的一系列基础语法、规则、逻辑语法、取样器、函数、变量等
- 三维：视点和视线
- 视点、观察目标点、上方向

#### 20200923

- LookAtTriangles.js & LookAtRotatedTriangles.js
- 键盘改变视点 LookAtTrianglesWithKeys.js
- 可视空间：正射类型 OrthoView.js 重点
- 可视空间：透视投影 PerspectiveView.js 重点
- 隐藏面消除 DepthBuffer.js
- 深度冲突 Zfighting.js
- 立方体 HelloCube.js 重点、难点
- 指定颜色的立方体 ColoredCube.js 重点、难点

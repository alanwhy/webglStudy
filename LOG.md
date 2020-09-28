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

#### 20200924

- 光照原理、类型
- 反射类型
- 法线
- LightedCube.js 平行光
- LightedCube_animation.js 环境光
- LightedCube_animation.js 运动物体
- 魔法矩阵：逆转置矩阵 重点、难点 LightedTranslatedRotatedCube.js
- 点光源 PointLightedCube.js 属于逐顶点计算
- 逐片元光照计算 PointLightedCube_perFragment.js
- 球体的绘制：逐顶点（PointLightedSphere.js）、逐片元（PointLightedSphere_perFragment.js）

#### 20200925

- 层次结构模型
- JointMode.js 单关节
- MultiJointModel.js 多关节
- 两种绘制思路：
  - 以单元（1\*1\*1）的方式通过模型矩阵变换
  - 直接构建几何体 拼接
- 着色器对象程序 `initShaders()`
  - `gl.createShader()`
  - `gl.shaderSource()`
  - `gl.compileShader()`
  - `gl.createProgram()`
  - `gl.attachShader()`
  - `gl.linkProgram()`
  - `gl.useProgram()`

#### 20200927

- 鼠标控制 RotateObject.js
- 选中物体 PickObject.js
- 选中表面 PickFace.js
- HUD
- 网页显示 3DoverWeb.js
- 雾化 Fog.js Fog_w.js
- 绘制圆形点 RoundedPoints.js
- α 混合 LookAtBlendedTriangles.js
- 混合函数 半透明的三维物体 BlendedCube.js
- 切换着色器 ProgramObject.js
- 渲染到纹理
  - 帧缓冲区（FBO）
  - FramebufferObject.js
  - `gl.createFramebuffer()` 创建 FBO 对象
  - `gl.createRenderbuffer()` 创建渲染 FBO 对象
  - `gl.bindRenderbuffer()` `gl.renderbufferStorage()` 绑定渲染缓冲区并设置尺寸
  - `gl.bindFramebuffer` `gl.framebufferTexture2D()` 将纹理对象关联到 FBO 对象
  - `gl.framebufferRenderbuffer()` 将渲染缓冲区对象关联到帧缓冲区对象
  - `gl.checkFramebufferStatus()` 检查帧缓冲区的配置

#### 20200928

- 如何实现阴影 Shadow.js
- 提升阴影程序的精度 Shadow_highp.js
- 加载三维模型 \*.obj
  - \*.obj 文件格式
  - \*.mtl 文件格式
- 响应上下文丢失 RotatingTriangle_contextLost.js
- 交换缓冲区
- GLSL ES 1.0 内置函数
- 投影矩阵
- WebGL 坐标系
- 逆转置矩阵
- 从文件中加载着色器
- 世界坐标系与本地坐标系
- WebGL 浏览器设置
- 术语表

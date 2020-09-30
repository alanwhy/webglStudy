# WebGL 关键函数

## ch02

1. 根据 id 获取元素后，再获取 WebGL 绘图上下文

```javascript
var gl = getWebGLContext(document.getElementById("webgl"));
```

2. 设置`<canvas>`的背景色

```javascript
gl.clearColor(0.0, 0.0, 0.0, 1.0);
```

3. 清空`<canvas>`

```js
gl.clear(gl.COLOR_BUFFER_BIT);
```

4. 执行顶点着色器，按照 mode 参数指定的方式绘制图形

```js
/**
 * @params mode 绘制方式：gl.POINTS gl.LINES gl.LINE_STRIP gl.TRIANGLES gl.TRIANGLE_STRIP gl.TRIANGLE_FAN
 * @params first 从哪个顶点开始绘制（int）
 * @params count 绘制需要用到多少个点（int）
 */
gl.drawArrays(mode, first, count);
```

```js
// 绘制一个点
gl.drawArrays(gl.POINTS, 0, 1);
```

5. 在 WebGL 系统内部建立和初始化着色器
   _属于封装过的函数，在后面的章节会说到内部的方法_

```js
/**
 * @params gl 渲染上下文
 * @params vshader 顶点着色器
 * @params fshader 片元着色器
 */
initShaders(gl, vshader, fshader);
```

6. 获取由 name 参数指定的 attribute 变量的存储地址

```js
/**
 * @parmas program 包含顶点着色器和片元着色器的着色器程序对象
 * @parmas name 指定想要获取其储存地址的attribute变量的名称
 */
gl.getAttribLocation(program, name);
```

```js
// 获取a_Position变量的储存位置
gl.getAttribLocation(gl.program, "a_Position");
```

7. 将数据`(v0,v1,v2)`传给由 location 参数指定的 attribute 变量

```js
/**
 * @params location 储存位置
 * @params v0 第一个分量值
 * @params v1 第二个分量值
 * @params v2 第三个分量值
 */
gl.vertexAttrib3f(location, v0, v1, v2);
```

```js
// 将顶点位置传输给变量
// a_Position 来自ch02 stop6
gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
```

```js
// 同族函数 基础函数名vertexAttrib
gl.vertexAttrib1f(location, v0);
gl.vertexAttrib2f(location, v0, v1);
gl.vertexAttrib3f(location, v0, v1, v2);
gl.vertexAttrib4f(location, v0, v1, v2, v3);
```

```js
// 也可以这样使用
var positions = new Float32Array([1.0, 2.0, 3.0, 1.0]);
gl.vertexAttrib4f(a_Position, positions);
```

8. 获取指定的 uniform 的存储位置

```js
/**
 * @params program 包含顶点着色器和片元着色器的着色器程序对象
 * @parmas name uniform变量的名称
 */
gl.getUniformLocation(program, name);
```

```js
// 获取u_FragColor的存储位置
gl.getUniformLocation(gl.program, "u_FragColor");
```

9. 将数据`(v0,v1,v2,v3)`传输给由 location 参数指定的 uniform 变量

```js
/**
 * @params location 需要修改的uniform的存储位置
 * @params v0,v1,v2,v3 分量值
 */
gl.uniform4f(location, v0, v1, v2, v3);
```

```js
// 将点的颜色传入 u_FragColor 变量
gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
```

```js
// 同族函数
gl.uniform1f(location, v0);
gl.uniform2f(location, v0, v1);
gl.uniform3f(location, v0, v1, v2);
gl.uniform4f(location, v0, v1, v2, v3);
```

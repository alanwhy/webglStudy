// HelloPint2.js (c) 2012 matsuda
// Vertex shader program
// attribute 被称为存储限定符
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' + // attribute variable
  'attribute float a_PointSize;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = a_PointSize;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  /**
   * Get the storage location of a_Position 获取attribute变量的储存位置
   * @program 指定包含顶点着色器和片元着色器的着色器程序对象
   * @name 指定想要获取其存储地址的attribute变量的名称
   */
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  if (a_PointSize < 0) {
    console.log('Failed to get the storage location of a_PointSize');
    return;
  }

  /**
   * Pass vertex position to attribute variable 将顶点位置传输给attribute变量
   * @location 指定将要修改的attribute变量的存储位置
   * @v0 指定填充attribute变量第一个分量的值
   * @v1 指定填充attribute变量第二个分量的值
   * @v2 指定填充attribute变量第三个分量的值
   */
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);

  gl.vertexAttrib1f(a_PointSize, 10.0);

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw
  gl.drawArrays(gl.POINTS, 0, 1);
}

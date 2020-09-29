let canvas = document.getElementById("webgl")
let mapDom = document.getElementById("map")
canvas.width = mapDom.offsetWidth
canvas.height = mapDom.offsetHeight

let gl
let VSHADER_SOURCE, FSHADER_SOURCE
let dragging = false, lastMouseX = -1, lastMouseY = -1, currentAngle = [0.0, 0.0]
let RotationMatrix = new Matrix4();
RotationMatrix.setIdentity();

function main() {
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
  // Read shader from file 从文件中读取着色器
  readShaderFile('./glsl/EarthVert.vert', 'v');
  readShaderFile('./glsl/EarthFrag.frag', 'f');
}

// Read shader from file 从文件中读取着色器 
function readShaderFile(fileName, shader) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status !== 404) {
      onReadShader(request.responseText, shader);
    }
  }
  request.open('GET', fileName, true); // Create a request to acquire the file
  request.send();                      // Send the request
}

// The shader is loaded from file 从文件加载着色器
function onReadShader(fileString, shader) {
  if (shader == 'v') { // Vertex shader 顶点着色器
    VSHADER_SOURCE = fileString;
  } else
    if (shader == 'f') { // Fragment shader 片元着色器
      FSHADER_SOURCE = fileString;
    }
  // When both are available, call start(). 如果两者均可用，则调用start（）。
  if (VSHADER_SOURCE && FSHADER_SOURCE) start();
}

function start() {
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  let n = initVertexBuffers();
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  if (!initTextures('./../resources/earth.jpg')) {
    console.log('Failed to init the texture');
    return;
  }

  // 添加监听事件
  var currentAngle = [0.0, 0.0];
  initEventHandlers(currentAngle)

  let u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  if (!u_MvpMatrix) {
    console.log('Failed to get the storage location of uniform variable');
    return;
  }

  // Calculate the view projection matrix
  // var viewProjMatrix = new Matrix4();
  // viewProjMatrix.setPerspective(30.0, canvas.width / canvas.height, 1.0, 100.0);
  // viewProjMatrix.lookAt(3.0, 3.0, 7.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

  var tick = function () {   // Start drawing
    draw(n, u_MvpMatrix);
    // draw(n, viewProjMatrix, u_MvpMatrix, currentAngle);
    requestAnimationFrame(tick);
  };
  tick();
}

function initVertexBuffers() { // Create a sphere
  var SPHERE_DIV = 50;

  var i, ai, si, ci;
  var j, aj, sj, cj;
  var p1, p2;

  var positions = []; // 存储x，y，z坐标
  var indices = []; // 三角形列表（索引值）
  var textureCoordData = []; // 存储纹理坐标u，v，纹理坐标与顶点坐标一一对应

  // Generate coordinates
  for (j = 0; j <= SPHERE_DIV; j++) {
    aj = j * Math.PI / SPHERE_DIV; // 纬度范围从-π/2到π/2
    sj = Math.sin(aj);
    cj = Math.cos(aj);
    for (i = 0; i <= SPHERE_DIV; i++) {
      ai = i * 2 * Math.PI / SPHERE_DIV; // 经度范围从-π到π
      si = Math.sin(ai);
      ci = Math.cos(ai);

      let x = ci * sj
      let y = cj
      let z = si * sj

      // 纹理坐标
      let u = 1 - (i / SPHERE_DIV);
      let v = 1 - (j / SPHERE_DIV);

      textureCoordData.push(u)
      textureCoordData.push(v)

      // positions.push(si * sj);  // X
      // positions.push(cj);       // Y
      // positions.push(ci * sj);  // Z

      positions.push(x);  // X
      positions.push(y);  // Y
      positions.push(z);  // Z
    }
  }

  // Generate indices 生成索引
  for (j = 0; j < SPHERE_DIV; j++) {
    for (i = 0; i < SPHERE_DIV; i++) {
      p1 = j * (SPHERE_DIV + 1) + i;
      p2 = p1 + (SPHERE_DIV + 1);

      indices.push(p1);
      indices.push(p2);
      indices.push(p1 + 1);

      // indices.push(p1 + 1);
      // indices.push(p2);
      // indices.push(p2 + 1);
      indices.push(p2);
      indices.push(p2 + 1);
      indices.push(p1 + 1);
    }
  }

  if (!initArrayBuffer('a_Position', new Float32Array(positions), gl.FLOAT, 3)) return -1;
  if (!initArrayBuffer('a_TexCoord', new Float32Array(textureCoordData), gl.FLOAT, 2)) return -1;

  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  return indices.length;
}

function initArrayBuffer(attribute, data, type, num) {
  // Create a buffer object
  var buffer = gl.createBuffer();
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  // Assign the buffer object to the attribute variable
  var a_attribute = gl.getAttribLocation(gl.program, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // Enable the assignment of the buffer object to the attribute variable
  gl.enableVertexAttribArray(a_attribute);

  return true;
}

function initTextures(src) {
  let texture = gl.createTexture();
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  let u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
  if (!u_Sampler) {
    console.log('Failed to get the storage location of u_Sampler');
    return false;
  }

  let image = new Image();
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }

  image.onload = function () {
    loadTexture(image, texture, u_Sampler);
  }
  image.src = src;
  return true;
}

function loadTexture(image, texture, u_Sampler) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);  // Flip the image Y coordinate
  // Activate texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  // Set texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the image to texture
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // Pass the texure unit 0 to u_Sampler
  gl.uniform1i(u_Sampler, 0);
}

// var g_MvpMatrix = new Matrix4(); // Model view projection matrix 模型视图投影矩阵 
// function draw(n, viewProjMatrix, u_MvpMatrix, currentAngle) {
//   // Caliculate The model view projection matrix and pass it to u_MvpMatrix 计算模型视图投影矩阵并将其传递给u_MvpMatrix
//   g_MvpMatrix.set(viewProjMatrix);
//   g_MvpMatrix.rotate(currentAngle[0], 1.0, 0.0, 0.0); // Rotation around x-axis 绕x轴旋转
//   g_MvpMatrix.rotate(currentAngle[1], 0.0, 1.0, 0.0); // Rotation around y-axis 绕y轴旋转 
//   gl.uniformMatrix4fv(u_MvpMatrix, false, g_MvpMatrix.elements);

//   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);     // Clear buffers
//   gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);   // Draw the cube
// }

function draw(n, u_MvpMatrix) {
  // Caliculate The model view projection matrix and pass it to u_MvpMatrix
  let viewProjMatrix = new Matrix4();
  viewProjMatrix.setPerspective(30.0, canvas.width / canvas.height, 1.0, 100.0);
  viewProjMatrix.lookAt(3.0, 3.0, 7.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
  viewProjMatrix.multiply(RotationMatrix);

  gl.uniformMatrix4fv(u_MvpMatrix, false, viewProjMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_SHORT, 0);
  //gl.drawElements(gl.LINE_LOOP, n, gl.UNSIGNED_SHORT, 0);
}

function initEventHandlers() {
  canvas.onmousedown = (ev) => {
    var x = ev.clientX, y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    // Start dragging if a mouse is in <canvas>
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
      lastMouseX = x; lastMouseY = y;
      dragging = true;
    }
  }
  canvas.onmouseup = (ev) => {
    dragging = false;
  }
  canvas.onmousemove = (ev) => {
    if (!dragging) return;
    let newMouseX = ev.clientX;
    let newMouseY = ev.clientY;

    let deltaX = newMouseX - lastMouseX;
    let deltaY = newMouseY - lastMouseY;

    let newRotationMatrix = new Matrix4();

    newRotationMatrix.setIdentity();
    newRotationMatrix.rotate(deltaX / 10, 0, 1, 0)
    newRotationMatrix.rotate(deltaY / 10, 1, 0, 0)

    RotationMatrix = newRotationMatrix.multiply(RotationMatrix);

    lastMouseX = newMouseX;
    lastMouseY = newMouseY;
  }
}

// function initEventHandlers(currentAngle) {
//   var dragging = false;         // Dragging or not 是否拖动 
//   var lastX = -1, lastY = -1;   // Last position of the mouse 鼠标的最后位置 

//   canvas.onmousedown = function (ev) {   // Mouse is pressed 按下鼠标 
//     var x = ev.clientX, y = ev.clientY;
//     // Start dragging if a mouse is in <canvas> 如果鼠标在<canvas>中，则开始拖动
//     var rect = ev.target.getBoundingClientRect();
//     if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
//       lastX = x; lastY = y;
//       dragging = true;
//     }
//   };

//   canvas.onmouseup = function (ev) { dragging = false; }; // Mouse is released 释放鼠标

//   canvas.onmousemove = function (ev) { // Mouse is moved 鼠标移动 
//     var x = ev.clientX, y = ev.clientY;
//     if (dragging) {
//       var factor = 100 / canvas.height; // The rotation ratio 旋转因子
//       var dx = factor * (x - lastX);
//       var dy = factor * (y - lastY);
//       // Limit x-axis rotation angle to -90 to 90 degrees 将x轴旋转角度限制为-90至90度
//       currentAngle[0] = Math.max(Math.min(currentAngle[0] + dy, 90.0), -90.0);
//       currentAngle[1] = currentAngle[1] + dx;
//     }
//     lastX = x, lastY = y;
//   };
// }

main()
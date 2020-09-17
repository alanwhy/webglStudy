// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for WebGL 获取绘制二维图形的绘图上下文
  var ctx = canvas.getContext('2d');

  // Draw a blue rectangle 绘制蓝色矩形
  ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; // Set color to blue 设置填充颜色为蓝色
  // left top width height
  ctx.fillRect(120, 10, 150, 150);        // Fill a rectangle with the color 使用填充颜色填充矩形
}

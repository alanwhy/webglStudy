#ifdef GL_ES
precision mediump float;
#endif
uniform sampler2D u_Sampler;
uniform float u_unit_width; // 单位长度
uniform float u_unit_height; // 单位宽度
uniform float u_img_width;
uniform float u_img_height;
uniform float u_img_px_width;
uniform float u_img_px_height;
varying vec2 v_TexCoord;


void main() {
  vec2 texCoord = v_TexCoord;

  float unit_x = u_img_width / u_unit_width; // 计算小图的单元size
  float unit_y = u_img_height / u_unit_height;
  float x_unit_multiple = unit_x * (1.0 / unit_x); // 是否重复 如果需要重复 则不需要乘倒数
  float y_unit_multiple = unit_y * (1.0 / unit_y);
  float xOffset = mod(texCoord.x / unit_x, u_unit_width/u_img_width);
  float yOffset = mod(texCoord.y / unit_y, u_unit_height/u_img_height);
  texCoord.x = u_img_px_width / u_img_width + xOffset;
  texCoord.y = (u_img_height - u_img_px_height) / u_img_height + yOffset;
  gl_FragColor = texture2D(u_Sampler, texCoord);
}

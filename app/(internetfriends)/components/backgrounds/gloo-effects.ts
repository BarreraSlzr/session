export const defaultEffect = String.raw`vec2 effect(vec2 p, float i, float time) {
  float common = sin(time * speed);
  return vec2(
    sin(p.x * i + common) * cos(p.y * i + common),
    sin(length(p.x) + common) * cos(length(p.y) + common)
  );
}`;

export const spiralEffect = String.raw`vec2 effect(vec2 p, float i, float time) {
  float common = sin(time * speed);
  float r = length(p);
  float theta = atan(p.y, p.x);
  float spiral = sin(r * 10.0 - theta * 3.0 + common);
  return vec2(
    sin(p.x * i + spiral + common) * cos(p.y * i + spiral + common),
    sin(length(p.x + spiral) + common) * cos(length(p.y + spiral) + common)
  );
}`;

export const waveEffect = String.raw`vec2 effect(vec2 p, float i, float time) {
  float common = sin(time * speed);
  float wave = sin(p.x * 5.0 + common) * cos(p.y * 5.0 + common);
  return vec2(
    sin(p.x * i + wave + common) * cos(p.y * i + wave + common),
    sin(length(p.x + wave) + common) * cos(length(p.y + wave) + common)
  );
}`;

export const vortexEffect = String.raw`vec2 effect(vec2 p, float i, float time) {
  float common = sin(time * speed);
  float r = length(p);
  float theta = atan(p.y, p.x);
  float vortex = sin(r * 10.0 + theta * 5.0 + common);
  return vec2(
    sin(p.x * i + vortex + common) * cos(p.y * i + vortex + common),
    sin(length(p.x + vortex) + common) * cos(length(p.y + vortex) + common)
  );
}`;

export const pulseEffect = String.raw`vec2 effect(vec2 p, float i, float time) {
  float common = sin(time * speed);
  float pulse = common * 0.5 + 0.5;
  return vec2(
    sin(p.x * i + pulse * 10.0 + common) * cos(p.y * i + pulse * 10.0 + common),
    sin(length(p.x * pulse) + common) * cos(length(p.y * pulse) + common)
  );
}`;

export const rippleEffect = String.raw`vec2 effect(vec2 p, float i, float time) {
  float common = sin(time * speed);
  float ripple = sin(length(p) * 10.0 - common) * 0.5;
  return vec2(
    sin(p.x * i + ripple + common) * cos(p.y * i + ripple + common),
    sin(length(p.x + ripple) + common) * cos(length(p.y + ripple) + common)
  );
}`;

export const twistEffect = String.raw`vec2 effect(vec2 p, float i, float time) {
  float common = sin(time * speed);
  float r = length(p);
  float theta = atan(p.y, p.x) + common * 0.5;
  return vec2(
    r * cos(theta + i + common),
    r * sin(theta + i + common)
  );
}`;

export const oscillateEffect = String.raw`vec2 effect(vec2 p, float i, float time) {
  float common = sin(time * speed);
  float osc = sin(p.x * 3.0 + common) * cos(p.y * 3.0 + common);
  return vec2(
    sin(p.x * i + osc + common) * cos(p.y * i + osc + common),
    sin(length(p.x + osc) + common) * cos(length(p.y + osc) + common)
  );
}`;

export const fractalEffect = String.raw`vec2 effect(vec2 p, float i, float time) {
  float common = sin(time * speed);
  float fractal = sin(length(p) * 5.0 + common) * cos(length(p) * 3.0 + common);
  return vec2(
    sin(p.x * i + fractal + common) * cos(p.y * i + fractal + common),
    sin(length(p.x + fractal) + common) * cos(length(p.y + fractal) + common)
  );
}`;

export const swirlEffect = String.raw`vec2 effect(vec2 p, float i, float time) {
  float common = sin(time * speed);
  float r = length(p);
  float theta = atan(p.y, p.x) + r * common;
  return vec2(
    r * cos(theta + i + common),
    r * sin(theta + i + common)
  );
}`;

export const bounceEffect = String.raw`vec2 effect(vec2 p, float i, float time) {
  float common = sin(time * speed);
  float bounce = abs(common);
  return vec2(
    sin(p.x * i + bounce + common) * cos(p.y * i + bounce + common),
    sin(length(p.x + bounce) + common) * cos(length(p.y + bounce) + common)
  );
}`;

export const effectFunctions = [
  defaultEffect,
  spiralEffect,
  waveEffect,
  vortexEffect,
  pulseEffect,
  rippleEffect,
  twistEffect,
  oscillateEffect,
  fractalEffect,
  swirlEffect,
  bounceEffect
];

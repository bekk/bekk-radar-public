import React from 'react';
import initGL from '../../lib/initGL';
import fallbackImage from '../../images/radar-sweep-fallback.png';

const vertexSource = `
precision highp float;
attribute vec2 a_position;
varying vec2 v_uv;
uniform float u_aspect;
uniform float u_scale;

void main(void) {
  v_uv = vec2(a_position.x, a_position.y / u_aspect) / u_scale;
  gl_Position = vec4(a_position, 1.0, 1.0);
}
`;

const fragmentSource = `
precision highp float;
varying vec2 v_uv;
uniform float u_aspect;
uniform float u_time;
uniform float u_numRings;

float rings(float dist) {
  float t = 0.004 * u_time;
  float s = -t+dist*u_numRings*3.1415*2.0;
  float combined = cos(s);
  float edge = smoothstep(0.95,1.0,combined);
  return clamp(edge-dist * 0.5, 0.0, 1.0);
}

float sweep(float radian) {
  float t = 0.00005 * u_time; //we need precision highp, because of this
  radian = (1.0 - radian) / (3.1415*2.0);
  radian -= t;
  float antiAlias = mod(-radian,1.0);
  antiAlias = smoothstep(0.997,1.0,antiAlias);
  radian = mod(radian, 1.0);
  radian = smoothstep(0.85, 1.0, radian);
  radian = radian * radian;
  return antiAlias + radian;
}

void main() {
  float radian = atan(v_uv.y, v_uv.x);
  float distSqr = v_uv.x * v_uv.x + v_uv.y * v_uv.y;
  float dist = sqrt(distSqr);
  float ring = rings(dist) * 0.175;
  float sweep = sweep(radian) * 0.125;
  gl_FragColor = vec4(vec3((ring+sweep)), 1.0);
}
`;

function compileShader(gl, source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw `Could not compile shader: ${gl.getShaderInfoLog(shader)}`;
  }
  return shader;
}

function compileVertexShader(gl, source) {
  return compileShader(gl, source, gl.VERTEX_SHADER);
}

function compileFragmentShader(gl, source) {
  return compileShader(gl, source, gl.FRAGMENT_SHADER);
}

function linkProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw `Program failed to link: ${gl.getProgramInfoLog(program)}`;
  }
  return program;
}

function setUnitQuad(gl) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1.0, -1.0,
      +1.0, -1.0,
      -1.0, +1.0,
      -1.0, +1.0,
      +1.0, -1.0,
      +1.0, +1.0
    ]),
    gl.STATIC_DRAW
  );
}

function resize(gl) {
  var realToCSSPixels = window.devicePixelRatio || 1;
  var displayWidth = Math.floor(gl.canvas.clientWidth * realToCSSPixels);
  var displayHeight = Math.floor(gl.canvas.clientHeight * realToCSSPixels);
  if (gl.canvas.width  != displayWidth || gl.canvas.height != displayHeight) {
    gl.canvas.width = displayWidth;
    gl.canvas.height = displayHeight;
    gl.viewport(0,0, gl.canvas.width, gl.canvas.height);
  }
}

export default class RadarAnimation extends React.Component {
  draw = (timeStamp) => {
    this.requestAF = window.requestAnimationFrame(this.draw);
    const {
      gl,
      uniforms
    } = this.glOptions;
    const aspect = window.innerWidth/window.innerHeight;
    gl.uniform1f(uniforms.aspect, aspect);
    gl.uniform1f(uniforms.scale, aspect <= 1 ? 1 : window.innerHeight / window.innerWidth);
    gl.uniform1f(uniforms.numRings, Math.min(window.innerWidth, window.innerHeight)/30);
    gl.uniform1f(uniforms.time, timeStamp);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };

  handleResize = () => {
    resize(this.glOptions.gl);
  };

  constructor(props){
    super(props);

    this.state = {
      useFallback: false
    };
  }

  componentDidMount() {
    const { canvas } = this.refs;
    this.gl = initGL(canvas);
    if(!this.gl){
      this.setState({
        useFallback: true
      });
      return;
    }

    // The render integration layer between WebGL and the OS (Windows), ANGLE, can result in
    // an error thrown, we do nothing for now when this happens
    // Original error: D3D shader compilation failed with default flags. (ps_5_0)
    try{

      const vertexShader = compileVertexShader(this.gl, vertexSource);
      const fragmentShader = compileFragmentShader(this.gl, fragmentSource);
      const shaderProgram = linkProgram(this.gl, vertexShader, fragmentShader);
      this.gl.useProgram(shaderProgram);

      const uniforms = {
        position: this.gl.getAttribLocation(shaderProgram, 'a_position'),
        aspect: this.gl.getUniformLocation(shaderProgram, 'u_aspect'),
        scale: this.gl.getUniformLocation(shaderProgram, 'u_scale'),
        time: this.gl.getUniformLocation(shaderProgram, 'u_time'),
        numRings: this.gl.getUniformLocation(shaderProgram, 'u_numRings')
      };

      const buffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
      setUnitQuad(this.gl);
      this.gl.enableVertexAttribArray(uniforms.position);
      this.gl.vertexAttribPointer(uniforms.position, 2, this.gl.FLOAT, false, 0, 0);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

      const options = {
        gl: this.gl,
        uniforms
      };
      this.glOptions = options; //not very clean

      this.handleResize();
      window.addEventListener('resize', this.handleResize);
      this.requestAF = window.requestAnimationFrame(this.draw);

    } catch(e){
      delete this.gl;
      window.removeEventListener('resize', this.handleResize);
      if(this.requestAF){
        window.cancelAnimationFrame(this.requestAF);
        delete this.requestAF;
      }
      this.setState({
        useFallback: true
      });
      return;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if(this.requestAF){
      window.cancelAnimationFrame(this.requestAF);
      delete this.requestAF;
      delete this.gl;
    }
  }

  render () {
    const otherProps = this.props;
    if(this.state.useFallback){
      delete this.gl;
      const style = {
        backgroundImage : `url(${fallbackImage})`
      };
      return <div className="radarIntro-backgroundAnimation-fallback" style={style} />;
    }
    return <canvas ref='canvas' {...otherProps} />;
  }
}

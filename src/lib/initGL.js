// http://stackoverflow.com/a/24766905
export default (canvas) => {
  if (!!window.WebGLRenderingContext) {
    canvas = canvas || document.createElement('canvas');
    const names = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
    let context = false;

    for(var i=0;i<names.length;i++) {
      try {
        context = canvas.getContext(names[i]);
        if (context && typeof context.getParameter == 'function') {
          return context;
        }
      } catch(e) {}
    }
    // WebGL is supported, but disabled
    return false;
  }
  // WebGL not supported
  return false;
};

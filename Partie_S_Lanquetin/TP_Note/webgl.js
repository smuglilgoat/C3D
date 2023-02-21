// Var Globales 
let chosenModel = "Cube";
let chosenColor = {
  "r": 255,
  "g": 255,
  "b": 255,
};
let then = 0;

// Fonction de convertion HEX -> RGB
function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Event Listeners pour le mesh + couleur
document.getElementById("models").addEventListener('click', function (event) {
  const isButton = event.target.nodeName === 'BUTTON';
  if (isButton) {
    chosenModel = event.target.value;
  } else {
    let element = event.target
    chosenModel = element.getAttribute('data-value');
  }
  main()
});

document.getElementById("color").addEventListener("change", function (event) {
  chosenColor = hexToRgb(event.target.value);
  main()
});


// Init Buffers
function initBuffers(gl) {
  const positionBuffer = initPositionBuffer(gl);

  const colorBuffer = initColorBuffer(gl);

  const indexBuffer = initIndexBuffer(gl);

  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
}

function initPositionBuffer(gl) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positionsPyramid = [
    // Front face
    0.0, 1.0, 0.0,
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    // Right face
    0.0, 1.0, 0.0,
    1.0, -1.0, 1.0,
    1.0, -1.0, -1.0,
    // Back face
    0.0, 1.0, 0.0,
    1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,
    // Left face
    0.0, 1.0, 0.0,
    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0
  ];

  const positionsCube = [
    // Front face
    -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,

    // Back face
    -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,

    // Top face
    -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

    // Right face
    1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,

    // Left face
    -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
  ];

  let angle = 2 * Math.PI / 6
  let radius = 2.0;
  let x, z;
  let positionsHexagon = [0, 0]
  for (let i = 0; i < 8; i++) {
    x = radius * Math.cos(angle * i);
    z = radius * Math.sin(angle * i);
    positionsHexagon.push(x, z); 
  }

  angle = 2 * Math.PI / 4
  radius = 2.0;
  let positionsCarre = [0, 0]
  for (let i = 0; i < 6; i++) {
    x = radius * Math.cos(angle * i);
    z = radius * Math.sin(angle * i);
    positionsCarre.push(x, z); 
  }

  angle = 2 * Math.PI / 3
  radius = 2.0;
  let positionsTriangle = [0, 0]
  for (let i = 0; i < 5; i++) {
    x = radius * Math.cos(angle * i);
    z = radius * Math.sin(angle * i);
    positionsTriangle.push(x, z); 
  }

  const positionsRectangle = [
    2., 1.,
    -2.0, 1.0,
    2.0, -1.0,
    -2.0, -1.0,
  ];

  angle = 2 * Math.PI / 8
  radius = 2.0;
  let positionsOctogone = [0, 0]
  for (let i = 0; i < 10; i++) {
    x = radius * Math.cos(angle * i);
    z = radius * Math.sin(angle * i);
    positionsOctogone.push(x, z);
  }

  angle = 2 * Math.PI / 5
  radius = 2.0;
  let positionsPentagone = [0, 0]
  for (let i = 0; i < 7; i++) {
    x = radius * Math.cos(angle * i);
    z = radius * Math.sin(angle * i);
    positionsPentagone.push(x, z);
  }

  angle = 2 * Math.PI / 100
  radius = 2.0;
  let positionsDisque = [0, 0]
  for (let i = 0; i < 102; i++) {
    x = radius * Math.cos(angle * i);
    z = radius * Math.sin(angle * i);
    positionsDisque.push(x, z);
  }

  let postitions;
  switch (chosenModel) {
    case "Cube":
      postitions = positionsCube
      break;
    case "Carre":
      postitions = positionsCarre
      break;
    case "Triangle":
      postitions = positionsTriangle
      break;
    case "Hexagone":
      postitions = positionsHexagon
      break;
    case "Rectangle":
      postitions = positionsRectangle
      break;
    case "Octogone":
      postitions = positionsOctogone
      break;
    case "Pentagone":
      postitions = positionsPentagone
      break;
    case "Disque":
      postitions = positionsDisque
      break;
    case "Pyramid":
      postitions = positionsPyramid
      break;
    default:
      break;
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(postitions), gl.STATIC_DRAW);
  return positionBuffer;
}

function initColorBuffer(gl) {
  var colors = [];

  switch (chosenModel) {
    case "Cube":
      const faceColors = [
        [chosenColor.r / 255, chosenColor.g / 255, chosenColor.b / 255, 1.0],
        [chosenColor.r / 255, chosenColor.g / 255, chosenColor.b / 255, 1.0],
        [chosenColor.r / 255, chosenColor.g / 255, chosenColor.b / 255, 1.0],
        [chosenColor.r / 255, chosenColor.g / 255, chosenColor.b / 255, 1.0],
        [chosenColor.r / 255, chosenColor.g / 255, chosenColor.b / 255, 1.0],
        [chosenColor.r / 255, chosenColor.g / 255, chosenColor.b / 255, 1.0],
      ];
      for (var j = 0; j < faceColors.length; ++j) {
        const c = faceColors[j];
        colors = colors.concat(c, c, c, c);
      }
      break;
    case "Carre":
      for (let index = 0; index < 6; index++) {
        colors.push(chosenColor.r / 255, chosenColor.g / 255, chosenColor.b / 255, 1.0,)
      }
      break;
    case "Triangle":
      for (let index = 0; index < 5; index++) {
        colors.push(chosenColor.r / 255, chosenColor.g / 255, chosenColor.b / 255, 1.0,)
      }
      break;
    case "Hexagone":
      for (let index = 0; index < 8; index++) {
        colors.push(chosenColor.r / 255, chosenColor.g / 255, chosenColor.b / 255, 1.0,)
      }
      break;
    case "Rectangle":
      for (let index = 0; index < 4; index++) {
        colors.push(chosenColor.r / 255, chosenColor.g / 255, chosenColor.b / 255, 1.0,)
      }
      break;
    case "Octogone":
      for (let index = 0; index < 10; index++) {
        colors.push(chosenColor.r / 255, chosenColor.g / 255, chosenColor.b / 255, 1.0,)
      }
      break;
    case "Pentagone":
      for (let index = 0; index < 7; index++) {
        colors.push(chosenColor.r / 255, chosenColor.g / 255, chosenColor.b / 255, 1.0,)
      }
      break;
    case "Disque":
      for (let index = 0; index < 102; index++) {
        colors.push(chosenColor.r / 255, chosenColor.g / 255, chosenColor.b / 255, 1.0,)
      }
      break;
    case "Pyramid":
      for (let index = 0; index < 12; index++) {
        colors.push(chosenColor.r / 255, chosenColor.g / 255, chosenColor.b / 255, 1.0,)
      }
      break;
    default:
      break;
  }
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  return colorBuffer;
}

function initIndexBuffer(gl) {
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  const indices = [
    0,
    1,
    2,
    0,
    2,
    3, // front
    4,
    5,
    6,
    4,
    6,
    7, // back
    8,
    9,
    10,
    8,
    10,
    11, // top
    12,
    13,
    14,
    12,
    14,
    15, // bottom
    16,
    17,
    18,
    16,
    18,
    19, // right
    20,
    21,
    22,
    20,
    22,
    23, // left
  ];

  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );
  return indexBuffer;
}

function drawScene(gl, programInfo, buffers, meshRotation) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  mat4.translate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [-0.0, 0.0, -6.0]
  ); // amount to translate

  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    meshRotation, // amount to rotate in radians
    [0, 0, 1]
  ); // axis to rotate around (Z)
  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    meshRotation * 0.7, // amount to rotate in radians
    [0, 1, 0]
  ); // axis to rotate around (Y)
  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    meshRotation * 0.3, // amount to rotate in radians
    [1, 0, 0]
  ); // axis to rotate around (X)

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  setPositionAttribute(gl, buffers, programInfo);

  setColorAttribute(gl, buffers, programInfo);

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);

  // Set the shader uniforms
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );

  {
    let vertexCount;
    let offset;

    switch (chosenModel) {
      case "Cube":
        const type = gl.UNSIGNED_SHORT;
        offset = 0;
        vertexCount = 36;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        break;
      case "Carre":
        offset = 0;
        vertexCount = 6;
        gl.drawArrays(gl.TRIANGLE_FAN, offset, vertexCount);
        break;
      case "Triangle":
        offset = 0;
        vertexCount = 5;
        gl.drawArrays(gl.TRIANGLE_FAN, offset, vertexCount);
        break;
      case "Hexagone":
        offset = 0;
        vertexCount = 8;
        gl.drawArrays(gl.TRIANGLE_FAN, offset, vertexCount);
        break;
      case "Rectangle":
        offset = 0;
        vertexCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
        break;
      case "Octogone":
        offset = 0;
        vertexCount = 10;
        gl.drawArrays(gl.TRIANGLE_FAN, offset, vertexCount);
        break;
      case "Pentagone":
        offset = 0;
        vertexCount = 7;
        gl.drawArrays(gl.TRIANGLE_FAN, offset, vertexCount);
        break;
      case "Disque":
        offset = 0;
        vertexCount = 102;
        gl.drawArrays(gl.TRIANGLE_FAN, offset, vertexCount);
        break;
      case "Pyramid":
        offset = 0;
        vertexCount = 12;
        gl.drawArrays(gl.TRIANGLES, offset, vertexCount);
        break;
      default:
        break;
    }

  }
}

function setPositionAttribute(gl, buffers, programInfo) {
  let numComponents;

  switch (chosenModel) {
    case "Cube":
      numComponents = 3;
      break;
    case "Carre":
      numComponents = 2;
      break;
    case "Triangle":
      numComponents = 2;
      break;
    case "Hexagone":
      numComponents = 2;
      break;
    case "Rectangle":
      numComponents = 2;
      break;
    case "Octogone":
      numComponents = 2;
      break;
    case "Pentagone":
      numComponents = 2;
      break;
    case "Disque":
      numComponents = 2;
      break;
    case "Pyramid":
      numComponents = 3;
      break;
    default:
      break;
  }
  const type = gl.FLOAT; // the data in the buffer is 32bit floats
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set of values to the next
  // 0 = use type and numComponents above
  const offset = 0; // how many bytes inside the buffer to start from
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

// Tell WebGL how to pull out the colors from the color buffer
// into the vertexColor attribute.
function setColorAttribute(gl, buffers, programInfo) {
  const numComponents = 4;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexColor,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

let cubeRotation = 0.0;
let deltaTime = 0;

main();

//
// start here
//
function main() {
  const canvas = document.querySelector("#glcanvas");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  // Set clear color to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVertexColor and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix"
      ),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
    },
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = initBuffers(gl);

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001; // convert to seconds
    deltaTime = now - then;
    then = now;

    drawScene(gl, programInfo, buffers, cubeRotation);
    cubeRotation += deltaTime;

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram
      )}`
    );
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

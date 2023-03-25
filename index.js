// Import the Motion Canvas library
import MotionCanvas from 'motion-canvas';

// Initialize the canvas
const canvas = document.getElementById('canvas');
const mc = new MotionCanvas(canvas);

// Define the triangle and squares
const triangle = {
  a: 100,
  b: 150,
  c: 185
};

const squares = {
  a: {
    x: 50,
    y: 300,
    value: 0
  },
  b: {
    x: 150,
    y: 300,
    value: 0
  },
  c: {
    x: 250,
    y: 300,
    value: 0
  }
};

// Define the sliders
const sliderA = mc.slider({
  x: 50,
  y: 400,
  min: 1,
  max: 300,
  value: triangle.a
});

const sliderB = mc.slider({
  x: 150,
  y: 400,
  min: 1,
  max: 300,
  value: triangle.b
});

const sliderC = mc.slider({
  x: 250,
  y: 400,
  min: 1,
  max: 500,
  value: triangle.c
});

// Define the event handlers for the sliders
sliderA.on('change', updateTriangle);
sliderB.on('change', updateTriangle);
sliderC.on('change', updateTriangle);

// Define the update function for the triangle
function updateTriangle() {
  triangle.a = sliderA.getValue();
  triangle.b = sliderB.getValue();
  triangle.c = sliderC.getValue();
  
  squares.a.value = Math.pow(triangle.a, 2);
  squares.b.value = Math.pow(triangle.b, 2);
  squares.c.value = Math.pow(triangle.c, 2) - squares.a.value - squares.b.value;
  
  drawScene();
}

// Define the draw function for the scene
function drawScene() {
  // Clear the canvas
  mc.clear();

  // Draw the triangle
  const trianglePath = new MotionCanvas.Path();
  trianglePath.moveTo(50, 50).lineTo(50 + triangle.a, 50).lineTo(50, 50 + triangle.b).closePath();
  const triangleShape = new MotionCanvas.Shape(trianglePath);
  mc.stage.addChild(triangleShape);
  
  // Draw the squares
  for (let key in squares) {
    const squareShape = new MotionCanvas.Shape(new MotionCanvas.Path()
      .moveTo(squares[key].x, squares[key].y)
      .lineTo(squares[key].x + 50, squares[key].y)
      .lineTo(squares[key].x + 50, squares[key].y + 50)
      .lineTo(squares[key].x, squares[key].y + 50)
      .closePath()
    );
    squareShape.fillColor = (squares[key].value > 0) ? 'yellow' : 'white';
    squareShape.strokeColor = 'black';
    mc.stage.addChild(squareShape);
    const text = new MotionCanvas.Text(`${key}² = ${squares[key].value}`, {x: squares[key].x + 5, y: squares[key].y + 25});
    mc.stage.addChild(text);
  }

  // Render the canvas
  mc.render();
}

// Initialize the scene
updateTriangle();


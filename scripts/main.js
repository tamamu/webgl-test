
goog.require('goog.math.Matrix');

function makeCanvas(){
	var canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	return canvas;
}

function createShader(gl, id){
	var shader;
	var scriptElement = document.getElementById(id);
	if(!scriptElement)return;

	switch(scriptElement.type){
		case 'x-shader/x-vertex':
			shader = gl.createShader(gl.VERTEX_SHADER);
			break;
		case 'x-shader/x-flagment':
			shader = gl.createShader(gl.FLAGMENT_SHADER);
			break;
		default:
			return;
	}

	gl.shaderSource(shader, scriptElement.text);
	gl.compileShader(shader);
	
	if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
		return shader;
	}else{
		alert(gl.getShaderInfoLog(shader));
	}
}

function createProgram(gl, vs, fs){
	var program = gl.createProgram();

	gl.attachShader(program, vs);
	gl.attachShader(program, fs);

	gl.linkProgram(program);

	if(gl.getProgramParameter(program, gl.LINK_STATUS)){
		gl.useProgram(program);
		return program;
	}else{
		alert(gl.getProgramInfoLog(program));
	}
}

function createVBO(gl, data){
	var vbo = gl.createBuffer();
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	/* gl.bufferData(buffer_type, typed_data, freq_of_update) */
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	return vbo;
}

function draw(c, gl){
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	
}

var polygon_vertex = [
    0.0, 1.0, 0.0,
    1.0, 0.0, 0.0,
   -1.0, 0.0, 0.0
];

window.onload=()=>{
	var canvas = makeCanvas();
	canvas.width = 500;
	canvas.height = 300;
	
	var ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	
	draw(canvas, ctx);

	var mat1 = new goog.math.Matrix([[2,2], [2,3]]);
	var mat2 = new goog.math.Matrix([[2,5], [1,0]]);
	console.log(mat1.multiply(mat2));
}



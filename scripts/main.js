
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
		case 'x-shader/x-fragment':
			shader = gl.createShader(gl.FRAGMENT_SHADER);
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
	gl.clearDepth(1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	var v_shader = createShader(gl, 'vs');
	var f_shader = createShader(gl, 'fs');
	var prg = createProgram(gl, v_shader, f_shader);

	var attLocation = gl.getAttribLocation(prg, 'position');
	var attStride = 3;
	
	var vbo = createVBO(gl, polygon_vertex);
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	gl.enableVertexAttribArray(attLocation);
	gl.vertexAttribPointer(attLocation, attStride, gl.FLOAT, false, 0, 0);

	var m = new matIV();
	var mMatrix = m.identity(m.create());
	var vMatrix = m.identity(m.create());
	var pMatrix = m.identity(m.create());
	var mvpMatrix = m.identity(m.create());

	m.lookAt([0.0, 1.0, 3.0], [0, 0, 0], [0, 1, 0], vMatrix);
	m.perspective(90, c.width / c.height, 0.1, 100, pMatrix);
	m.multiply(pMatrix, vMatrix, mvpMatrix);
	m.multiply(mvpMatrix, mMatrix, mvpMatrix);

	var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');
	gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);

	gl.drawArrays(gl.TRIANGLES, 0, 3);

	gl.flush();
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
}



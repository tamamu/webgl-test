
function makeCanvas(){
	var canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	return canvas;
}

function draw(c, gl){
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
}

window.onload=()=>{
	var canvas = makeCanvas();
	canvas.width = 500;
	canvas.height = 300;
	
	var ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	
	draw(canvas, ctx);
}



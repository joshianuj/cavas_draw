// JavaScript Document
var can= new CanvasMaker(document.getElementById("canvas"));
can.init();
function CanvasMaker(canvas)
{
	var that=this;
	this.canvas=canvas;
	this.context=this.canvas.getContext("2d");
	this.lineWidth = document.getElementById("lineWidth");
	this.fillColor = document.getElementById("fillColor"),
	this.strokeColor = document.getElementById("strokeColor"),
	this.canvasColor = document.getElementById("backgroundColor");
	this.clear=document.getElementById("clearCanvas");
	this.eraser=document.getElementById("eraser");
	
	this.dragging=false;
	this.dragStartLocation;
	this.createDon;
	this.x;
	this.y;
	this.snapshot;
	this.position;
	this.value=0;
	this.radius;
	
	this.init=function()
	{
		that.context.strokeStyle = that.strokeColor.value;
		that.context.fillStyle = that.fillColor.value;
		that.context.lineWidth = that.lineWidth.value;
		that.context.lineCap="round";
		///adding listeners
		that.canvas.addEventListener("mousedown",that.dragStart,false);
		that.canvas.addEventListener("mousemove",that.drag,false);		
		that.canvas.addEventListener("mouseup",that.dragStop,false);
		that.clear.addEventListener("click",that.clearCanvas,false);
		that.clear.addEventListener("click",that.eraseCanvas,false);
		
		that.canvasColor.addEventListener("input",that.changeBackgroundColor,false);
		that.strokeColor.addEventListener("input",that.changeStrokeStyle,false);
		that.fillColor.addEventListener("input",that.changeFillStyle,false);
		that.lineWidth.addEventListener("input", that.changeLineWidth, false);
	
		
		var abc=document.getElementById("polygonSides");
		abc.addEventListener("mousemove",function(){
			that.createDon=document.createElement("div");
			that.createDon.innerText=document.getElementById("polygonSides").value;
			that.createDon.style.position="absolute";
			document.getElementById("polygonSide").appendChild(that.createDon);
			});
		
		
	
	
		console.log(that.createDon);
		console.log("here it is"+that.x);
			//passing parameters to another class
		/*that.painter = new Painter(that);
		that.painter.init();*/
	}
	
	//taking a snapshot
	this.takeSnapshot=function()
	{
		that.snapshot=that.context.getImageData(0, 0, that.canvas.width, that.canvas.height);
	}
	
	//restore snapshot
	this.restoreSnapshot=function() {
		that.context.putImageData(that.snapshot, 0, 0);
	}
	
	//getting the coordinates of canvas
	this.getCanvasCoordinates=function(event) 
	{
		var x = event.clientX - that.canvas.getBoundingClientRect().left,
			y = event.clientY - that.canvas.getBoundingClientRect().top;
	
		return {x: x, y: y};
	}
	
	//mousedown event
	this.dragStart=function(event)
	{
		that.canvas.style.cursor="crosshair";
		that.dragging=true;
		//get the coordinates of the mousedown
		that.dragStartLocation=that.getCanvasCoordinates(event);
		//additional lines removal process
		that.takeSnapshot();	
	}
	
	//mousemove
	this.drag=function(event)
	{
		if(that.dragging==true)
		{
			that.restoreSnapshot();
   			that.position = that.getCanvasCoordinates(event);
        	that.draw(that.position);   
        }
	}
	
	//mouseup
	this.dragStop=function(event)
	{
		that.dragging=false;
		that.restoreSnapshot();
		that.position=that.getCanvasCoordinates(event);
		that.draw(that.position);
	}
	
	this.clearCanvas=function(){
		that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
		}
		
	this.eraseCanvas=function(){
	}
	//Drawing a Line
	this.drawLine=function(position) 
	{
		that.context.beginPath();
		that.context.moveTo(that.dragStartLocation.x, that.dragStartLocation.y);
		that.context.lineTo(position.x, position.y);
		that.context.stroke();
	}
	
	this.drawPen=function(position)
	{
		console.log("damn:");
		var isDrawing;
		that.context.strokeStyle="red";
		that.context.lineWidth = 1;
		that.context.lineJoin = that.context.lineCap = 'square';
		that.context.shadowBlur = 0;
		that.canvas.onmousedown = function(e) 
		{
			console.log("asdsadsadsa");
			isDrawing = true;
			that.context.moveTo(e.clientX, e.clientY);
		};
		that.canvas.onmousemove = function(e) 
		{
		if (isDrawing) {
			that.context.lineTo(e.clientX, e.clientY);
			that.context.stroke();
		}
		};
			that.canvas.onmouseup = function() 
		{
			isDrawing = false;
		};
			that.canvas.onmouseout=function()
		{
			isDrawing=false;
		};
	
	}
	
	//drawing a cirlce
	this.drawCircle=function (position) 
	{
		
		that.radius = Math.sqrt(Math.pow((that.dragStartLocation.x - position.x), 2) + Math.pow((that.dragStartLocation.y - position.y), 2));
		that.context.beginPath();
		that.context.arc(that.dragStartLocation.x, that.dragStartLocation.y, that.radius, 0, 2 * Math.PI, false);
		this.x=that.dragStartLocation.x;
		this.y=that.dragStartLocation.y;
		var temp =new NewClass(this.x,this.y,that.canvas);
		that.value=1;
		console.log(that.dragStartLocation.x);
		
	}
	
	//drawing a polygon
	this.drawPolygon=function(position, sides, angle) 
	{
		var coordinates = [],
			radius = Math.sqrt(Math.pow((that.dragStartLocation.x -position.x), 2) + Math.pow((that.dragStartLocation.y - position.y), 2)),
			index = 0;
	
		for (index = 0; index < sides; index++) {
			coordinates.push({x: that.dragStartLocation.x + radius * Math.cos(angle), y: that.dragStartLocation.y - radius * Math.sin(angle)});
			angle += (2 * Math.PI) / sides;
		}
	
		that.context.beginPath();
		that.context.moveTo(coordinates[0].x, coordinates[0].y);
		for (index = 1; index < sides; index++) {
			that.context.lineTo(coordinates[index].x, coordinates[index].y);
		}
		that.context.closePath();
	}

		
	//options bar
	this.draw=function (position) 
	{
		var fillBox = document.getElementById("fillBox"),
			/*img=document.getElementsByTagName("img"),*/
			shape = document.querySelector('input[type="radio"][name="shape"]:checked').value,
			polygonSides = document.getElementById("polygonSides").value,
			polygonAngle = document.getElementById("polygonAngle").value,
			lineCap = document.querySelector('input[type="radio"][name="lineCap"]:checked').value;
			that.context.lineCap = lineCap;
			
			/*for(var i=0;i<img.length;i++)
			{
				img[i].onclick = function (e) 
				{
					// custom handling here
					var a=img[i];
					shape=a.getAttribute("src");
					return false;
				}
			}*/
		console.log(shape);
		if (shape === "circle") {
		   that.drawCircle(position);
		}
		if (shape === "line") {
			that.drawLine(position);
		}
	
		if (shape === "polygon") {
			that.drawPolygon(position, polygonSides, polygonAngle * (Math.PI / 180));
		}
		
		if (fillBox.checked) {
			that.context.fill();
		} 
		else {
			that.context.stroke();
		}
		
	}
	
	
	//change line width fill style stroke style and background color
	this.changeLineWidth=function() 
	{
		that.context.lineWidth = this.value;
		event.stopPropagation();
	}
	this.changeFillStyle=function() {
	   that.context.fillStyle = this.value;
		event.stopPropagation();
	}
	
	this.changeStrokeStyle=function() {
		that.context.strokeStyle = this.value;
		event.stopPropagation();
	}
	
	this.changeBackgroundColor=function(e) {
		that.context.save();
		that.context.fillStyle = document.getElementById("backgroundColor").value;
		console.log("Aaaaaaaaa"+that.context.fillStyle);
		that.context.fillRect(0, 0, that.canvas.width, that.canvas.height);
		that.context.restore();
	}

	
}


//////////////////////////////////////////////////////////////////////////////





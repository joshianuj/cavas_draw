// JavaScript Document
var can= new CanvasMaker(document.getElementById("canvas"));
can.init();

function CanvasMaker(canvas)
{
	var that=this;
	this.canvas=canvas;
	this.context=this.canvas.getContext("2d");
	this.lineWidth = document.getElementById("lineWidth");
	this.dragging=false;
	this.dragStartLocation;
	this.x;
	this.y;
	this.snapshot;
	this.position;
	this.value=0;
	this.radius;
	
	this.init=function()
	{
		
		that.context.strokeStyle="purple";
		that.context.lineWidth = that.lineWidth.value;
		that.context.lineCap="round";
		///adding listeners
		that.canvas.addEventListener("mousedown",that.dragStart,false);
		that.canvas.addEventListener("mousemove",that.drag,false);		
		that.canvas.addEventListener("mouseup",that.dragStop,false);
		
		console.log("here it is"+that.x);
			//passing parameters to another class
		that.painter = new Painter(that);
		that.painter.init();
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
		that.draw(that.position)
	}
	
	//Drawing a Line
	this.drawLine=function(position) 
	{
		that.context.beginPath();
		that.context.moveTo(that.dragStartLocation.x, that.dragStartLocation.y);
		that.context.lineTo(position.x, position.y);
		that.context.stroke();
	}
	
	//drawing a cirlce
	this.drawCircle=function (position) 
	{
		
		that.radius = Math.sqrt(Math.pow((that.dragStartLocation.x - position.x), 2) + Math.pow((that.dragStartLocation.y - position.y), 2));
		that.context.beginPath();
		that.context.arc(that.dragStartLocation.x, that.dragStartLocation.y, that.radius, 0, 2 * Math.PI, false);
		this.x=that.dragStartLocation.x;
		this.y=that.dragStartLocation.y;
		that.value=1;
		console.log(that.dragStartLocation.x);
		
	}
	
	//drawing a polygon
/*	this.drawPolygon=function(position, sides, angle) 
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
*/
		
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
			/*that.drawPolygon(position, polygonSides, polygonAngle * (Math.PI / 180));*/
		}
		if (fillBox.checked) {
			that.context.fill();
		} 
		else {
			that.context.stroke();
		}
	}
	
	
	//change line width
	this.changeLineWidth=function() 
	{
		that.context.lineWidth = this.value;
		event.stopPropagation();
	}
	
}


//////////////////////////////////////////////////////////////////////////////





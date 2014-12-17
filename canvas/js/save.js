// JavaScript Document

/*function saveIt()
{
	var can= document.getElementById("canvas");
	var drawingString =can.toDataURL("images/png");
	var postData="canvasData="+drawingString;
	var ajax=new XMLHttpRequest();
	ajax.open("POST",'saveImage.php',true);
	ajax.setRequestHeader('Content-type','canvas/upload');
	ajax.onreadystatechange=function()
	{
		if(ajax.readyState ==4)
		{
			alert ("image saved");
		}
	}
	ajax.send(postData);
}
*/

function saveIt()
{
	var can= document.getElementById("canvas");
	var data =can.toDataURL();
	var request= new XMLHttpRequest();
	request.onreadystatechange=function()
	{
		if(request.readyState==4 && request.status==200)
		{
			var response=request.responseText;
			//console.log(response);
			window.open('download.php?file='+response,'_blank','location=0,menubar=0');
		}
	}
	/*since get has size limits*/
	request.open('POST','save.php',true);
	request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	request.send('img='+data);

	//window.open(data,'_blank','location=0,menubar=0');
}

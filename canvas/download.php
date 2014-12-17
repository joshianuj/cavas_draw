<?php
//got file
$file=$_GET['file'];
//its a png
header('Content-type:image/png');
//attachment
header("Content-disposition:attachment;filename=canvasoutput.png");
//split out file
readfile($file);
?>
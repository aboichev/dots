	var canvasElement;
	var fragment;
	
	function drawDot(className, left, top)
	{
		var rect = document.createElement( "div" );
		var mystyle = 'position:absolute;top:' + top + "px; left:" + left + "px;'";
		rect.setAttribute( "class", className );
		rect.setAttribute( "style", mystyle );
		fragment.appendChild(rect);
	}
	
	
	function drawDots(className, buff)  {
		fragment = document.createDocumentFragment();
		for (var i= 0; i < buff.length; i++)  {
			drawDot(className, buff[i], buff[++i]);
		}
		canvasElement.appendChild(fragment.cloneNode(true));
	}
	
	function clearCanvas(){
		// clear all children
		while (canvasElement.hasChildNodes()) {
		    canvasElement.removeChild(canvasElement.lastChild);
		}
	}	

	function setCanvas(canvas) {
		canvasElement = canvas;
	}	
	
	function getTranslation(x, y) {
		var mT = [	1, 0, x,
					0, 1, y,
					0, 0, 1 ];
		return mT;		
	}
	
	function getRotationCcw(angle) {
		angle = angle * (Math.PI/180);
		var mR = [ Math.cos(angle), - Math.sin(angle), 0,
						Math.sin(angle), Math.cos(angle), 0,
						0, 0, 1 ];
		return mR;		
	}
	
	function rotate(buff, angle) {
		var a = angle * Math.PI / 180;
		for(i = 0; i < buff.length; ++i) {
			var x = buff[i];
			var y = buff[++i];
			buff[i-1] = (x * Math.cos(a)) - (y * Math.sin(a));
			buff[i] = (x * Math.sin(a)) + (y * Math.cos(a));
		}
		return buff;
	}
	
	function Multiply3x3(m1, m2) {
		var result = [9];		
		for (i = 0; i < 3; ++i) {
			for(j =0; j < 3; ++j) {
				var sum = 0;
				for(k = 0; k < 3; ++k) {
					sum += m1[3 * j  + k] * m2[3*k + j];
				}
				result[i + j] = sum;
			}						
		}
		return result;		
	}
	
	function transform2D(buff, matrix) {
		for (var i = 0; i < buff.length; i++) {
			var coord = [buff [i], buff [++i], 1];
			var coord2 = [0,0,0];
			for (var j = 0; j < 3; j++) {
				var sum = 0;
				for (var k = 0; k < 3; k++)  {
					sum += coord[k] * matrix[3 * j + k];
				}
				coord2[j] = sum;
			}
			buff [i - 1] = coord2[0];
			buff [i] = coord2[1];
		}
		return buff;
	}
	
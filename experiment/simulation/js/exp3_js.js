
var w,check=0;
var f1,w,vm,z1=[],z1m,z2m,z3m,z4m,z4=[],c4,La,Ra,Qx,i1,i2,Vout,Rint;


function add(x,y)
{ 
	var z=[];
	z[0]=x[0] + y[0];
	z[1]=x[1] + y[1];
	return z;
}
function mult(x,y)
{ 
	var z=[];
	z[0]=(x[0] * y[0]) - (x[1] * y[1]);
	z[1]=(x[0] * y[1]) + (x[1] * y[0]);
	return z;
}
function div(x,y)
{ 
	var z=[]; var t=[];
	t[0]=(y[0]) / ((y[0] * y[0]) + (y[1] * y[1]));
	t[1]=(-1 * y[1]) / ((y[0] * y[0]) + (y[1] * y[1]));
	z=mult(x,t);
	return z;
}

/////////////////////////////// The code starts from here/////////////////////////////////////
function simulate_rc()
{
	if(check==1){
		document.f1.c333.value = La;
		document.f1.r333.value = Rint;
		document.f1.rd33.value = Qx;
	}
	else{
		alert("Please Switch on the supply to verify the milivoltmeter reading first.");
	}
}
function clear_lx()
{
	document.f1.A2.value='';
	document.f1.c333.value='';
	document.f1.r333.value='';
	document.f1.rd33.value='';
	
}

function changeImage() {
	
		var image = document.getElementById('myImage');
		var im1= document.getElementById('v1');
		var im2= document.getElementById('f1');
		var im3= document.getElementById('c33');
		var im4= document.getElementById('pl1');
		if (image.src.match("s1")) {
			image.src = "./images/s2.png"; cf3=1;
			im1.setAttribute('readonly', 'readonly'); im2.setAttribute('readonly', 'readonly'); 
			im3.setAttribute('readonly', 'readonly'); im4.setAttribute('readonly', 'readonly');
			$('#s1').attr('disabled', true);
			check=1;
			execute_ckt();
		} else {
			image.src = "./images/s1.png"; cf3=0;
			im1.removeAttribute('readonly'); im2.removeAttribute('readonly'); 
			im3.removeAttribute('readonly'); im4.removeAttribute('readonly');
			document.f1.A1.value = 0; $('#s1').attr('disabled', false);
			perform_meter(); check=0; clear_lx();
		}
	}
	function execute_ckt()
	{
		if (check==1)
		{
			f1=parseFloat(document.getElementById('f1').value);
			w= 2*3.14159265358979*f1;
			vm = parseFloat(document.getElementById('v1').value);
			z1[1]=((w * parseFloat(document.getElementById('lx').value))); z1[0]=1*parseFloat(document.getElementById('lx').value)/(.003);  
			z1m = (Math.sqrt((z1[0] * z1[0]) + (z1[1] * z1[1])));
			z2m = parseFloat(document.getElementById('r2').value);
			z3m = parseFloat(document.getElementById('r3').value);
			z4[1]=(-1 / (w * parseFloat(document.getElementById('c4').value))); z4[0]=parseFloat(document.getElementById('r4').value); 
			z4m = (Math.sqrt((z4[0] * z4[0]) + (z4[1] * z4[1])));
			c4= parseFloat(document.getElementById('c4').value);
			La = (z2m * z3m * c4) / (1 + w*w*c4*c4*z4[0]*z4[0]);
			Ra = (z2m * z3m * w*w*c4*c4) / (1 + w*w*c4*c4*z4[0]*z4[0]);
			Qx = ((w*La)/z1[0]);
			i1 = vm/(z1m + z3m);
			i2 = vm/(z2m + z4m);
			Vout = ((z1m*i1) - (z2m*i2)) - 1 ;
			Rint = z1[0] + 0.02;
			document.f1.A1.value= Vout*1000;
			document.f1.A2.value= Vout*1000;
			perform_meter();
		}
		
	}





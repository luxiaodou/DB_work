var strs=new Array();
function load(){
	strs=window.location.href.split("=");
	$.ajax({
	      type:"POST",
	      url:"php/search.php",
	      datatype:"json",
	      async: false,
	      data:{
	        classid:strs[1],
	        keyword:"f"
	      },
	      success: function(result){
	        // alert("success");
	        var json=eval('('+result+')');
	        if(json.num!=0){
	        	for(o in json.items){
	        		var div=document.createElement("div");

	        		var newdiv=document.createElement("div");
	        		newdiv.className="editDiv";

	        		var a1=document.createElement("a");
	        		a1.className="glyphicon glyphicon-remove";
	        		a1.id="del"+json.items[o].id;
	        		a1.onclick=function(){deleteitem(this.id);};
	        		newdiv.appendChild(a1);

	        		var a2=document.createElement("a");
	        		a2.className="glyphicon glyphicon-pencil";
	        		a2.id="mcid="+json.items[o].shop+"&merid="+json.items[o].id;
	        		a2.onclick=function(){edititem(this.id);};
	        		newdiv.appendChild(a2);
	        		div.appendChild(newdiv);

	        		var li=document.createElement("li");
	        		li.className="list-group-item";
	        		li.innerText=json.items[o].name;
	        		div.appendChild(li);
	        		document.getElementById("ulgroup").appendChild(div);
	       		}
	        }
	        
	        },
	        error: function(jqXHR){     
	       alert("发生错误：" + jqXHR.status);  
	      },  
    });

}

function deleteitem(thisid){
	var tempid=new Array();
	tempid=thisid.split("del");
	alert(tempid[1]);
	if(confirm("确定删除？")){
		$.ajax({
	      type:"POST",
	      url:"php/deleteitem.php",
	      datatype:"json",
	      async: false,
	      data:{
	        id:tempid[1]
	      },
	      success: function(result){
	        // alert("success");
	        var json=eval('('+result+')');
	        if (json.res==0) {
	        	window.location.href=window.location.href;
	        }else{
	        	alert("删除错误");
	        }
	        },
	        error: function(jqXHR){     
	       alert("发生错误：" + jqXHR.status);  
	      },  
    });
	}
}

function edititem(thisid){
	// alert(thisid);
	window.location.href="adminEdit.html?"+thisid;
}
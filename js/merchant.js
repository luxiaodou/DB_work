var strs=new Array();
function jumpSearch(){
  var id=document.getElementById("searchInput");
  alert(id.value);
  window.location.href="result.html?class=-1&keyword="+id.value;
}


function loadMerchant(){
	strs=window.location.href.split("=");
	$.ajax({
      type:"POST",
      url:"php/loadshop.php",
      datatype:"json",
      async: false,
      data:{
        id:strs[1]
      },
      success: function(o){
        // alert("success");
        var json=eval('('+o+')');
      var n=document.getElementById("list_N");
      var e=document.getElementById("list_E");
      var p=document.getElementById("list_P");
      var a=document.getElementById("list_A");
      n.innerText=json.name;
      e.innerText=json.email;
      p.innerText=json.phone;
      a.innerText=json.addr;
    },
    	error: function(jqXHR){     
	   alert("发生错误：" + jqXHR.status);  
	  },  
	});
	document.getElementById("mecName").innerText=strs[1];
	loadshop();
}

function Edit(){
	window.location.href="merchantEdit.html?id="+strs[2];
}

function deleteitem(thisid){
	var tempid=new Array();
	tempid=thisid.split("del");
	// alert(tempid[1]);
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
	        if (json.res==1) {
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
	var tempid=new Array();
	tempid=thisid.split("edit");
	window.location.href="merEdit.html?mcid="+strs[1]+"&merid="+tempid[1];
}

function addMer(){
	// alert("f");
	window.location.href="merEdit.html?mcid="+strs[1]+"&merid=-1";
}

function loadshop(){
	$.ajax({
	      type:"POST",
	      url:"php/shopitem.php",
	      datatype:"json",
	      async: false,
	      data:{
	        id:strs[1]
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
	        		a1.id="edit"+json.items[o].id;
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
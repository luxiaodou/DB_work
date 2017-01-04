var strs=new Array();
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
          var n=document.getElementById("List_N");
          var e=document.getElementById("List_E");
          var p=document.getElementById("List_P");
          var a=document.getElementById("List_A");
          n.value=json.name;
          e.value=json.email;
          p.value=json.phone;
          a.value=json.addr;
        },
        error: function(jqXHR){     
       alert("发生错误：" + jqXHR.status);  
      },  
    });
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
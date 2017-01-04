var idlist= new Array();
function loadMerEdit(){
	idlist=window.location.href.split("=");
	var list=new Array();
	list=idlist[1].split("&");
	idlist[0]=list[0];
	idlist[1]=idlist[2];
	$.ajax({
      type:"POST",
      url:"php/loadmer.php",
      datatype:"json",
      async: false,
      data:{
        id:idlist[1]
      },
      success: function(o){
        // alert("success");
        var json=eval('('+o+')');
          var mN=document.getElementById("merName");
          var mD=document.getElementById("merD");
          var hm=document.getElementById("merHm");
          var m=document.getElementById("merM");
          var img=document.getElementById("merImg");
          img.src=json.image;
          mN.value=json.name;
          mD.value=json.brief;
          hm.value=json.price;
          m.value=json.origin;
        },
        error: function(jqXHR){     
       alert("发生错误：" + jqXHR.status);  
      },  
       
    });
}


function submit(){
	// TODO：后台提供服务
	var mN=document.getElementById("merName");
	var mD=document.getElementById("merD");
	var hm=document.getElementById("merHm");
	var m=document.getElementById("merM");
	var img=document.getElementById("merImg");
}
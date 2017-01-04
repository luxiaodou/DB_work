var strs=new Array();
function load(){
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
          var n=document.getElementById("mN");
          var e=document.getElementById("mE");
          var p=document.getElementById("mP");
          var a=document.getElementById("mA");
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

function submit(){
	var mN=document.getElementById("mN").value;
	var mE=document.getElementById("mE").value;
	var mP=document.getElementById("mP").value;
	var mA=document.getElementById("mA").value;
	$.ajax({
      type:"POST",
      url:"php/updateshop.php",
      datatype:"json",
      async: false,
      data:{
      	id:strs[1],
        name:mN,
        email:mE,
        phone:mP,
        addr:mA
      },
      success: function(data){
        // alert("success");
        var json=eval('('+data+')');
        if(json.res==0){
          window.location.href="merChant.html?id="+strs[1];
        }else{
          alert("录入错误！");
        }
      },
      error: function(jqXHR){     
     alert("发生错误：" + jqXHR.status);  
    },   
  });
}
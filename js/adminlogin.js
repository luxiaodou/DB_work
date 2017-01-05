function login(){
	var username=document.getElementById("user").value;
	var password=document.getElementById("pass").value;
	$.ajax({
      type:"POST",
      url:"php/adminlogin.php",
      datatype:"json",
      async: false,
      data:{
        id:username,
        pw:password
      },
      success: function(data){
        // alert("success");
        var json1=eval('('+data+')');
        if(json1.res==0){
          alert("登录成功！");
          window.location.href="adminOperate.html?class="+json1.class;
        }else{
          alert("用户名或密码错误！");
        }
      },
      error: function(jqXHR){     
	   alert("发生错误：" + jqXHR.status);  
	  },   
  });
}
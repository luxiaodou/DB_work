$(document).ready(function(){
    $("#myNav").affix({
        offset: { 
            top: 550
      }
    });
});

  function submit1(){ 
      // alert(document.getElementById("user1").value); 
      $.ajax({
        type:"POST",
        url:"php/login.php",
        datatype:"json",
        async: false,
        data:{
          name:document.getElementById("user1").value,
          password:document.getElementById("pass1").value,
          type:1
        },
        success: function(data){
          alert("success");
          var json=eval('('+data+')');
          alert(json);
          alert(json.result);
          alert(json.id);
        },
        error: function(jqXHR){     
		   alert("发生错误：" + jqXHR.status);  
		  },   
    });
  }  

  function submit2(){  
     // var a=document.getElementById("user2").value;  
     // alert(a);  
     $.ajax({
      type:"POST",
      url:"php/login.php",
      async: false,
      data:{
        name:document.getElementById("user2").value,
        password:document.getElementById("pass2").value,
        type:2
      },
      datatype:"json",
      success: function(data){
        var json=eval('('+data+')');
        alert(json);
        alert(json.result);
        alert(json.id);
      },
      error: function(jqXHR){     
		   alert("发生错误：" + jqXHR.status);  
		},   
    });
    } 
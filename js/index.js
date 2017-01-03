$(document).ready(function(){
    $("#myNav").affix({
        offset: { 
            top: 550
      }
    });
});

  function submit1(){  
 
      $.ajax({
        type:"POST",
        url:"login.php",
        datatype:"json",
        data:{
          name:document.getElementById("user1").value,
          password:document.getElementById("pass1").value,
          type:1
        },
        success: function(data){
          var json=eval('('+data+')');
          alert(json);
          alert(json.result);
          alert(json.id);
        },
      });
   }  

  function submit2(){  
     // var a=document.getElementById("user2").value;  
     // alert(a);  
     $.ajax({
      type:"POST",
      url:"login.php",
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
    });
    } 
var usernameNow;

$(document).ready(function(){
    $("#myNav").affix({
        offset: { 
            top: 550
      }
    });
});

function submit1(){ 
    // alert("f");
    var na=document.getElementById("user1").value;
    var pw=document.getElementById("pass1").value;
    if (na==""||pw=="") {alert("请填写完全");}
    else{
    // alert(document.getElementById("user1").value); 

    $.ajax({
      type:"POST",
      url:"php/login.php",
      datatype:"json",
      async: false,
      data:{
        name:na,
        password:pw,
        type:1
      },
      success: function(data){
        alert("success");
        var json=eval('('+data+')');
        if(json.result==0){
          setCookie("username",json.id);
          usernameNow=json.id;
          logined();
        }else{
          alert("用户名或密码错误！");
        }
      },
      error: function(jqXHR){     
	   alert("发生错误：" + jqXHR.status);  
	  },   
  });
  }
}  

function submit2(){  
    var na=document.getElementById("user2").value;
    var pw=document.getElementById("pass2").value;
    if (na==null||pw==null) {alert("请填写完全");}
    else{
    // alert(document.getElementById("user1").value); 
    $.ajax({
      type:"POST",
      url:"php/login.php",
      datatype:"json",
      async: false,
      data:{
        name:na,
        password:pw,
        type:2
      },
      success: function(data){
        // alert("success");
        var json=eval('('+data+')');
        if(json.result==0){
          window.location.href="merChant.html?id="+json.id;
        }else{
          alert("用户名密码错误！");
        }
      },
      error: function(jqXHR){     
     alert("发生错误：" + jqXHR.status);  
    },   
  });
  }
}  

function getCookie(c_name)
{
  if (document.cookie.length>0)
    {
    c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1)
      { 
      c_start=c_start + c_name.length+1 
      c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
      } 
    }
  return ""
}

function setCookie(c_name,value)
{
  document.cookie=c_name+ "=" +escape(value)+ ";";
}

function checkCookie()
{
  var tempusername=getCookie('username')
  if (tempusername!=null && tempusername!="")
  {
    // alert("cookie success");
    usernameNow=tempusername;
    logined();
  }
}

function logined(){
  // alert("in logined");
  var logincus=document.getElementById("loginCus");
  var loginMer=document.getElementById("loginMer");
  var user=document.getElementById("UserName");
  var userdrop=document.getElementById("UserDropdown");
  // alert(usernameNow);
  // alert(logincus.innerHTML);
  // alert(loginMer.innerHTML);
  // alert(user.innerHTML);
  logincus.style="display:none;";
  loginMer.style.display="none";
  user.style.display="block";
  user.innerHTML=usernameNow;
  userdrop.style.display="block";
}



function delCookie(){
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.reload();
}

function load(){
  checkCookie();
  loadlo();
}

function loadlo(){
  for (var i = 1 ; i < 6; i++) {
    $.ajax({
      type:"POST",
      url:"php/loadindex.php",
      datatype:"json",
      async: false,
      data:{
        class:i
      },
      success: function(items){
        // alert("success");
        var json=eval('('+items+')');
        var j=1;
        for(var o=0;o<json.length;o++){
          var img=document.getElementById("class"+i+"-"+j+"-img");
          var h=document.getElementById("class"+i+"-"+j+"-h");
          var d=document.getElementById("class"+i+"-"+j+"-d");
          var hm=document.getElementById("class"+i+"-"+j+"-hm");
          var m=document.getElementById("class"+i+"-"+j+"-m");
          img.parentNode.parentNode.id=json[o].id;
          img.src=json[o].image;
          h.value=json[o].name;
          d.value=json[o].brief;
          hm.value=json[o].price;
          m.value=json[o].origin;
          j++;
          if(i==2||j==2)break;
          if(j==6)break;
        }
      },
      error: function(jqXHR){     
     alert("发生错误：" + jqXHR.status);  
    },   
    });
  }
}

function jump(thisid){
  window.location.href="mer.html?id="+thisid;
}
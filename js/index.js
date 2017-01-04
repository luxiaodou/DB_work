var usernameNow;



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
        // alert("success");
        var json1=eval('('+data+')');
        if(json1.result==0){
          setCookie("username",json1.id);
          usernameNow=json1.id;
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
    // alert("ff");
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
        type:2
      },
      success: function(data){

        var json1=eval('('+data+')');

        if(json1.result==0){
          // alert("success");
          setCookie('mername',json1.id);
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
  var tempusername=getCookie('username');
  if (tempusername!=null && tempusername!="")
  {
    // alert("cookie success");
    usernameNow=tempusername;
    logined();
  }else{
  var temp=getCookie('mername');
  if(temp!=null && temp!=""){
    window.location.href="merChant.html?id="+temp;
    delCookie();
  }
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
  document.cookie = "mername=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  // window.location.reload();
}

function load(){
  checkCookie();
  loadlo();
}

function loadlo(){
  // alert("f");
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
        // alert(items);
        var json1=eval('('+items+')');
        // alert("F");
        // alert(items.items.length);
        var j=1;
        // alert(json1.items[0].id);

        for(var o in json1.items){
          var img=document.getElementById("class"+i+"-"+j+"-img");
          var h=document.getElementById("class"+i+"-"+j+"-h");
          var d=document.getElementById("class"+i+"-"+j+"-d");
          var hm=document.getElementById("class"+i+"-"+j+"-hm");
          var m=document.getElementById("class"+i+"-"+j+"-m");
          // console.log(json1.items[o.toString()].id,json1.items[o.toString()].id);
          img.parentNode.parentNode.id=json1.items[o.toString()].id;
          img.src=json1.items[o.toString()].image;
          h.innerText=json1.items[o.toString()].name;
          d.innerText=json1.items[o.toString()].brief;
          hm.innerText="¥"+json1.items[o.toString()].price;
          m.innerText="¥"+json1.items[o.toString()].origin;
          j++;
          if(i==3&&j==3)break;
          if(j==7)break;
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

function jumpSearch(){
  var id=document.getElementById("searchInput");
  alert(id.value);
  window.location.href="result.html?class=-1&keyword="+id.value;
}

$(document).ready(function(){
  $("#myNav").affix({
    offset: {
      top: 550
    }
  });
});
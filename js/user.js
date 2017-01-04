var usernameNow;
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

function jumpSearch(){
  var id=document.getElementById("searchInput");
  alert(id.value);
  window.location.href="result.html?class=-1&keyword="+id.value;
}

function logined(){
  // alert("in logined");
  var user=document.getElementById("UserName");
  var userdrop=document.getElementById("UserDropdown");
  // alert(usernameNow);
  // alert(logincus.innerHTML);
  // alert(loginMer.innerHTML);
  // alert(user.innerHTML);
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
  loadInfo();
}

function loadInfo(){
  $.ajax({
      type:"POST",
      url:"php/loadinfo.php",
      datatype:"json",
      async: false,
      data:{
        name:usernameNow
      },
      success: function(o){
        // alert("success");
        var json=eval('('+o+')');
          var mN=document.getElementById("List_N");
          var mD=document.getElementById("List_AG");
          var hm=document.getElementById("List_E");
          var m=document.getElementById("List_P");
          var a=document.getElementById("List_A");
          var img=document.getElementById("List_Img");
          img.value=json.image;
          mD.value=json.age;
          hm.value=json.email;
          m.value=json.phone;
          a.value=json.addr;
        },
        error: function(jqXHR){     
       alert("发生错误：" + jqXHR.status);  
      },  
       
    });
}

function Edit(){
  window.location.href="userEdit.html";
}
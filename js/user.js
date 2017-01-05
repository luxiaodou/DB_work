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
        var json1=eval('('+o+')');
          var mN=document.getElementById("list_N");
          var mD=document.getElementById("list_AG");
          var hm=document.getElementById("list_E");
          var m=document.getElementById("list_P");
          var a=document.getElementById("list_A");
          var img=document.getElementById("list_Img");
          var out=document.getElementById("list_Out");
        // console.log(json1.image,json1.age);
          img.innerText=json1.image;
          mD.innerText=json1.age;
          hm.innerText=json1.email;
          m.innerText=json1.phone;
          a.innerText=json1.addr;
          out.innerText=json1.outcome;
        },
        error: function(jqXHR){     
       alert("发生错误：" + jqXHR.status);  
      },  
       
    });
}

function Edit(){
  window.location.href="userEdit.html";
}
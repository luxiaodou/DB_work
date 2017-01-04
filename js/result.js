var usernameNow;
var sp=new Array();
function subNum(){
  if(parseInt(document.getElementById("num").value)>1){
    document.getElementById("num").value=parseInt(document.getElementById("num").value)-1;
  }
}
function addNum(){
  document.getElementById("num").value=parseInt(document.getElementById("num").value)+1;
}


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

function jumpSearch(){
  var id=document.getElementById("searchInput");
  window.location.href="result.html?class=-1&keyword="+id.value;
}

function submit2(){  
    var na=document.getElementById("user2").value;
    var pw=document.getElementById("pass2").value;
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
  sp=window.location.href.split("=");
  var spp=new Array();
  spp=sp[1].split("&");
  sp[0]=spp[0];
  sp[1]=sp[2];
  if(sp[0]!=-1){
    var find=document.getElementById("page"+sp[0]);
    find.className="active";
  }
  $.ajax({
      type:"POST",
      url:"php/search.php",
      datatype:"json",
      async: false,
      data:{
        classid:sp[0],
        keyword:sp[1]
      },
      success: function(data){
        // alert("success");
        var getData=eval('('+data+')');
        if(getData.num==0){
          var no=document.getElementById("noItem");
          no.style="display:inline;";
        }else{
          for(o in getData.items){
            var div=document.createElement("div");
            div.className="itemList";

            var divin=document.createElement("div");
            divin.id="c"+o;
            divin.onclick="getin(this.id)";

            var img=document.createElement("img");
            img.src=getData.items[o].image;
            divin.appendChild(img);

            var divv=document.createElement("div");
            divv.innerText=getData.items[o].name;
            divin.appendChild(divv);
            div.appendChild(divin);

            var anodiv=document.createElement("div");
            anodiv.style="padding-left: 20%;";
            anodiv.innerText="单价";
            div.appendChild(anodiv);

            var lastdiv=document.createElement("div");
            lastdiv.className="addPrice";
            lastdiv.innerText="¥"+getData.items[o].price;
            div.appendChild(lastdiv);
            document.getElementById("ListWrapper").appendChild(div);
          }
        }
      },
      error: function(jqXHR){     
     alert("发生错误：" + jqXHR.status);  
    },   
  });
}


function getin(id){
  window.location.href="mer.html?id="+id;;
}
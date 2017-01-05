var usernameNow;
var sp=new Array();



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

function jumpSearch(){
  var id=document.getElementById("searchInput");
  window.location.href="result.html?class=-1&keyword="+id.value;
}




function load(){
  checkCookie();
  // alert(window.location.href);
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


            var img=document.createElement("img");
            img.src=getData.items[o].image;
            divin.appendChild(img);

            var divv=document.createElement("div");
            divv.innerText=getData.items[o].name;
            divin.appendChild(divv);
            div.appendChild(divin);

            var btn=document.createElement("button");
            btn.className="btn btn-default";
            btn.id="c"+getData.items[o].id;
            btn.onclick=function(){getin(this.id)};
            btn.innerText="点我前往";
            div.appendChild(btn);

            var divse=document.createElement("div");
            divse.className="pricecontain";

            var anodiv=document.createElement("div");
            anodiv.className="pricecontain-div";
            anodiv.innerText="单价";
            divse.appendChild(anodiv);

            var lastdiv=document.createElement("div");
            lastdiv.className="addPrice";
            lastdiv.innerText="¥"+getData.items[o].price;
            divse.appendChild(lastdiv);
            div.appendChild(divse);
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
  var rea=id.split("c");
  window.location.href="mer.html?id="+rea[1];;
}
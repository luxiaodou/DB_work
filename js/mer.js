var usernameNow;
var strs= new Array(); //定义一数组 
function subNum(){
  if(parseInt(document.getElementById("num").value)>1){
    document.getElementById("num").value=parseInt(document.getElementById("num").value)-1;
  }
}
function addNum(){
  document.getElementById("num").value=parseInt(document.getElementById("num").value)+1;
}

function submit1(){ 
    var na=document.getElementById("user1").value;
    var pw=document.getElementById("pass1").value;
    if (na.value==null||pw.value==null) {alert("请填写完全");}
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
        var getData=eval('('+data+')');
        if(getData.result==0){
          setCookie("username",getData.id);
          usernameNow=getData.id;
          logined();
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
        var getData=eval('('+data+')');
        if(getData.result==0){
          window.location.href="merChant.html?id="+getData.id;
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

function loadmer(){
  checkCookie();
  strs=window.location.href.split("="); //字符分割 

  // alert(strs[1]);
  $.ajax({
      type:"POST",
      url:"php/loadmer.php",
      datatype:"json",
      async: false,
      data:{
        id:strs[1]
      },
      success: function(o){
        // alert("success");
          var json1=eval('('+o+')');
          var img=document.getElementById("merImg").childNodes[0];
          var h=document.getElementById("merName").childNodes[0];
          var d=document.getElementById("merInfo").childNodes[0];
          var hm=document.getElementById("hm");
          var m=document.getElementById("m");
          var star=document.getElementById("star");
          var store=document.getElementById("store");
          store.innerText=json1.rest;
          star.innerText=json1.star;
          img.src=json1.image;
          h.innerHTML=json1.name;
          d.innerHTML=json1.brief;
          hm.innerHTML="¥"+json1.price;
          m.innerHTML="¥"+json1.origin;

        },
        error: function(jqXHR){     
       alert("发生错误：" + jqXHR.status);  
      },
       
    });
  loadcomment();
}

function addComment(){
  var starNum=document.getElementById("commentLevel").value;
  var getCom=document.getElementById("textCom").value;
  // alert(getCom);
  $.ajax({
      type:"POST",
      url:"php/loadmer.php",
      datatype:"json",
      async: false,
      data:{
        user:usernameNow,
        item:strs[1],
        star:starNum,
        content:getCom
      },
      success: function(o){
        // alert("success");
          window.location.reload();
        },
      error: function(jqXHR){     
       alert("发生错误：" + jqXHR.status);  
      },  
       
    });
}

function loadcomment(){
    // alert(document.getElementById("user1").value); 
    $.ajax({
      type:"POST",
      url:"php/itemcomment.php",
      datatype:"json",
      async: false,
      data:{
        itemid:strs[1]
      },
      success: function(data){
        // alert("success");
        var bar1=document.getElementById("bar1");
        var bar2=document.getElementById("bar2");
        var bar3=document.getElementById("bar3");
        var bar4=document.getElementById("bar4");
        var bar5=document.getElementById("bar5");
        var getData=eval('('+data+')');
        // alert(parseFloat())
        bar1.style="width:"+100*parseFloat(getData.star1)+"%;";
        bar2.style="width:"+100*parseFloat(getData.star2)+"%;";
        bar3.style="width:"+100*parseFloat(getData.star3)+"%;";
        bar4.style="width:"+100*parseFloat(getData.star4)+"%;";
        bar5.style="width:"+100*parseFloat(getData.star5)+"%;";
        var num=Math.round((parseFloat(getData.star1)*1+parseFloat(getData.star2)*2+parseFloat(getData.star3)*3+parseFloat(getData.star4)*4+parseFloat(getData.star5)*5)*10)/10;
        var highnum=document.getElementById("hightlightnum");
        highnum.innerText=num;
        var comnum=document.getElementById("comnum");
        comnum.innerText=getData.number;
        // addcomment
        for(var o in getData.comment){
          var div=document.createElement("div");
          div.className="fixed";

          var divinfo=document.createElement("div");
          divinfo.className="userInfo";

          var img=document.createElement("img");
          divinfo.appendChild(img);

          var divmid=document.createElement("div");
          divmid.innerText=getData.comment[o].username;
          divinfo.appendChild(divmid);

          var p=document.createElement("p");
          p.className="commentNum";
          p.style="display:inline;";
          p.innerText=getData.comment[o].star+"分";
          divinfo.appendChild(p);
          div.appendChild(divinfo);

          var divcontent=document.createElement("div");
          divcontent.className="realComment";

          var divtime=document.createElement("span");
          divtime.className="commentTime";
          divtime.innerText=getData.comment[o].time;
          divcontent.appendChild(divtime);

          var pcom=document.createElement("p");
          pcom.className="commentcontent";
          pcom.innerText=getData.comment[o].content;
          divcontent.appendChild(pcom);
          div.appendChild(divcontent);

          var divLi=document.getElementById("commentLi");
          divLi.appendChild(div);
        }

      },
      error: function(jqXHR){     
     alert("发生错误：" + jqXHR.status);  
    },   
  });
}

function createorder(){
  $.ajax({
      type:"POST",
      url:"php/createorder.php",
      datatype:"json",
      async: false,
      data:{
        username:usernameNow,
        itemid:strs[1],
        number:document.getElementById("num").value
      },
      success: function(o){
        // alert("success");
          var result=eval('('+o+')');
          if(result.res==0){
            alert("订单提交成功！");
          }
        },
      error: function(jqXHR){     
       alert("发生错误：" + jqXHR.status);  
      },  
       
    });
}
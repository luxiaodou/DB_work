var usernameNow;
function subNum(id){
  if(parseInt(document.getElementById(id).value)>1){
    document.getElementById(id).value=parseInt(document.getElementById(id).value)-1;
  }
}
function addNum(id){
  document.getElementById(id).value=parseInt(document.getElementById(id).value)+1;
}

function jumpSearch(){
  var id=document.getElementById("searchInput");
  alert(id.value);
  window.location.href="result.html?class=-1&keyword="+id.value;
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
   $.ajax({
      type:"POST",
      url:"php/userorder.php",
      datatype:"json",
      async: false,
      data:{
        username:usernameNow
      },
      success: function(data){
        var count=0;
        // alert("success");
        var getData=eval('('+data+')');
        if (getData.flag==0) {
          var up=document.getElementById("unpay");
          var p=document.getElementById("pay");
          up.style="display:none";
          u.style="display:none";
        }
        for(o in getData.orders){
          if(getData.orders[o].order_state==1){
            for(det in getData.orders[o].detail){
              count+=parseInt(getData.orders[o].detail[det].number)*parseFloat(getData.orders[o].detail[det].price);
              var div=document.createElement("div");
              div.className="itemList";
              var img=document.createElement("img");
              img.src=getData.orders[o].detail[det].itemimg;
              div.appendChild(img);
              var divin=document.createElement("div");
              divin.innerText=getData.orders[o].detail[det].itemname;
              div.appendChild(divin);
              var divbtn=document.createElement("div");
              divbtn.style="padding-left: 20%;";
              divbtn.innerText="单价";
              div.appendChild(divbtn);
              var divprice=document.createElement("div");
              divprice.className="addPrice";
              divprice.innerText="¥"+getData.orders[o].detail[det].price;
              div.appendChild(divprice);
              var btn1=document.createElement("button");
              btn1.innerText="X"+getData.orders[o].detail[det].number;
              div.appendChild(btn1);
              document.getElementById("addlist").appendChild(div);
            }
          }else{
            var wrapdiv=document.createElement("div");
            wrapdiv.className="border";
            for(det in getData.orders[o].detail){
              var div=document.createElement("div");
              div.className="itemList";
              var img=document.createElement("img");
              img.src=getData.orders[o].detail[det].itemimg;
              div.appendChild(img);
              var divin=document.createElement("div");
              divin.innerText=getData.orders[o].detail[det].itemname;
              div.appendChild(divin);
              var divbtn=document.createElement("div");
              divbtn.style="padding-left: 20%;";
              divbtn.innerText="单价";
              div.appendChild(divbtn);
              var divprice=document.createElement("div");
              divprice.className="addPrice";
              divprice.innerText="¥"+getData.orders[o].detail[det].price;
              div.appendChild(divprice);
              var btn1=document.createElement("button");
              btn1.innerText="X"+getData.orders[o].detail[det].number;
              div.appendChild(btn1);
              wrapdiv.appendChild(div);
            }
            document.getElementById("paidlist").appendChild(wrapdiv);
          }
        }
        var buttonnum=document.getElementById("paybtn");
        buttonnum.innerText="¥"+count;
      },
      error: function(jqXHR){     
     alert("发生错误：" + jqXHR.status);  
    },   
  });
}

function pay(){
  $.ajax({
      type:"POST",
      url:"php/pay.php",
      datatype:"json",
      async: false,
      data:{
        username:usernameNow
      },
      success: function(data){
        // alert("success");
        var json=eval('('+data+')');
        if(json.res==0){
          alert("支付成功！")
        }else{
          alert("支付失败！");
        }
      },
      error: function(jqXHR){     
     alert("发生错误：" + jqXHR.status);  
    },   
  });
}
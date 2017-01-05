var usernameNow;
var unpayid;
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

        for(o in getData.orders){
          if(getData.orders[o].order_state==1){
            for(det in getData.orders[o].detail){
              unpayid=getData.orders[o].order_id;
              count+=parseInt(getData.orders[o].detail[det].number)*parseFloat(getData.orders[o].detail[det].price);
              var div=document.createElement("div");
              div.className="itemList";
              var img=document.createElement("img");
              img.src=getData.orders[o].detail[det].itemimg;
              div.appendChild(img);
              var divin=document.createElement("div");
              divin.innerText=getData.orders[o].detail[det].itemname;
              div.appendChild(divin);

              var divl=document.createElement("div");
              divl.className="pricecontain";
              var divbtn=document.createElement("div");
              divbtn.className="pricecontain-div";
              divbtn.innerText="单价";
              divl.appendChild(divbtn);
              var divprice=document.createElement("div");
              divprice.className="addPrice";
              divprice.innerText="¥"+getData.orders[o].detail[det].price;
              divl.appendChild(divprice);
              var btn1=document.createElement("button");
              btn1.innerText="X"+getData.orders[o].detail[det].number;
              divl.appendChild(btn1);
              div.appendChild(divl);
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

              var divl=document.createElement("div");
              divl.className="pricecontain";
              var divbtn=document.createElement("div");
              divbtn.className="pricecontain-div";
              divbtn.innerText="单价";
              divl.appendChild(divbtn);
              var divprice=document.createElement("div");
              divprice.className="addPrice";
              divprice.innerText="¥"+getData.orders[o].detail[det].price;
              divl.appendChild(divprice);
              var btn1=document.createElement("button");
              btn1.innerText="X"+getData.orders[o].detail[det].number;
              divl.appendChild(btn1);
              div.appendChild(divl);
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
        username:usernameNow,
        orderid:unpayid
      },
      success: function(data){
        // alert("success");
        var json=eval('('+data+')');
        if(json.res==0){
          alert("支付成功！");
          window.location.href=window.location.href;
        }else{
          alert("支付失败！");
        }
      },
      error: function(jqXHR){     
     alert("发生错误：" + jqXHR.status);  
    },   
  });
}
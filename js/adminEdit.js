var idlist= new Array();
function jumpSearch(){
  var id=document.getElementById("searchInput");
  alert(id.value);
  window.location.href="result.html?class=-1&keyword="+id.value;
}

function loadMerEdit(){
  idlist=window.location.href.split("=");
  var list=new Array();
  list=idlist[1].split("&");
  idlist[0]=list[0];
  idlist[1]=idlist[2];
  document.getElementById("mecName").innerText=idlist[0];
  $.ajax({
      type:"POST",
      url:"php/loadmer.php",
      datatype:"json",
      async: false,
      data:{
        id:idlist[1]
      },
      success: function(o){
        // alert("success");
        var json=eval('('+o+')');
          var mN=document.getElementById("merName");
          var mD=document.getElementById("merD");
          var hm=document.getElementById("merHm");
          var m=document.getElementById("merM");
          var img=document.getElementById("merImg");
          img.innerText=json.image;
          mN.innerText=json.name;
          mD.innerText=json.brief;
          hm.innerText=json.price;
          m.innerText=json.origin;
        },
        error: function(jqXHR){     
       alert("发生错误：" + jqXHR.status);  
      },  
       
    });
}


function submitEdit(){

  var mN=document.getElementById("merName").value;
  var mD=document.getElementById("merD").value;
  var hm=document.getElementById("merHm").value;
  var m=document.getElementById("merM").value;
  var img=document.getElementById("merImg").value;
  var Re=document.getElementById("merRest").value;
  var type=document.getElementById("merType").value;
    $.ajax({
        type:"POST",
        url:"php/updateitem.php",
        datatype:"json",
        async: false,
        data:{
            shopid:idlist[0],
            itemid:idlist[1],
            name:mN,
            price:hm,
            origin:m,
            brief:mD,
            class:type,
            image:img,
            rest:Re
        },
        success: function(o){
            // alert("success");
            var json=eval('('+o+')');
            if(json.res==0){
              window.location.href="merchant.html?id="+idlist[0];
            }else{
              alert("提交失败！");
            }
        },
        error: function(jqXHR){
            alert("发生错误：" + jqXHR.status);
        },

    });
  
    
}
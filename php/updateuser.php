<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/2
 * Time: 21:54
 */
require_once 'mysql.php';
/**
 * 修改用户信息函数
 * 输入：
 *      "name" : name,
        "addr" : addr,
        "phone" : phone,
        "age" : age
        "email" : email,
        "image" : imageurl
 * 输出：
 *      res:0 成功 1 失败
 */
$conn = uconnectDb();

$addr = $_POST['addr'];
$name = $_POST['name'];
$phone = $_POST['phone'];
$age = $_POST['age'];
$email = $_POST['email'];
$image = $_POST['image'];
//$name = 'luxiaodou';
//$addr = '北京市海淀区北京航空航天大学';
//$phone = '13691515258';
//$age = 20;
//$email = 'lusongchn@gmail.com';
//$image = 'http://localhost/img/user.jpg';

$res = mysql_query("select user_id from users where user_name = '$name'");
$arr = mysql_fetch_assoc($res);
$id = $arr['user_id'];

$res = mysql_query("update users set user_name = '$name',user_addr = '$addr', user_phone = '$phone',
                    user_age = '$age',user_email = '$email',user_image = '$image' where user_id = '$id'",$conn);
$out = new stdClass();
if (mysql_errno()) {
    $out->res = '1';
}
else
    $out->res = '0';
echo json_encode($out);
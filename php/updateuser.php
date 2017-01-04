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
 *      "id" : id,
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

$id = $_POST['id'];
$addr = $_POST['addr'];
$name = $_POST['name'];
$phone = $_POST['phone'];
$age = $_POST['age'];
$email = $_POST['email'];
$image = $_POST['image'];

$res = mysql_query("update users set user_name = '$name',user_addr = '$addr', user_phone = '$phone', 
                    user_age = '$$age',user_email = '$email',user_image = '$image' where user_id = '$id'",$conn);
$out = new stdClass();
if (mysql_errno()) {
    $out->res = '1';
}
else
    $out->res = '0';
echo json_encode($out);
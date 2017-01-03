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
        "pw" : pw;
        "age" : age
        "email" : email,
        "image" : imageurl
 * 输出：
 *      不成功返回为空''
 */
$conn = uconnectDb();
if (!isset ($_POST['data'])) {
    die('JSON not define!');
}
$addr = $_POST['addr'];
$name = $_POST['name'];
$phone = $_POST['phone'];
$pw = $_POST['pw'];
$age = $_POST['age'];
$email = $_POST['email'];
$image = $_POST['image'];

$json = $_POST['data'];
$data = json_decode($json);

$res = mysql_query("update users set user_addr = '$addr', user_phone = '$phone',user_password = '$pw', 
                    user_age = '$$age',user_email = '$email',user_image = '$image' where user_name = '$name'",$conn);
echo $res;
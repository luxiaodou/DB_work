<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/4
 * Time: 2:50
 */
/**
 * 读取个人信息的函数
 * 输入：
 *      name:name
 * 输出：
 *      email:
 *      addr:
 *      reg_date:
 *      phone:
 *      image:
 *      age:
 */
require_once 'mysql.php';
$conn = uconnectDb();

$name = $_POST['name'];
if (empty($name)) {
    die('name should not be empty!');
}

$res = mysql_query("select * from users where user_name = '$name'");
$arr = mysql_fetch_assoc($res);

$out = new stdClass();
$out->email = $arr['user_email'];
$out->addr = $arr['user_addr'];
$out->reg_date = $arr['user_reg_date'];
$out->phone = $arr['user_phone'];
$out->image = $arr['user_image'];
$out->age = $arr['user_age'];

echo json_encode($out);

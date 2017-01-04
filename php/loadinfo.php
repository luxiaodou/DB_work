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
 *      outcome:
 */
require_once 'mysql.php';
$conn = uconnectDb();

//$name = $_POST['name'];
$name = 'luxiaodou';
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
$out->outcome = $arr['user_outcome'];

echo json_encode($out);
//echo "{\"email\":\"lusongchn@gmail.com\",\"addr\":\"\u5317\u4eac\u5e02\u6d77\u6dc0\u533a\u5317\u4eac\u822a\u7a7a\u822a\u5929\u5927\u5b66\",\"reg_date\":\"2017-01-04\",\"phone\":\"13691515258\",\"image\":\"http:\/\/localhost\/img\/user.jpg\",\"age\":\"21\",\"outcome\":\"0\"}";
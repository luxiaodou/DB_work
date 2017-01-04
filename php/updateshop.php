<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/4
 * Time: 3:09
 */
require_once 'mysql.php';
/**
 * 修改商户信息函数
 * 输入：
 *      id:
 *      name:
 *      email:
 *      phone:
 *      addr:
 * 输出：
 *      res:0 成功 1 失败
 */
$conn = sconnectDb();

$id = $_POST['id'];
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$addr = $_POST['addr'];

$res = mysql_query("update shop set shop_name = '$name', shop_phone = '$phone',shop_email = '$email',shop_addr = '$addr' where shop_id = '$id'",$conn);
$out = new stdClass();
if (mysql_errno()) {
    $out->res = '1';
}
else
    $out->res = '0';
echo json_encode($out);
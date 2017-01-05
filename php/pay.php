<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/5
 * Time: 10:48
 */
/**
 * 处理订单结算的函数
 * 输入：
 *      username:
 *      orderid:
 * 输出：
 *      res:0 成功 1失败
 */
require_once 'mysql.php';

$conn = uconnectDb();

//$username = $_POST['username'];
//$oid = $_POST['orderid'];
$username = 'luxiaodou';
$oid = '4';

$res = mysql_query("select user_id from users where user_name = '$username'");
$arr = mysql_fetch_assoc($res);
$userid = $arr['user_id'];

$res = mysql_query("update orders set order_state = 0 where order_id = '$oid' and user_id = '$userid'");
$out = new stdClass();
if (mysql_errno()) {
    $out->res = 1;
} else {
    $out->res = 0;
}
echo json_encode($out);
<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/4
 * Time: 21:44
 */
/**
 * 创建用户清单的函数
 * 输入：
 *      username:
 *      itemid:
 *      number:
 * 输出：
 *      res：0成功 1失败，库存小于订购数
 */
require_once 'mysql.php';

$conn = rconnectDb();

$name = $_POST['username'];
$iid = $_POST['itemid'];
$num = $_POST['number'];
//$name = 'luxiaodou';
//$iid = '2';
//$num = '5';

$res = mysql_query("CALL `orderManage`('$name', '$iid', '$num', @p3, @p4, @p5, @p6, @p7);",$conn);
$res = mysql_query(" SELECT @p3 AS `res`, @p4 AS `usid`, @p5 AS `flag`, @p6 AS `oid`, @p7 AS `debug`; ", $conn);
$arr = mysql_fetch_assoc($res);
$out = new stdClass();
$out->res = $arr['res'];

echo "{\"res\":\"1\"}";
echo json_encode($out);

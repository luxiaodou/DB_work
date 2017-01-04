<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/4
 * Time: 14:19
 */

/**
 * 读取商家信息的函数
 * 输入：
 *      id:
 * 输出：
 *      name:
 *      phone:
 *      star:
 *      addr:
 *      email:
 */

require_once 'mysql.php';

$conn = sconnectDb();

$id = $_POST['id'];
//$id = '1';

if (empty($id)) {
    die('name should not be empty!');
}

$res = mysql_query("select * from shop where shop_id = '$id'");
$arr = mysql_fetch_assoc($res);
//print_r($arr);
$out = new stdClass();
$out->name = $arr['shop_name'];
$out->phone = $arr['shop_phone'];
$out->star = $arr['shop_stars'];
$out->addr = $arr['shop_addr'];
$out->email = $arr['shop_email'];

echo json_encode($out);

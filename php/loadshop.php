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
 *      income:
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
$out->income = $arr['shop_income'];

echo json_encode($out);
//样例：
//echo "{\"name\":\"\u6c49\u5df4\u5473\u5fb7\u81ea\u52a9\u9910\u5385\",\"phone\":\"1234567\",\"star\":\"0\",\"addr\":\"\u5317\u4eac\",\"email\":\"hanba@gmail.com\",\"income\":\"0\"}";

<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/2
 * Time: 18:15
 */
/**
 * 删除商品函数
 * 输入：
 *      id：id
 * 输出：
 *      res：0成功 1失败
 */
require_once 'mysql.php';

$conn = sconnectDb();

if (!isset($_POST['id'])) {
    die('id not define!');
}
$id = $_POST['id'];
if (empty($id)) {
    die('id should not be empty!');
}

$res = mysql_query("delete from item where item_id = '$id'");

$out = new stdClass();
if (mysql_errno()) {
    $out->res = '0';
}else{
    $out->res = '1';
}
echo json_encode($out);
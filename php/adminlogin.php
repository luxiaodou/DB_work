<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/5
 * Time: 2:35
 */
/**
 * 管理员登陆功能函数：
 * 输入：
 *      id：
 *      pw：
 * 输出：
 *      res:0成功 1失败
 *      class:
 */
require_once 'mysql.php';
$conn = rconnectDb();

$id = $_POST['id'];
$pw = $_POST['pw'];
//$id = '1';
//$pw = 'root';

$res = mysql_query("select * from admin where admin_id = '$id'");
$arr = mysql_fetch_assoc($res);
$out = new stdClass();
if ($id == $arr['admin_id'] && $pw == $arr['admin_pw']) {
    $out->res = 0;
    $out->class = $arr['admin_class'];
} else {
    $out->res = 1;
    $out->class = -1;
}
echo json_encode($out);
//样例
//echo "{\"res\":0,\"class\":\"1\"}";
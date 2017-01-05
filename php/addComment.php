<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/4
 * Time: 2:58
 */
/**
 * 创建用户评价的函数
 * 输入：
 *      user:
 *      item:
 *      star:
 *      content:
 * 输出：
 *      res：0操作成果 1操作失败
 */
require_once 'mysql.php';
$conn = uconnectDb();

$user = $_POST['user'];
$item = $_POST['item'];
$star = $_POST['star'];
$cont = $_POST['content'];
$time = date("Y-m-d", time());
//$user = 'luxiaodou';
//$item = '1';
//$star = '5';
//$cont = 'bu cuo';

$res = mysql_query("select user_id from users where user_name = '$user'");
$arr = mysql_fetch_assoc($res);
$user = $arr['user_id'];
//echo $user;

$res = mysql_query("INSERT INTO `comment` (`comment_id`, `comment_user`, `comment_item`, `comment_time`, `comment_star`, `comment_content`)
                    VALUES (NULL, '$user', '$item', '$time', '$star', '$cont')");

$out = new stdClass();
if (mysql_errno()) {
    $out->res = '1';
}else
    $out->res = '0';

echo json_encode($out);
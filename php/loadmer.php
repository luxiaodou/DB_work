<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/4
 * Time: 2:15
 */

/**
 * mer页面的动态填写函数
 * 输入内容：
 *      id:id
 * 输出内容：
 *      name:
 *      price:
 *      origin:
 *      brief:
 *      shop:
 *      class:
 *      image:
 *      star:
 */

require_once 'mysql.php';

$conn = uconnectDb();

//$id = $_POST['id'];
$id = '5';

if (empty($id)) {
    die('class is empty!');
}

$id = intval($id);

$result = mysql_query("select * from item where item_id = '$id'");
$arr = mysql_fetch_assoc($result);
$out = new stdClass();
$out->name = $arr['item_name'];
$out->price = $arr['item_price'];
$out->origin = $arr['item_origin'];
$out->brief = $arr['item_brief'];
$out->class = $arr['item_class'];
$out->shop = $arr['item_shop'];
$out->image = $arr['item_image'];
$out->star = $arr['item_stars'];
echo json_encode($out);
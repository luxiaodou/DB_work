<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/4
 * Time: 15:32
 */

/*
 * 修改商品信息的函数
 * 输入：
 *      shopid:
 *      itemid:
 *      name:
 *      price:
 *      origin:
 *      brief:
 *      class:
 *      image:
 *      rest:
 *
 * 输出：
 *      res:0成功 1失败
 */

require_once 'mysql.php';

$conn = sconnectDb();

$shopid = $_POST['shopid'];
$itemid = $_POST['itemid'];
$name = $_POST['name'];
$price = $_POST['price'];
$origin = $_POST['origin'];
$brief = $_POST['brief'];
$class = $_POST['class'];
$image = $_POST['image'];
$rest = $_POST['rest'];

$res1 = mysql_query("call setrest('$itemid','$rest','@a');select @a;",$conn);
$row = mysql_fetch_row($res1);
$out = new stdClass();
if ($row = 1) {
    $out->res = 1;
    echo json_encode($out);
} else {
    $res2 = mysql_query("update item set item_rest = '$name',item_price = '$price',item_origin = '$origin'
                        item_brief = '$brief',item_class = '$class', item");
    $out->res = 0;
    echo json_encode($out);
}

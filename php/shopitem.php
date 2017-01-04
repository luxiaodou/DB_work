<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/4
 * Time: 14:47
 */
/*
 * 显示商家所有商品的函数
 * 输入：
 *      shopid
 * 输出：
 *      num:共有几个商品
 *      items:
 *          [
 *              {
 *                  id:
 *                  name:
 *                  price:
 *                  origin:
 *                  brief:
 *                  shop:
 *                  class:
 *                  image:
 *                  stars:
 *                  rest:
 *              },
 *              {
 *                  id:
 *                  name:
 *                  price:
 *                  origin:
 *                  brief:
 *                  shop:
 *                  class:
 *                  image:
 *                  star:
 *                  rest:
 *              }...
 *          ]
 *
 */

require_once 'mysql.php';

$conn = sconnectDb();

$shop_id = $_POST['shop_id'];
//$shop_id = '1';
if (empty($shop_id)) {
    die('shop_id is empty!');
}

$shop_id = intval($shop_id);

$result = mysql_query("select * from item where item_shop = '$shop_id'");
$dataCount = mysql_num_rows($result);
$out = new stdClass();
$out->num = $dataCount;
$out_array = array();
for ($i = 0; $i < $dataCount; $i++) {
    $arr = mysql_fetch_assoc($result);
    $out_array[$i] = new stdClass();
    $out_array[$i]->id = $arr['item_id'];
    $out_array[$i]->name = $arr['item_name'];
    $out_array[$i]->price = $arr['item_price'];
    $out_array[$i]->origin = $arr['item_origin'];
    $out_array[$i]->brief = $arr['item_brief'];
    $out_array[$i]->shop = $arr['item_shop'];
    $out_array[$i]->class = $arr['item_class'];
    $out_array[$i]->image = $arr['item_image'];
    $out_array[$i]->star = $arr['item_stars'];
    $out_array[$i]->rest = $arr['item_rest'];
}
$out->items = $out_array;
echo json_encode($out);

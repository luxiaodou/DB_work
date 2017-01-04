<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/4
 * Time: 0:31
 */
/*
 * 加载主页内容的函数
 * 输入：
 *     class: classid
 *
 * 输出：
 *     items:
 *      [
 *          {
 *                  id:
 *                  name:
 *                  price:
 *                  origin:
 *                  brief:
 *                  shop:
 *                  class:
 *                  image:
 *          },
 *          {
 *                  id:
 *                  name:
 *                  price:
 *                  origin:
 *                  brief:
 *                  shop:
 *                  class:
 *                  image:
 *          }...
 *      ]
 *
 *
 */

require_once 'mysql.php';

$conn = uconnectDb();

$class = $_POST['class'];
//$class = '1';

if (empty($class)) {
    die('class is empty!');
}

$class = intval($class);

$result = mysql_query("select * from item where item_class = '$class'");
$dataCount = mysql_num_rows($result);
$out = new stdClass();
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
}
$out->items = $out_array;
echo json_encode($out);





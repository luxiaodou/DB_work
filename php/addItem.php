<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/2
 * Time: 20:57
 */
/**
 * 添加商品的函数
 * 输入格式：
 *      shopid:
 *      name:
 *      price:
 *      origin:
 *      brief:
 *      rest:
 *      shop:
 *      class:
 *      image:
 * 输出格式：
 *      res: 0成功 1失败
 */
require_once 'mysql.php';

$conn = sconnectDb();

$id = $_POST['shopid'];
if (empty($id)) {
    die('id should not be empty!');
}
$name = $_POST['name'];
$price = $_POST['price'];
$origin = $_POST['origin'];
$brief = $_POST['brief'];
$shop = $_POST['shop'];
$class = $_POST['class'];
$image = $_POST['image'];
$rest = $_POST['rest'];

$res = mysql_query("INSERT INTO `item` (`item_id`, `item_name`, `item_price`, `item_origin`, `item_brief`, `item_shop`, `item_class`, `item_image`, `item_stars`, `item_brief`) 
                    VALUES (NULL, '$name', '$price', '$origin', '$brief', '$shop', '$class', '$image', '','$rest')",$conn);
$out =new stdClass();
if (mysql_errno()) {
    $out->res = '1';
} else {
    $out->res = '0';
}
echo json_encode($out);
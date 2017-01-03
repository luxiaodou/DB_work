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

if (empty($class)) {
    die('class is empty!');
}

$class = intval($class);

$result = mysql_query("select * from item where item_class = '$class'");
$arr = mysql_fetch_assoc($result);
print_r($arr);
$obj = new stdClass();


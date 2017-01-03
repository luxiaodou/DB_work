<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/2
 * Time: 20:57
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

mysql_query("delete from item where item_id = '$id'");

if (!mysql_errno()){
    printf("The item has been delete successfully!");
}

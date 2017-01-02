<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/2
 * Time: 15:36
 */
require_once 'mysql.php';

$conn = connectDb();

if (!isset($_POST['name'])) {
    die('user name not define!');
}
if (!isset($_POST['pw'])) {
    die('user pw not define!');
}
if (!isset($_POST['type'])) {
    die('form type not define!');
}

$name = $_POST['name'];
if (empty($name)) {
    die('user name is empty!');
}
$pw = $_POST['pw'];
if (empty($name)) {
    die('user pw is empty!');
}
$type = $_POST['type'];
if (empty($type)) {
    die('form type is empty!');
}

$type = intval($type);

if ($type == 1) {
    $result = mysql_query("select * from users where user_name = '$name' and user_password = '$pw'",$conn);
    $dataCount = mysql_num_rows($result);

    if ($dataCount) {
        printf("登陆成功！");
    } else {
        die('用户名或密码错误！');
    }
} elseif ($type == 2) {
    $result = mysql_query("select * from shop where shop_id = '$name' and shop_password = '$pw'",$conn);
    $dataCount = mysql_num_rows($result);
    if ($dataCount) {
        printf("登陆成功！");
    } else {
        die('商户ID或密码错误');
    }
} else {
    die('表单类型错误！');
}


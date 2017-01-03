<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/2
 * Time: 17:06
 */

require_once 'mysql.php';

if (!isset($_POST['username'])) {
    die('user name not define!');
}
if (!isset($_POST['username'])) {
    die('user name not define!');
}
if (!isset($_POST['password'])) {
    die('user pw not define!');
}
if (!isset($_POST['password2'])) {
    die('user pw not repeat!');
}
if (!isset($_POST['type'])) {
    die('form type not define!');
}

$name = $_POST['username'];
if (empty($name)) {
    die('user name is empty!');
}
$email = $_POST['email'];
if (empty($email)) {
    die('user email is empty!');
}
$pw = $_POST['password'];
if (empty($pw)) {
    die('user pw is empty!');
}
$pw2 = $_POST['password2'];
if (empty($pw2)) {
    die('user pw2 is empty!');
}
$type = $_POST['type'];
if (empty($type)) {
    die('form type is empty!');
}

$type = intval($type);
$conn = rconnectDb();

if ($pw != $pw2) {
    printf("两次输入的密码不一致！");
}

if ($type == 1) {
    mysql_query("insert into users(user_name,user_email,user_password) VALUES ('$name','$email','$pw')",$conn);
    if (!mysql_errno()) {
        print_r("用户注册成功！");
    }
} elseif ($type == 2) {
    mysql_query("insert into shop(shop_name,shop_email,shop_password) VALUES ('$name','$email','$pw')",$conn);
    if (!mysql_errno()) {
        print_r("商户注册成功！");
    }
} else {
    die('表单类型错误！');
}
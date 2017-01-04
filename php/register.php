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
$time = date("Y-m-d", time());

$type = intval($type);
$conn = rconnectDb();


if ($pw != $pw2) {
    echo "<script language=javascript>alert('两次输入的密码不同，请重新输入！');history.go(-1);</script>";
}

if ($type == 1) {
    $result = mysql_query("select * from users where user_name = '$name'",$conn);
    $dataCount = mysql_num_rows($result);
    if ($dataCount) {
        echo "<script language=javascript>alert('该用户名已经存在！请登陆或尝试其他用户名！');history.go(-1);</script>";
    }

    $result = mysql_query("insert into users(user_name,user_email,user_password,user_reg_date) VALUES ('$name','$email','$pw','$time')",$conn);
    if (!mysql_errno()) {
        echo "<script language=javascript>alert('用户注册成功！');window.location.href='/index.html';</script>";
    }
} elseif ($type == 2) {
    $result = mysql_query("select * from shop where shop_name = '$name'",$conn);
    $dataCount = mysql_num_rows($result);
    if ($dataCount) {
        echo "<script language=javascript>alert('该用户名已经存在！请登陆或尝试其他用户名！');history.go(-1);</script>";
    }
//    mysql_query("insert into shop(shop_name,shop_email,shop_password) VALUES ('$name','$email','$pw')",$conn);
    if (!mysql_errno()) {
        echo "<script language=javascript>alert('商家注册成功！');window.location.href='/index.html';</script>";
    }
} else {
    die('表单类型错误！');
}
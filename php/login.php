<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/2
 * Time: 15:36
 */
/**
 * 用户/商家登陆用函数
 * JSON传入名称：data
 * JSON格式：
 *      name: ''
 *      password: ''
 *      type: '1'或'2' 1代表用户，2代表商家
 *
 * 输出格式：
 *      result: ''
 *      id： ''
 */
require_once 'mysql.php';

$conn = uconnectDb();
<<<<<<< HEAD
<<<<<<< HEAD


=======
if (!isset ($_POST['data'])) {
    die('JSON not define!');
}
=======
>>>>>>> origin/master

>>>>>>> origin/master
$name = $_POST['name'];
$pw = $_POST['password'];
$type = $_POST['type'];
if (empty($name)) {
    die('user name is empty!');
}
if (empty($pw)) {
    die('user pw is empty!');
}
if (empty($type)) {
    die('form type is empty!');
}

$type = intval($type);

if ($type == 1) {
    $result = mysql_query("select * from users where user_name = '$name' and user_password = '$pw'",$conn);
    $arr = mysql_fetch_assoc($result);
    $obj = new stdClass();
    if ($name = $arr['user_name'] && $pw = $arr['user_password']) {
        $obj->result = 0;
        $obj->id = $arr['user_name'];
//        printf("success1!");
        echo json_encode($obj);
    } else {
        $obj->result = 1;
        $obj->id = 'ERROR!';
//        printf("failed1!!");
        echo json_encode($obj);
    }
} elseif ($type == 2) {
    $result = mysql_query("select * from shop where shop_id = '$name' and shop_password = '$pw'",$conn);
    $arr = mysql_fetch_assoc($result);
    $obj = new stdClass();
//    print_r($arr);
    if ($name = $arr['shop_id'] && $pw = $arr['shop_password']) {
        $obj->result = 0;
        $obj->id = $arr['shop_id'];
//        printf("success2");
        echo json_encode($obj);
    } else {
        $obj->result = 1;
        $obj->id = 'ERROR!';
//        printf('failed2');
        echo json_encode($obj);
    }
} else {
    die('表单类型错误！');
}

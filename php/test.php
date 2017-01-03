<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/3
 * Time: 23:08
 */

require_once 'mysql.php';

$conn = uconnectDb();

//$json = "{\"name\":\"luxiaodou\",\"password\":\"luxiaoou\",\"type\":\"1\"}";
$json = "{\"name\":\"2\",\"password\":\"abc\",\"type\":\"2\"}";
json_encode($json);

$data = json_decode($json);
$name = $data->name;
$pw = $data->password;
$type = $data->type;
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
        return json_encode($obj);
    } else {
        $obj->result = 1;
        $obj->id = 'ERROR!';
//        printf("failed1!!");
        return json_encode($obj);
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
        return json_encode($obj);
    } else {
        $obj->result = 1;
        $obj->id = 'ERROR!';
//        printf('failed2');
        return json_encode($obj);
    }
} else {
    die('表单类型错误！');
}
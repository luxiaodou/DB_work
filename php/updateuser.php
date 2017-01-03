<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/2
 * Time: 21:54
 */
require_once 'mysql.php';
/**
 * 修改用户信息函数
 * 输入：
 *      "name" : name,
        "user_addr" : addr,
        "user_phone" : phone,
        "user_pw" : pw;
        "user_email" : email,
        "user_image" : imageurl
 * 输出：
 *      "result" : res
 */
$conn = uconnectDb();

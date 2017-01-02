<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/2
 * Time: 15:38
 */

define('MYSQL_HOST','localhost');
define('MYSQL_USER','root');
define('MYSQL_PW','');

/**
 * 连接数据库所用函数
 * @return resource
 */
function connectDb() {
    $conn = mysql_connect(MYSQL_HOST,MYSQL_USER,MYSQL_PW);
    mysql_query("set names 'utf8'");    //解决中文乱码
    if (!$conn){
        die('Cannot access to DB');
    }
    mysql_select_db('myapp');
    return $conn;
}


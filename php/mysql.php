<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/2
 * Time: 15:38
 */

define('MYSQL_HOST','localhost');
define('MYSQL_ROOT','root');
define('MYSQL_ROOT_PW','');
define('MYSQL_USER','user');
define('MYSQL_USER_PW','');
define('MYSQL_SHOP','shop');
define('MYSQL_SHOP_PW','');
/**
 * 管理员连接数据库所用函数
 * @return resource
 */
function rconnectDb() {
    $conn = mysql_connect(MYSQL_HOST,MYSQL_ROOT,MYSQL_ROOT_PW);
    mysql_query("set names 'utf8'");    //解决中文乱码
    if (!$conn){
        die('Cannot access to DB,root');
    }
    mysql_select_db('db_work');
    return $conn;
}

/**
 * 用户连接数据库所用的函数
 * @return resource
 */
function uconnectDb() {
    $conn = mysql_connect(MYSQL_HOST,MYSQL_USER,MYSQL_USER_PW);
    mysql_query("set names 'utf8'");    //解决中文乱码
    if (!$conn){
        die('Cannot access to DB,user');
    }
    mysql_select_db('db_work');
    return $conn;
}

/**
 * 商家连接数据库所用的函数
 * @return resource
 */
function sconnectDb() {
    $conn = mysql_connect(MYSQL_HOST,MYSQL_SHOP,MYSQL_SHOP_PW);
    mysql_query("set names 'utf8'");    //解决中文乱码
    if (!$conn){
        die('Cannot access to DB,shop');
    }
    mysql_select_db('db_work');
    return $conn;
}

<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/4
 * Time: 23:50
 */
/**
 * 获取某一用户全部订单的函数
 * 输入：
 *      username:
 * 输出：
 *      orders:
 *          [{
 *              order_id:
 *              user_id:
 *              order_time:
 *              order_price:
 *              order_state:
 *              detail:
 *                  [
 *                      {
                            itemid:
 *                          number:
 *                      },
 *                      {  itemid:
 *                          number:
 *                       }...
 *                  ]
 *          },
 *          {
 *              order_id:
 *              user_id:
 *              order_time:
 *              order_price:
 *              order_state:
 *              detail:
 *                  [
 *                      {
 *                          itemid:
 *                          number:
 *                      },
 *                      {  itemid:
 *                          number:
 *                       }...
 *                  ]
 *
 */
require_once 'mysql.php';

$conn = uconnectDb();

$username = $_POST['username'];

<?php
/**
 * 获取某一用户全部订单的函数
 * 输入：
 *      username:
 * 输出：
 *      flag: 1为存在未支付，0为不存在未支付
 *      number:
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
 *                          itemid:
 *                          number:
 *                      },
 *                      {   itemid:
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
 *                          itemname:
 *                          price:
 *                          itemimg:
 *                          number:
 *                      },
 *                      {   itemid:
 *                          itemname:
 *                          price:
 *                          itemimg:
 *                          number:
 *                       }...
 *                  ]
 *
 */
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/4
 * Time: 23:50
 */
require_once 'mysql.php';

$conn = uconnectDb();

//$username = $_POST['username'];
$username = 'luxiaodou';
$res = mysql_query("select user_id from users where user_name = '$username'",$conn);
$arr = mysql_fetch_assoc($res);
$id = $arr['user_id'];
//echo 'id :' . $id . "<br>";
$res = mysql_query("select order_id from orders where user_id = '$id'",$conn);
$dataCount = mysql_num_rows($res);
//echo 'datacount :'.$dataCount."<br>";


$out = new stdClass();
$out->number = $dataCount;
$res1 = mysql_query("select order_id from orders where user_id = '$id' AND order_state = '1'",$conn);
$dataCount2 = mysql_num_rows($res1);
if ($dataCount2 == 0) {
    $out->flag = '0';
}else
{
    $out->flag = '1';
}
//echo $dataCount2;
$orders = array();
for ($i = 0; $i < $dataCount; $i++) {
    $oid = mysql_fetch_assoc($res);
//    print_r($oid);
    $oid = $oid['order_id'];
//    echo $oid;
    $res1 = mysql_query("select * from orders,iteminorder
    where iteminorder.order_id = orders.order_id and orders.order_id = '$oid'", $conn);
    $arr = mysql_fetch_assoc($res1);
    $orders[$i] = new stdClass();
    $orders[$i]->order_id = $arr['order_id'];
    $orders[$i]->user_id = $arr['user_id'];
    $orders[$i]->order_time = $arr['order_time'];
    $orders[$i]->order_price = $arr['order_price'];
    $orders[$i]->order_state = $arr['order_state'];
    $detail = array();
//    echo 'oid:' . $oid."<br>";
    $res2 = mysql_query("select * from iteminorder where order_id = '$oid'",$conn);
    $dataCount1 = mysql_num_rows($res2);
//    echo $dataCount1;
    for ($j = 0; $j < $dataCount1; $j++) {
        $arr2 = mysql_fetch_assoc($res2);
        $detail[$j] = new stdClass();
        $item_id = $arr2['item_id'];
        $q = mysql_query("select item_id,item_name,item_image,item_price from item where item_id = '$item_id'");
        $arr3 = mysql_fetch_assoc($q);
//        print_r($arr3);
        $detail[$j]->number = $arr2['number'];
        $detail[$j]->itemid = $arr3['item_id'];
        $detail[$j]->itemname = $arr3['item_name'];
        $detail[$j]->price = $arr3['item_price'];
        $detail[$j]->itemimg = $arr3['item_image'];
    }
    $orders[$i]->detail = $detail;
}
$out->orders = $orders;

echo json_encode($out);
//测试样例(有未完成)
//echo "{\"number\":2,\"flag\":\"1\",\"orders\":[{\"order_id\":\"2\",\"user_id\":\"1\",\"order_time\":\"2017-01-04\",\"order_price\":\"0\",\"order_state\":\"0\",\"detail\":[{\"number\":\"1\",\"itemid\":\"1\",\"itemname\":\"\u30108\u5e97\u901a\u7528\u3011\u82a6\u6708\u8f69\u7f8a\u874e\u5b50\",\"price\":\"69.9\",\"itemimg\":\"http:\/\/p1.meituan.net\/deal\/86aa598d94f2482cc1cdc943ae34946737557.jpg@260w_154h_1e.webp\"},{\"number\":\"2\",\"itemid\":\"2\",\"itemname\":\"\u3010\u5317\u4eac\u897f\u7ad9\u3011\u6c49\u5df4\u5473\u5fb7\u81ea\u52a9\u9910\u5385\",\"price\":\"79.9\",\"itemimg\":\"http:\/\/p1.meituan.net\/deal\/e5bc1b5be432d585a602a89c59dd3bb4451268.jpg@260w_154h_1e.webp\"}]},{\"order_id\":\"3\",\"user_id\":\"1\",\"order_time\":\"2017-01-04\",\"order_price\":\"0\",\"order_state\":\"0\",\"detail\":[{\"number\":\"34\",\"itemid\":\"1\",\"itemname\":\"\u30108\u5e97\u901a\u7528\u3011\u82a6\u6708\u8f69\u7f8a\u874e\u5b50\",\"price\":\"69.9\",\"itemimg\":\"http:\/\/p1.meituan.net\/deal\/86aa598d94f2482cc1cdc943ae34946737557.jpg@260w_154h_1e.webp\"},{\"number\":\"5\",\"itemid\":\"2\",\"itemname\":\"\u3010\u5317\u4eac\u897f\u7ad9\u3011\u6c49\u5df4\u5473\u5fb7\u81ea\u52a9\u9910\u5385\",\"price\":\"79.9\",\"itemimg\":\"http:\/\/p1.meituan.net\/deal\/e5bc1b5be432d585a602a89c59dd3bb4451268.jpg@260w_154h_1e.webp\"},{\"number\":\"1\",\"itemid\":\"15\",\"itemname\":\"\u301029\u5e97\u901a\u7528\u3011\u5531\u5427\u9ea6\u9882\u91cf\u8d29\u5f0fKTV\",\"price\":\"45\",\"itemimg\":\"http:\/\/p0.meituan.net\/dpdeal\/d22a0464434600f50128947d28ab11b3617441.jpg@260w_154h_1e.webp\"}]}]}";
//测试样例（无未完成）
//echo "{\"number\":2,\"flag\":\"0\",\"orders\":[{\"order_id\":\"2\",\"user_id\":\"1\",\"order_time\":\"2017-01-04\",\"order_price\":\"0\",\"order_state\":\"0\",\"detail\":[{\"number\":\"1\",\"itemid\":\"1\",\"itemname\":\"\u30108\u5e97\u901a\u7528\u3011\u82a6\u6708\u8f69\u7f8a\u874e\u5b50\",\"price\":\"69.9\",\"itemimg\":\"http:\/\/p1.meituan.net\/deal\/86aa598d94f2482cc1cdc943ae34946737557.jpg@260w_154h_1e.webp\"},{\"number\":\"2\",\"itemid\":\"2\",\"itemname\":\"\u3010\u5317\u4eac\u897f\u7ad9\u3011\u6c49\u5df4\u5473\u5fb7\u81ea\u52a9\u9910\u5385\",\"price\":\"79.9\",\"itemimg\":\"http:\/\/p1.meituan.net\/deal\/e5bc1b5be432d585a602a89c59dd3bb4451268.jpg@260w_154h_1e.webp\"}]},{\"order_id\":\"3\",\"user_id\":\"1\",\"order_time\":\"2017-01-04\",\"order_price\":\"0\",\"order_state\":\"0\",\"detail\":[{\"number\":\"34\",\"itemid\":\"1\",\"itemname\":\"\u30108\u5e97\u901a\u7528\u3011\u82a6\u6708\u8f69\u7f8a\u874e\u5b50\",\"price\":\"69.9\",\"itemimg\":\"http:\/\/p1.meituan.net\/deal\/86aa598d94f2482cc1cdc943ae34946737557.jpg@260w_154h_1e.webp\"},{\"number\":\"5\",\"itemid\":\"2\",\"itemname\":\"\u3010\u5317\u4eac\u897f\u7ad9\u3011\u6c49\u5df4\u5473\u5fb7\u81ea\u52a9\u9910\u5385\",\"price\":\"79.9\",\"itemimg\":\"http:\/\/p1.meituan.net\/deal\/e5bc1b5be432d585a602a89c59dd3bb4451268.jpg@260w_154h_1e.webp\"},{\"number\":\"1\",\"itemid\":\"15\",\"itemname\":\"\u301029\u5e97\u901a\u7528\u3011\u5531\u5427\u9ea6\u9882\u91cf\u8d29\u5f0fKTV\",\"price\":\"45\",\"itemimg\":\"http:\/\/p0.meituan.net\/dpdeal\/d22a0464434600f50128947d28ab11b3617441.jpg@260w_154h_1e.webp\"}]}]}";
<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/5
 * Time: 2:01
 */
/**
 * 搜索功能函数：
 * 输入：
 *      classid:
 *      keyword:
 * 输出：
 *      num:共找到几个商品
 *      items:
 *          [
 *              {
 *                  id:
 *                  name:
 *                  price:
 *                  origin:
 *                  brief:
 *                  shop:
 *                  class:
 *                  image:
 *                  stars:
 *                  rest:
 *              },
 *              {
 *                  id:
 *                  name:
 *                  price:
 *                  origin:
 *                  brief:
 *                  shop:
 *                  class:
 *                  image:
 *                  star:
 *                  rest:
 *              }...
 *          ]
 */
require_once "mysql.php";

$conn = uconnectDb();

$classid = $_POST['classid'];
$keyword = $_POST['keyword'];
//$classid = -1;
//$keyword = '';
//$keyword = '宾馆';
//$keyword = '没东西';
if ($classid == -1) {
    $res = mysql_query("select * from item where item_name LIKE '%$keyword%'");
} else {
    $res = mysql_query("select * from item where item_class = '$classid'", $conn);
}
$count = mysql_num_rows($res);
$out = new stdClass();
$out->num = $count;
$out_array = array();
for ($i = 0; $i < $count; $i++) {
    $arr = mysql_fetch_assoc($res);
//        print_r($arr);
    $out_array[$i] = new stdClass();
    $out_array[$i]->id = $arr['item_id'];
    $out_array[$i]->name = $arr['item_name'];
    $out_array[$i]->price = $arr['item_price'];
    $out_array[$i]->origin = $arr['item_origin'];
    $out_array[$i]->brief = $arr['item_brief'];
    $out_array[$i]->shop = $arr['item_shop'];
    $out_array[$i]->class = $arr['item_class'];
    $out_array[$i]->image = $arr['item_image'];
    $out_array[$i]->star = $arr['item_stars'];
    $out_array[$i]->rest = $arr['item_rest'];
}
$out->items = $out_array;
echo json_encode($out);
//样例
//echo "{\"num\":6,\"items\":[{\"id\":\"15\",\"name\":\"\u301029\u5e97\u901a\u7528\u3011\u5531\u5427\u9ea6\u9882\u91cf\u8d29\u5f0fKTV\",\"price\":\"45\",\"origin\":\"560\",\"brief\":\"\u5468\u4e00\u81f3\u5468\u65e5\u5168\u65f6\u6bb5\u6b22\u5531\u5957\u9910\",\"shop\":\"15\",\"class\":\"4\",\"image\":\"http:\/\/p0.meituan.net\/dpdeal\/d22a0464434600f50128947d28ab11b3617441.jpg@260w_154h_1e.webp\",\"star\":\"0\",\"rest\":\"0\"},{\"id\":\"16\",\"name\":\"\u3010\u4e94\u9053\u53e3\u3011\u6b22\u4e50\u6c47\u91cf\u8d29KTV\",\"price\":\"39\",\"origin\":\"264\",\"brief\":\"\u4e0b\u5348\u573a\/\u665a\u573a\/\u5348\u591c\u573a4\u5c0f\u65f6ktv\u6b22\u5531\u5238\",\"shop\":\"16\",\"class\":\"4\",\"image\":\"http:\/\/p0.meituan.net\/dpdeal\/ba0f20fb00b0ce6abcdb06708a499b4a93148.jpg@260w_154h_1e.webp\",\"star\":\"0\",\"rest\":\"1\"},{\"id\":\"17\",\"name\":\"\u3010\u826f\u4e61\u3011\u7eafk\u97f3\u4e50\u6c27\u5427\u91cf\u8d29KTV\",\"price\":\"15\",\"origin\":\"30\",\"brief\":\"3\u90091\u65f6\u6bb5\u6b22\u5531\",\"shop\":\"17\",\"class\":\"4\",\"image\":\"http:\/\/p1.meituan.net\/dpdeal\/e2f7b1fda95ecb5d6405bb397d3821c2135625.jpg@260w_154h_1e.webp\",\"star\":\"0\",\"rest\":\"0\"},{\"id\":\"18\",\"name\":\"\u3010\u516b\u91cc\u5e84\u3011\u4ebf\u597d\u58f0\u97f3\u91cf\u8d29KTV\",\"price\":\"36\",\"origin\":\"249\",\"brief\":\"KTV\u5305\u53a2\/\u9152\u6c34\/\u7f8e\u98df\u8d85\u503c\u5151\u6362\u5238\",\"shop\":\"18\",\"class\":\"4\",\"image\":\"http:\/\/p0.meituan.net\/dpdeal\/c7f9b01329801201de0572e9bfa8337691082.jpg@260w_154h_1e.webp\",\"star\":\"0\",\"rest\":\"0\"},{\"id\":\"19\",\"name\":\"5\u53f7\u91cf\u8d29\u5f0fKTV\uff08\u5929\u901a\u82d1\u5e97\uff09\",\"price\":\"19.9\",\"origin\":\"64\",\"brief\":\"KTV\u5305\u53a2\/\u9152\u6c34\/\u7f8e\u98df\",\"shop\":\"19\",\"class\":\"4\",\"image\":\"http:\/\/p1.meituan.net\/dpdeal\/781fe224da4ee4dd6095ef9ae6b921ec93895.jpg.webp\",\"star\":\"0\",\"rest\":\"0\"},{\"id\":\"20\",\"name\":\"\u5317\u5916flower ktv\",\"price\":\"16.5\",\"origin\":\"71\",\"brief\":\"KTV\u5305\u53a2\/\u9152\u6c34\/\u7f8e\u98df\",\"shop\":\"20\",\"class\":\"4\",\"image\":\"http:\/\/p0.meituan.net\/dpdeal\/3f4df27ba44f2fb58f48cbd2d4866a2261105.jpg.webp\",\"star\":\"0\",\"rest\":\"0\"}]}";
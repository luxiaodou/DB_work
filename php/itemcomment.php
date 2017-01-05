<?php
/**
 * Created by PhpStorm.
 * User: luxiaodou
 * Date: 2017/1/4
 * Time: 19:22
 */
/**
 * 显示某商品评价的函数
 * 输入：
 *      itemid:
 * 输出：
 *  {
 *      star1:
 *      star2:
 *      star3:
 *      star4:
 *      star5:
 *      number:
 *      comment:
 *          [
 *              {
 *                  username:
 *                  time:
 *                  star:
 *                  content:
 *              },
 *              {
 *                  username:
 *                  time:
 *                  star:
 *                  content:
 *              }...
 *          ]
 *  }
 * 返回样例
 * {"star1":"0.3333333432674408","star2":"0.1666666716337204","star3":"0.1666666716337204","star4":"0.1666666716337204",
 * "star5":"0.1666666716337204","number":"6", * "comment":[{"username":"luxiaodou","time":"2017-01-04","star":"3",
 * "content":"asd"},{"username":"luxiaodou","time":"2017-01-04","star":"1","content":"2"},{"username":"luxiaodou",
 * "time":"2017-01-04","star":"2","content":"345"},{"username":"luxiaodou","time":"2017-01-04","star":"4","content":""},
 * {"username":"luxiaodou","time":"2017-01-04","star":"5","content":"qwer"},{"username":"luxiaodou","time":"2017-01-04",
 * "star":"1","content":"2"}]}
 */
require_once 'mysql.php';
$conn = uconnectDb();

$itemid = $_POST['itemid'];
//$itemid = 1;

$res1 = mysql_query(" CALL `itemcomment`('$itemid', @p1, @p2, @p3, @p4, @p5, @p6);",$conn);
$res1 = mysql_query(" SELECT @p1, @p2, @p3, @p4, @p5, @p6;",$conn);
$row = mysql_fetch_assoc($res1);

$out = new stdClass();
$out->star1 = $row['@p1'];
$out->star2 = $row['@p2'];
$out->star3 = $row['@p3'];
$out->star4 = $row['@p4'];
$out->star5 = $row['@p5'];
$total = $row['@p6'];
if ($total == null)
    $out->number = 0;
else
    $out->number = $total;


$res2 = mysql_query("select user_name,comment_time,comment_star,comment_content 
                    from comment,users where comment_user = user_id AND comment_item = $itemid");
$out_array = array();
for ($i = 0; $i < $total; $i++) {
    $arr = mysql_fetch_assoc($res2);
//    print_r($arr);
    $out_array[$i] = new stdClass();
    $out_array[$i]->username = $arr['user_name'];
    $out_array[$i]->time = $arr['comment_time'];
    $out_array[$i]->star = $arr['comment_star'];
    $out_array[$i]->content = $arr['comment_content'];
}
$out->comment = $out_array;
echo json_encode($out);
//供调试使用
//echo "{\"star1\":\"0.3333333432674408\",\"star2\":\"0.1666666716337204\",\"star3\":\"0.1666666716337204\",\"star4\":\"0.1666666716337204\",\"star5\":\"0.1666666716337204\",\"number\":\"6\",\"comment\":[{\"username\":\"luxiaodou\",\"time\":\"2017-01-04\",\"star\":\"3\",\"content\":\"asd\"},{\"username\":\"luxiaodou\",\"time\":\"2017-01-04\",\"star\":\"1\",\"content\":\"2\"},{\"username\":\"luxiaodou\",\"time\":\"2017-01-04\",\"star\":\"2\",\"content\":\"345\"},{\"username\":\"luxiaodou\",\"time\":\"2017-01-04\",\"star\":\"4\",\"content\":\"\"},{\"username\":\"luxiaodou\",\"time\":\"2017-01-04\",\"star\":\"5\",\"content\":\"qwer\"},{\"username\":\"luxiaodou\",\"time\":\"2017-01-04\",\"star\":\"1\",\"content\":\"2\"}]}";

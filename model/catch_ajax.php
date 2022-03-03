<?php
require_once "../common/const.php";
define("MISS_COUNT_LIMIT", "5"); //ログイン失敗回数用の
$ajax = new CatchAjax();
class CatchAjax
{
    function __construct()
    {
        if (isset($_POST["ajax_mode"])) {
            $this->ajax_catch($_POST);
        }
    }
    public function ajax_catch($post)
    {
        $ajax_mode = $post["ajax_mode"];
        $sql = "";
        $bind_params = array();
        switch ($ajax_mode) {
            case "get_film":
                $schema = 'sakila';
                $table = 'film';
                $columns = $this->exec_SQL('information_schema', 'select COLUMN_NAME from information_schema.columns where TABLE_SCHEMA = "sakila" and TABLE_NAME = "film" order by ORDINAL_POSITION;');
                $col_str = '';
                foreach ($columns as $row => $column) {
                    if ($row > 0) {
                        $col_str .= ',';
                    }
                    $col_str .= $column["COLUMN_NAME"];
                }
                $sql = 'select ' . $col_str . ' from ' . $schema . '.' . $table . ' limit 20;';
                break;
            case "check_registable":
                $user_id = $post["user_id"];
                $bind_params = array("user_id" => $user_id);
                $schema = 'test';
                $table = 'mst_user';
                $sql = '';
                $sql .= 'select count(user_id) as count from ' . $schema . '.' . $table;
                $sql .= ' where ';
                foreach ($bind_params as $key => $val) {
                    $sql .= $key . ' = :' . $key . ' ';
                }
                $sql .= 'and del_flg != 1;';
                break;
            case "user_regist":
                $user_id = $post["user_id"];
                $password = password_hash($post["password"], PASSWORD_DEFAULT);
                $bind_params = array("user_id" => $user_id, "password" => $password);
                $schema = 'test';
                $table = 'mst_user';
                $sql .= 'insert into ' . $schema . '.' . $table . ' (user_id,password) values (:user_id,:password);';
                break;
            case "submit_login":
                $user_id = $post["user_id"];
                $bind_params = array("user_id" => $user_id);
                $schema = 'test';
                $table = 'mst_user';
                $sql = 'select user_id, password, miss_count, last_login_date from ' . $schema . '.' . $table;
                $sql .= ' where ';
                foreach ($bind_params as $key => $val) {
                    $sql .= $key . ' = :' . $key . ' ';
                }
                $sql .= 'and del_flg != 1;';
                break;
                // case "check_cookie":
                //     $cookie = unserialize($post[$_SERVER["HTTP_HOST"]]);
                //     $user_id = $cookie["user_id"];
                //     $bind_params = array("user_id" => $user_id);
                //     $schema = 'test';
                //     $table = 'mst_user';
                //     $sql = 'select user_id, password from ' . $schema . '.' . $table . ' where user_id = :user_id and del_flg != 1;';
                //     break;
                // case "set_cookie":

                //     break;
            case "logout":
                session_start();
                $_SESSION = array();
                session_destroy();
                echo $this->ret_json_str(array("logout" => "done"));
                exit;
            default:
                break;
        }
        if ($sql !== "") {
            $ret = $this->exec_SQL($schema, $sql, $bind_params);
            if (is_array($ret)) {
                $ret = $this->check_func($ajax_mode, $post, $ret);
                echo $this->ret_json_str($ret);
            } else if ($ret > 0) {
                echo $this->ret_json_str(array("success" => $ret));;
            } else {
                echo $this->ret_json_str(array("error" => "誤りのあるリクエストです"));;
            }
        } else {
            echo $this->ret_json_str(array("error" => "不正なリクエストです"));
        }
    }
    private function exec_SQL($schema, $sql, $bind_params = array())
    {
        try {
            $com_type = substr($sql, 0, 6);
            $pdo = new PDO('mysql:charset=UTF8;dbname=' . $schema . ';host=localhost', 'root', 'admin');
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $pdo->prepare($sql);
            foreach ($bind_params as $key => $val) {
                $type = gettype($val);
                switch ($type) {
                    case "string":
                        $stmt->bindValue(':' . $key, $val, PDO::PARAM_STR);
                        break;
                    case "integer":
                        $stmt->bindValue(':' . $key, $val, PDO::PARAM_INT);
                        break;
                    case "boolean":
                        $stmt->bindValue(':' . $key, $val, PDO::PARAM_BOOL);
                        break;
                }
            }

            $stmt->execute();

            switch ($com_type) {
                case "select":
                    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    break;
                default:
                    $res = $stmt->rowCount();
                    break;
            }
            return $res;
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }
    private function ret_json_str($ary)
    {
        if (gettype($ary) === "array" && count($ary) > 0) {
            header("Content-type: application/json; charset=UTF-8");
            return json_encode($ary);
        } else {
            return false;
        }
    }
    private function check_func($ajax_mode, $post, $ret)
    {
        switch ($ajax_mode) {
            case "submit_login":
                if (count($ret) > 0) {
                    $user = $ret[0];
                    $pass_check = password_verify($post["password"], $user["password"]);
                    $release_time = date("YmdHis",strtotime($user["last_login_date"]." + 30 minutes")); 
                    $submit_time = date("YmdHis");
                    if ($user["miss_count"] > MISS_COUNT_LIMIT && $release_time > $submit_time) {
                        $lock_check = true;
                    } else {
                        //開放されている
                        $lock_check = false;
                    }
                    if ($pass_check && !$lock_check) {
                        if ($this->set_session($post)) {
                            $ret = array("login" => "OK");
                            //ログイン成功したらmiss_countは0に戻す
                            $sql = 'update test.mst_user set miss_count = 0 where user_id = "' . $user["user_id"] . '";';
                            $this->exec_SQL("test", $sql);
                        } else {
                            $ret = array("error" => "セッションの保存に失敗しました。");
                        }
                    } else {
                        //ログインミスした回数を記録しておく
                        $sql = 'update test.mst_user set miss_count = (miss_count + 1) where user_id = "' . $user["user_id"] . '";';
                        $this->exec_SQL("test", $sql);
                        $ret = array("login" => "NG");
                        if($lock_check){
                            $ret["locked"] = true;
                        }else{
                            $ret["locked"] = false;
                        }
                    }
                }
                break;
                // case "check_cookie":
                //      if (count($ret) > 0) {
                //         $pass_check = password_verify($post["password"], $ret[0]["password"]);
                //         if ($pass_check) {
                //             if ($this->set_session($post)) {
                //                 $ret = array("login" => "OK");
                //             } else {
                //                 $ret = array("error" => "セッションの保存に失敗しました。");
                //             }
                //         } else {
                //             $ret = array("login" => "NG");
                //         }
                //     }
                //     break;
            default:
                break;
        }
        return $ret;
    }

    private function set_session($post)
    {
        session_start();
        $_SESSION[SESSION_KEY] = array();
        $_SESSION[SESSION_KEY]["SESSION_ID"] = session_regenerate_id();
        if ($_SESSION[SESSION_KEY]["SESSION_ID"]) {
            $_SESSION[SESSION_KEY]["LOGIN"] = true;
            $_SESSION[SESSION_KEY]["USER_ID"] = $post["user_id"];
            return true;
        } else {
            return false;
        }
    }
}

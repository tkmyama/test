<?php
$ajax = new SQLexec();
echo $ajax->ajax_catch();
class SQLexec
{
    var $sql;
    var $table;
    var $schema;
    var $ajax_mode;
    var $post;
    var $bind_params;
    function __construct()
    {
    }
    public function ajax_catch(){
        $post = $_POST;
        $ajax_mode = $post["ajax_mode"];
        switch ($ajax_mode) {
            case "get_film":
                $schema = 'sakila';
                $table = 'film';
                $columns = $this->exec_SQL('select COLUMN_NAME from information_schema.columns where TABLE_SCHEMA = "sakila" and TABLE_NAME = "film" order by ORDINAL_POSITION;');
                $col_str = '';
                foreach($columns as $row => $column){
                    if($row > 0){
                    $col_str .= ',';
                    }
                    $col_str .= $column["COLUMN_NAME"];
                }
                $sql = 'select ' . $col_str . ' from ' . $schema . '.' . $table . ' limit 20;';
                break;
        }
        return $this->ret_json_str($this->exec_SQL($sql));
    }
    private function exec_SQL($sql, $bind_params = array())
    {
        try {
            $pdo = new PDO('mysql:charset=UTF8;dbname=sakila;host=localhost', 'root', 'admin');
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $pdo->prepare($sql);

            foreach ($bind_params as $key => $val) {
                $type = gettype($val);
                switch ($type) {
                    case "string":
                        $stmt->bindParam(':' . $key, $val, PDO::PARAM_STR);
                        break;
                    case "integer":
                        $stmt->bindParam(':' . $key, $val, PDO::PARAM_INT);
                        break;
                    case "boolean":
                        $stmt->bindParam(':' . $key, $val, PDO::PARAM_BOOL);
                        break;
                }
            }

            $stmt->execute();
            $res = array();
            while ($line = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $res[] = $line;
            }
            return $res;
        } catch (PDOException $e) {
            echo $e->getMessage();
            exit();
        }
    }
    private function ret_json_str($ary)
    {
        if (gettype($ary) === "array" && count($ary) > 0) {
            header("Content-type: application/json; charset=UTF-8");
            return json_encode($ary);
        }else{
            exit();
        }
    }
}

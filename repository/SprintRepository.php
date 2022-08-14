<?php

require_once $_SERVER['DOCUMENT_ROOT']."/sprint-planner/repository/db/Database.php";
require_once $_SERVER['DOCUMENT_ROOT']."/sprint-planner/repository/pojo/Sprint.php";

Database::getInstance();

class SprintRepository {

    public static function getSprintByIdAndPassword($roomId, $pass) {
        $sql = 'SELECT * FROM sprint WHERE room_id = ? AND room_pass = ?';
        $query = Database::getInstance()->getConnection()
            ->prepare($sql);
        $query->execute([$roomId, $pass]);

        return $query->fetch();
    }

    public static function getAll() {
        $sql = 'SELECT room_id as roomId, status FROM sprint 
                ';
        $query = Database::getInstance()->getConnection()->prepare($sql);

        $query->execute();

        return $query->fetchAll(PDO::FETCH_CLASS, 'Sprint');
    }

    // public static function create($data) {


    //     $name = $data['adventureName'];
    //     $tip = $data['tips'];
    //     $user_id = $_SESSION['userId'];
    //     $city_id = 91;

    //     $query = Database::getInstance()->getConnection()->prepare("
    //         INSERT INTO adventure ( name, user_id, city_id, time, tip, last_updated, is_deleted)
    //         VALUES ( ?, ?, ?, ?, ?, ?, ?)
    //         ");
    //     $query->execute([$name, $user_id, $city_id, date("Y-m-d H:i:s"), $tip, date("Y-m-d H:i:s"), false]);

    //     header("Location: ../index.php");
    // }

    // public static function delete($id) {

    //     $query = Database::getInstance()->getConnection()->prepare("
    //         UPDATE adventure 
    //         SET  is_deleted = ?
    //         WHERE id = ?
    //         ");
    //     $query->execute([true, $id]);

    //     header("Location: ../index.php");
    // }
}

?>

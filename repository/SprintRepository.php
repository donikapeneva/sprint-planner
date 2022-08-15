<?php

require_once $_SERVER['DOCUMENT_ROOT']."/sprint-planner/repository/db/Database.php";
require_once $_SERVER['DOCUMENT_ROOT']."/sprint-planner/repository/pojo/Sprint.php";

Database::getInstance();

class SprintRepository {

    public static function getSprintByRoomIdAndPassword($roomId, $pass) {
        $sql = 'SELECT * FROM sprint WHERE room_id = ? AND room_pass = ?';
        $query = Database::getInstance()->getConnection()
            ->prepare($sql);
        $query->execute([$roomId, $pass]);

        return $query->fetch();
    }

    public static function getSprintByRoomIdAndStatus($roomId, $status) {
        $sql = 'SELECT * FROM sprint WHERE room_id = ? AND status = ?';
        $query = Database::getInstance()->getConnection()
            ->prepare($sql);
        $query->execute([$roomId, $status]);

        return $query->fetch();
    }

    public static function getSprintById($sprintId) {
        $sql = 'SELECT room_id as roomId, room_pass as roomPassword, status 
                FROM sprint 
                WHERE id = ?';
        $query = Database::getInstance()->getConnection()
            ->prepare($sql);
        $query->execute([$sprintId]);

        return $query->fetchObject('Sprint');
    }

    public static function getAll() {
        $sql = 'SELECT id, room_id as roomId, status FROM sprint 
                ';
        $query = Database::getInstance()->getConnection()->prepare($sql);

        $query->execute();

        return $query->fetchAll(PDO::FETCH_CLASS, 'Sprint');
    }

    public static function create($room_id, $room_pass) {

        $connection = Database::getInstance()->getConnection();
        
        $newSprint_sql = 'INSERT INTO sprint (room_id, room_pass, status)
                            VALUES ( ?, ?, ?)';

        $query = $connection->prepare($newSprint_sql);
        $query->execute([$room_id, $room_pass, Sprint::$statuses['new']]);

        return $connection->lastInsertId();
    }

    public static function updateSprintRoom($sprintId, $newRoomId, $newRoomPass) {
        $connection = Database::getInstance()->getConnection();
        
        $sql = 'UPDATE sprint
                            SET room_id = ?, room_pass = ?
                            WHERE id = ?';

        $query = $connection->prepare($sql);
        $query->execute([$newRoomId, $newRoomPass, $sprintId]);

    }
}

?>

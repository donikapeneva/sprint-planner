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

    public static function update($sprintId, $updatedSprint) {
        // $room_id = $updatedSprint->sprintId;
        // $room_pass = $updatedSprint->sprintPassword;

        // $tasks = $updatedSprint->tasks;

        // $connection = Database::getInstance()->getConnection();
        
        // $newSprint_sql = 'INSERT INTO sprint (room_id, room_pass, status)
        //                     VALUES ( ?, ?, ?)';

        // $query = $connection->prepare($newSprint_sql);
        // $query->execute([$room_id, $room_pass, Sprint::$statuses['new']]);

        // $sprint_id = $connection->lastInsertId();

        // foreach ($tasks as $task) {
        //     $sql = 'UPDATE task (epic_link, task_link, short_description, sprint_id) 
        //             SET (?, ?, ?, ?)
        //             WHERE sprint_id = :sprintId';
        //     $query = $connection->prepare($sql);
        //     $query->execute([$task->epicLink, $task->taskLink, $task->taskDescription, $sprintId]);
        // }
    }
}

?>

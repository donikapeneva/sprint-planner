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

    public static function getSprintByIdAndStatus($roomId, $status) {
        $sql = 'SELECT * FROM sprint WHERE room_id = ? AND status = ?';
        $query = Database::getInstance()->getConnection()
            ->prepare($sql);
        $query->execute([$roomId, $status]);

        return $query->fetch();
    }

    public static function getAll() {
        $sql = 'SELECT room_id as roomId, status FROM sprint 
                ';
        $query = Database::getInstance()->getConnection()->prepare($sql);

        $query->execute();

        return $query->fetchAll(PDO::FETCH_CLASS, 'Sprint');
    }

    public static function create($newSprint) {
        $room_id = $newSprint->sprintRoomId;
        $room_pass = $newSprint->sprintPassword;

        $tasks = $newSprint->tasks;

        $connection = Database::getInstance()->getConnection();
        
        
        $newSprint_sql = 'INSERT INTO sprint (room_id, room_pass, status)
                            VALUES ( ?, ?, ?)';

        $query = $connection->prepare($newSprint_sql);
        $query->execute([$room_id, $room_pass, Sprint::$statuses['new']]);

        $sprint_id = $connection->lastInsertId();

        foreach ($tasks as $task) {
            $sql = 'INSERT INTO task (epic_link, task_link, short_description, sprint_id) 
                    VALUES (?, ?, ?, ?)';
            $query = $connection->prepare($sql);
            $query->execute([$task->epicLink, $task->taskLink, $task->taskDescription, $sprint_id]);
        }
    }

    public static function update($sprintId, $updatedSprint) {
        $room_id = $updatedSprint->sprintId;
        $room_pass = $newSprint->sprintPassword;

        $tasks = $newSprint->tasks;

        $connection = Database::getInstance()->getConnection();
        
        
        $newSprint_sql = 'INSERT INTO sprint (room_id, room_pass, status)
                            VALUES ( ?, ?, ?)';

        $query = $connection->prepare($newSprint_sql);
        $query->execute([$room_id, $room_pass, Sprint::$statuses['new']]);

        $sprint_id = $connection->lastInsertId();

        foreach ($tasks as $task) {
            $sql = 'INSERT INTO task (epic_link, task_link, short_description, sprint_id) 
                    VALUES (?, ?, ?, ?)';
            $query = $connection->prepare($sql);
            $query->execute([$task->epicLink, $task->taskLink, $task->taskDescription, $sprint_id]);
        }
    }
}

?>

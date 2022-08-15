<?php

require_once $_SERVER['DOCUMENT_ROOT']."/sprint-planner/repository/db/Database.php";
require_once $_SERVER['DOCUMENT_ROOT']."/sprint-planner/repository/pojo/Task.php";

Database::getInstance();

class TaskRepository {

    public static function getAllBySprintId($sprintId) {
        $sql = 'SELECT public_id as publicId, epic_link as epicLink,
                        task_link as taskLink, short_description as taskDescription
                FROM task 
                WHERE sprint_id = ?';
        $query = Database::getInstance()->getConnection()->prepare($sql);

        $query->execute([$sprintId]);

        return $query->fetchAll(PDO::FETCH_CLASS, 'Task');
    }

    public static function create($task, $sprint_id) {
        $connection = Database::getInstance()->getConnection();

        $sql = 'INSERT INTO task (public_id, epic_link, task_link, short_description, sprint_id) 
                VALUES (?, ?, ?, ?, ?)';
        $query = $connection->prepare($sql);
        $query->execute([$task->publicId, $task->epicLink, $task->taskLink, $task->taskDescription, $sprint_id]);
    }

    public static function deleteAllBySprintId($sprint_id) {
        $connection = Database::getInstance()->getConnection();

        $sql = 'DELETE FROM task  
                WHERE sprint_id = ?';
        $query = $connection->prepare($sql);
        $query->execute([$sprint_id]);
    }

    public static function update($publicId, $updatedTask) {
       
        // $connection = Database::getInstance()->getConnection();
        // $sql = 'UPDATE task (epic_link, task_link, short_description, sprint_id) 
        //             SET epic_link = ?, task_link = ?, 
        //             short_description=?, is_approved_for_planning = ?,
        //             is_included_in_sprint = ?, assignee = ?, story_points = ?
        //         WHERE public_id = :publicId';
        //     $query = $connection->prepare($sql);
        //     $query->execute([$updatedTask->epic_link, $updatedTask->task_link, 
        //                         $updatedTask->short_description, 
        //                         $updatedTask->is_approved_for_planning, 
        //                         $updatedTask->is_included_in_sprint,
        //                         $updatedTask->assignee, $updatedTask->story_points, 
        //                         $publicId]);
        
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

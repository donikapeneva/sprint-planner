<?php

require_once $_SERVER['DOCUMENT_ROOT']."/sprint-planner/repository/db/Database.php";
require_once $_SERVER['DOCUMENT_ROOT']."/sprint-planner/repository/pojo/Task.php";

Database::getInstance();

class TaskRepository {

    public static function getAllBySprintId($sprintId) {
        $sql = 'SELECT public_id as publicId, 
                        epic_link as epicLink,
                        task_link as taskLink, 
                        short_description as taskDescription,
                        is_approved_for_planning as isApprovedForPlanning,
                        is_included_in_sprint as isIncludedInSprint,
                        assignee,
                        story_points as storyPoints
                FROM task 
                WHERE sprint_id = ?';
        $query = Database::getInstance()->getConnection()->prepare($sql);

        $query->execute([$sprintId]);

        return $query->fetchAll(PDO::FETCH_CLASS, 'Task');
    }

    public static function getAllBySprintIdAndAreApproved($sprintId) {
        $sql = 'SELECT public_id as publicId, 
                        epic_link as epicLink,
                        task_link as taskLink, 
                        short_description as taskDescription,
                        is_approved_for_planning as isApprovedForPlanning,
                        is_included_in_sprint as isIncludedInSprint,
                        assignee,
                        story_points as storyPoints
                FROM task 
                WHERE sprint_id = ?
                AND is_approved_for_planning = true';
        $query = Database::getInstance()->getConnection()->prepare($sql);

        $query->execute([$sprintId]);

        return $query->fetchAll(PDO::FETCH_CLASS, 'Task');
    }

    public static function getIdByPublicId($publicId) {
        $sql = 'SELECT id
                FROM task 
                WHERE public_id = ?';
        $query = Database::getInstance()->getConnection()->prepare($sql);

        $query->execute([$publicId]);

        return $query->fetchObject();
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

    public static function update($id, $updatedTask) {
        $connection = Database::getInstance()->getConnection();
        
        $sql = 'UPDATE task
                SET  epic_link = ?,
                task_link = ?,
                short_description = ?, 
                is_approved_for_planning = ?,
                is_included_in_sprint = ?,
                assignee = ?,
                story_points = ?
                WHERE id = ?';
        $query = $connection->prepare($sql);
        $query->execute([$updatedTask->epicLink, 
                            $updatedTask->taskLink, 
                            $updatedTask->taskDescription,
                            $updatedTask->isApprovedForPlanning, 
                            $updatedTask->isIncludedInSprint, 
                            $updatedTask->assignee, 
                            $updatedTask->storyPoints, 
                            $id]);
    }
}

?>

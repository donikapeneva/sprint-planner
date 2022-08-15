<?php

class Task {

    public $publicId;
    public $epicLink;
    public $taskLink;
    public $taskDescription;
    public $is_approved_for_planning;
    public $is_included_in_sprint;
    public $assignee;
    public $story_points;
    public $sprint_id;

    public function __construct() {}

    // public function getRoomId(){
    //     return $this->roomId;
    // }
    
    // public function getStatus(){
    //     return $this->status;
    // }
}
?>

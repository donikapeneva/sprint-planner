<?php

class Task {

    public $publicId;
    public $epicLink;
    public $taskLink;
    public $taskDescription;
    public $isApprovedForPlanning;
    public $isIncludedInSprint;
    public $assignee;
    public $storyPoints;
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

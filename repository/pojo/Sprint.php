<?php

class Sprint {

    public $id;
    public $roomId;
    public $roomPassword;
    public $status;

    public static $statuses = array(
        'new' => 'NEW', 
        'grooming' => 'GROOMING',
        'planning' => 'PLANNING',
        'active' => 'ACTIVE',
        'closed' => 'CLOSED'
    );


    public function __construct() {}

    // public function getRoomId(){
    //     return $this->roomId;
    // }
    
    // public function getStatus(){
    //     return $this->status;
    // }
}
?>

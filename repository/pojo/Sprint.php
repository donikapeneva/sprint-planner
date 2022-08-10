<?php

class Sprint {

    private $roomId;
    private $status;

    public function __construct($roomId, $status){
        $this->roomId = $roomId;
        $this->status = $status;
    }

    public function getRoomId(){
        return $this->roomId;
    }
    
    public function getStatus(){
        return $this->status;
    }
}
?>

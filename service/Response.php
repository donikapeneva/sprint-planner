<?php

class Response {

    private $data;
    private $error;

    public function getMessage() {
        return array (
            'data' => $this->data,
            'error' => $this->error
        );
    }


    public function setData($data){
        return $this->data = $data;
    }
    
    public function setError($error){
        return $this->error = $error;
    }

    // public function getText(){
    //     return $this->text;
    // }
    
    // public function getError(){
    //     return $this->error;
    // }
}
?>
<?php

class User {

    private $email;
    private $username;

    public function __construct($email, $username){
        $this->email = $email;
        $this->username = $username;
    }

    public function getEmail(){
        return $this->email;
    }
    
    public function getUsername(){
        return $this->username;
    }
}
?>

<?php

class User {

    public static $roles = array('master' => 'master', 'guest' => 'guest');

    private $email;
    private $username;
    private $role;

    public function __construct() {}
    
    public function getEmail(){
        return $this->email;
    }
    
    public function getUsername(){
        return $this->username;
    }

    public function getRole(){
        return $this->role;
    }
}
?>

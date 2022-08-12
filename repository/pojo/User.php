<?php

class User {

    public static $roles = array('master' => 'master', 'team_member' => 'team member');

    private $email;
    private $username;
    private $role;

    public function __construct($email, $username, $role){
        $this->email = $email;
        $this->username = $username;
        $this->role = $role;
    }

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

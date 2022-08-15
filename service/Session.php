<?php
 class SessionManager {



    public static function start () {
        session_start();
    }

    public static function logout () {
        session_destroy();
    }

    public static function setUserMail($email){
        $_SESSION['email'] = $email;
    }

    public static function isUserLoggedIn(){
        return (isset($_SESSION['email']) && $_SESSION['email']);
    }

    public static function isUserLoggedInAsMaster(){
        // echo '>>> isset loggedi n > '.isset($_SESSION['loggedInAsMaster']);
        if(!isset($_SESSION['loggedInAsMaster']) || !$_SESSION['loggedInAsMaster']) {
            return false;
        }
        return true;
    }

    public static function setLoggedInAsMaster(){
        $_SESSION['loggedInAsMaster'] = true;
    }

 }
    

?>
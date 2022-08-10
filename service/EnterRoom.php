<?php

    require_once "../repository/UserRepository.php";
    require_once "../repository/SprintRepository.php";

    $email = $_POST['email'];
    $roomSprintId = $_POST['roomSprintId'];
    $roomPassword = $_POST['roomPassword'];

    if (userExists($email) && roomExists($roomSprintId, $roomPassword)) {
        // $redirect = $_SERVER['DOCUMENT_ROOT'].'/view/grooming-room.php';
        header("Location: ../view/grooming-room.php");
        exit();
    } else {
        echo '<script> 
        alert("Email is not recognised by the system");
        
         </script>';
        header("Location: ../");
        exit();
    }


    function userExists($email) {
        return UserRepository::getOne($email) > 0;
    }

    function roomExists($roomSprintId, $roomPassword) {
        return SprintRepository::getSprintByIdAndPassword($roomSprintId, $roomPassword) > 0;
    }

?>
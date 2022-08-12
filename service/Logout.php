<?php
    
    require_once "./Session.php";
    require_once "./Response.php";

    $response = new Response();
    
    SessionManager::start();
    SessionManager::logout();

    $data = array ('redirectUrl' => '/sprint-planner');
    $response->returnResponse(200, $data, '');
    

?>
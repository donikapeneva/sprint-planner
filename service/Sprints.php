<?php

    require_once "../repository/SprintRepository.php";
    require_once "./Response.php";
    require_once "./Session.php";
    
    // $json = file_get_contents('php://input');
    // $request = json_decode($json);
    $response = new Response();

    // if (!$request->email || !$request->password) {
    //     $response->returnResponse(401, '', 'Unauthorized');
    // }

    // $encrypted_pwd = md5($request->password);

    // if (!$user = loginMaster($request->email, $encrypted_pwd)) {
    //     echo $encrypted_pwd;
    //     $response->returnResponse(404, '', 'Invalid user or password');
    // }
    
    $sprints = SprintRepository::getAll();
    
    SessionManager::start();
    
    $data = $sprints;
    $response->returnResponse(200, $data, '');


?>
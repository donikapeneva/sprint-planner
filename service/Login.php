<?php

    require_once "../repository/UserRepository.php";
    require_once "./Response.php";
    
    $json = file_get_contents('php://input');
    $request = json_decode($json);
    $response = new Response();

    if (!$request->email || !$request->password) {
        $response->returnResponse(400, '', 'Missing data');
    }

    $encrypted_pwd = md5($request->password);

    if (!loginMaster($request->email, $encrypted_pwd)) {
        echo $encrypted_pwd;
        $response->returnResponse(404, '', 'Invalid user or password');
    }
    
    $data = array ('redirectUrl' => './sprints.php');
    $response->returnResponse(200, $data, '');

    function loginMaster($email, $pass) {
        return UserRepository::getLoginMaster($email, $pass) > 0;
    }

?>
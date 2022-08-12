<?php

    require_once "../repository/UserRepository.php";
    require_once "../repository/SprintRepository.php";
    require_once "./Response.php";
    
    $json = file_get_contents('php://input');
    $request = json_decode($json);

    if (!$request->email || !$request->roomId || !$request->roomPass) {
        returnResponse(400, '', '>>>>');
    }

    if (!userExists($request->email)) {
        returnResponse(404, '', 'User not found');
    }

    if (!roomExists($request->roomId, $request->roomPass)) {
        returnResponse(404, '', 'Incorrect room credentials');
    }

    $data = array ('redirectUrl' => './view/grooming-room.php');
    returnResponse(200, $data, '');


    function userExists($email) {
        return UserRepository::getOne($email) > 0;
    }

    function roomExists($roomSprintId, $roomPassword) {
        return SprintRepository::getSprintByIdAndPassword($roomSprintId, $roomPassword) > 0;
    }

    function returnResponse($statusCode, $data, $errorMessage) {
        $response = new Response();
        $response->setData($data);
        $response->setError($errorMessage);
        
        http_response_code($statusCode);
        echo json_encode($response->getMessage());
        exit();
    }

?>
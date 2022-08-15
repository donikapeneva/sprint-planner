<?php

    require_once "../repository/UserRepository.php";
    require_once "../repository/SprintRepository.php";
    require_once "../repository/pojo/Sprint.php";
    require_once "./Response.php";
    require_once "./Session.php";
    
    $json = file_get_contents('php://input');
    $request = json_decode($json);
    $response = new Response();

    if (!$request->email || !$request->roomId || !$request->roomPass) {
        $response->returnResponse(400, '', '>>>>');
    }

    if (!userExists($request->email)) {
        $response->returnResponse(404, '', 'User not found');
    }

    if (!$room = roomExists($request->roomId, $request->roomPass)) {
        $response->returnResponse(404, '', 'Incorrect room credentials');
    }

    if (!isRoomOpen($room)) {
        $response->returnResponse(404, '', 'Room is not open');
    }

    SessionManager::start();
    SessionManager::setUserMail($request->email);
    
    
    $redirectTo = $room->status === Sprint::$statuses['grooming'] 
                    ? './view/grooming-room.php' : './view/planning-room.php';

    $data = array ('sprintId' => $room->id, 'redirectUrl' => $redirectTo);
    $response->returnResponse(200, $data, '');


    function userExists($email) {
        return UserRepository::getOne($email) > 0;
    }

    function roomExists($roomSprintId, $roomPassword) {
        return SprintRepository::getSprintByRoomIdAndPassword($roomSprintId, $roomPassword);
    }

    function isRoomOpen($room) {
        return $room->status === Sprint::$statuses['grooming'] || $room->status === Sprint::$statuses['planning'];
    }
    

?>
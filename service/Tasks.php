<?php

    require_once "../repository/SprintRepository.php";
    require_once "../repository/TaskRepository.php";
    require_once "./Response.php";
    require_once "./Session.php";

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    SessionManager::start();

    

    $response = new Response();
    
    preg_match('/(task-\d+)/', $uri, $matches);
    
    echo $matches[1];

    if($matches) {
        $publicId = $matches[1];
    }
    
    switch ($requestMethod) {
        // case 'GET': 
           
        // case 'POST': 
        case 'PUT': {
            
            if (!SessionManager::isUserLoggedIn()) {
                $response->returnResponse(401, '', 'Not authorized');
            }
            
            if (!empty($publicId)) {
                $json = file_get_contents('php://input');
                $request = json_decode($json);

                update($publicId,$request);
            }
            $response->returnResponse(400, '', 'Bad Request');
            break;
        }
        case 'DELETE': {
            if (!SessionManager::isUserLoggedInAsMaster()) {
                $response->returnResponse(401, '', 'Not authorized');
            }

            $json = file_get_contents('php://input');
            $request = json_decode($json);

            if (!empty($request->sprintId) && !empty($request->action)) {
                deleteSprint($request->sprintId);
            } else {
                $response->returnResponse(400, '', 'Bad Request');
            }
            break;
        }
        default: 
            $response->returnResponse(404, '', 'Not Found');
            break;
    }

    
    function update($publicId, $request) {
        $response = new Response();
        $task = TaskRepository::getIdByPublicId($publicId);
        $updatedTask = $request->task;
        TaskRepository::update($task->id, $updatedTask);
        $response->returnResponse(200, '', '');
    }
    

?>
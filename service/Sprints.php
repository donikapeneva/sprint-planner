<?php

    require_once "../repository/SprintRepository.php";
    require_once "./Response.php";
    require_once "./Session.php";

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    SessionManager::start();

    if (!SessionManager::isUserLoggedInAsMaster()) {
        $response->returnResponse(401, '', 'Not authorized');
    }

    $response = new Response();
    
    preg_match('/(?:Sprints.php)\/(?P<digit>\d+)/', $uri, $matches);
     
    if($matches) {
        $sprint_id = $matches[1];
    }
    
    switch ($requestMethod) {
        case 'GET': 
            if (!empty($sprint_id)) {} 
            else {
                $data = getAll();
                $response->returnResponse(200, $data, '');
            }
            break;
        default: 
            $response->returnResponse(404, '', 'Not Found');
            break;
    }
    
    function getAll() {
        return SprintRepository::getAll();
    }
?>
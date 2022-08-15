<?php

    require_once "../repository/SprintRepository.php";
    require_once "../repository/TaskRepository.php";
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
            if (!empty($sprint_id)) {
                $sprint = getSprintInfoById($sprint_id);
                $response->returnResponse(200, $sprint, '');
            } 
            else {
                $data = getAll();
                $response->returnResponse(200, $data, '');
            }
            break;
        case 'POST': {
            $json = file_get_contents('php://input');
            $request = json_decode($json);

            createNew($request);

        }
        case 'PUT': {
            $json = file_get_contents('php://input');
            $request = json_decode($json);

            createNew($request);

        }
        default: 
            $response->returnResponse(404, '', 'Not Found');
            break;
    }
    
    function getAll() {
        return SprintRepository::getAll();
    }

    function createNew($newSprint) {
        $response = new Response();
        // todo public id - task

        if (SprintRepository::getSprintByRoomIdAndStatus($newSprint->sprintRoomId, Sprint::$statuses['new']) > 0) {
            $response->returnResponse(200, 'Already created', '');
        }

        $sprint_id = SprintRepository::create($newSprint->sprintRoomId, $newSprint->sprintPassword );
        
        foreach ($newSprint->tasks as $task) {
            TaskRepository::create($task, $sprint_id);
        }
        
        $data = array( 'sprintId' => $sprint_id );
        $response->returnResponse(200, $data, '');
    }

    function getSprintInfoById($sprintId) {
        $sprintData = SprintRepository::getSprintById($sprintId);
        $tasks = TaskRepository::getAllBySprintId($sprintId);
        return array ('sprint' => $sprintData, 'tasks' => $tasks);
    }

    function update($newSprint) {
        $response = new Response();
        // todo public id - task

        $tasks = $newSprint->tasks;

        if (SprintRepository::getSprintByRoomIdAndStatus($newSprint->sprintRoomId, Sprint::$statuses['new']) > 0) {
            $response->returnResponse(200, 'Already created', '');
        }

        $sprint_id = SprintRepository::create($newSprint->sprintRoomId, $newSprint->sprintPassword );
        
        foreach ($newSprint->tasks as $task) {
            TaskRepository::create($task, $sprint_id);
        }
        
        $data = array( 'sprintId' => $sprint_id );
        $response->returnResponse(200, $data, '');
    }
?>
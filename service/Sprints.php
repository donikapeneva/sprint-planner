<?php

    require_once "../repository/SprintRepository.php";
    require_once "../repository/TaskRepository.php";
    require_once "./Response.php";
    require_once "./Session.php";

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    SessionManager::start();

    

    $response = new Response();
    
    preg_match('/(?:Sprints.php)\/(?P<digit>\d+)/', $uri, $matches);
     
    if($matches) {
        $sprint_id = $matches[1];
    }
    
    switch ($requestMethod) {
        case 'GET': 
            if (!empty($sprint_id)) {
                $sprint = getSprintInfo($sprint_id);
                $response->returnResponse(200, $sprint, '');
            } 
            else {
                $data = getAll();
                $response->returnResponse(200, $data, '');
            }
            break;
        case 'POST': {
            if (!SessionManager::isUserLoggedInAsMaster()) {
                $response->returnResponse(401, '', 'Not authorized');
            }

            $json = file_get_contents('php://input');
            $request = json_decode($json);

            if (!empty($request->sprintId) && !empty($request->action)) {
                proceedNextSprintStep($request->sprintId, $request->action);
            } else {
                createNew($request);
            }
            break;
        }
        case 'PUT': {
            if (!SessionManager::isUserLoggedIn()) {
                $response->returnResponse(401, '', 'Not authorized');
            }

            $json = file_get_contents('php://input');
            $request = json_decode($json);

            update($request);
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

    function getSprintInfo($sprintId) {
        $sprintData = SprintRepository::getSprintById($sprintId);    
        
        switch($sprintData->status) {
            case Sprint::$statuses['planning'] :
                $tasks = TaskRepository::getAllBySprintIdAndAreApproved($sprintId);
                break;

            case Sprint::$statuses['closed'] :
            case Sprint::$statuses['active'] :
                $tasks = TaskRepository::getAllBySprintIdAndIncluded($sprintId);
                break;
            case Sprint::$statuses['active'] :
            case Sprint::$statuses['new']:
            case Sprint::$statuses['grooming'] :
                
            default:
                $tasks = TaskRepository::getAllBySprintId($sprintId);
        }   

        return array ('sprint' => $sprintData, 'tasks' => $tasks);
    }

    function update($request) {
        $response = new Response();
        
        $sprint_id = $request->sprintId;
        $sprint = SprintRepository::getSprintById($sprint_id);
        $updatedSprint = new Sprint();
        $updatedSprint->roomId = $sprint->roomId;
        $updatedSprint->roomPassword = $sprint->roomPassword;
        
        if ($sprint->roomId !== $request->sprintRoomId) {
            if (SprintRepository::getSprintByRoomIdAndStatus($request->sprintRoomId, Sprint::$statuses['new']) > 0) {
                $response->returnResponse(400, '', 'Sprint with room id '.$request->sprintRoomId.' already exists');
            }
            $updatedSprint->roomId = $request->sprintRoomId;
        }

        if ($sprint->roomPassword !== $request->sprintPassword) {
            $updatedSprint->roomPassword = $request->sprintPassword;
        }

        SprintRepository::updateSprintRoom($sprint_id, $updatedSprint->roomId, $updatedSprint->roomPassword);
        
        TaskRepository::deleteAllBySprintId($sprint_id);

        foreach ($request->tasks as $task) {
            TaskRepository::create($task, $sprint_id);
        }
        
        $data = array( 'sprintId' => $sprint_id );
        $response->returnResponse(200, $data, '');
    }

    function proceedNextSprintStep($sprint_id, $action) {
        $response = new Response();
        
        if(!SessionManager::isUserLoggedInAsMaster()) {
            $response->returnResponse(401, '', 'You are not authorized to do this action');
        }

        $sprint = SprintRepository::getSprintById($sprint_id);
        if (!$sprint) {
            $response->returnResponse(400, '', 'Something went wrong');
        }
            
        switch($sprint->status) {
            case Sprint::$statuses['new']:
                if ($action === 'open-grooming') {
                    SprintRepository::updateSprintStatus($sprint_id, Sprint::$statuses['grooming']);
                    $sprint = getSprintInfoById($sprint_id);
                    $response->returnResponse(200, $sprint, '');
                } else {
                    $response->returnResponse(400, '', 'Invalid action');
                }
                break;

            case Sprint::$statuses['grooming'] :
                if ($action === 'end-grooming') {
                    SprintRepository::updateSprintStatus($sprint_id, Sprint::$statuses['planning']);
                    $response->returnResponse(200, '', '');
                } else {
                    $response->returnResponse(400, '', 'Invalid action');
                }
                break;

            case Sprint::$statuses['planning'] :
                SprintRepository::updateSprintStatus($sprint_id, Sprint::$statuses['active']);
                $response->returnResponse(200, '', '');
                break;

            case Sprint::$statuses['active'] :
                SprintRepository::updateSprintStatus($sprint_id, Sprint::$statuses['closed']);
                $response->returnResponse(200, '', '');
                break;

            default:
                $response->returnResponse(400, '', '');
        }
        
    }

    function deleteSprint($sprintId) {
        TaskRepository::deleteAllBySprintId($sprintId);
        SprintRepository::deleteSprintById($sprintId);
        return SprintRepository::getAll();
    }

?>
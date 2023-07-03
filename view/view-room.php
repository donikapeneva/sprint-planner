<!DOCTYPE html>
<html>
    <head>
        <title>Sprint Planner</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <link href="./css/shared/header.css" rel="stylesheet" />
        <link href="./css/shared/content.css" rel="stylesheet" />
        <link href="./css/grooming-room.css" rel="stylesheet" />
    </head>
    <body>
        <?php
            include('../service/Session.php');
            SessionManager::start();
            if(!SessionManager::isUserLoggedIn()) {
                header('Location: ../');
            }
        ?>
        <?php
            include('./header.php');
        ?>
        
        <div class="flex-container-center">
            <div id="error-response" class="card #fbe9e7 deep-orange lighten-5 response-message hidden"></div>
        </div>
        <div class="flex-container-center">
            <div id="success-response" class="card #f1f8e9 light-green lighten-5 response-message hidden"></div>
        </div>
        
        <div class="flex-container-center flex-center-width">
            <h1 id="sprint-stage-id"></h1>
            <h4 id="sprint-room-id"></h4>

            <button id="export-all-btn" class="btn waves-effect waves-light" type="button">Export tasks as CSV</button>

            <div class="form-width row tasks-header ">
                <div class="col s1 bolder">
                    Assignee
                </div>
                <div class="col s1 bolder">
                    Story Points
                </div>
                <div class="col s1 bolder">
                    Task Link
                </div>
                <div class="col s2 bolder">
                    Description
                </div>
                <div class="col s3 bolder">
                    Comments
                </div>
                <div class="col s3 bolder">
                    Answer
                </div>
            </div>

            <div id="tasksList" class="form-width row flex-row"></div>

        </div>
        
        <script src="./script/shared.js"></script>
        <script src="./script/view-room.js"></script>
    </body>

</html>

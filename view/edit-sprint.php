<!DOCTYPE html>
<html>
    <head>
        <title>Sprint Planner</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <link href="./css/shared/header.css" rel="stylesheet" />
        <link href="./css/shared/content.css" rel="stylesheet" />
        <link href="./css/create-new-sprint.css" rel="stylesheet" />
    </head>
    <body>
        <?php
            include('../service/Session.php');
            SessionManager::start();
            if(!SessionManager::isUserLoggedInAsMaster()) {
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
        <form class="flex-container-center flex-center-width">
            <h1>Edit Sprint</h1>

                <div class="row">
                    <div class="col 6">
                        <input id="sprint-id" placeholder="Sprint Id" name="sprintId" type="text" class="input-field center center-align"/>
                    </div>
                    <div class="col 6">
                        <input id="sprint-password" placeholder="Sprint Password" name="sprintPassword" type="text" class="input-field center center-align"/>
                    </div>
                </div>

                <!-- TODO NEXT VERSION -->
                <!-- <div class="form-width">
                    <input placeholder="Feature Name" name="featureName" type="text" class="input-field "/>
                </div> -->
                
                <h5>Tasks</h5>
                <div class="file-field input-field">
                    <div class = "btn">
                        <span>Upload CSV</span>
                        <input id="upload-csv" type="file" />
                    </div>
                </div>
                <div class="form-width row ">
                    <div class="col s2">
                        <input id="epicLink" placeholder="Epic Link" name="epicLink" type="text" class="input-field "/>
                    </div>
                    <div class="col s2">
                        <input id="taskLink" placeholder="Ticket Link" name="ticketLink" type="text" class="input-field "/>
                    </div>
                    <div class="col s6">
                        <input id="taskDescription" placeholder="Ticket Description" name="ticketDescription" type="text" class="input-field "/>
                    </div>
                    <div class="col s2">
                        <a id="addTask" class="waves-effect waves-teal btn-flat secondary-color centered">Add</a>
                    </div>
                </div>

                <ul id="tasksList" class="form-width row "></ul>

                <div class="center form-button">
                    <input id="save-sprint-btn" type="submit" value="Save Sprint" name="submit" class="btn"/>
                </div>

            </form>
           
            
        <script src="./script/edit-sprint.js"></script>
    </body>

</html>

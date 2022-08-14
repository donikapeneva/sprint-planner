<!DOCTYPE html>
<html>
    <head>
        <title>Sprint Planner</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <link href="./css/shared/header.css" rel="stylesheet" />
        <link href="./css/shared/content.css" rel="stylesheet" />
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
        <div class="flex-container-center flex-center-width">
            <h1>Sprints</h1>
            <div>
                <a href="./create-new-sprint.php" class="waves-effect waves-teal btn-flat secondary-color">
                        Create New
                </a>
            </div>

            <ul id="sprintsList" class="form-width row "></ul>


            <table id="sprints-table" class="content-space highlight responsive-table centered ">
                <thead >
                    <tr>
                        <th>Sprint Id</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody id="sprints-table-content">
                </tbody>
            </table>
        </div>
        
        <script src="./script/shared.js"></script>
        <script src="./script/sprints.js"></script>
    </body>

</html>

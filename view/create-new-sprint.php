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
            include('./header.html');
        ?>
        <form class="flex-container-center flex-center-width">
            <h1>Create New Sprint</h1>

                <div class="row">
                    <div class="col 6">
                        <input placeholder="Sprint Id" name="sprintId" type="text" class="input-field center center-align"/>
                    </div>
                    <div class="col 6">
                        <input placeholder="Sprint Password" name="sprintPassword" type="text" class="input-field center center-align"/>
                    </div>
                </div>

                <!-- TODO NEXT VERSION -->
                <!-- <div class="form-width">
                    <input placeholder="Feature Name" name="featureName" type="text" class="input-field "/>
                </div> -->
                    
                <h5>Tasks</h5>
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
                    <input type="submit" value="Create Sprint" name="submit" class="btn"/>
                </div>

            </form>
           
            
        <script src="./script/create-new-sprint.js"></script>
    </body>

</html>
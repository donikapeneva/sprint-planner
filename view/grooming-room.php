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
            include('./header.php');
        ?>
        <div class="flex-container-center flex-center-width">
            <h1>Grooming</h1>
            <h4 id="sprint-room-id"></h4>
            <div class="form-width row flex-header ">
                <div class="col s1">
                    Approved for Planning
                </div>
                <div class="col s1">
                    Epic Link
                </div>
                <div class="col s1">
                    Task Link
                </div>
                <div class="col s2">
                    Description
                </div>
                <div class="col s2">
                    Dev Comments
                </div>
                <div class="col s2">
                    Bizz Comments
                </div>
                <div class="col s2">
                    Answer
                </div>
            </div>

            <div id="tasksList" class="form-width row flex-row"></div>

            

        </div>
        
        <footer class="">
            <div class="container">
                    <div class="center form-button">
                        <input id='end-grooming-btn' type="submit" value="End Grooming" name="submit" class="btn"/>
                    </div>
            </div>

        </footer>
           
            
        <script src="./script/grooming-room.js"></script>
    </body>

</html>

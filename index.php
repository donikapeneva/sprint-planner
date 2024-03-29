<!DOCTYPE html>
<html>
    <head>
        <title>Sprint Planner</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <link href="./view/css/shared/header.css" rel="stylesheet" />
        <link href="./view/css/shared/content.css" rel="stylesheet" />
    </head>
    <body>
        
        <?php
            include('./service/Session.php');
            SessionManager::start();
            if(SessionManager::isUserLoggedInAsMaster()) {
                echo 'redirect to sprints';
                header('Location: ./view/sprints.php');
            }
        ?>

        <div class="header">
            <div>
                <a href="./view/login.php" class="waves-effect waves-teal btn-flat secondary-color">
                    Enter as Master
                </a>
            </div>
        </div>
        <div class="flex-container-center">
            <div id="error-response" class="card #fbe9e7 deep-orange lighten-5 response-message hidden"></div>
        </div>
        <div class="flex-container-center flex-center-window">
            
            <h1>Sprint Planner</h1>
            <form id="enter-room-form" action="./service/EnterRoom.php" method="POST" class="center white"  >
                <h3 class="flex-item">Enter Room</h3>
        
                <div class="center center-align">
                    <input id="email" placeholder="your email" name="email" type="text" class="input-field center center-align"/>
                </div>
    
                <div class="center center-align">
                    <input id="roomSprintId" placeholder="sprint id" name="roomSprintId" type="text" class="input-field white center"/>
                </div>

                <div class="center center-align">
                    <input id="roomPassword" placeholder="room password" name="roomPassword" type="text" class="input-field center center-align"/>
                </div>
                
                <div class="center form-button">
                    <input id="submit-btn" type="submit" value="Enter" name="submit" class="btn"/>
                </div>

            </form>
            <p class="secondary-color">Ask your manager to provide Sprint Id and Room Password</p>
        </div>

        <script src="./view/script/home.js"></script>
    </body>

</html>

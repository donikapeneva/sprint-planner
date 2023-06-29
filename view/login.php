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
            if(SessionManager::isUserLoggedInAsMaster()) {
                header('Location: ./sprints.php');
            }
        ?>
        
        <div class="header">
            <div>
                <a href="../index.php" class="waves-effect waves-teal btn-flat secondary-color">
                    < Back
                </a>
            </div>
        </div>
        <div class="flex-container-center">
            <div id="error-response" class="card #fbe9e7 deep-orange lighten-5 response-message hidden"></div>
        </div>
        <div class="flex-container-center flex-center-window">
            <h1>Sprint Planner</h1>
            <form id="login-form" class="center white"  >
                <h3 class="flex-item">Enter as Master</h3>
        
                <div class="center center-align">
                    <input id="email" placeholder="your email" name="email" type="text" class="input-field center center-align"/>
                </div>
    
                <div class="center center-align">
                    <input id="password" placeholder="password" name="roomPassword" type="password" class="input-field center center-align"/>
                </div>
                
                <div class="center form-button">
                    <input type="submit" value="Log in" name="submit" class="btn"/>
                </div>

            </form>
        </div>
        
        <script src="./script/login.js"></script>
    </body>

</html>

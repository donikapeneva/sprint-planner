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
            include('./header.html');
        ?>
        <div class="flex-container-center flex-center-width">
            <h1>Sprints</h1>
            <div>
                <a class="waves-effect waves-teal btn-flat secondary-color">
                        Create New
                </a>
            </div>
            <table class="content-space highlight responsive-table centered ">
                <thead >
                    <tr>
                        <th>Sprint Id</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                <tr>
                    <td>Alvin</td>
                    <td>Eclair</td>
                    <td>
                        <a class="waves-effect waves-teal btn-flat secondary-color centered">Edit</a>
                        <a class="waves-effect waves-light btn">open room</a>
                    </td>
                </tr>
                <tr>
                    <td>Alan</td>
                    <td>Jellybean</td>
                    <td>
                        <a class="waves-effect waves-teal btn-flat secondary-color centered">Edit</a>
                        <a class="waves-effect waves-light btn">open room</a>
                    </td>
                </tr>
                <tr>
                    <td>Jonathan</td>
                    <td>Lollipop</td>
                    <td>
                        <a class="waves-effect waves-teal btn-flat secondary-color centered">Edit</a>
                        <a class="waves-effect waves-light btn">open room</a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </body>

</html>

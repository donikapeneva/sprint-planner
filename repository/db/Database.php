<?php

class Database {

    private static $instance = null;
    private static $host = "localhost";
    private static $db = "sprint_planner";
    private static $user = "testuser";
    private static $pass = "testuser";

    private $connection;

    private function __construct() {
        $this->connection = new PDO(
            "mysql:host=".Database::$host
            .";dbname=".Database::$db,
            Database::$user, Database::$pass);
    }

    public static function getInstance(){
        if(Database::$instance == null) {
            Database::$instance = new Database();
        }
        return Database::$instance;
    }

    public function getConnection(){
        return $this->connection;
    }

    public static function initDatabase(){
        $conn = new mysqli(Database::$host, Database::$user, Database::$pass);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        if (mysqli_select_db($conn, Database::$db)) {
            echo ">>> Connected to Database sprint_planner <br>";
            $files = glob('./db-scripts/*.{sql}', GLOB_BRACE);
            
            foreach($files as $file) {
                echo ">>> Executing ".$file.'<br>';
                $init_sql = file_get_contents($file);
                if ($conn->multi_query($init_sql ) === TRUE) {
                    do {
                        // Consume each result set
                        if ($result = $conn->store_result()) {
                            $result->free();
                        }
                    } while ($conn->more_results() && $conn->next_result());

                    echo ">>> Database updated successfully<br>";
                } else {
                    echo ">>> Error updating database: <br>" . $conn->error . '<br>';
                }
            }
        }
        
        echo ">>>>> END <br>";
        $conn->close();
    }
}
?>

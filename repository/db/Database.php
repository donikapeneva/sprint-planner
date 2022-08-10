<?php

class Database {

    private static $instance = null;
    private $host;
    private $db;
    private $user;
    private $pass;

    private $connection;

    private function __construct(){
        $this->host = "localhost";
        $this->db   = "sprint_planner";
        $this->user = "testuser";
        $this->pass = "testuser";

        $conn = new mysqli($this->host, $this->user, $this->pass);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        if (!mysqli_select_db($conn, $this->db)) {
            echo ">>> Will create Database<br>";
            $files = glob('./db-scripts/*.{sql}', GLOB_BRACE);
            
            foreach($files as $file) {
                echo ">>> Executing ".$file.'<br>';
                $init_sql = file_get_contents($file);
                if ($conn->multi_query($init_sql ) === TRUE) {
                    echo ">>> Database updated successfully<br>";
                } else {
                    echo ">>> Error updating database: <br>" . $conn->error . '<br>';
                }
            }
        }
        
        echo ">>>>> END <br>";

        $this->connection = new PDO("mysql:host=$this->host;dbname=$this->db", $this->user, $this->pass);
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
}
?>

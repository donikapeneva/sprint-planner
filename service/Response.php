<?php

class Response {

    private $data;
    private $error;

    private function getMessage() {
        return array (
            'data' => $this->data,
            'error' => $this->error
        );
    }

    public function returnResponse($statusCode, $data, $errorMessage) {
        $this->data = $data;
        $this->error = $errorMessage;
        
        http_response_code($statusCode);
        echo json_encode($this->getMessage());
        exit();
    }
}
?>
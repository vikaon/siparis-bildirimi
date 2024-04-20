<?php
file_put_contents(__DIR__ . "/log.log", date("Y-m-d H:i:s") . " " .file_get_contents("php://input") . "\n");
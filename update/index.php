<?php
$client_ip = $_SERVER["REMOTE_ADDR"];
$log = "./update.log";
$data = file_get_contents($log);
$data .= "Request on [".date("Y-m-d H:i:s")."] from [$client_ip]".PHP_EOL;
$data .= var_export( json_decode(file_get_contents("php://input"), true), true ).PHP_EOL;
exec("sh ./update.sh", $output);
$data .= implode(PHP_EOL, $output).PHP_EOL;
$data .= "===============================================================================".PHP_EOL;
echo $data;
file_put_contents($log, $data);


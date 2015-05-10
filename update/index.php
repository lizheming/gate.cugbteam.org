<?php

// 認證用
$valid_token = 'd49dfa7622681425fbcbdd687eb2ca59498ce852';
$valid_ip = array('127.0.0.1');
$client_token = $_GET['token'];
$client_ip = $_SERVER['REMOTE_ADDR'];
$fs = fopen('./example_hook.log', 'a');
fwrite($fs, 'Request on ['.date("Y-m-d H:i:s").'] from ['.$client_ip.']'.PHP_EOL);
// 認證 token
if ($client_token !== $valid_token)
{
    echo "error 10001";
    fwrite($fs, "Invalid token [{$client_token}]".PHP_EOL);
    exit(0);
}
// 認證 ip
if ( ! in_array($client_ip, $valid_ip))
{
    echo "error 10002";
    fwrite($fs, "Invalid ip [{$client_ip}]".PHP_EOL);
    exit(0);
}
$json = file_get_contents('php://input');
$data = json_decode($json, true);
fwrite($fs, 'Data: '.print_r($data, true).PHP_EOL);
fwrite($fs, '======================================================================='.PHP_EOL);
$fs and fclose($fs);
// 執行上面所述的 update.sh
exec("sh /path/to/update.sh");
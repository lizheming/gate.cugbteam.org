<?php
function post($url, $data, $debug = 1) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_TIMEOUT, 5);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $data = curl_exec($curl);
    curl_close($curl);
    if($debug) var_dump($data);
    else return $data;
}
function login($type, $username, $password) {
    $server = array(
        "v4"=> "202.204.105.195",
        "v6"=> "202.204.105.197"
    );
    if( !array_key_exists($type, $server) ) return false;

    $serverUrl= "http://{$server[$type]}:3333/cgi-bin/do_login";
    $data = array(
        "username" => $username,
        "password" => $password,
        "drop"     => 0,
        "type"     => 10,
        "n"        => 117,
        "pop"      => 0,
        "ac_type"  => "h3c",
        "mac"      => ""
    );
    $ret = post($serverUrl, $data, 0);
    preg_match("/\d+/", $ret, $a);
    return $a[0];
}
header("content-type:application/json");
header("Access-Control-Allow-Origin: *");
if(!isset($_GET['type']) && !isset($_GET['username'])) die();
echo login($_GET['type'], $_GET['username'], "123");
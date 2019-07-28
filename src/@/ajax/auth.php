<?php
// Linker

  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  $input = file_get_contents('php://input');

  $response = "{" . PHP_EOL .
  "  email: 'fewfo@dfsgds.ru'," . PHP_EOL .
  "}" . PHP_EOL;

  file_put_contents('auth.log', date('Y-m-d h:i:s') . PHP_EOL . ' ' . 'Input => ' . $input . PHP_EOL . ' ' . 'Output => ' . $response . PHP_EOL, FILE_APPEND);

  sleep(3);

  echo $response;

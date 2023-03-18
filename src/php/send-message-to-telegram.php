<?php
 
// Токен
  const TOKEN = '5431914503:AAFMujAqZpfI2Y6I8PMbp5mPz2MmbzcLi-0';
 
  // ID чата
  const CHATID = '-669738154';
 
   
    $txt = "";

    $txt .= "Имя клиента: " . '*'. strip_tags(trim(urlencode($_POST['name']))) .'*' . "%0A";

    $txt .= "Выбранный тариф: " . '*'. strip_tags(trim(urlencode($_POST['tariff']))) .'*' . "%0A";

    $txt .= "Телефон: " . strip_tags(trim(urlencode('+7'.$_POST['phone']))) . "%0A";  

    $txt .= "Время: " . strip_tags(trim(urlencode($_POST['date']))) . "%0A";    


 
    $textSendStatus = @file_get_contents('https://api.telegram.org/bot'. TOKEN .'/sendMessage?chat_id=' . CHATID . '&parse_mode=Markdown&text=' . $txt); 
 
    if( isset(json_decode($textSendStatus)->{'ok'}) && json_decode($textSendStatus)->{'ok'} ) {
      if (!empty($_FILES['files']['tmp_name'])) {
     
          $urlFile =  "https://api.telegram.org/bot" . TOKEN . "/sendMediaGroup";
           
          // Путь загрузки файлов
          $path = $_SERVER['DOCUMENT_ROOT'] . '/telegramform/tmp/';
           
          // Загрузка файла и вывод сообщения
          $mediaData = [];
          $postContent = [
            'chat_id' => CHATID,
          ];
       
          for ($ct = 0; $ct < count($_FILES['files']['tmp_name']); $ct++) {
            if ($_FILES['files']['name'][$ct] && @copy($_FILES['files']['tmp_name'][$ct], $path . $_FILES['files']['name'][$ct])) {
              if ($_FILES['files']['size'][$ct] < $size && in_array($_FILES['files']['type'][$ct], $types)) {
                $filePath = $path . $_FILES['files']['name'][$ct];
                $postContent[$_FILES['files']['name'][$ct]] = new CURLFile(realpath($filePath));
                $mediaData[] = ['type' => 'document', 'media' => 'attach://'. $_FILES['files']['name'][$ct]];
              }
            }
          }
       
          $postContent['media'] = json_encode($mediaData);
       
          $curl = curl_init();
          curl_setopt($curl, CURLOPT_HTTPHEADER, ["Content-Type:multipart/form-data"]);
          curl_setopt($curl, CURLOPT_URL, $urlFile);
          curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
          curl_setopt($curl, CURLOPT_POSTFIELDS, $postContent);
          $fileSendStatus = curl_exec($curl);
          curl_close($curl);
          $files = glob($path.'*');
          foreach($files as $file){
            if(is_file($file))
              unlink($file);
          }
      }
      echo json_encode('SUCCESS');
    } else {
      echo json_encode('ERROR'); 
    }
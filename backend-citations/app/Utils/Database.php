<?php

namespace quotes\Utils;

use \PDO;

class Database
{
    public $pdo;

    public function __construct()
    {
        // Récupération des données du fichier de configuration
        $configData = parse_ini_file(__DIR__.'/../config.conf');

        try {
            $this->pdo = new PDO(
                "mysql:host={$configData['DB_HOST']};dbname={$configData['DB_NAME']};charset=utf8",
                $configData['DB_USERNAME'],
                $configData['DB_PASSWORD'],
                array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING) // Affiche les erreurs SQL à l'écran
            );
        }
        catch(\Exception $exception) {
            echo 'Erreur de connexion...<br>';
            echo $exception->getMessage().'<br>';
            echo '<pre>';
            echo $exception->getTraceAsString();
            echo '</pre>';
            exit;
        }
    }
}
<?php

/**
 * Utilisation de AltoRouter pour la gestion des routes
 * Utilisation de PSR4 avec Composer pour la gestion de l'autoload des Class réparties dans les différentes namespaces
 */

// Inclusion de l'autoload
require __DIR__.'/../vendor/autoload.php';


// var_dump($_SERVER['BASE_URI']); // => /RevisionPerso/siteDeCitations/backend-citations/public

// Instanciation de la class Application
$application = new quotes\Application();
$application->run();

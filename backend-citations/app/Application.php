<?php

namespace quotes;
use \AltoRouter;
use \Dispatcher;

/**
 * La class Application va gérer les routes du site
 * A l'instanciation d'Application, un contruct va instancier la class AltoRouter
*/

class Application
{
    /**
     * @var Altorouter
     */
    private $router;

    public function __construct() {

        // Configuration du router
        $this->router = new AltoRouter();

        // Configuration du chemin de base
        // On a ajouté des configurations à Apache : virtual host => la regex de .htaccess ne fonctionne plus et donc BASE_URI n'est pas créée dans $_SERVER
        // Nous n'avons plus besoin de setBasePath(), on peut l'enlever avec cette condition
        $this->router->setBasePath($_SERVER['BASE_URI']);

        // Définition des routes en exécutant la méthode qui crée les routes
        $this->defineRoutes();
    }

    /**
     * Définition des routes
     */
    public function defineRoutes() {

        // Routes de test
        // $this->router->map('GET', '/test', 'quotes\\Controllers\\MainController::test', 'test');

        $this->router->map('GET', '/', 'quotes\\Controllers\\MainController::getAllQuotes', 'getAllQuotes');
        $this->router->map('POST', '/quote', 'quotes\\Controllers\\QuoteController::newQuote', 'newQuote');

    }

    public function run(){

        // On vérifie si l'URL correspond à une route créée
        $match = $this->router->match();

        // On utilise la méthode Dispatch() de la dépendance alto-dispatcher
        $dispatcher = new Dispatcher($match, 'quotes\\Controllers\\ErrorController::error404');

        $dispatcher->dispatch();

    }
}
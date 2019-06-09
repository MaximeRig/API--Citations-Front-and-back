<?php

namespace quotes\Controllers;

class CoreController
{

    protected function show($viewName, $viewVar = null)
    {
        require __DIR__.'/../Views/' . $viewName . '.tpl.php';
    }

    protected function showJson($data)
    {
        // TODO : ajouter les CORS


        // On indique au navigateur qu'on envoie des donneés de type json
        header('Content-type: application/json');

        //On affiche la réponse en json
        // echo json_encode($data);
    }

}
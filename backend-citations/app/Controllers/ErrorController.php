<?php

namespace quotes\Controllers;

class ErrorController extends CoreController
{

    public function error404()
    {
        $errorMsg = 'La page demandée n\'a pas été trouvée.';

        $this->showJson($errorMsg);

    }

}
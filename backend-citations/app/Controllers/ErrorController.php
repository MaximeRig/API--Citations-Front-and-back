<?php

namespace quotes\Controllers;

class ErrorController extends CoreController
{

    public function error404()
    {
        $this->show('error404');
    }

}
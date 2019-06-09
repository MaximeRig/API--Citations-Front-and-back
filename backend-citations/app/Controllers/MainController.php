<?php

namespace quotes\Controllers;

use quotes\Models\QuoteModel;


class MainController extends CoreController
{
    public function getAllQuotes(){
        
        // on instancie la class QuoteModel
        $quote = new QuoteModel();

        $quoteCollection = $quote->findAll();

        // On convertit le tableau au format Json
        $this->showJson($quoteCollection);

    }

}
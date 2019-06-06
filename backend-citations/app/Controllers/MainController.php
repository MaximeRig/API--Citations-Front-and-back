<?php

namespace quotes\Controllers;

use quotes\Models\QuoteModel;


class MainController extends CoreController
{
    public function getAllQuotes(){
        
        // test d'affichage de toutes les quotes
        // on instancie la class QuoteModel
        $quote = new QuoteModel();
        $quoteCollection = $quote->findAll();

        // On convertit le tableau au format Json
        $this->showJson($quoteCollection);

    }

    /**
     * Méthode de test pour l'affichage des requêtes
     */
    // public function test() {

    //     // test d'affichage de toutes les quotes
    //     // on instancie la class QuoteModel
    //     $quote = new QuoteModel();
    //     $quoteCollection = $quote->findAll();

    //     // On convertit le tableau au format Json
    //     $this->showJson($quoteCollection);

    // }

}
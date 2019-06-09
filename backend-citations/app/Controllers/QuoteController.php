<?php

namespace quotes\Controllers;

use quotes\Models\QuoteModel;

class QuoteController extends CoreController
{

     public function addQuote(){
        
        // on instancie quoteModel()
        $newQuote = new QuoteModel();

        // On teste si on a bien les données en POST
        if(isset($_POST['quote']) && isset($_POST['author'])) {
            // Si le données sont présentes en POST
            // on set les propriétés des tables
            $quote = htmlspecialchars(strip_tags(trim($_POST['quote'])));
            $newQuote->setContent($quote);

            $author = htmlspecialchars(strip_tags(trim($_POST['author'])));
            $newQuote->setName($author);

            // On exécute la méthode insert()
            $insertStatus = $newQuote->insert();
        }

        // Si retour = true alors on envoie la réponse
        // if ($insertStatus) {
        //     $newQuoteCollection = $newQuote->findAll();
        //     $this->showJson($newQuoteCollection);
        // } else {
        //     http_response_code(500);
        // }

      }

}
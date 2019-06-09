// Module de notre application
// Modification de Javascript natif en Jquery
var app = {

     currentQuoteIndex: null,
     quoteCollection: null,
     formElement: null,
     formQuoteInput: null,
     formAuthorInput: null,
     apiPath: 'http://localhost/RevisionPerso/siteDeCitations/backend-citations/public/',

     init: function() {

          // Initialisation des propriétés
          app.formElement = $('#divAddQuote');
          app.formQuoteInput = $('#input-quote');
          app.formAuthorInput = $('#input-author');

          // Requête Ajax : récupération de toutes les citations de la bdd à l'ouverture
          app.ajaxGetAllMessages();

          // Ajout event click sur le bouton 'Ajouter une citation'
          $('#btnDisplayAddForm').on('click', app.handleClickOnDisplayAddFormButton);

          // Ajout event sur la croix de fermeture du formulaire
          $('#closeForm').on('click', app.handleHideForm);

          // Ajout event submit sur le formulaire d'ajout de citation
          $('#addQuoteForm').on('submit', app.handleSubmitNewQuote);
          
          // Ajout event sur le bouton de navigation next
          $('#nav-next').on('click', app.handleClickOnNextButton);

          // Ajout event sur le bouton de navigation previous
          $('#nav-prev').on('click', app.handleClickOnPrevButton);

          // Ajout event sur le bouton de navigation first
          $('#nav-first').on('click', app.handleClickOnFirstButton);

          // Ajout event sur le bouton de navigation last
          $('#nav-last').on('click', app.handleClickOnLastButton);

     },

     // Méthode qui récupère les citations au chargement de la page
     ajaxGetAllMessages: function() {

          // requête Ajax
          var getAllQuotesXHR = $.ajax({
               method: 'GET',
               url: app.apiPath,
               dataType: 'json'
          });

          getAllQuotesXHR.done(app.getAjaxQuotes);
          getAllQuotesXHR.fail(app.displayError);

     },

     // Traitement des données reçues en Ajax (done)
     getAjaxQuotes: function(quoteCollection) {

          // on insère les données reçues dans une propriété pour qu'elle soit accessible dans tout le module
          app.quoteCollection = quoteCollection;

          // Nb maximum de citations reçues
          var quoteMaxNumber = quoteCollection.length; // pas -1 pour bien avoir le choix de la dernière possibilité dans le Math.random

          var randomNumber = Math.floor(Math.random() * (quoteMaxNumber));
          
          app.currentQuoteIndex = randomNumber;

          // Affichage des citations
          app.displayQuoteAndAuthor(app.currentQuoteIndex);

     },

     // Affiche la citation et son auteur
     displayQuoteAndAuthor: function(quote) {

          var quoteElement = $('#quote');
          var authorElement = $('#author');

          quoteElement.text(app.quoteCollection[quote].content);
          authorElement.text(app.quoteCollection[quote].name);
     },

     // Méthode gérant le click pour afficher le formulaire d'ajout
     handleClickOnDisplayAddFormButton: function() {
          app.formElement.removeClass('d-none');
     },
 
     // Méthode qui cache le formulaire une fois soumis
     handleHideForm: function() {
          $('#errorMsg').addClass('d-none');
          // On vide les input de leur valeur
          app.formQuoteInput.val('');
          app.formAuthorInput.val('');
          app.formElement.addClass('d-none');
     },
     
     // Gère l'evenement submit du formulaire d'ajout de quotes
     handleSubmitNewQuote: function(event) {
          event.preventDefault();

          var target = $(event.target);
     
          app.formQuoteInput = $(target).find('#input-quote');
          app.formAuthorInput = $(target).find('#input-author');

          var formQuoteInputData = app.formQuoteInput.val();
          var formAuthorInputData = app.formAuthorInput.val();
     
          if(formQuoteInputData === '' || formAuthorInputData === '') {
               $('#errorMsg').removeClass('d-none');
          } else {

               // To DO : Faire une requête Ajax pour envoyer la nouvelle entrée
               // Requête Ajax
               var sendNewQuoteAndAuthorAjax = $.ajax({
                    method: 'POST',
                    url: 'http://localhost/RevisionPerso/Citations/backend-citations/public/quotes',
                    data: {
                         'quote' : formQuoteInputData,
                         'author' : formAuthorInputData
                    },
                    dataType: 'json'
               });

               sendNewQuoteAndAuthorAjax.done(app.getAjaxQuotes);
               sendNewQuoteAndAuthorAjax.fail(app.displayError);
 
               // on ferme la fenêtre d'ajout de citation
               app.handleHideForm();
          }
     
     },
     
     // Méthode de gestion du click Next
     handleClickOnNextButton: function() {

          // Si app.currentQuoteIndex est = au dernier index du tableau quotes
          if(app.currentQuoteIndex === app.quoteCollection.length - 1) {
               app.currentQuoteIndex = 0;
          } else {
               app.currentQuoteIndex ++;
          }
     
          app.displayQuoteAndAuthor(app.currentQuoteIndex);
     },
     
     // Méthode de gestion du click previous
     handleClickOnPrevButton: function() {
          
          if(app.currentQuoteIndex === 0){
               app.currentQuoteIndex = app.quoteCollection.length -1;
          } else {
               app.currentQuoteIndex --;
          }
          
          app.displayQuoteAndAuthor(app.currentQuoteIndex);
     },
 
     // Méthode de gestion du click première citation
     handleClickOnFirstButton: function() {

          app.currentQuoteIndex = 0;

          app.displayQuoteAndAuthor(app.currentQuoteIndex);
     },

     
     // Méthode de gestion du click dernière citation
     handleClickOnLastButton: function() {

          app.currentQuoteIndex = app.quoteCollection.length - 1;

          app.displayQuoteAndAuthor(app.currentQuoteIndex);
     },


     // Affichage des erreurs de retour Ajax (fail)
     displayError: function() {
          console.log('Données Ajax non reçues');
     }

}

$(app.init);
// Module de notre application
// Modification de Javascript natif en Jquery
var app = {

     currentQuoteIndex: 1,// Propriété "counter"
     quoteElement: null,
     authorElement: null,
     formElement: null,
     formQuoteInput: null,
     formAuthorInput: null,
     apiPath: 'http://localhost/RevisionPerso/siteDeCitations/backend-citations/public/',

     init: function() {

          // Initialisation des propriétés
          app.quoteElement = $('#quote');
          app.authorElement = $('#author');
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

          // Méthode qui affiche la quote courante (app.currentQuoteIndex) au chargement du DOM
          // app.displayCurrentQuote();

     },

     // Méthode qui récupère les citations au chargement de la page
     ajaxGetAllMessages: function() {

          // requête Ajax
          var getAllQuotesXHR = $.ajax({
               method: 'GET',
               url: app.apiPath,
               dataType: 'json'
          });

          getAllQuotesXHR.done(app.displayQuotes);
          getAllQuotesXHR.fail(app.displayError);

     },

     // Traitement des données reçues en Ajax (done)
     displayQuotes: function(quoteCollection) {

          // TODO :
          // 1 - Prendre le nb de citations reçues
          // 2 - Générer un nb aléatoire avec comme maximum le nb de citations reçues et le renseigner danas app.currentQuoteIndex
          console.log(quoteCollection);
          app.quoteElement.text(quoteCollection[app.currentQuoteIndex].content);// Affiche la citation au chargement de la page
          app.authorElement.text(quoteCollection[app.currentQuoteIndex].name);// Affiche le nom de l'auteur au chargement de la page
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
          // console.log(target);
     
          app.formQuoteInput = $(target).find('#input-quote');
          app.formAuthorInput = $(target).find('#input-author');
     
          if(app.formQuoteInput.val() === '' || app.formAuthorInput.val() === '') {
               $('#errorMsg').removeClass('d-none');
          } else {
               // insère les valeurs dans le tableau quotes
               quotes.push({quote: app.formQuoteInput.val(), author: app.formAuthorInput.val()});
               
               // on ferme la fenêtre d'ajout de citation
               app.handleHideForm();
          }
     
     },
 
     // Méthode permettant de modifier le DOM pour afficher la quote "courante"
     // displayCurrentQuote: function() {
     //      app.quoteElement.text(quotes[app.currentQuoteIndex].quote);
     // },
     
     // Méthode de gestion du click Next
     handleClickOnNextButton: function() {
          
          // Si app.currentQuoteIndex est = au dernier index du tableau quotes
          if(app.currentQuoteIndex === quotes.length - 1) {
               app.currentQuoteIndex = 0;
          } else {
               app.currentQuoteIndex ++;
          }
     
          app.quoteElement.text(quotes[app.currentQuoteIndex].quote);
          app.authorElement.text(quotes[app.currentQuoteIndex].author);
     },
     
     // Méthode de gestion du click previous
     handleClickOnPrevButton: function() {
          
          if(app.currentQuoteIndex === 0){
               app.currentQuoteIndex = quotes.length -1;
          } else {
               app.currentQuoteIndex --;
          }
     
          app.quoteElement.text(quotes[app.currentQuoteIndex].quote);
          app.authorElement.text(quotes[app.currentQuoteIndex].author);
     },
 
     // Méthode de gestion du click première citation
     handleClickOnFirstButton: function() {
          app.quoteElement.text(quotes[0].quote);
          app.authorElement.text(quotes[0].author);
     },
     
     // Méthode de gestion du click dernière citation
     handleClickOnLastButton: function() {
          var lastQuotes = quotes.length - 1;
          app.quoteElement.text(quotes[lastQuotes].quote);
          app.authorElement.text(quotes[lastQuotes].author);
     },

     // Affichage des erreurs de retour Ajax (fail)
     displayError: function() {
          console.log('Données Ajax non reçues');
     }

}

$(app.init);
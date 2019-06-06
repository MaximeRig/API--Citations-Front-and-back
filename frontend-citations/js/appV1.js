// Module de notre application
var app = {

  currentQuoteIndex: 0,// Propriété "counter"
  quoteElement: null,
  authorElement: null,
  formElement: null,
  formQuoteInput: null,
  formAuthorInput: null,

  init: function() {
    
    // Initialisation des propriétés
    app.quoteElement = document.getElementById('quote');
    app.authorElement = document.getElementById('author');
    app.formElement = document.getElementById('divAddQuote');
    app.formQuoteInput = document.getElementById('input-quote');
    app.formAuthorInput = document.getElementById('input-author');
    
    // Ajout event click sur le bouton 'Ajouter une citation'
    document.getElementById('btnDisplayAddForm').addEventListener('click', app.handleClickOnDisplayAddFormButton);

    // Ajout event sur la croix de fermeture du formulaire
    document.getElementById('closeForm').addEventListener('click', app.handleHideForm);

    // Ajout event submit sur le formulaire d'ajout de citation
    document.getElementById('addQuoteForm').addEventListener('submit', app.handleSubmitNewQuote);
    
    // Ajout event sur le bouton de navigation next
    document.getElementById('nav-next').addEventListener('click', app.handleClickOnNextButton);

    // Ajout event sur le bouton de navigation previous
    document.getElementById('nav-prev').addEventListener('click', app.handleClickOnPrevButton);

    // Ajout event sur le bouton de navigation first
    document.getElementById('nav-first').addEventListener('click', app.handleClickOnFirstButton);

    // Ajout event sur le bouton de navigation last
    document.getElementById('nav-last').addEventListener('click', app.handleClickOnLastButton);

    // Méthode qui affiche la quote courante (app.currentQuoteIndex) au chargement du DOM
    app.displayCurrentQuote();

  },

  // Méthode gérant le click pour afficher le formulaire d'ajout
  handleClickOnDisplayAddFormButton: function() {
    app.formElement.classList.remove('d-none');
  },

  // Méthode qui cache le formulaire une fois soumis
  handleHideForm: function() {
    document.getElementById('errorMsg').classList.add('d-none');
    // On vide les input de leur valeur
    app.formQuoteInput.value = '';
    app.formAuthorInput.value = '';
    app.formElement.classList.add('d-none');
  },

  // Gère l'evenement submit du formulaire d'ajout de quotes
  handleSubmitNewQuote: function(event) {
    event.preventDefault();

    app.formQuoteInput = event.target[0];
    app.formAuthorInput = event.target[1];

    if(app.formQuoteInput.value === '' || app.formAuthorInput.value === '') {
      document.getElementById('errorMsg').classList.remove('d-none');
    } else {
      // insère les valeurs dans le tableau quotes
      quotes.push({quote: app.formQuoteInput.value, author: app.formAuthorInput.value});
      
      // on ferme la fenêtre d'ajout de citation
      app.handleHideForm();
    }

  },

  // Méthode permettant de modifier le DOM pour afficher la quote "courante"
  displayCurrentQuote: function() {
    app.quoteElement.textContent = quotes[app.currentQuoteIndex].quote;
  },

  // Méthode de gestion du click Next
  handleClickOnNextButton: function() {
    
    // Si app.currentQuoteIndex est = au dernier index du tableau quotes
    if(app.currentQuoteIndex === quotes.length - 1) {
      app.currentQuoteIndex = 0;
    } else {
      app.currentQuoteIndex ++;
    }

    app.quoteElement.textContent = quotes[app.currentQuoteIndex].quote;
    app.authorElement.textContent = quotes[app.currentQuoteIndex].author;
  },

  handleClickOnPrevButton: function() {
    
    if(app.currentQuoteIndex === 0){
      app.currentQuoteIndex = quotes.length -1;
    } else {
      app.currentQuoteIndex --;
    }

    app.quoteElement.textContent = quotes[app.currentQuoteIndex].quote;
    app.authorElement.textContent = quotes[app.currentQuoteIndex].author;
  },

  handleClickOnFirstButton: function() {
    app.quoteElement.textContent = quotes[0].quote;
    app.authorElement.textContent = quotes[0].author;
  },

  handleClickOnLastButton: function() {
    var lastQuotes = quotes.length - 1;
    app.quoteElement.textContent = quotes[lastQuotes].quote;
    app.authorElement.textContent = quotes[lastQuotes].author;
  }
};

document.addEventListener('DOMContentLoaded', app.init);
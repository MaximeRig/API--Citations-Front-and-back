# Citations

Ceci est un site de citations basées sur celui de http://www.excusesdedev.com/

Au départ, il s'agissait d'un exercice concernant l'apprentissage de Jquery que j'ai repris ensuite afin de l'améliorer.

Côté Front :
 - Utilisation de html5, Bootstrap et Jquery.
 - Récupérer les citations stockées dans une base de donnée (en Ajax) et les afficher au chargement de la page
 - Gestion de l'affichage du formulaire
 - Gestion de l'envoi du formulaire si l'un ou les 2 champs sont vides.
 - Vider les champs à chaque fois que l'utilisateur souhaite saisir une nouvelle citation.
 - Affichage de la liste complète des citations (en Ajax) après en avoir saisi une nouvelle (en incluant la nouvelle)

Côté Back :
 - Utilisation de PHP, SQL et MySql.
 - Le but est de traiter les requêtes HTTP reçues : envoyer les données de la bdd en Json vers le front, modifier la bdd en cas d'ajout de citation provenant du client et renvoyer la nouvelle liste complète des citations.
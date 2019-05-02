

//FUNCTION CREATION PARAGRAPH COMMENTAIRE
function postcomment(newscom){
    var boxcomment = document.createElement('p');
     boxcomment.setAttribute('id','commmentnews');
     container4.appendChild(boxcomment);
     boxcomment.innerHTML = newscom;
 
 }


 function send() {
     // ENVOI LES INFOS ENTRER DANS LE FORMULAIRE VERS LE BACK 
     // POUR LES STOCKER DANS LA TABLE COMMENT
    
     const input = document.querySelector('#commentaire').value;

     $.post(
         'http://localhost:11000/comment', // defini l'URL d'envoie vers le serveur
         { comment_name: input }, // defini ce qu'il envoie au serveur
         function (response) { // defini la fonction execute quand le serveur repond
            
             console.log(response);
         });
 }


//RETOURNE LES INFOS STOKER DANS LA TABLE COMMENT POUR LES AFFICHER
//DANS LE HTML
var retourcomment = document.getElementById("com");
retourcomment.addEventListener("click", function () {
   
    //DEMANDE LE CONTENU DE LA TABLE COMMENT
    $.get("http://localhost:11000/comment", function (response, error) {
        response.forEach(function(com){
           console.log(com);
           postcomment(com.comment_name);

        })
    })
      
});




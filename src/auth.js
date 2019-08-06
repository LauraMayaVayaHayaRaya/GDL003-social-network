document.getElementById('first').style.display='block';
document.getElementById('newsfeed').style.display='none';
document.getElementById('registerForm').style.display='none';

var email = document.getElementById('mailRegister').value;
var password = document.getElementById('passwordRegister').value;
var passwordconfirm = document.getElementById('passwordConfirm').value;
var name = document.getElementById('nombre').value;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FUNCION PARA CERRAR SECIÓN

/*const logOut = document.getElementById("exit").addEventListener("click", ()=>{

  firebase.auth().signOut()
  .then(() => {
alert("Hasta pronto")
    document.getElementById('first').style.display='block';
    document.getElementById('newsfeed').style.display='none';
    document.getElementById('registerForm').style.display='none';

  }).catch(error => {
    // An error happened.
  });

})*/



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GUARDAR USUARIO EN FIREBASE


 const saveUsers = (name, email,uid,post) => {
  let db = firebase.firestore();
  let user = firebase.auth().currentUser;

  db.collection("users").add({
    uid: uid,
    name: name,
    email: email,
    post: "",

  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

//BOTON DE REGISTRO QUE MANDA A PANTALLA DE REGISTRO

document.getElementById('register').addEventListener("click", ()=>{

  document.getElementById('first').style.display='none';
  document.getElementById('newsfeed').style.display='none';
  document.getElementById('registerForm').style.display='block';

});

document.getElementById('register2').addEventListener("click", ()=>{


  //OBTIENE LOS VALORES QUE INGRESO EN MIS CAMPOS DE TEXTO
  let email = document.getElementById('mailRegister').value;
  let password = document.getElementById('passwordRegister').value;
  let passwordconfirm = document.getElementById('passwordConfirm').value;
  let name = document.getElementById('nombre').value;
  //AGREGAMOS UNA CONDICIONAL PARA QUE MANDE UNA ALERTA SI EL VALOR ES MENOR A 4
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }

// SE INICIA LA CREACIÓN DESPUÉS DE HABER OBTENIDO LOS VALORES, LA FUNCION RECIBE EMAIL Y PASSWORD
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function (user) {

    console.log('¡Creamos al usuario!');
    console.log(user);
// AQUÍ PODEMOS METER CUALQUIER OTRA COSA PARA MOSTRAR DESPUÉS DE QUE HAYA INGRESADO

document.getElementById('first').style.display='none';
document.getElementById('newsfeed').style.display='block';
document.getElementById('registerForm').style.display='none';
document.getElementById('principal').style.display='none';

function writeUserData(name, email) {

 firebase.database().ref('educationapp-2ddc2').push({
   email: email,
   name: name,

 });
}

writeUserData(name, email);

let userC = firebase.auth().currentUser;

userC.sendEmailVerification().then(function() {
  console.log("El correo se envió con exito");
}).catch(function(error) {
  console.log(error);
});

if (userC != null) {
  name = userC.displayName;
  email = userC.email;
  uid = userC.uid;

saveUsers(name,email,uid);

}



}) // CATCH NOS SIRVE PARA MOSTRAR CUALQUIER MENSAJE DE ERROR
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });

});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//INGRESAR CON USUARIO YA REGISTRADO
function toggleSignIn() {
     if (firebase.auth().currentUser) {
       // [START signout] VALUDA QUE HAYA UN USUARIO LOGUEADO
       firebase.auth().signOut();
       // [END signout]
     } else { //VALIDA QUE LOS CAMPOS NO ESTÉN VACIOS

       var email = document.getElementById('email').value;
       var password = document.getElementById('password').value;
       if (email.length < 4) {
         alert('Please enter an email address.');
         return;
       }
       if (password.length < 4) {
         alert('Please enter a password.');
         return;
       }

       firebase.auth().signInWithEmailAndPassword(email, password)
       .then(function (user) {
		alert('Credenciales correctas, ¡bienvenido!');


    var user = firebase.auth().currentUser;


  if (user != null)
  {
    console.log(user)

  }

	   })
     // CON CATCH MOSTRAMOS EL ERROR QUE HAYA OCURRIDO AL INGRESAR
       .catch(function(error) {
         // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
         // [START_EXCLUDE]
         if (errorCode === 'auth/wrong-password') {
           alert('Wrong password.');
         } else {
           alert(errorMessage);
         }
         console.log(error);

         // [END_EXCLUDE]
       });
       // [END authwithemail]
     }
   }

// FUNCION PARA INGRESAR CON GOOGLE
   document.getElementById("usericon").addEventListener('click', () => {

     let provider = new firebase.auth.GoogleAuthProvider();
// VERIFICAR EL PROVIDER SCOPE PARA DETECTAR ERROR DE INICIO
     provider.addScope('https://www.googleapis.com/auth/plus.login');

     firebase.auth().signInWithPopup(provider).then(function(result) {
       // This gives you a Google Access Token. You can use it to access the Google API.
       let token = result.credential.accessToken;

       let user = result.user;

       let name = result.user.displayName;

       let email = result.user.email;

       let uid = result.user.uid;

       console.log('Ingreso con Google exitoso');


    saveUsers(name,email,uid,post);

    document.getElementById('first').style.display='none';
    document.getElementById('newsfeed').style.display='block';
    document.getElementById('registerForm').style.display='none';

       document.getElementById('nameUser').innerHTML = 'Bienvenido ' + `<br>` + name;



       document.getElementById('post').addEventListener("click", ()=>{
         let textPost = document.getElementById('posts').value;
         let uid = firebase.auth().currentUser;

       createPost(uid, textPost)

       })


       const createPost = () =>{

            let db = firebase.firestore();
            var msj = document.getElementById("posts").value;


            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {

                const ref = db.collection('users').doc();
                console.log(ref + "esta es la referencia");
                const id = ref.id;
                console.log(id + "este es el id");

                db.collection("users").doc().get().then(doc=> {
                        db.collection("post").add({

                        user: user.uid,
                        post: msj,
                        id: id,


                        }).then(docRef => {
                            console.log("Document written with ID: ", docRef.id);
                          //  console.log("mensaje: ", docRef.doc("post").get());
                        });

                      console.log(doc.id , doc.data());
                        //showPost(
                    });
                // User is signed in.
              } else {
                // No user is signed in.
              }
            });



       }


     }).catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       // The email of the user's account used.
       var erroremail = error.email;
       // The firebase.auth.AuthCredential type that was used.
       var credential = error.credential;
       // ...

       if (errorCode === 'auth/account-exists-with-different-credential'){

         alert('Es el mismo usuario');
       }
     });

   });

   // FUNCION PARA INGRESAR CON FACEBOOK

   function LoginFB(){

       let provider = new firebase.auth.FacebookAuthProvider();
       provider.addScope("public_profile");



       firebase.auth().signInWithPopup(provider).then(function(result){
         let token = result.credential.accessToken;

         let user = result.user;

         let name = result.user.displayName;

         let email = result.user.email;

         let uid = result.user.uid;


        console.log(name);

       }).catch(function(error){
         var errorCode = error.code;
         var errorMessage = error.message;
         var email = error.email;
         var credential = error.credential;

         if (errorCode === 'auth/account-exists-with-different-credential'){
           alert('es el mismo usuario');
         }
         if(errorCode === 'auth/invalid-credential'){
           alert('credencial invalida');
                console.log(error);
         }
         else {
           console.log(error);
         }

       });

   }

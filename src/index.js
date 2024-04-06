/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, onAuthStateChanged, 
    GoogleAuthProvider, 
    signInWithPopup,
    updateProfile } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.10.0/firebase-auth.min.js";

/* === Firebase Setup === */
const firebaseConfig = {
    apiKey: "AIzaSyCs0lKQ4USvZuo2WnxjlQ4Ekagu1BHYOqY",
    authDomain: "moody-57993.firebaseapp.com",
    projectId: "moody-57993",
    storageBucket: "moody-57993.appspot.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

const signOutButtonEl = document.getElementById("sign-out-btn")

const userProfilePictureEl = document.getElementById("user-profile-picture")

const userGreetingEl = document.getElementById("user-greeting")

const displayNameInputEl = document.getElementById("display-name-input")
const photoURLInputEl = document.getElementById("photo-url-input")
const updateProfileButtonEl = document.getElementById("update-profile-btn")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

signOutButtonEl.addEventListener("click", authSignOut)

updateProfileButtonEl.addEventListener("click", authUpdateProfile)

/* === Main Code === */

onAuthStateChanged(auth, (user) => {
    if (user) {
        showLoggedInView()
        showProfilePicture(userProfilePictureEl, user)
        showUserGreeting(userGreetingEl, user)
    } else {
        showLoggedOutView()
    }
});


/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
        signInWithPopup(auth, provider)
        .then((result) => {
          console.log("Signed in with Google")
        }).catch((error) => {
          console.error(error.message)
        });
}

function authSignInWithEmail() {
    const email = emailInputEl.value;
    const password = passwordInputEl.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            clearAuthFields()
            // ...
        })
        .catch((error) => {
            console.error(error.message)
        });
}

function authCreateAccountWithEmail() {
    const email = emailInputEl.value;
    const password = passwordInputEl.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            clearAuthFields()
        })
        .catch((error) => {
            console.error(error.message)
        });
}

function authSignOut() {
    signOut(auth).then(() => {
    }).catch((error) => {
        console.error(error.message)
    });
}

function authUpdateProfile() {
    /*  Challenge:
        Import the updateProfile function from 'firebase/auth'
    
        Use the documentation to make this function work.
        
        Make sure to first create two consts, 'newDisplayName' and 'newPhotoURL', to fetch the values from the input fields displayNameInputEl and photoURLInputEl.
        
        If the updating of profile is successful then you should console log "Profile updated".
        If something went wrong, then you should log the error message using console.error
        
        Resources:
        Justin Bieber profile picture URL: https://i.imgur.com/6GYlSed.jpg
    */
        const newDisplayName = displayNameInputEl.value
        const newPhotoURL = photoURLInputEl.value
        
        updateProfile(auth.currentUser, {
                displayName: newDisplayName,
                photoURL: newPhotoURL
            }).then(() => {
                console.log("Profile updated")
            }).catch((error) => {
                console.error(error.message)
            })
}

/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
}

function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
}

function showView(view) {
    view.style.display = "flex"
}

function hideView(view) {
    view.style.display = "none"
}

function clearInputField(field) {
    field.value = ""
}

function clearAuthFields() {
    clearInputField(emailInputEl)
    clearInputField(passwordInputEl)
}

function showProfilePicture(imgElement, user) {
        const photoURL = user.photoURL
    
        if (photoURL) {
            imgElement.src = photoURL
        } else {
            imgElement.src = "assets/images/default-profile-picture.jpeg"
        }
}

function showUserGreeting(element, user) {

        const displayName = user.displayName
    
        if (displayName) {
            const userFirstName = displayName.split(" ")[0]
            
            element.textContent = `Hey ${userFirstName}, how are you?`
        } else {
            element.textContent = `Hey friend, how are you?`
        }
}
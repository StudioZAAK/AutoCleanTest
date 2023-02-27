var DateTime = luxon.DateTime;

let autoSignIn = true;
var emptyProfile = true;
var keepSignedIn = false;
var unverifiedLogout = false;
var loggedIn = false;

var preLocation;

firebase.initializeApp(firebaseConfig);

// Setup auth
const auth = firebase.auth();

var currentUser;
var currentUID;
var currentEmail;
var publicUsername;
var defaultFavoritDescription = "A male standing Bulul. A grinning long attenuated torso. Attributed to Kababuyan area. But showing many Kiangan attributes.";

var profileChanged = true;

var isModerator = false;

var forceFillProfile = false;

var profilePictureFile;

//Colors
var errorColor = "#F56464";
var sucessColor = "#537DF1";
var normalColor = "#c3c3c3";

// Setup db
const db = firebase.firestore();

const anonymUserNames = ["Anonymer Schüler", "Undercover Cop", "Anonymer Lehrer"];

// Collections
const usersCollectionRef = db.collection('Users');
const artViewerCollectionRef = db.collection('ArtViewerData');
const eventsCollectionRef = db.collection('Meetings');
const meetingsArchiveCollectionRef = db.collection('Meetings-Archive');
const moderatorCollectionRef = db.collection('moderators');
const versionCollectionRef = db.collection('Version');

//S etup storage
const storageRef = firebase.storage().ref();

// Auth
var appleAuth = new firebase.auth.OAuthProvider('apple.com');
var fbAuth = new firebase.auth.FacebookAuthProvider();
var googleProvider = new firebase.auth.GoogleAuthProvider();

//Auth Events
jQuery(function($) {

    auth.onAuthStateChanged(onAuthStateChanged);
});
//Init
function tryInitAjax() {

    if (ajaxLoader && !ajaxLoader.initialized) {
        ajaxLoader.init();
    }
}

// Verification
var oob = findGetParameter("oobCode") ? findGetParameter("oobCode") : "";

if (oob != "") {
    auth.applyActionCode(oob).then(() => {
        console.log("Verification happy");
    }).catch((error) => {
        console.log("Error verifying:", error);
    });

}

window.onfocus = function() {
    CheckVerifiedEmail();
}

function CheckVerifiedEmail() {
    if (document.location.pathname + document.location.search == "/login/?verify") {
        if (auth.currentUser) {
            if (auth.currentUser.emailVerified) {
                // fakeHref(document.location.origin + "/museum/");
                ReturnToLocation();
            } else {

                auth.currentUser.reload().then(() => {
                    if (auth.currentUser.emailVerified)
                        ReturnToLocation();

                });
            }
        } else {
            console.log('No authenticated user');
        }
    }
}

function ReturnToLocation() {
    console.log(ajaxLoader);

    if (ajaxLoader.oldLocation != undefined &&
        ajaxLoader.oldLocation != document.location.origin &&
        ajaxLoader.oldLocation != '' &&
        ajaxLoader.oldLocation != document.location.origin + "/login/" &&

        ajaxLoader.oldLocation != document.location.origin + "/login/?profile" &&
        ajaxLoader.oldLocation != document.location.origin + "/login/?verify") {
        fakeHref(ajaxLoader.oldLocation);

    } else {
        fakeHref(document.location.origin + "/" + hubLocation + "/");
    }
}

// Profile Checks
// Email
function CheckEmailSignup() {

    CheckEmail(document.getElementById("semail"), "", "signUp");
}

function CheckUpdateEmail() {

    CheckEmail(document.getElementById("nemail"), "rnemail", "changeEmail");
}

// Password
function CheckPasswordSignup() {

    CheckPassword(document.getElementById("spw"), "srpw", "signUp");
}

function UpdatePWFirebase() {

    CheckPassword(document.getElementById("npw"), "rnpw", "updatePW");
}

// Delete
function CheckDeleteAccount() {
    CheckDelete(document.getElementById("delete_mail"), "deleteEmailCheck", "delete");
}

function TogglePW(div) {
    let allInputs = div.parentElement.parentElement.parentElement.querySelectorAll('input.pwToggle');
    for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].type = (allInputs[i].type == "password") ? "text" : "password";
    }
}

function ToggleKeepSignedIn() {
    keepSignedIn = !keepSignedIn;
}


//Sign IN
/**
 * The ID of the currently signed-in User. We keep track of this to detect Auth state change events that are just
 * programmatic token refresh but not a User status change.
 */
function SignIn() {
    if (auth.currentUser) {
        auth.signOut();
    } else {

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

        autoSignIn = false;

        // Sign in with email and pass.
        auth.signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.

            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            // document.getElementById('quickstart-sign-in').disabled = false;
        });
    }
    // document.getElementById('quickstart-sign-in').disabled = true;
}

function SignInProvider(who) {

    autoSignIn = false;

    var provider;
    switch (who) {
        case "google":
            provider = new firebase.auth.GoogleAuthProvider();
            break;
        case "facebook":
            provider = new firebase.auth.FacebookAuthProvider();
            break;
        case "apple":
            provider = new firebase.auth.OAuthProvider('apple.com');
            break;
        default:
            console.log("weird provider");
            return;
    }

    auth.signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            let userRef = usersCollectionRef.doc(user.uid);
            if (userRef.get().then((doc) => {
                    if (!doc.exists) {
                        let _u = user.displayName.split(' ');
                        let _uPic = (user.photoURL) ? user.photoURL : "";

                        let data = {
                            uname: user.displayName,
                            fname: _u[0],
                            lname: _u[_u.length - 1],
                            profilePicture: _uPic
                        };

                        userRef.set(data, { merge: true });
                        forceFillProfile = false; // Forces players to go to the profile page after provider signup

                        //Fill profile info
                        document.getElementById('fname').value = data.fname;
                        document.getElementById('lname').value = data.lname;
                        document.getElementById('uname').value = data.uname;
                        document.getElementById('profilePic').src = data.profilePicture;

                    } else {
                        console.log("user doc doesnt exist")
                    }
                }));

        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
        });
}

function SignUp() {
    emptyProfile = true;

    var email = document.getElementById('semail').value;
    var password = document.getElementById('spw').value;


    console.log("Try Signup with:" + email);

    // Create user with email and pass.
    auth.createUserWithEmailAndPassword(email, password).then(() => {
        SendVerification();
        fakeHref(document.location.origin + "/login/?profile")

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
}

function SignUpAnonym() {
    auth.signInAnonymously().then(() => {
        UpdateProfileAnonymous();


    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(errorMessage);

        console.log(error);
    });
}

function LogOut() {
    auth.signOut().then(() => {
        // Sign-out successful.

    }).catch((error) => {
        // An error happened.
    });
}


function UnverifiedUser() {
    //Add this properly afterwards!
    console.log(document.location.pathname);
    if (document.location.pathname == "/" + hubLocation + "/") {
        fakeHref(document.location.origin + "/login/?verify");
    }
}

/**
 * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
 */
function onAuthStateChanged(user) {

    //Initialize Load Ajax 
    tryInitAjax();

    if (eventsInitialized) {
        StopEvents();

        InitEvents();
    }


    // We ignore token refresh events.
    if (user && currentUID === user.uid) {

        return;
    }

    if (user) {

        console.log("Logged in : " + user.uid);

        loggedIn = true;
        currentUID = user.uid;

        console.log(auth.currentUser);

        if (auth.currentUser.email != null) {
            var docRef = moderatorCollectionRef.doc(auth.currentUser.email);

            docRef.get().then((doc) => {
                isModerator = doc.exists;
            });
        } else {
            console.log("no email provided");
        }

        document.querySelector('body').classList.add('loggedIn');

        //Get info from the player profile for every other page to quickly grab
        usersCollectionRef.doc(currentUID).get().then((doc) => {
            if (doc.exists && !forceFillProfile) {
                publicUsername = doc.data().uname;

                if (favoritsActivated)
                    InitializeUserFavorits(currentUID);

                if (autoSignIn) {
                    console.log("Auto sign in on " + document.location.pathname);



                    //If on Login remove and go to main page
                    if (document.location.pathname + document.location.search == "/login/?default") {

                        if (auth.currentUser.isAnonymous) fakeHref(document.location.origin + "/hub/?muid=Public");
                        else fakeHref(document.location.origin + "/");

                    }

                } else {
                    console.log("Manual sign in" + ajaxLoader.olderLocation);
                    ReturnToLocation();

                }

            } else {
                if (!auth.currentUser.isAnonymous) fakeHref(document.location.origin + "/login/?profile");
            }
        }).catch(function(error) {
            // Error occurred. Inspect error.code.
            console.log("Doc doesn't exist : " + error);
        });;

        LoadProfile();

        if (auth.currentUser.isAnonymous) {
            document.querySelector('body').classList.add('anonymous');

        } else {

            let passwordPresent = providerPresent = false;
            user.providerData.forEach(provider => {
                console.log(provider);
                if (provider.providerId == "password")
                    passwordPresent = true;

                if (provider.providerId != "password")
                    providerPresent = true;
            });

            console.log(passwordPresent + " / " + providerPresent)

            if (passwordPresent && providerPresent) {
                document.querySelector('body').classList.add('combined');
            } else if (providerPresent) {
                document.querySelector('body').classList.add('provider');
            }
        }

        // if (user.providerData[0].providerId != "password") {
        //     document.querySelector('body').classList.add('provider');
        // }



        if (!user.emailVerified) {
            console.log("user not verified")
                //     UnverifiedUser();
                //     return;
        }

    } else {

        if (favoritsActivated)
            DisconnectUserFavorits();

        document.querySelector('body').classList.remove('loggedIn');
        document.querySelector('body').classList.remove('provider');

        //Go to main page normally

        if (loggedIn) {
            loggedIn = false;
            // fakeHref(document.location.origin + "/");
            document.location.href = document.location.origin + "/";
        }

        //Unregister everything linked to the player
        // if (inMeta)
        //     LeaveMeta();

        // Set currentUID to null.
        currentUID = null;
    }
}

function SendVerification(div) {
    let actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: document.location.origin + "/",
    };

    if (div != null) {
        let feedback = div.parentElement.querySelector(".inputFeedback");

        addFeedback(feedback, '');
    }

    auth.currentUser.sendEmailVerification()
        .then(function() {
            if (div != null)
                addFeedback(feedback, 'Verification Email sent', true);
        })
        .catch(function(error) {
            // Error occurred. Inspect error.code.
            console.log("Verification failed: " + error);
        });
}

var currentTab = "signinTab";

//Used to open one tab and close another, brute force for Login
function OpenTab(_currentTab, newTab) {

    if (currentTab != "") {
        document.getElementById(currentTab).style.display = "none";
        document.getElementById(currentTab).style.opacity = 0;
    }

    document.getElementById(newTab).style.display = "block";
    document.getElementById(newTab).style.opacity = 1;

    let state = "";

    switch (newTab) {
        case ("profileTab"):
            state = "profile";
            break;
        case ("verifyTab"):
            state = "verify";
            CheckVerifiedEmail();
            break;
        case ("create1Tab"):
            state = "signup";
            break;
        case ("forgotpwTab"):
            state = "forgot";
            break;
        case ("create2Tab"):
            state = "password";
            break;
        default:
            state = "default";
            break;
    }

    currentTab = newTab;

    window.history.replaceState(null, null, "?" + state);
}

function CheckIfVerified() {
    if (!auth.currentUser.emailVerified) {
        OpenTab('profileTab', 'verifyTab');
    }
}

function CheckDelete(emailDiv, otherDivID, mode) {
    otherDivID = (otherDivID == "") ? null : otherDivID;

    var email = emailDiv.value;
    let feedback = emailDiv.parentElement.parentElement.parentElement.querySelector(".inputFeedback");
    let emailTitle = emailDiv.parentElement.querySelector(".inputTitle");

    let otherDiv = document.getElementById(otherDivID);

    //addFeedback(feedback, "");

    if (otherDivID) {

        let otherTitle = otherDiv.parentElement.querySelector(".inputTitle");

        if (email != document.getElementById(otherDivID).innerText) {

            UpdateInputs(false, emailDiv, emailTitle);
            UpdateInputs(false, otherDiv, otherTitle);

            addFeedback(feedback, "Nickname is incorrect");

            return;

        } else {

            UpdateInputs(true, emailDiv, emailTitle);
            //UpdateInputs(true, otherDiv, otherTitle);

            addFeedback(feedback, "");

            if (mode == "delete") {
                DeleteUser(feedback);
            }
        }
    }
}


function DeleteUser(feedback) {

    if (auth.currentUser.providerData[0].providerId != "password") {
        var provider;
        switch (auth.currentUser.providerData[0].providerId) {
            case "google.com":
                provider = new firebase.auth.GoogleAuthProvider();
                break;
            case "facebook":
                provider = new firebase.auth.FacebookAuthProvider();
                provider.addScope('email');
                break;
            case "apple.com":
                provider = new firebase.auth.OAuthProvider('apple.com');
                break;
            default:
                console.log("weird provider");
                return;
        }
        auth.signInWithPopup(provider).then((result) => {

            // usersCollectionRef.doc(auth.currentUser.uid).delete().then(() => {
            //     console.log("UserData successfully deleted!");
            // }).catch((error) => {
            //     console.error("Error removing document: ", error);
            // });

            CleanupDelete();
        });
    } else {

        let password = document.getElementById("deletePW");
        let title = document.getElementById("deletePW").previousElementSibling;

        if (password.value != "") {
            const credential = firebase.auth.EmailAuthProvider.credential(
                auth.currentUser.email,
                password.value,
            );

            auth.currentUser.reauthenticateWithCredential(credential).then(() => {
                CleanupDelete();

            }).catch((error) => {
                // An error ocurred
                addFeedback(feedback, "Password is incorrect");
                UpdateInputs(false, password, title);

            });
            return;
        } else {
            addFeedback(feedback, "This action needs your password");
        }

    }
}

function CleanupDelete() {
    auth.currentUser.delete().then(() => {
        // User deleted.
        console.log("current user deleted");
        fakeHref(document.location.origin + "/");

    }).catch((error) => {
        // An error ocurred
        addFeedback(feedback, error);
    });
}

function UpdateEmail() {

    const user = auth.currentUser;

    // TODO(you): prompt the user to re-provide their sign-in credentials
    const credential = firebase.auth.EmailAuthProvider.credential(
        userEmail.value,
        currEmailPW.value,
    );

    user.reauthenticateWithCredential(credential).then(() => {
        // User re-authenticated.

        auth.currentUser.updateEmail(newUserEmail.value).then(() => {
            userEmail.value = newUserEmail.value;
            newEmailFeedback.innerText = "Email Update Sucessful";

            newUserEmail.value = repeatNewUserEmail.value = currEmailPW.value = "";
        });

    }).catch((error) => {
        console.log("todo write this into a feedback textbox" + error);
        addFeedback(feedback, "Password is incorrect");
    });
}

function ForgotPW(id, feedbackID) {
    let newEmail = document.getElementById(id).value;

    let forgotPWFeedback = document.getElementById(feedbackID);
    addFeedback(forgotPWFeedback, "");
    console.log(newEmail);

    auth.fetchSignInMethodsForEmail(newEmail).then(() => {
            auth.sendPasswordResetEmail(newEmail)
                .then(() => {
                    // Password reset email sent!
                    // ..

                    // addFeedback(forgotPWFeedback, "Password reset email has been sent");
                    OpenTab('forgotpwTab', 'finishforgotpwTab');
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                    addFeedback(forgotPWFeedback, error.code); //"This email doesn't exist in our system yet, please add a registered email");
                    console.log(newEmail);
                    addFeedback(forgotPWFeedback, error.message); //"This email doesn't exist in our system yet, please add a registered email");

                });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            addFeedback(forgotPWFeedback, "This email doesn't exist in our system yet, please add a registered email");

        });
}

//Check Email Availability
function CheckEmail(emailDiv, otherDivID, mode) {

    otherDivID = (otherDivID == "") ? null : otherDivID;

    var email = emailDiv.value;
    let feedback = emailDiv.parentElement.parentElement.parentElement.querySelector(".inputFeedback");
    let emailTitle = emailDiv.parentElement.querySelector(".inputTitle");
    let emailBtn = emailDiv.parentElement.parentElement.querySelector(".inputbutton");

    let otherDiv = document.getElementById(otherDivID);

    addFeedback(feedback, "");

    if (otherDivID) {

        let otherTitle = otherDiv.parentElement.querySelector(".inputTitle");

        if (email != document.getElementById(otherDivID).value) {

            UpdateInputs(false, emailDiv, emailTitle);
            UpdateInputs(false, otherDiv, otherTitle);

            addFeedback(feedback, "Emails not matching");

            return;

        } else {

            UpdateInputs(true, emailDiv, emailTitle);
            UpdateInputs(true, otherDiv, otherTitle);

            addFeedback(feedback, "");

            if (!mode)
                return;

        }
    }

    auth.fetchSignInMethodsForEmail(email)
        .then((result) => {
            addFeedback(feedback, "");

            if (result.length == 0) {

                addFeedback(feedback, "");

                UpdateInputs(true, emailDiv, emailTitle, emailBtn);

                emailHack = email;

                if (mode == 'signUp') {
                    // OpenTab('create1Tab', 'create2Tab');
                    fakeHref(document.location.origin + "/login/?password")
                } else if (mode == 'changeEmail') {
                    TryUpdateEmailFirebase(email);
                }

            } else {
                UpdateInputs(false, emailDiv, emailTitle, emailBtn);
                addFeedback(feedback, "Email already taken");
            }
        }).catch((error) => {
            if (error.code = "auth/invalid-email") {
                console.log(email);
                UpdateInputs(false, emailDiv, emailTitle, emailBtn);
                addFeedback(feedback, "Please enter a proper email adress");
            }
        });
}

function UpdateInputs(state, mailDiv, titleDiv, button) {
    mailDiv.style.color = (state) ? normalColor : errorColor;
    mailDiv.style.borderColor = (state) ? normalColor : errorColor;
    titleDiv.style.color = (state) ? normalColor : errorColor;

    if (state)
        mailDiv.parentElement.classList.add("correct");
    else
        mailDiv.parentElement.classList.remove("correct");

}

//Check PW Availability 
function CheckPassword(div, otherDivID, mode) {

    let pw = div;
    let pwTitle = div.parentElement.querySelector(".inputTitle");

    let pwOther = document.getElementById(otherDivID);
    let pwOtherTitle = pwOther.parentElement.querySelector(".inputTitle");

    let button = div.parentElement.parentElement.querySelector(".inputButton");
    let feedback = div.parentElement.parentElement.parentElement.querySelector(".inputFeedback");

    var error = false;

    addFeedback(feedback, "");

    if (pw.value.length == 0 || pwOther.value.length == 0) {
        error = true;
        addFeedback(feedback, "Please enter a password");

    } else {
        if (pw.value.length < 8) {
            addFeedback(feedback, "Password needs to be 8 characters or more.");
            error = true;
        } else if (pw.value != pwOther.value) {
            addFeedback(feedback, "Passwords don't match.");
            error = true;
        } else {
            addFeedback(feedback, ""); // We are good Let's log you in 

            if (mode == "signUp") {
                SignUp();
            } else if (mode == "updatePW") {
                NewUpdatePWFirebase(feedback);
            }
        }
    }

    if (!error) {

        UpdateInputs(true, pw, pwTitle, button);
        UpdateInputs(true, pwOther, pwOtherTitle, button);

    } else {

        UpdateInputs(false, pw, pwTitle, button);
        UpdateInputs(false, pwOther, pwOtherTitle, button);
    }
}

function OpenProfile(target) {
    document.querySelector('body').classList.add('inProfile');

    console.log(target);
}

function LoadProfile() {

    if (auth.currentUser == null || document.getElementById('profileProper') == null)
        return;

    //Divs
    let parent = document.getElementById('profileProper');
    firstName = parent.querySelector('#fname');
    lastName = parent.querySelector('#lname');
    userName = parent.querySelector('#uname');

    //Reset old state if any
    let fnameTitle = firstName.parentElement.querySelector(".inputTitle");
    let lnameTitle = lastName.parentElement.querySelector(".inputTitle");
    let unameTitle = userName.parentElement.querySelector(".inputTitle");

    UpdateInputs(true, firstName, fnameTitle);
    UpdateInputs(true, lastName, lnameTitle);
    UpdateInputs(true, userName, unameTitle);

    newsletter = parent.querySelector('#joinNewsletter');

    profilePicture = parent.querySelector('#profilePic');

    profilePictureFile = null;

    var docRef = usersCollectionRef.doc(auth.currentUser.uid);
    docRef.get().then((doc) => {
        if (doc.exists) {

            firstName.value = doc.data().fname;
            lastName.value = doc.data().lname;
            userName.value = doc.data().uname;
            newsletter.checked = doc.data().newsletter;

            console.log(doc.data());

            if (doc.data().profilePicture != undefined)
                document.getElementById('profilePicHover').classList.remove('disabled');

            profilePicture.src = (doc.data().profilePicture != undefined) ? doc.data().profilePicture : getProfileImage(doc.data().uname);

            console.log("User Loaded: " + auth.currentUser);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!" + auth.currentUser.uid);
            if (!auth.currentUser.isAnonymous)
                fakeHref(document.location.origin + "/login/?profile");

        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function LoadEmail() {
    if (auth.currentUser == null || document.getElementById('cemail') == null)
        return;
    //Divs
    document.getElementById('cemail').value = auth.currentUser.email;

}

function LoadDelete() {

    if (auth.currentUser == null || document.getElementById('deleteEmailCheck') == null)
        return;

    if (auth.currentUser.providerData[0].providerId == "password")
        document.getElementById("deletePWParent").style.display = "block";

    //Divs
    document.getElementById('deleteEmailCheck').innerHTML = publicUsername;
    document.getElementById('delete_mail').value = "";

}

function CleanInput(element) {
    console.log(sanitizeString(element.value));
    element.value = sanitizeString(element.value).slice(0, 20);

    if (window.location == document.location.origin + '/login/?profile' || window.location == document.location.origin + '/profil/edit-your-profile/') {
        UpdateProfilePicText();
    }
}

function UpdateProfileAnonymous() {
    let data = {
        fname: "Private",
        lname: "Person",
        uname: anonymUserNames[Math.floor(Math.random() * anonymUserNames.length)],
    };

    usersCollectionRef.doc(auth.currentUser.uid).set(data, { merge: true });

}

function UpdateProfileManual(element) {

    let p = element.parentElement;
    let feedback = element.parentElement.parentElement.querySelector(".inputFeedback");

    let fnameDiv = p.querySelector('#fname');
    let lnameDiv = p.querySelector('#lname');
    let unameDiv = p.querySelector('#uname');

    let fnameTitle = fnameDiv.parentElement.querySelector(".inputTitle");
    let lnameTitle = lnameDiv.parentElement.querySelector(".inputTitle");
    let unameTitle = unameDiv.parentElement.querySelector(".inputTitle");

    let data = {
        fname: fnameDiv.value,
        lname: lnameDiv.value,
        uname: unameDiv.value,
        newsletter: element.parentElement.querySelector('#joinNewsletter').checked
    };

    publicUsername = data.uname;

    let profilePicture = p.querySelector('#profilePic').src;

    if (profilePicture.substring(0, 21) == "https://eu.ui-avatars") {
        p.querySelector('#profilePic').src = getProfileImage(unameDiv.value);
    }


    if (data.fname != "" && data.lname != "" && data.uname != "") {
        if (profilePictureFile != null) {
            UpdateUserProfile(profilePictureFile);
        } else if (p.querySelector('#profilePic').src === "") {
            data.profilePicture = getProfileImage(data.uname);
            p.querySelector('#profilePic').src = data.profilePicture;
        } else {
            var removeProfilePic = usersCollectionRef.doc(auth.currentUser.uid).update({
                profilePicture: firebase.firestore.FieldValue.delete()
            });
        }


        usersCollectionRef.doc(auth.currentUser.uid).set(data, { merge: true });


        // Redirect if on creation screen
        if (window.location == document.location.origin + '/login/?profile') {
            console.log(auth.currentUser);

            let passwordPresent = providerPresent = false;
            auth.currentUser.providerData.forEach(provider => {
                console.log(provider);
                if (provider.providerId == "password")
                    passwordPresent = true;

                if (provider.providerId != "password")
                    providerPresent = true;
            });


            if (!providerPresent || auth.currentUser.isAnonymous) {
                fakeHref(document.location.origin + "/");

            } else {
                fakeHref(document.location.origin + "/login/?verify");
            }
            // else {
            //     fakeHref(document.location.origin + "/");
            // }

        } else {

            addFeedback(feedback, ""); // Clean Feedback

            UpdateInputs(true, fnameDiv, fnameTitle);
            UpdateInputs(true, lnameDiv, lnameTitle);
            UpdateInputs(true, unameDiv, unameTitle);

            addFeedback(feedback, "Profile successfully updated", true);

        }


    } else {
        addFeedback(feedback, ""); // Clean Feedback

        if (data.fname == "") {
            addFeedback(feedback, "Please enter your first name");
            UpdateInputs(false, fnameDiv, fnameTitle);
        } else {
            UpdateInputs(true, fnameDiv, fnameTitle);
        }
        if (data.lname == "") {
            addFeedback(feedback, "Please enter your last name");
            UpdateInputs(false, lnameDiv, lnameTitle);
        } else {
            UpdateInputs(true, lnameDiv, lnameTitle);
        }
        if (data.uname == "") {
            addFeedback(feedback, "Please enter a nickname");
            UpdateInputs(false, unameDiv, unameTitle);
        } else {
            UpdateInputs(true, unameDiv, unameTitle);
        }

        if (data.profilePicture == "" || data.profilePicture == "https://sam.zaak.ch/museo/login/?profile") {
            addFeedback(feedback, "Please add a profile picture");
        }
    }
}

//User Profile
function ReadURL(input) {

    if (input.files && input.files[0]) {

        var reader = new FileReader();

        profilePictureFile = input.files[0]; // Update file for upload later

        reader.onload = function(e) {
            // get loaded data and render thumbnail.
            input.parentElement.querySelector('#profilePic').src = e.target.result;
            document.getElementById('profilePicHover').classList.remove('disabled');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

//Read
function UpdateUserProfile(file) {

    if (currentUID === null || !file)
        return;

    var metadata = {
        contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('images/profiles/' + currentUID).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

                let data = {
                    profilePicture: downloadURL,
                };

                usersCollectionRef.doc(auth.currentUser.uid).set(data, { merge: true });

            });
        }
    );
}

function TryUpdateEmailFirebase(email) {

    let pw = document.getElementById("cepw");
    let feedback = document.getElementById("updateEmailFeedback");

    if (pw.value == '') {
        addFeedback(feedback, "Please enter your password");
    } else {

        var user = auth.currentUser;

        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            pw.value
        );
        // Now you can use that to reauthenticate
        user.reauthenticateWithCredential(credential).then(function() {
            user.updateEmail(email).then(() => {
                // Update successful.
                addFeedback(feedback, "Email successfully updated", true);

                document.getElementById("cemail").value = email; //Update email
                document.getElementById("cepw").value = document.getElementById('nemail').value = document.getElementById('rnemail').value = "";

            }).catch((error) => {
                addFeedback(feedback, error);
            });
        }).catch((error) => {
            addFeedback(feedback, error);
        });
    }
}

/** 
 * Attempt to confirm the password reset with firebase and 
 * navigate user back to home. 
 */
function NewUpdatePWFirebase(feedback) {

    var password = document.getElementById('cpw').value;
    var newPassword = document.getElementById('npw').value;
    var user = auth.currentUser;

    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    );

    // Now you can use that to reauthenticate
    auth.currentUser.reauthenticateWithCredential(credential).then(function() {
        auth.currentUser.updatePassword(newPassword).then(() => {
            // Update successful.
            addFeedback(feedback, "Password successfully updated", true); // We are good Let's log you in 

            document.getElementById('cpw').value = document.getElementById('npw').value = document.getElementById('rnpw').value = "";
        }).catch((error) => {
            // An error ocurred
            addFeedback(feedback, error); // We are good Let's log you in 


        });
    }).catch((error) => {
        addFeedback(feedback, error); // We are good Let's log you in 
        UpdateInputs(false, document.getElementById('cpw'));

    });

}

// Remove the profile picture
function DeleteProfilePicture() {

    // Remove the 'profile picture' field from the document
    // var removeProfilePic = usersCollectionRef.doc(auth.currentUser.uid).update({
    //     profilePicture: firebase.firestore.FieldValue.delete()
    // });

    profilePictureFile = null;

    document.getElementById('profilePic').src = getProfileImage(document.querySelector('#uname').value);
    document.getElementById('profilePicHover').classList.add('disabled');
}

function UpdateProfilePicText() {
    let profilePicture = document.getElementById('profilePic');

    if (profilePicture.src == window.location ||  profilePicture.src.substring(0, 21) == "https://eu.ui-avatars") {
        document.getElementById('profilePic').src = getProfileImage(document.querySelector('#uname').value);
    }
}
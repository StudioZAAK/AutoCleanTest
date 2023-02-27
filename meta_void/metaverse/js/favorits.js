/// Favorits List Feature
let unsubscribeFavorits;
let favoritsListParent, favoritTemplate, favoritsEmpty;

function InitializeUserFavorits(uid) {

    favoritsListParent = document.getElementById('favorits_list');
    favoritTemplate = document.getElementById("favorit_tmpl").innerHTML;
    favoritsEmpty = document.getElementById("favorits_empty");

    console.log("Initialize Favorits");

    unsubscribeFavorits = usersCollectionRef.doc(uid).collection('Favorites').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                AddFavorit(change.doc.id);
                // console.log("New favorit: ", change.doc.id);
            } else if (change.type === "removed") {
                RemoveFavoritInList(change.doc.id);
                // console.log("Removed favorit: ", change.doc.id);
            }
        });
    }, (error) => {
        console.log("error: " + error);
    });

    UpdateFavorit();

    RegisterEvents();
}

function RegisterEvents() {
    window.UnityBridge.addEventListener("request-watch-list", function(e) {
        ToggleClassOnBody(e.detail, "akk-watchlist");
    });

}

function DisconnectUserFavorits() {
    if (unsubscribeFavorits)
        unsubscribeFavorits();
}

function AddFavorit(id) {

    // Try fetching existing cards
    var favoritCard = document.getElementById(id);

    if (favoritCard) {

        favoritCard.parentElement.style.display = "block";
        UpdateFavorit();

    } else {
        //Create new
        artViewerCollectionRef.doc(id).get().then((doc) => {
            if (doc.exists) {

                let _data = doc.data();
                let _name = _data.name;
                let _description = (_data.origin != null) ? _data.origin : _data.artist + ", " + _data.timePeriod;

                let _templateInfo = {
                    name: _name,
                    name3D: _name + ".stl",
                    description: _description,
                    image: "https://firebasestorage.googleapis.com/v0/b/asian-art-future.appspot.com/o/images%2Fthumbnails%2F" + doc.id + ".jpg?alt=media",
                    url3D: '',
                    urlPDF: '',
                    button3D: 'none',
                    uid: doc.id,
                };

                var pathReference = firebase.storage().ref('3d-print/' + doc.id + '_Print.stl').getDownloadURL()
                    .then((url) => {

                        //Add download URL
                        _templateInfo.url3D = url;
                        _templateInfo.button3D = 'block';

                        CreateFavoritCard(_templateInfo);

                        UpdateFavorit();
                    })
                    .catch((error) => {
                        // Handle any errors
                        console.log(error);

                        CreateFavoritCard(_templateInfo);
                    });

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!" + id);
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
}

function CreateFavoritCard(_data) {

    createFromTemplate(favoritTemplate, _data, favoritsListParent);

    UpdateFavorit();
}



function RemoveFavorit(uid) {
    //Remove visual representation

    usersCollectionRef.doc(auth.currentUser.uid).collection('Favorites').doc(uid).delete().then(() => {
        console.log("Document " + uid + " successfully deleted from Favorits!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });


}


function RemoveFavoritInList(uid) {
    RemoveChildByID(uid);

    UpdateFavorit();

}

function UpdateFavorit() {

    let length = favoritsListParent.children.length;

    favoritsEmpty.style.display = (length > 0) ? "none" : "block";
}


function ShowWatchlist(state) {

    ToggleClassOnBody(state, "akk-watchlist");

    window.UnityBridge.dispatchEvent(new CustomEvent("on-watch-list", {
        detail: state
    }));
}


//Events
jQuery(document).ready(function($) {

    $("#home-vimu").click(function() {
        ShowQAM(false);
        ShowWatchlist(false);

    });

    if (favoritsActivated) {
        $("#like").show();
    }

    $("#like").click(function() {
        $('body').removeClass('akk-menu');

        invert = !$("body").hasClass("akk-watchlist");

        ShowQAM(false);
        ShowWatchlist(invert);



    });

    $("#Favorits > div.close").click(function() {

        ShowWatchlist(false);

    });

    $("#tools").click(function() {

        ShowWatchlist(false);


    });

});
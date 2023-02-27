var allParticipants = [];

//parent buttons for quick access menu
let voiceToggleDiv;
let voiceMicrophoneDiv;

let museumNameDiv;
let participantsDiv;
let participantsAmount;
let participantsTitle;

let quickTipsToggleDiv;
let environmentToggleDiv;
let fullscreenToggleDiv;

let movementModeDiv;
let volumeDiv;

window.addEventListener('load', (event) => {

    document.addEventListener('fullscreenchange', function(e) {
        if (document.fullscreenElement) {
            console.log(`Element: ${document.fullscreenElement.id} entered fullscreen mode.`);
        } else {
            document.getElementById("unity-fullscreen-button").parentElement.classList.remove("active");
        }
    });

    document.addEventListener('mousedown', function(e) {
        console.log(e);
        if (e.target.id == "unity-canvas") {
            // Clicked on canvas
            if (focusRedo) {
                focusRedo = false;
                console.log("mdown-focus");
                window.UnityBridge.dispatchEvent(new CustomEvent("on-application-focused", { detail: true }));
            }
        } else {
            // Clicked outside of canvas
            if (!focusRedo) {
                focusRedo = true;
                console.log("mdown-unfocus");
                window.UnityBridge.dispatchEvent(new CustomEvent("on-application-focused", { detail: false }));
            }
        }
    });
});

// Register all necessary events after the unity container is connected
function RegisterEvents() {
    console.log("register events");

    //Loading Screen Info
    window.UnityBridge.addEventListener("on-load-progress", function(e) {
        progressBarFull.style.width = 50 + e.detail.progress / 2 + "%";
        downloadInfo.innerText = e.detail.info;
    });

    // On game volume changed. TBD: Add seperate sliders for different types
    window.UnityBridge.addEventListener("on-volume", function(e) {
        GameVolumeSet(e.detail);
    });

    let waitVoiceChat;
    // On voice chat state changed
    window.UnityBridge.addEventListener("on-voice-chat", function(e) {
        if (waitVoiceChat) {
            clearTimeout(waitVoiceChat);
        }
        //Only for unity to unity loading      
        waitVoiceChat = setTimeout(function() {

            UpdateVoiceChat(e.detail);
        }, 100);
    });

    let waitUsersChanged;
    window.UnityBridge.addEventListener("on-users-changed", function(e) {
        if (waitUsersChanged) {
            clearTimeout(waitUsersChanged);
        }
        //Only for unity to unity loading      
        waitUsersChanged = setTimeout(function() {
            UserUpdate(e);
        }, 100);
    });

    //On Movement Mode changed
    window.UnityBridge.addEventListener("on-movement-mode", function(e) {
        UpdateMovementMode(e);
    });


    window.UnityBridge.addEventListener("on-room-joined", function(e) {
        console.log("depr: on-room-joined, use on-application-ready instead")
        ApplicationReady();
    });

    window.UnityBridge.addEventListener("on-application-ready", function(e) {
        ApplicationReady();
    });

    let waitJoinRoom;
    window.UnityBridge.addEventListener("request-join-room", function(e) {

        if (waitJoinRoom) {
            clearTimeout(waitJoinRoom);
        }
        //Only for unity to unity loading      
        waitJoinRoom = setTimeout(function() {
            options.roomName = e.detail.roomName;
            console.log("New Room : " + options.roomName);
            UpdateParams('muid', options.roomName);
            AddUser(auth.currentUser.uid, true);
        }, 1000);
    });
    // The event of room left comes
    window.UnityBridge.addEventListener("request-application-quit", function(e) {
        ApplicationQuit();
    });

    // A link should be opened
    window.UnityBridge.addEventListener("request-open-link", function(e) {
        OpenLink(e);
    });

    // Quick tips have been set
    let waitQuickTips;
    window.UnityBridge.addEventListener("on-quick-tips", function(e) {
        if (waitQuickTips) {
            clearTimeout(waitQuickTips);
        }
        //Only for unity to unity loading      
        waitQuickTips = setTimeout(function() {
            UpdateQuickTips(e);
        }, 100);
    });

    let waitEnvironment;
    // Eneen setvironment has b
    window.UnityBridge.addEventListener("on-environment", function(e) {
        if (waitEnvironment) {
            clearTimeout(waitEnvironment);
        }
        //Only for unity to unity loading      
        waitEnvironment = setTimeout(function() {
            UpdateDayNight(e);
        }, 100);
    });

    window.UnityBridge.addEventListener("on-mute-room", function(e) {
        UpdateMuteAll(e);
    });

    window.UnityBridge.addEventListener("request-qa-menu", function(e) {
        ToggleClassOnBody(e.detail, "akk-qam");
    });

    window.UnityBridge.addEventListener("request-watch-list", function(e) {
        ToggleClassOnBody(e.detail, "akk-watchlist");
    });

    window.UnityBridge.addEventListener("on-tour-finished", function(e) {
        console.warn("depr. on tour finished")
            // ToggleClassOnBody(false, "isTour");
    });
    window.UnityBridge.addEventListener("request-qa-menu-toggles", function(e) {

        // voiceChat: bool
        ToggleClassOnDiv(!(e.detail.voiceChat), voiceToggleDiv, "disabled");
        ToggleClassOnDiv(!(options.isVoipJoined), voiceMicrophoneDiv, "disabled");

        // participants: bool
        ToggleClassOnDiv(!(e.detail.participants), participantsDiv, "disabled");

        // quickTips: bool
        ToggleClassOnDiv(!(e.detail.quickTips), quickTipsToggleDiv, "disabled");

        // environment: bool
        ToggleClassOnDiv(!(e.detail.environment), environmentToggleDiv, "disabled");

        // movementMode: bool
        ToggleClassOnDiv(!(e.detail.movementMode), movementModeDiv, "disabled");

        // fullScreen: bool
        ToggleClassOnDiv(!(e.detail.fullScreen), fullscreenToggleDiv, "disabled");

        // volume: bool
        ToggleClassOnDiv(!(e.detail.volume), volumeDiv, "disabled");
    });


    //Everything loaded so unfocus the canvas still until the player is joined a room
    window.UnityBridge.dispatchEvent(new CustomEvent("unfocus-canvas"));
}


// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

// If the page is hidden unfocus the room
function HandleVisibilityChange() {
    if (document[hidden]) {
        UnfocusRoom();
    } else {
        FocusRoom();
    }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
    console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
    // Handle page visibility change
    document.addEventListener(visibilityChange, HandleVisibilityChange, false);
}

// Helpers UI Unity related
function SetStateDiv(stateDiv, state) {
    console.log(stateDiv);
    console.log(state + " on ");

    if (state)
        stateDiv.classList.add("active");
    else
        stateDiv.classList.remove("active");
}

function ToggleMuteEverybody(everybodyMute) {

    let muteAllButton = document.getElementById("muteAllButtons");

    muteAllButton.innerText = (everybodyMute) ? "Unmute All" : "Mute All";

}

// "on-room-joined"
function ApplicationReady() {

    console.log("joined");
    document.querySelector('body').classList.remove('load');
    document.querySelector('body').classList.add('museumJoined');
    let enterButton = document.getElementById("enterMuseumButton")
    if (enterButton) {
        enterButton.innerText = "Back to the " + roomName;
    }

    inRoom = true;

    FocusRoom();
    // UpdateMicrophone(options.userMuted);

    //Check if is Moderator, already done at login
    if (isModerator) {
        AddModeratorTools();
    } else {
        ownsMeeting();
    }

    roomEnterTime = new Date();
    _paq.push(['trackEvent', 'WebGL', 'Loading', 'Room joined after Start Loading ', (roomEnterTime - startLoadingTime) / 1000]);
    _paq.push(['trackEvent', 'WebGL', 'Loading', 'Room joined after Loaded ', (roomEnterTime - loadedTime) / 1000]);

}

function AddModeratorTools() {
    hasModRights = true;
    document.getElementById("modToolsParticipants").style.display = "flex";
}

// "museum-left"
function ApplicationQuit() {

    if (!inRoom)
        return;

    document.getElementById("enterMuseumButton").innerText = "Visit the " + roomName;
    document.querySelector('body').classList.remove('museumJoined');

    RemoveUser(currentUID);
    document.getElementById("vizzard").style.display = "block";

    inRoom = false;

    console.log("room quit")
    document.location.href = document.location.origin + "/" + hubLocation + "/";

}



// gray voiccoined false
// [{"id":"JYHUSZQWH8bwi03NDoQ9x14AX1N2","voipID":"","name":"Janateo","voiceJoined":false,"voiceEnabled":false,"muted":false,"speaking":false}]
function UserUpdate(e) {
    participantsAmount.innerText = e.detail.length;
    participantsTitle.innerText = (e.detail.length > 1) ? "Participants" : "Participant";

    if (!inRoom)
        return;

    let allCurrentUser = [];

    for (var i = 0; i < e.detail.length; i++) {
        let id = e.detail[i].id;

        if (e.detail[i].id != "") {

            allCurrentUser.push(id)

            // Loop through all participants to determine if somebody left
            if (!allParticipants.includes(id)) {
                //Add Participant to array
                allParticipants.push(id);
            }

            let userDiv = document.getElementById('a' + e.detail[i].id);

            if (userDiv == null) {
                AddUser(e.detail[i].id, false);
            } else {
                AddUser(e.detail[i].id, false);

                //Update User Icon
                // console.log(userDiv);
                var outline = userDiv.querySelector('#part_profileSpeakingOutline');
                var button = userDiv.querySelector('#mute');

                outline.style.borderColor = "transparent"; // Todo: add this to css as default

                //Own stuff
                if (e.detail[i].id == auth.currentUser.uid) {

                    options.isVoipJoined = e.detail[i].voiceJoined;
                    options.isTransmitting = e.detail[i].voiceEnabled;

                    // if (options.isVoipJoined) // Don't update if the player is "leaving";
                    // {

                    // }
                    UpdateMicrophone();

                }

                if (e.detail[i].voiceJoined) {
                    if (button != null) {

                        if (e.detail[i].voiceEnabled) {

                            //In case of self template no button available
                            button.disabled = false;
                            button.parentElement.disabled = false;

                            button.classList.add("joined");

                            if (e.detail[i].muted) {
                                button.classList.add("muted");
                            } else {
                                button.classList.remove("muted");
                            }
                        } else {
                            button.classList.remove("muted");
                            button.classList.remove("joined");
                        }
                    }

                    if (e.detail[i].speaking) {
                        outline.classList.add("speaking"); //style.borderColor = "#537DF1";
                    } else {
                        outline.classList.remove("speaking"); //.style.borderColor = "transparent";
                    }
                } else {
                    console.log("notjoined state")

                    if (button != null) {
                        button.classList.remove("muted");
                        button.classList.remove("joined");


                    } else {
                        console.log("oh button")
                    }
                }
            }
        }
    }

    for (var i = 0; i < allParticipants.length; i++) {
        let id = allParticipants[i];

        // Loop through all participants to determine if somebody left
        if (!allCurrentUser.includes(id)) {
            allParticipants.splice(allParticipants.indexOf(id), 1);
            RemoveUser(id);
        }
    }
}


function GameVolumeSet(value) {

    if (inRoom)
        return;

    value = value * 100;

    // if (value == document.getElementById('gameAudioSlider').value)
    //     return;

    console.log(value);

    document.getElementById('gameAudioSlider').value = value;
    document.getElementById('gameAudioSlider').style = 'background: linear-gradient(to right, #537df1, #537df1 ' + value + '%, #ffffff ' + value + '%, #ffffff 100%)';

}

//Update UI
function UpdateVoiceChat(state) {

    console.log("Update voice chat" + state);

    if (!inRoom)
        return;

    options.isVoipJoined = state;

    SetStateDiv(voiceToggleDiv, options.isVoipJoined); //Update UI
    // SetStateDiv(voiceMicrophoneDiv, options.isVoipJoined);

    UpdateMicrophone();

    ToggleClassOnDiv(false, voiceToggleDiv, "loading");
    ToggleClassOnDiv(false, voiceMicrophoneDiv, "loading");

}

function UpdateMicrophone() { // state every body muted

    if (!inRoom)
        return;


    if (options.roomMuted && !hasModRights) { // Only go here if not mod
        // voiceMicrophoneDiv.style.pointerEvents = "none";
        // voiceMicrophoneChildDiv.disabled = true;
        ToggleClassOnDiv(!(options.isVoipJoined), voiceMicrophoneDiv, "disabled");


        SetStateDiv(voiceMicrophoneDiv, false);


    } else {
        ToggleClassOnDiv(!(options.isVoipJoined), voiceMicrophoneDiv, "disabled");

        // voiceMicrophoneChildDiv.disabled = (options.isVoipJoined) ? false : true;
        // voiceMicrophoneDiv.style.pointerEvents = (options.isVoipJoined) ? "all" : "none"; //  TODO: Outsource in to css // options.isTransmitting

        // set

        SetStateDiv(voiceMicrophoneDiv, options.isTransmitting);

    }
}

function UpdateMuteAll(state) {

    options.roomMuted = state.detail;

    UpdateMicrophone();
}


function UpdateMovementMode(e) {

    if (!inRoom)
        return;

    options.movement = e.detail;

    let id = "freemove";
    switch (options.movement) {
        case 0:
            id = "clickmove";
            break;
    }
    document.getElementById(id).checked = true;
}

function UpdateQuickTips(e) {
    console.log("quicktips");
    if (!inRoom)
        return;

    options.quickTips = e.detail;

    SetStateDiv(quickTipsToggleDiv, options.quickTips) //Update UI
}

function UpdateDayNight(state) {

    options.day = (state.detail == 1) ? false : true;

    console.log(options.day);

    SetStateDiv(environmentToggleDiv, !options.day) //Update UI

}

function ToggleFullscreen() {

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenToggleDiv.active = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            fullscreenToggleDiv.active = false;
        }
    }
}

function AddUser(id, override) {

    if (!override) {
        if (id == auth.currentUser.uid)
            return;
    }

    var fav = document.getElementById("a" + id);

    if (fav) {
        fav.parentElement.style.display = "block";
    } else {

        usersCollectionRef.doc(id).get().then((doc) => {

            var userList = document.getElementById('part_users');

            if (doc.exists) {
                console.log("Adding User : " + id);

                var myTemplate = document.getElementById(GetUserTemplate(id)).innerHTML,
                    data = {
                        uid: doc.id,
                        uname: (doc.data().uname) ? doc.data().uname : "User X",
                        image: (doc.data().profilePicture != undefined) ? doc.data().profilePicture : getProfileImage(doc.data().uname),
                    };

                var myHTML = tim(myTemplate, data);
                var elemDiv = document.createElement('div');
                elemDiv.innerHTML = myHTML;

                if (document.getElementById("a" + id) == null)
                    userList.append(elemDiv);

                //Get the name and listen to that?
                usersCollectionRef.doc(id).onSnapshot((snapshot) => {
                    elemDiv.querySelector(".centercenter").innerText = snapshot.data().uname;
                    if (snapshot.data().profilePicture != null) {
                        elemDiv.querySelector("#part_profil").src = snapshot.data().profilePicture;
                    } else {
                        elemDiv.querySelector("#part_profil").src = getProfileImage(snapshot.data().uname);

                    }
                }, (error) => {
                    console.log("error: " + error);
                });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!" + id);

                let noname = "Private Person";

                var myTemplate = document.getElementById(GetUserTemplate(id)).innerHTML,
                    data = {
                        uid: id,
                        uname: noname,
                        image: getProfileImage(noname),
                    };

                var myHTML = tim(myTemplate, data);
                var elemDiv = document.createElement('div');
                elemDiv.innerHTML = myHTML;

                if (document.getElementById("a" + id) == null)
                    userList.append(elemDiv);

            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
}

///
// Users in the experience
// 'self_tmpl' 'mod_tmpl' 'user_tmpl'
/// 
function GetUserTemplate(id) {
    let tmpl = (isModerator || ownsMeeting()) ? 'mod_tmpl' : 'user_tmpl';

    if (currentUID == id) {
        tmpl = 'self_tmpl';
    }
    return tmpl;
}

function RemoveUser(uid) {
    console.log("Try remove User " + uid);

    if (uid == currentUID) {
        console.log("Don't remove self")
        return;
    }

    //Remove from UI
    var userList = document.querySelector('#part_users');

    if (userList && uid) {
        let user = userList.querySelector('#a' + uid);

        if (user) {
            user.parentElement.remove(user);

            user.parentElement.style.display = "none";
        } else {
            console.log("no user with id" + uid);
        }
    }
}
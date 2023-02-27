// Communication to Museum

// const { debug } = require("firebase-functions/logger");

//  Day / Night Removed 
function ToggleEnvironment() {

    window.UnityBridge.dispatchEvent(new CustomEvent("request-environment", {
        detail: (options.day) ? 1 : 0
    }));
}

// Voice Chat
function ToggleVoice() {

    // Toggle both to make sure the buttons directly apply the targeted state
    options.isTransmitting = options.isVoipJoined = !options.isVoipJoined;

    SetStateDiv(voiceMicrophoneDiv, options.isVoipJoined);
    UpdateMicrophone();

    ToggleClassOnDiv(true, voiceToggleDiv, "loading");
    ToggleClassOnDiv(true, voiceMicrophoneDiv, "loading");

    window.UnityBridge.dispatchEvent(new CustomEvent("request-voice-chat", { detail: options.isVoipJoined }));
}

function SetGameVolume(slider) {
    console.log(slider.value);
    window.UnityBridge.dispatchEvent(new CustomEvent("request-volume", {
        detail: slider.value / 100
    }));
}

//Focus Museum
function UnfocusRoom() {
    // console.log('unfocus');

    if (inRoom) {
        window.UnityBridge.dispatchEvent(new CustomEvent("on-application-visible", { detail: false }));
    }
}

function FocusRoom(force = false) {
    // console.log("focus. enforced: " + force);

    if (document.body.classList.contains('inmuseum') && inRoom || force) {
        window.UnityBridge.dispatchEvent(new CustomEvent("on-application-visible", { detail: true }));
        window.UnityBridge.dispatchEvent(new CustomEvent("on-application-focused", { detail: true }));
    }
}

//Tips
function ToggleTips() {

    options.quickTips = !options.quickTips;

    window.UnityBridge.dispatchEvent(new CustomEvent("request-quick-tips", { detail: options.quickTips }));

}

//Mute Partiipant
function ToggleMuteParticipant(uid) {

    var button = document.getElementById('a' + uid).querySelector('#mute');

    var state = button.classList.contains("muted");

    console.log(button.classList.contains("muted"))

    if (state) {
        button.classList.remove("muted");
    } else {
        button.classList.add("muted");
    }

    window.UnityBridge.dispatchEvent(new CustomEvent("request-mute-user", {
        detail: {
            id: uid,
            muted: !state
        }
    }))
}


// Microphone Controls
function ToggleMuteSelf() {

    console.log("toggle mute self from" + options.isTransmitting);

    // options.userMuted = !options.userMuted;

    // UpdateMicrophone(options.userMuted);


    window.UnityBridge.dispatchEvent(new CustomEvent("request-mute-user", {
        detail: {
            id: auth.currentUser.uid,
            muted: options.isTransmitting
        }
    }))
}


function ToggleMuteEverybody(everybodyMute) {

    let muteAllButton = document.getElementById("muteAllButtons");

    muteAllButton.innerText = (everybodyMute) ? "Unmute All" : "Mute All";

    if (!hasModRights) //update only if not mod
        UpdateMicrophone(!everybodyMute)

}

// Movement Mode Selection
function SetMovementMode(id) {
    // - set-movement-mode (movementMode: int) (0 = Point and Click, 1 = WASD)
    window.UnityBridge.dispatchEvent(new CustomEvent("request-movement-mode", {
        detail: id
    }))
}

//Joining / Leaving a museum room
function JoinRoom() {
    document.getElementById("vizzard").style.display = "none";

    if (unity.loading) {
        console.log("waiting");
        waitingForEntering = true;
    } else {
        console.log("go now");
        // - join-museum ({region: int, roomName: string})
        window.UnityBridge.dispatchEvent(new CustomEvent("request-join-room", {
            detail: {
                region: options.region,
                roomName: options.roomName,
                isTour: options.isTour,
                isNetworked: !options.isTour
            }
        }))
    }
}

// function leaveMuseum() {
//     window.UnityBridge.dispatchEvent(new CustomEvent("request-leave-room"));
// }


function OpenLink(url) {

    if (!inRoom)
        return;

    document.exitPointerLock();
    console.log("defocus")
    window.UnityBridge.dispatchEvent(new CustomEvent("on-application-focused", { detail: false }));
    focusRedo = true;

    let _url = url.detail.replace(targetURL, window.location.origin);

    // Open href url
    fakeHref(_url);

    UnfocusRoom();

}

function KickUser(id) {

    window.UnityBridge.dispatchEvent(new CustomEvent("request-kick-user", {
        detail: id
    }))
}

// Moderator - Gather Group
function GatherGroup() {

    document.getElementById("gatherWarning").classList.add("active");

    setTimeout(function() {

        document.getElementById("gatherWarning").classList.remove("active");

        window.UnityBridge.dispatchEvent(new CustomEvent("request-gather-group"));

    }, 2000);

}

function MuteAll(e) {

    options.roomMuted = !options.roomMuted;

    window.UnityBridge.dispatchEvent(new CustomEvent("request-mute-room", {
        detail: options.roomMuted
    }));

    // Update Moderator Button
    e.innerText = (everybodyMute) ? "Mute All" : "Unmute All";
}

function ShowQAM(state) {

    ToggleClassOnBody(state, "akk-qam");

    if (state) {
        document.getElementById("tools").classList.add("active");
    } else {
        document.getElementById("tools").classList.remove("active");
        ToggleClassOnBody(state, "akk-participants");
    }

    window.UnityBridge.dispatchEvent(new CustomEvent("on-qa-menu", {
        detail: state
    }));
}

function ShowParticipants(state) {

    if (state) {
        document.getElementById("tools").classList.add("active");
    } else {
        document.getElementById("tools").classList.remove("active");
    }

    ToggleClassOnBody(state, "akk-participants");
}

function ShowWatchlist(state) {

    ToggleClassOnBody(state, "akk-watchlist");

    if (state) {
        document.getElementById("like").classList.add("active");
    } else {
        document.getElementById("like").classList.remove("active");
    }

    window.UnityBridge.dispatchEvent(new CustomEvent("on-watch-list", {
        detail: state
    }));
}
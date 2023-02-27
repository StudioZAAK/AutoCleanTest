// Handles communication from and to Unity Webgl and direct things
// attached to the context
// @sam @zaak
let time = new Date();
let startLoadingTime;

let progressBarFull;
let roomEnterTime;

let unityInstance;

let isBeta;
let buildVersion;
let muid;

let projectUrl;
let buildUrl;
let loaderUrl;
let unityConfig;

let everybodyMute = false;
let configured = false;

let subdomain = /:\/\/([^\/]+)/.exec(window.location.href)[1].split('.')[0];

switch (subdomain) {
    case 'sam':
    case 'virgo':
    case 'void':
        isBeta = 'Alpha';
        break;
    case 'preview':
    case 'orion':
        isBeta = 'Beta';
        break;
    default:
        isBeta = 'Live';
}



let hasModRights = false;

//Create Unity Bridge
if (!window.UnityBridge) {
    window.UnityBridge = new EventTarget();
};

//Public Variables
// Did we already go through the Experience Vizzard and wait for loading
var waitingForEntering = false;
// Is the player currently in the void
var inRoom = false;
// Input Catcher to not change the focus all the time if we already are in the set mode
var focusRedo = true;

//Experience Vizzard
const options = {
    public: true,
    region: 0, // 4 = Europen 0 = Automatic
    joinMode: 1,
    roomName: "Name",
    tourType: "freeroam",
    isTour: false,
    audioGuide: false,
    movement: 0,
    userMuted: true,
    voiceChatActive: false,
    day: true,
    quickTips: false,
}

function BuildUnityConfig() {

    if (buildVersion != "") {
        // Initialize();
    } else {
        getVersionNumber();
    }
}

function getVersionNumber() {

    // Initialize();
    configured = true;
}


//Mapped to button
const unity = {
    doNotCaptureKeyboard: true,
    keyboardListeningElement: document.getElementById('unityKeyboard'),
    loaded: false,
    loading: true,
    instance: {},
    load: () => {
        if (unity.loaded) return;
        unity.loaded = true;
        document.querySelector('body').classList.add('load');


        var now = new Date();
        console.log("start loading after: " + (now - time) / 1000 + " seconds");

        startLoadingTime = now - time;

        unity.keyboardListeningElement = document.getElementById('unityKeyboard'); // Get Again for schwubidu
        var container = document.querySelector("#unity-container");
        container.style.height = "100%";
        var canvas = document.querySelector("#unity-canvas");
        var loadingScreen = document.querySelector("#unity-loading-bar");
        var loadingBar = document.querySelector(".download-bar");
        progressBarFull = document.querySelector("#bar");
        progressBarFull.style.width = 0;
        var mobileWarning = document.querySelector("#unity-mobile-warning");

        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            container.className = "unity-mobile";
            // Avoid draining fillrate performance on mobile devices,
            // and default/override low DPI mode on mobile browsers.
            unityConfig.devicePixelRatio = 1;
            mobileWarning.style.display = "block";
            setTimeout(() => {
                mobileWarning.style.display = "none";
            }, 5000);
        } else {
            canvas.style.width = "100%"; //"100vw";
            canvas.style.height = "100%"; //"100vh";
            mobileWarning.style.display = "none";
            unityConfig.devicePixelRatio = 1;
        }

        var script = document.createElement("script");
        script.src = loaderUrl;
        script.onload = () => {
            createUnityInstance(canvas, unityConfig, (progress) => {
                if (progressBarFull != null) {
                    progressBarFull.style.width = (100 * progress / 2) + "%";
                } else {
                    progressBarFull = document.querySelector("#bar");
                }
            }).then((instance) => {
                unityInstance = window.unityInstance = unity.instance = instance;
                unity.loading = false;
                // unity.instance = instance;

                var now = new Date();
                loadedTime = now - startLoadingTime;
                _paq.push(['trackEvent', 'WebGL', 'Loading', 'Unity Load Time', loadedTime / 1000]);

                loadingScreen.style.display = "none";


                RegisterEvents();

                // Did we already complete the EW
                if (waitingForEntering) {
                    waitingForEntering = false;
                    JoinRoom();
                }


            }).catch((message) => {
                alert(message);
                unity.loaded = false;
            });
        };
        document.body.appendChild(script);
    }
}

function StartupRoom(isTour) {
    if (auth.currentUser) {
        usersCollectionRef.doc(auth.currentUser.uid).get().then((doc) => {
            if (doc.exists || auth.currentUser.isAnonymous) {

                //document.querySelector('body').classList.add('load');

                InitRoom(isTour);
                // StartMuseum(isTour);

            } else {
                console.log("doc doesn't exist -> go to fill in profile")
                fakeHref(document.location.origin + "/login/?profile");
            }
        });
    }
}

function InitRoom(isTour) {
    if (auth.currentUser == null) {
        console.log("don't load because not logged in");

        return;
    }

    if (!configured) {
        BuildUnityConfig();
    }

    if (!unity.loaded) {
        if (findGetParameter("beta")) {
            isBeta = findGetParameter("beta") ? "Beta" : "Live";
        }

        if (findGetParameter("noload"))
            return;

        var docRef = versionCollectionRef.doc(isBeta);
        docRef.get().then((doc) => {
            if (!buildVersion) // Only override if not already set
                buildVersion = findGetParameter("version") ? findGetParameter("version") : doc.data().Version;

            console.log("Loading : " + isBeta + " - v." + buildVersion);
            projectUrl = storageURL + bucketName + "/" + buildVersion;
            buildUrl = projectUrl + "/Build";
            loaderUrl = buildUrl + "/" + fileName + ".loader.js";
            unityConfig = {
                dataUrl: buildUrl + "/" + fileName + ".data.gz",
                frameworkUrl: buildUrl + "/" + fileName + ".framework.js.gz",
                codeUrl: buildUrl + "/" + fileName + ".wasm.gz",
                streamingAssetsUrl: projectUrl + "/StreamingAssets",
                companyName: companyName,
                productName: productName,
                productVersion: buildVersion,
            };

            unity.load();
        });
    } else {
        window.UnityBridge.dispatchEvent(new CustomEvent("on-application-focused", { detail: true }));

    }

    muid = findGetParameter("muid") ? findGetParameter("muid") : "";
    if (muid != "") {
        //Remove the Vizzard
        // document.getElementById("vizzard").style.display = "none";
        console.log(muid);

        if (muid != options.roomName) {
            console.log("new Room");

            if (inRoom) {
                console.log("already in " + roomName + " " + options.roomName + ". Want to enter " + muid);

                // Dispatch Event here
                EnterRoom(isTour)

            } else {
                StartRoom(isTour);

            }

        } else {
            console.log("refocus");
            document.querySelector('body').classList.remove('load');
            // jQuery("#tools").show();
            document.querySelector('body').classList.add('museumJoined');
            document.getElementById("enterMuseumButton").innerText = "Back to the " + roomName;

            inRoom = true;

        }
    } else {
        StartRoom(isTour);

    }
}

// Make sure the
function StartRoom(tour) {

    voiceToggleDiv = document.getElementById('voiceToggle').parentElement;
    voiceMicrophoneDiv = document.getElementById('voiceMicrophone').parentElement;
    voiceMicrophoneChildDiv = document.getElementById('voiceMicrophone');
    quickTipsToggleDiv = document.getElementById('quickTipsToggle').parentElement;
    environmentToggleDiv = document.getElementById('environmentToggle').parentElement;

    museumNameDiv = document.getElementById('participantsMuseumName');
    participantsDiv = document.getElementById('toggleParticipants').parentElement;
    participantsAmount = document.getElementById('participantsNr');
    participantsTitle = document.getElementById('participantsTitle');


    fullscreenToggleDiv = document.getElementById('unity-fullscreen-button').parentElement;

    movementModeDiv = document.getElementById('movementMode');
    volumeDiv = document.getElementById('volume');



    // ToggleClassOnBody(tour, "isTour");

    EnterRoom(tour);
}

function EnterRoom(tour) {

    //Default the settingss
    options.region = 0;
    options.movement = 0;
    options.isTour = tour;
    options.roomName = (muid == "") ? "Public" : muid;

    console.log("Enter '" + options.roomName + "' with settings:");

    AddUser(auth.currentUser.uid, true); //Load self on top of userlist into the list

    //Join
    JoinRoom();

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

function ownsMeeting() {
    //Check if owns Meeting
    if (muid != "Public") {
        var docRef = eventsCollectionRef.doc(muid);
        docRef.get().then((doc) => {
            if (doc) {
                console.log("Check for host in private meeting" + (doc.data().owner == auth.currentUser.uid));
                console.log(doc.data().owner);
                console.log(auth.currentUser.uid);

                if (doc.data().owner == auth.currentUser.uid)
                    AddModeratorTools();

            }
        });
    } else {
        return false;
    }
}
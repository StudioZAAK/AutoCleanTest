//Vizzard Helper
// Experience Viccard Microphone Permission Push
function getLocalStream() {

    let feedbackDiv = document.getElementById("micPermissionFeedback");

    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
        window.localStream = stream;
        window.localAudio.srcObject = stream;
        window.localAudio.autoplay = true;


    }).catch(err => {
        console.log("u got an error:" + err)
        if (err == "Permission dismissed") {
            feedbackDiv.innerText = "You dismissed the permission. Without it you are not able to talk to the other room guests"

        } else {
            feedbackDiv.innerText = "Browser Microphone Settings already set"
        }
    });
}

function Test_PopulateUsers() {
    var list = ["bRkK5RquXeS6R5IM9wE9g6NZHjm1",
        "HmePmUAr5SPeNas0jtRE8rs0oT63",
        "HvnuR0lkMRPU7qazZO07RCgfRDh2",
        "CkZDueXGW4h2fgzKg6JCtRZggx62",
        "Co9N4TWNdxPDJrEzmzkl7PIpQlG3",
        "CqJJYNQUqKYxRS9rKY0TXayQPJ62",
        "D0ar4qbgtZTPs5uoPnSdHJCtTa32",
        "Dfh2CEA8HWMmVCPq3OXYh5tnQW12",
        "Dj10AXQvEpd8zsvSam952QgfNlR2",
        "Djoe0GNO5kMqfuaTdvtBJsACIam2",
        "DpebVdfO5DTOlvcHhRtwCLSDCX63",
        "EYqeNsYConhFG66UnyJm9NVzl6h1"
    ];
    //Get all users
    for (var i = 0; i < list.length; i++) {
        AddUser(list[i], false);
    }
}
//ADd debug stuff for xavi

document.addEventListener("keydown", keyDownTextField, false);

let keyCodePressed = 0;
let keycodeUnlock = 3;
let unlocked = false;
let oldKey;

function keyDownTextField(e) {
    var keyCode = e.keyCode;
    console.log(keyCode)

    if (unlocked) {

        switch (keyCode) {
            case 48:
                // Test_PopulateUsers();
                break;
            case 81:
                ShowQAM(true);
                break;
        }


    } else {

        if (oldKey == keyCode) {
            keyCodePressed++;
        } else {
            keyCodePressed = 0;
        }
        oldKey = keyCode;

        if (keyCodePressed < keycodeUnlock) {
            return;
        }
        unlocked = true;
        console.log("Unlocked")

    }
}
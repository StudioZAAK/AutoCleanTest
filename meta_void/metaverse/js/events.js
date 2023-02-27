// Events
const joinText = "Register";
const loginText = "Login to register";
const widthdrawText = "Cancel my registration";
const startText = "Enter";
const enterText = "Enter";
const fullText = "Event is full";
const eventOverText = "This event is already over";

const eventFormat = "yyyy-MM-dd'T'HH:mm"; //"yyyy-MM-dd'T'hh:mm"

let joinedEventsParent;
let myEventsParent;
let otherEventsParent;

let allMyEvent = [];

let allEventIDs = []; // Track events to avoid duplicates if the server hasn't responded yet


let currDuration = 1.0; // When setting the end time of an event the current duration gets set to let the time be adapted correctly

let eventsLength = 0;

const eventFullAmount = 14; // This is not counting the host

let eventsInitialized = false;
var endTimeFilter;
let waitingForIds = [];
var timeout_handles = [];
let overwaitingForIds = [];
var overtimeout_handles = [];
let removewaitingForIds = [];
var removetimeout_handles = [];


var unsubscribeEvents, unsubscribeJoinedEvents, unsubscribeMyEvents, unsubscribePrivateJoinedEvents;


function WaitForEvent(id, data, waitTime, doc) {

    // console.log(waitTime);

    if (waitTime > 0) {
        if (id in timeout_handles) {
            clearTimeout(timeout_handles[id])
        }
        console.log("wait for event: " + id + "  to start in " + waitTime / 3600000 + " hours")

        timeout_handles[id] = setTimeout(SetEventLive, waitTime, id, data, doc)
    } else {
        SetEventLive(id, data, doc)
    }

}

function SetEventLive(id, data, doc) {
    console.log("set event" + id + " live");

    if (auth.currentUser) {
        eventsCollectionRef.doc(id).update({
            live: true
        }).catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

        //Also style for private events
        if (document.getElementById(id))
            parent = document.getElementById(id).parentElement.parentElement;

        UpdateEvent(id, data, parent);


    } else {
        // Special Case
        // Update via function
        let parent;
        if (document.getElementById(id))
            parent = document.getElementById(id).parentElement.parentElement;
        //Update
        UpdateEvent(id, data, parent);
    }
}

function WaitForEventOver(id, data, waitTime, doc) {

    // console.log(waitTime);

    if (waitTime > 0) {
        if (id in overtimeout_handles) {
            clearTimeout(overtimeout_handles[id])
        }
        console.log("wait for event: " + id + "  to finish in " + waitTime / 3600000 + " hours")

        overtimeout_handles[id] = setTimeout(SetEventOver, waitTime, id, data);
    } else {
        SetEventOver(id, data)
    }

}

function SetEventOver(id, data) {
    console.log("set event" + id + " over");

    if (document.getElementById(id))
        parent = document.getElementById(id).parentElement.parentElement;
    //Update
    UpdateEvent(id, data, parent);
}

function WaitForEventRemove(id, data, waitTime) {

    if (waitTime > 0) {
        if (id in removetimeout_handles) {
            clearTimeout(removetimeout_handles[id])
        }
        console.log("wait for event: " + id + "  to be removed in " + waitTime / 3600000 + " hours")

        removetimeout_handles[id] = setTimeout(RemoveEventOver, waitTime, id, data);
    } else {
        SetEventOver(id, data)
    }
}

function RemoveEventOver(id) {
    console.log("set event" + id + " over");

    let event = document.getElementById(id);

    event.parentElement.remove(event);
}

function WaitForInitEvents() {
    if (auth.currentUser != null) {
        InitEvents();
    } else {
        setTimeout(WaitForInitEvents, 100);
    }
}

function InitEvents() {

    //Remove 
    HideEditEvent();

    console.log(eventsInitialized);

    if (eventsInitialized) {
        StartUpCheck();

        return;
    }

    //Get references
    joinedEventsParent = document.getElementById('favoritedEventsParent');
    myEventsParent = document.getElementById('myEventsParent');
    otherEventsParent = document.getElementById('otherEventsParent');

    endTimeFilter = DateTime.now().minus({ hours: 1 }).toMillis();

    unsubscribeEvents = eventsCollectionRef.where("private", "==", false).where('endDate', '>', endTimeFilter).onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {

            if (change.type === "added") {
                AddEvent(change.doc.id, otherEventsParent)
            }
            if (change.type === "modified") {

                UpdateEvent(change.doc.id, change.doc.data());
            }
            if (change.type === "removed") {
                RemoveEvent(change.doc.id);
            }

        });
    }, (error) => {
        console.log("error: " + error);
    });

    if (auth.currentUser) {
        myEventsParent.parentElement.style.display = "block";
        unsubscribeJoinedEvents = usersCollectionRef.doc(auth.currentUser.uid).collection("JoinedEvents").onSnapshot((snapshot) => {

            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    console.log("Joined Event Added :" + change.doc.id);

                    AddEvent(change.doc.id, favoritedEventsParent)

                    eventsCollectionRef.doc(change.doc.id).onSnapshot((doc) => {

                        if (doc.exists) {
                            IsEventNotOld(doc.id, doc.data(), "JoinedEvents", "PastJoinedEvents");
                        }

                        if (doc.exists && doc.data().private == true) {
                            UpdateEvent(doc.id, doc.data(), favoritedEventsParent);
                        }
                    });

                }

                if (change.type === "removed") {
                    console.log("Joined Event Removed" + change.doc.id);

                    AddEvent(change.doc.id, otherEventsParent)
                }
            });
        }, (error) => {
            console.log("error: " + error);
        });

        unsubscribePrivateJoinedEvents = usersCollectionRef.doc(auth.currentUser.uid).collection("PrivateJoinedEvents").onSnapshot((snapshot) => {

            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    console.log("Private Joined Event Added :" + change.doc.id);

                    // Clean out event if its too old

                    AddEvent(change.doc.id, otherEventsParent)

                    eventsCollectionRef.doc(change.doc.id).onSnapshot((doc) => {

                        if (doc.exists) {
                            IsEventNotOld(doc.id, doc.data(), "PrivateJoinedEvents", "PastJoinedEvents");
                        }

                        if (doc.exists && doc.data().private == true) {
                            UpdateEvent(doc.id, doc.data(), otherEventsParent);
                        }
                    });

                }
            });
        }, (error) => {
            console.log("error: " + error);
        });

        unsubscribeMyEvents = usersCollectionRef.doc(auth.currentUser.uid).collection("MyEvents").onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    console.log("My Event Added" + change.doc.id);


                    AddEvent(change.doc.id, myEventsParent)

                    eventsCollectionRef.doc(change.doc.id).onSnapshot((doc) => {
                        if (doc.exists) {

                            IsEventNotOld(doc.id, doc.data(), "MyEvents", "PastMyEvents");
                            UpdateEvent(doc.id, doc.data(), myEventsParent);

                        }
                    });
                }
                if (change.type === "modified") {
                    console.log("My Event Modified" + change.doc.id);
                    console.log("this doesn't exist no more");
                    UpdateEvent(change.doc.id, change.doc.data(), myEventsParent);
                }
                if (change.type === "removed") {
                    console.log("My Event Removed" + change.doc.id);

                    RemoveEvent(change.doc.id);
                }
            });
        }, (error) => {
            console.log("error: " + error);
        });
    }



    document.getElementById("eventprivate").addEventListener('click', TogglePublicMMA, false);

    eventsInitialized = true;

    console.log("Events initialized");

    StartUpCheck();

}

function StartUpCheck() {
    if (findGetParameter("muid")) {
        setTimeout(function() {
            OpenDetailPage(findGetParameter("muid"))
        }, 300);
    } else {
        CloseDetailPage();
    }
}

function StopEvents() {

    unsubscribeEvents();
    if (unsubscribeMyEvents)
        unsubscribeMyEvents();

    if (unsubscribeJoinedEvents)
        unsubscribeJoinedEvents();

    if (unsubscribePrivateJoinedEvents)
        unsubscribePrivateJoinedEvents();


    // favoritedEventsParent.innerHTML = "";
    // myEventsParent2.innerHTML = ""; // Why was this blanked out?
    joinedEventsParent.parentElement.style.display = "none";
    myEventsParent.parentElement.style.display = "none";

    allMyEvent.forEach(element => {
        console.log(element);
        if (isChild(element, myEventsParent)) {
            myEventsParent.removeChild(element);
        }
    });
    allMyEvent = []; // empty after removing
    allEventIDs = [];
    waitingForIds = [];
    favoritedEventsParent.innerHTML = "";
    otherEventsParent.innerHTML = "";

    document.getElementById("eventprivate").removeEventListener('click', TogglePublicMMA, false);

    eventsInitialized = false;
    console.log("Events Stopped");
}

// Happends on create and on update event
function CreateEvent() {

    if (auth.currentUser.isAnonymous) return;

    let startTime = DateTime.fromISO(document.getElementById('eventStartDateTime').value).toMillis();
    let endTime = DateTime.fromISO(document.getElementById('eventEndDateTime').value).toMillis();

    //If no date added use now!
    if (isNaN(startTime))
        startTime = DateTime.now().toMillis();

    if (isNaN(endTime))
        endTime = DateTime.now().plus({ hours: 2 }).toMillis();

    let editEvent = document.getElementById('createEventUID').getAttribute('uid');
    let eventTitle = document.getElementById('eventtitle').value;
    let eventDesc = document.getElementById('eventdescription').value;

    console.log(publicUsername);

    let data = {
        title: (eventTitle == "") ? publicUsername + "'s Event" : eventTitle,
        live: false,
        owner: auth.currentUser.uid,
        ownerUName: publicUsername,
        shortdescription: (eventDesc == "") ? publicUsername + " invites you to this event." : eventDesc,
        startDate: startTime,
        endDate: endTime,
        userCount: 1,
        private: document.getElementById('eventprivate').checked,
    };

    console.log(editEvent);

    if (editEvent) {
        eventsCollectionRef.doc(editEvent).set(data, { merge: true });
        usersCollectionRef.doc(auth.currentUser.uid).collection("MyEvents").doc(editEvent).set(data, { merge: true });
    } else {
        // Create new Event
        // Unclear if needed to save the event id in user profile as well
        eventsCollectionRef.add(data).then(async(docRef) => {
            AddEventToUserCollection(docRef.id, "MyEvents");
        });
    }

    ToggleCreateEvent();
}


function ToggleCreateEvent(type) {

    let creator = document.getElementById('createEvent');
    let introText = document.getElementById('metaExplanation');
    let allCategories = document.getElementById('allEventCategories');
    let createEventButton = document.getElementById('createeventsubmit');

    createEventButton.innerText = (type == 'create') ? 'Create Event' : 'Save';

    if (type == 'create') {
        document.getElementById('eventtitle').value = "";
        document.getElementById('eventdescription').value = "";
        document.getElementById('createEventUID').removeAttribute('uid');

        createEventButton.innerText = (auth.currentUser.isAnonymous) ? "Anonymous Users can't create events" : "Create Event";

        createEventButton.disabled = true;
    } else {
        createEventButton.disabled = false;
    }

    if (creator.style.display == "none") {

        creator.style.display = "block";
        introText.style.display = "none";

        allCategories.style.display = "none";

        document.getElementById('eventStartDateTime').value = DateTime.now().plus({ minutes: 10 }).toFormat(eventFormat).substring(0, 16);
        document.getElementById('eventEndDateTime').value = DateTime.now().plus({ hours: 2 }).toFormat(eventFormat).substring(0, 16);

        //Set current Duration
        // let startTime = DateTime.fromISO(document.getElementById("eventStartDateTime").value);
        // let endTime = DateTime.fromISO(document.getElementById("eventEndDateTime").value);

        // currDuration = (endTime - startTime) / 18000000 * 5;

    } else {
        introText.style.display = "block";
        // allCategories.style.display = "block";
        HideEditEvent();
    }
}

function HideEditEvent() {
    document.getElementById('createEvent').style.display = "none";
    document.getElementById('allEventCategories').style.display = "block";
}

function CreateEventValidation(div, limit) {

    if (div || limit) {
        if (div.value.length > limit) {
            div.value = div.value.substring(0, limit)
        }
        div.nextElementSibling.innerText = div.value.length + " / " + limit
    }

    let button = document.getElementById("createeventsubmit");

    let startTime = DateTime.fromISO(document.getElementById("eventStartDateTime").value);
    let endTime = DateTime.fromISO(document.getElementById("eventEndDateTime").value);

    currDuration = (endTime - startTime) / 18000000 * 5;

    let timingsOk = true;

    if (endTime < startTime || startTime < DateTime.now())
        timingsOk = false;

    if (!timingsOk ||
        document.getElementById('eventtitle').value == "" ||
        document.getElementById('eventdescription').value == "") {

        button.disabled = true;

    } else {
        button.disabled = false;
    }

    if (auth.currentUser.isAnonymous) button.disabled = true;
}

// On adding a startdate just directly add one hours for easy
function SetStartDate(div) {

    currDuration = (isNaN(currDuration) || currDuration < 0 || currDuration == undefined) ? 1 : currDuration;

    document.getElementById("eventEndDateTime").value = DateTime.fromISO(div.value).plus({ hours: currDuration }).toFormat(eventFormat);

    CreateEventValidation();
}

var TogglePublicMMA = function() {
    document.getElementById("togglePublic").classList.toggle("active");
    document.getElementById("togglePrivate").classList.toggle("active");
}

//
// Detail Page
// 
function OpenDetailPage(uid) {
    let detailPage = document.getElementById('eventsDetail');
    let allCategories = document.getElementById('allEventCategories');
    console.log(uid);

    document.getElementById('createEventUID').setAttribute('uid', '');
    AddEventCard(document.getElementById('detailEventParent'), uid, true);
    //If we have everything just grab everything?


    detailPage.style.display = "flex";
    allCategories.style.display = "none";
    UpdateParams('muid', uid);

}

function CloseDetailPage() {
    document.getElementById('eventsDetail').style.display = "none";
    document.getElementById('allEventCategories').style.display = "block";

    UpdateParams('muid');

    document.getElementById('detailEventParent').innerHTML = "";
}

//
// Event Cards
//
function AddEventCard(parent, id, invite) {

    eventsCollectionRef.doc(id).get().then((doc) => {
        if (doc.exists) {

            parent.innerHTML = "";

            let _data = doc.data();

            if (invite)
                console.log(_data);

            var elemDiv = CreateEventCard(doc.id, doc.data(), invite, parent); //document.createElement('div');

            if (invite) {

                let inviteParent = document.getElementById(doc.id);
                console.log(doc.id);

                inviteParent = (inviteParent) ? inviteParent.parentElement.parentElement : otherEventsParent;
                console.log(_data.live)
                UpdateJoinButton(inviteParent.id, elemDiv); // Fetch the parent of the active element

                document.querySelector("#detailHostName").innerText = _data.ownerUName;
                document.querySelector("#detailEventName").innerText = _data.title;

                //Tools
                elemDiv.querySelector("#detailShare").style.display = "none";
                if (elemDiv.querySelector("#detailEdit")) {
                    elemDiv.querySelector("#detailEdit").style.display = "none";
                }
                if (elemDiv.querySelector("#detailEdit")) {
                    elemDiv.querySelector("#detailDelete").style.display = "none";
                }
                elemDiv.querySelector("#detailClose").style.display = "block";
            }
            console.log("done");
            parent.append(elemDiv);

        } else {
            CloseDetailPage();
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function InitParticipantsList(eventUID, card) {

    let participantsParent = card.querySelector('#detailMembers')
    let additionalParticipantsCounter = card.querySelector('#additionalParticipantsCount')
    let participantsCounter = card.querySelector('#userCountCurrent');


    unsubscribeMeetingParticipants = eventsCollectionRef.doc(eventUID).collection("Participants").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {

            let partID = "part" + change.doc.id;
            let participantDiv = participantsParent.querySelector("#" + partID);
            let parentID = document.getElementById(eventUID).parentElement.parentElement.id;

            if (change.type === "added") {




                if (participantDiv) {


                    participantDiv.style.display = "inline-block";
                    // participantsCounter.innerText = count;

                    UpdateParticipantCount(card.querySelector(".card"), parentID, 1);

                } else {
                    usersCollectionRef.doc(change.doc.id).get().then((doc) => {
                        if (doc.exists) {

                            UpdateParticipantCount(card.querySelector(".card"), parentID, 1);

                            //Add the card
                            if (parseInt(participantsCounter.innerText) <= 8) {
                                let storageImage = (doc.data().profilePicture != undefined) ? doc.data().profilePicture : getProfileImage(doc.data().uname);
                                var iconTemplate = document.getElementById("participant_tmpl").innerHTML,
                                    data = {
                                        uid: change.doc.id,
                                        image: storageImage,
                                    };

                                let myHTML = tim(iconTemplate, data);
                                let elemDiv = document.createElement('div');
                                elemDiv.innerHTML = myHTML;
                                elemDiv.id = partID;

                                participantsParent.prepend(elemDiv);
                            }



                        } else {
                            // console.log("missing user");
                        }
                    });
                }

                //Update counter
                UpdateJoinButton(parentID, card);
            }
            if (change.type === "modified") {
                console.log("participant Modified????");
            }
            if (change.type === "removed") {

                if (participantDiv) {
                    //     participantDiv.style.display = "none";
                    participantDiv.parentElement.removeChild(participantDiv);

                }

                UpdateParticipantCount(card.querySelector(".card"), parentID, -1);

            }
        });
    }, (error) => {
        console.log("error: " + error);
    });
}

function UpdateParticipantCount(card, parentID, direction) {
    let participantsCounter = card.querySelector('#userCountCurrent');
    let count = parseInt(participantsCounter.innerText) + direction;
    let additionalParticipantsCounter = card.querySelector('#additionalParticipantsCount')


    participantsCounter.innerText = count;

    if (count <= 8) {
        additionalParticipantsCounter.innerText = "";
        card.classList.remove("partial");
    } else {
        card.classList.add("partial");
        additionalParticipantsCounter.innerText = '+' + (count - 8);
    }
    UpdateJoinButton(parentID, card);

}

function CheckIfEventIsFull(count, card) {
    // console.log(card);
    if (count >= eventFullAmount) { // We set the event to full special style only

        let button = card.querySelector('#meetEventButton');
        let user = card.querySelector("#detailMembers > #part" + auth.currentUser.uid);
        card.classList.add("full");

        if (user) {
            console.log("you are in");
        } else {
            button.innerText = fullText;
        }
    } else {
        card.classList.remove("full");
    }
}

function CreateEventCard(id, _data, invite) {
    let buttonText = joinText;
    let isFull = '';
    let eventType = "normal"; // normal, personal, live, over
    let templateType = "event_tmpl";

    let isOver = false;

    //Check if event is live if so change it in the backend
    if (!_data.live && _data.startDate < Date.now()) {
        eventType = 'live';
        if (auth.currentUser) {
            eventsCollectionRef.doc(id).update({
                live: true
            }).catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

        }
    }

    if (_data.endDate < Date.now() + 2) {
        isOver = true;
        WaitForEventRemove(id, _data, _data.endDate - Date.now() + 3600000);
    }

    if (auth.currentUser && _data.owner == auth.currentUser.uid) {
        templateType = "event_owner_tmpl";
        eventType = "personal"
        if (!_data.live)
            buttonText = startText;
    } else {
        // if (_data.private && !invite) // only return null if event not in invite
        //     return "empty";

        //Check if isFull
        if (_data.userCount < eventFullAmount) {} else {
            buttonText = "No more seats available";
            isFull = 'full'
        }
    }

    let privateText = "Public"
    let privateClass = "Public"
    let nowText = "Now";
    let nowClass = "now";
    if (_data.private) {
        privateText = "Private"
    }

    if (_data.live) {
        eventType = 'live';
        nowClass = "now active";
        buttonText = startText;
        WaitForEventOver(id, _data, _data.endDate - Date.now());


    } else {

        WaitForEvent(id, _data, _data.startDate - Date.now());
    }

    if (isOver) {
        eventType = 'over';
        nowText = "This event is already over";
    }

    if (!auth.currentUser) {
        // document.getElementById('favoritedEvents').style.display = "none";
        buttonText = loginText;
    }

    let startDate = DateTime.fromMillis(_data.startDate);
    let endDate = DateTime.fromMillis(_data.endDate);

    let storageImage = "";

    let _id = (invite) ? 'i_' + id : id;

    var myTemplate = document.getElementById(templateType).innerHTML,
        data = {
            eventtype: eventType,
            private: privateText,
            privateClass: privateClass,
            title: _data.title,
            description: (_data.shortdescription != null) ? _data.shortdescription : defaultFavoritDescription,
            image: storageImage, //"https://firebasestorage.googleapis.com/v0/b/asian-art-future.appspot.com/o/images%2Fprofiles%2F" + _data.owner + ".jpg?alt=media",
            user: _data.ownerUName,
            uid: _id,
            uidEvent: id,
            month: startDate.toFormat('MMM'),
            day: startDate.toFormat('dd'),
            time: startDate.toFormat('t').toString() + ' - ' + endDate.toFormat('t'),
            link: window.location.origin + "/museum/?id=" + id,
            enterText: buttonText,
            isFullClass: isFull,
            userCount: 0, //_data.userCount - 1
            nowClass: nowClass,
            nowText: nowText
        };


    //Template Created
    var myHTML = tim(myTemplate, data);
    var elemDiv = document.createElement('div');
    elemDiv.innerHTML = myHTML;

    //Add player ICON
    SetUserIcon(_data.owner, elemDiv.querySelector("#host_img"))

    //Initialize Participants list snapshot listener
    InitParticipantsList(id, elemDiv);

    return elemDiv;
}

function SetUserIcon(uid, image) {
    usersCollectionRef.doc(uid).get().then((doc) => {
        image.src = (doc.data().profilePicture != undefined) ? doc.data().profilePicture : getProfileImage(doc.data().uname);

    });
}

function WaitCardFinish(id, parent) {

    var elemDiv = document.getElementById(id);

    if (elemDiv == null) {

        //Cleanup
        setTimeout(() => {
            WaitCardFinish(id, parent)
        }, 500);

    } else {
        console.trace(id + " card is now available. Add it to the parent: " + parent.id);
        AddToEventCategory(parent, elemDiv.parentElement);
    }
}

function AddEvent(id, parent) {

    //Get already existing event if it was created before
    var elemDiv = document.getElementById(id);
    let cardMissing = allEventIDs.includes(id) && elemDiv == null;

    if (elemDiv) {
        elemDiv.style.display = "flex";
        console.log("Add Event: Event: " + id + "already exists");

        FinishCardCreation(id, null, document.getElementById(id).parentElement, parent);


    } else if (cardMissing && parent.id != "myEventsParent") {

        console.log("Add Event: Event: " + id + "already exists but card is missing. Just stall it.");

        WaitCardFinish(id, parent);

    } else {
        console.log("Add Event: New event: ", id);

        allEventIDs.push(id);

        elemDiv = document.createElement('div').id;
        elemDiv.id = id;
        eventsCollectionRef.doc(id).get().then((doc) => {
            if (doc.exists) {

                //If the parent is the other events and we own the event just return;
                if (auth.currentUser && doc.data().owner == auth.currentUser.uid && parent.id == "otherEventsParent") {
                    return;
                }

                console.log(doc.id);
                // Template Created
                elemDiv = CreateEventCard(doc.id, doc.data());

                if (elemDiv != "empty")
                    FinishCardCreation(doc.id, doc.data(), elemDiv, parent, false);


            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!" + id);
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
}

// Move card to proper place
function FinishCardCreation(id, data, elemDiv, parent, invite) {

    if (elemDiv == undefined)
        console.trace("Finish Card Creation: empty card");

    if (data == null) {
        console.trace("Finish Card Creation: empty data")
        data = {
            live: elemDiv.classList.contains('live')
        };
    }

    AddToEventCategory(parent, elemDiv, (parent.id == "myEventsParent"), invite);

    if (parent.id == "myEventsParent")
        allMyEvent.push(elemDiv);

}

function AddToEventCategory(parent, element, before, invite) {

    console.log("Add to event category: " + parent.id);

    let oldParent = element.parentElement;

    if (before) {
        parent.prepend(element);
    } else {
        parent.append(element);
    }
    parent.parentElement.style.display = (invite) ? "flex" : "block";
    UpdateJoinButton(parent.id, element);

    // Set old parent element on hidden if no children exist
    if (oldParent != null && oldParent.childElementCount == 0) {
        oldParent.parentElement.style.display = "none";
    }
}

function UpdateJoinButton(parentID, card) {

    let button = card.querySelector('#meetEventButton');
    let live = card.classList.contains("card") ? card.classList.contains('live') : card.querySelector(".card").classList.contains('live');;

    console.log(card);
    //Change to enter text if we are live
    if (!auth.currentUser) {
        button.innerText = loginText;
    } else {

        if (parentID == "favoritedEventsParent") {
            button.innerText = (live) ? enterText : widthdrawText;
        } else if (parentID == "myEventsParent") {
            button.innerText = (live) ? enterText : startText;
        } else if (parentID == "otherEventsParent") {

            let count = parseInt(card.querySelector('#userCountCurrent').innerText);
            CheckIfEventIsFull(count, card, live);

            if (count >= eventFullAmount) {} else {
                button.innerText = (live) ? enterText : joinText;
            }
        } else if (parentID == "detailEventParent") {
            button.innerText = (live) ? enterText : joinText;
        } else {

            button.innerText = joinText;
        }
    }
}

// Happens when a document changes it's state to live
function UpdateEvent(id, data, parent) {

    console.log("Event modified: ", id);
    console.log(parent);

    if (parent == null)
        parent = document.getElementById(id).parentElement.parentElement;

    //If logged in
    if (auth.currentUser) {
        if (data.owner == auth.currentUser.uid && parent.id == "otherEventsParent") {
            console.log("personal gets updated");
            AddEventToUserCollection(id, data, "MyEvents");
            return;
        }
    }

    if (findGetParameter("muid") == id) {
        if (document.getElementById("i_" + id) != null) {

            console.log(document.getElementById("i_" + id));
            UpdateEventFull(data, document.getElementById("i_" + id).parentElement, id, document.getElementById("i_" + id).parentElement.parentElement, true); //parent);

        } else {
            console.log("cant find event " + id);
        }
    }



    if (document.getElementById(id)) //To Check if the user can even see the event due to private
        UpdateEventFull(data, document.getElementById(id).parentElement, id, parent); //parent);

    // UpdateEventFull(data, document.getElementById(id).parentElement, id, document.getElementById(id).parentElement.parentElement); //parent);

}

function RemoveEvent(uid) {

    console.log("Removed event: ", uid);

    CloseDetailPage();

    document.getElementById(uid).parentElement.style.display = "none";

}

function OpenEditEvent(uid) {

    let editPage = document.getElementById('createEvent');

    document.getElementById('createEventUID').setAttribute('uid', uid);


    //If we have everything just grab everything?
    eventsCollectionRef.doc(uid).get().then((doc) => {

        editPage.querySelector("#eventtitle").value = doc.data().title;
        editPage.querySelector("#eventStartDateTime").value = DateTime.fromMillis(doc.data().startDate).toFormat(eventFormat).substring(0, 16);
        editPage.querySelector("#eventEndDateTime").value = DateTime.fromMillis(doc.data().endDate).toFormat(eventFormat).substring(0, 16);

        editPage.querySelector("#eventdescription").value = doc.data().shortdescription;
        editPage.querySelector("#eventprivate").checked = doc.data().private;

        if (doc.data().private) {
            document.getElementById("togglePublic").classList.remove("active");
            document.getElementById("togglePrivate").classList.add("active");
        } else {
            document.getElementById("togglePublic").classList.add("active");
            document.getElementById("togglePrivate").classList.remove("active");
        }


    });

    ToggleCreateEvent();
}

function DeleteEvent(uid) {
    console.log("Try to delete: " + uid);
    eventsCollectionRef.doc(uid).delete().then(() => {
        console.log("Event successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });

    //Remove from self
    usersCollectionRef.doc(auth.currentUser.uid).collection("MyEvents").doc(uid).delete().then(() => {
        console.log("Event successfully deleted at user!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

function UpdateEventLive(data, card) {
    //Update to is Live

    if (data.live) {
        card.classList.remove('personal');
        card.classList.remove('normal');
        card.classList.add('live');
    }

    if (auth.currentUser.uid) //Only do this when the user is part of the registered users
        card.querySelector("#meetEventButton").innerText = (data.live) ? enterText : card.querySelector("#meetEventButton").innerText;
}

function UpdateEventFull(data, card, id, parent, invite) {

    if (waitingForIds[id])
        WaitForEvent(id, data, data.startDate - Date.now());

    card.parentElement.removeChild(card);

    // console.log(parent.id);
    card = CreateEventCard(id, data, invite);

    if (invite) {

        let inviteParent = document.getElementById(id);

        inviteParent = (inviteParent) ? inviteParent.parentElement.parentElement : otherEventsParent;

        UpdateJoinButton(inviteParent.id, card); // Fetch the parent of the active element

        document.querySelector("#detailHostName").innerText = data.ownerUName;
        document.querySelector("#detailEventName").innerText = data.title;

        //Tools
        card.querySelector("#detailShare").style.display = "none";
        if (card.querySelector("#detailEdit")) {
            card.querySelector("#detailEdit").style.display = "none";
        }
        if (card.querySelector("#detailEdit")) {
            card.querySelector("#detailDelete").style.display = "none";
        }
        card.querySelector("#detailClose").style.display = "block";
    } else {
        UpdateJoinButton(parent.id, card);

        if (data.live)
            card.querySelector('.now').classList.add("active");
        else
            card.querySelector('.now').classList.remove("active");
    }

    FinishCardCreation(id, data, card, parent, invite);

}

function ToggleTryDelete(uid, state) {

    var card = document.getElementById(uid).querySelector(".deletion-note");
    card.style.display = (state) ? "block" : "none";

}

function AddEventToUserCollection(id, collection) {

    let data = {
        bump: "bump",
    };
    usersCollectionRef.doc(auth.currentUser.uid).collection(collection).doc(id).set(data, { merge: true });
}

function RemoveEventFromUserCollection(id, collection) {
    usersCollectionRef.doc(auth.currentUser.uid).collection(collection).doc(id).delete().then(() => {
        console.log("Event successfully removed from private List!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

function MeetEvent(div) {

    if (!auth.currentUser) {
        fakeHref(document.location.origin + "/login/");
        return;
    }

    let uid = jQuery(div).data("uid");
    let uidSplit = jQuery(div).data("uid").split('_');

    if (uidSplit.length > 1)
        uid = jQuery(div).data("uid").split('_')[1];

    let card = div.parentElement.parentElement;
    let eventRef = eventsCollectionRef.doc(uid);
    let userRef = eventRef.collection("Participants").doc(auth.currentUser.uid);

    let participantsCount = parseInt(card.querySelector('#userCountCurrent').innerText);

    eventRef.get().then((event) => {

        if (event.data().endDate < DateTime.now()) {
            console.log("Event already ended with.");
            return;
        }

        console.log(participantsCount);

        if (participantsCount >= eventFullAmount) {
            console.log("Event already full with : " + participantsCount + " users");
            console.log("try to unsubscribe");

            userRef.get().then((doc) => {
                //If we are registered
                if (doc.exists) {

                    userRef.delete();

                    if (event.data().private)
                        AddEventToUserCollection(uid, "PrivateJoinedEvents");

                    RemoveEventFromUserCollection(uid, "JoinedEvents");

                }
            });


            return;
        }

        if (event.data().owner == auth.currentUser.uid) {
            //Owner can start
            fakeHref(document.location.origin + "/museum/?muid=" + uid);
            return;
        }
        //If we are live we try to go into the museum
        if (event.data().live) {
            // If the user is already registered we go directly. Otherwise we increase the usercount and then go
            userRef.get().then((doc) => {

                if (!doc.exists) {

                    userRef.set({ foo: 'bar' }, { merge: true });
                    AddEventToUserCollection(uid, "JoinedEvents");
                }

                fakeHref(document.location.origin + "/museum/?muid=" + uid); // Go to the verse anyhow
            });
        } else {
            userRef.get().then((doc) => {
                //If we are registered
                if (doc.exists) {

                    userRef.delete();

                    if (event.data().private)
                        AddEventToUserCollection(uid, "PrivateJoinedEvents");

                    RemoveEventFromUserCollection(uid, "JoinedEvents");

                } else {

                    userRef.set({ foo: 'bar' }, { merge: true });

                    AddEventToUserCollection(uid, "JoinedEvents");

                    if (event.data().private)
                        RemoveEventFromUserCollection(uid, "PrivateJoinedEvents");
                }

                CloseDetailPage();
            });
        }
    });
}

function IsEventNotOld(id, data, cat, oldCat) {
    console.log(data);
    if (data.endDate < endTimeFilter) {
        console.log("Event " + id + " is too old, remove it");
        AddEventToUserCollection(id, oldCat);
        RemoveEventFromUserCollection(id, cat);
        return false;
    } else {
        return true;
    }
}
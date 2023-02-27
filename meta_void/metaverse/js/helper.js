//This file contains helper functions and needs cleanup
// @sam @zaak

// Santize Strings!
function sanitizeString(str) {
    str = str.replace(/<.*?>/gim, "") //Remove Tags

    str = str.replace(/[^a-zA-Z0-9._\-\–\u00c4\u00e4\u00df\u00dc\u00fc\u00f6\u00d6\s]/g, ""); // nonwords and underline stuffies

    str = str.replace(/\r\n?|\n/gim, ""); // Newlines

    str = str.replace(/\s\s+/g, " "); // White space cleanup

    return str.trim();
}

//Get Parameters
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function(item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function UpdateParams(param, value) {
    console.log(param + " gets updated to " + value)
        //Add the muid for easy sharing
    var refresh;
    if (value)
        refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + param + '=' + value;
    else
        refresh = window.location.protocol + "//" + window.location.host + window.location.pathname;

    window.history.pushState({ path: refresh }, '', refresh);
}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}

// Download a file directly
function downloadFile(file, name) {
    fetch(file)
        .then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // the filename you want
            a.download = name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => alert('oh no!'));
}

//Delay Promise
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


// Website Template STUFF
var tim = function() { var f = /{{([a-z0-9_][\\.a-z0-9_]*)}}/gim; return function(g, h, d) { return g.replace(f, function(i, j) { for (var c = j.split("."), e = c.length, b = h, a = 0, k; a < e; a++) { b = b[c[a]]; if (b === k) { if (d !== k) return d; throw "Tim: '" + c[a] + "' not found in " + i; } if (a === e - 1) return b } }) } }();

function createFromTemplate(template, data, parent) {
    var myHTML = tim(template, data);
    var elemDiv = document.createElement('div');
    elemDiv.innerHTML = myHTML;

    parent.append(elemDiv);
}

function RemoveChildByID(_id) {

    let element = document.getElementById(_id);

    if (element != null) {

        element.parentElement.remove(element);
        UpdateFavorit();

    } else {
        console.log("Element to be deleted non-existent");
    }
}

// Website Feedback from Firebase Stuff
function addFeedback(parent, text, positive) {

    let positivClass = "blue"; // Positiv class

    //If empty we clean out the parent
    if (text == "") {
        parent.innerHTML = "";
        return;
    }

    let li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    parent.appendChild(li);

    if (positive)
        parent.classList.add(positivClass)
    else
        parent.classList.remove(positivClass)

}

// HREF
function fakeHref(url) {
    //If in Museum
    if (inRoom) {
        UnfocusRoom();
    }

    console.log("try fake href" + url);
    var loc = url.substring(0, 16);
    var link = document.createElement("a");


    //Replace vimu end target with client
    if (loc == "https://vimu.org") {
        // console.log("replace vimu");
        // console.log(window.location.origin);
        url = url.replace(loc, window.location.origin);

    } else if (loc != window.location.origin.substring(0, 16)) {

        link.target = "_blank";
        link.rel = "noopener noreferrer";
    }
    // console.log(loc + " : " + window.location.origin.substring(0, 16))

    // console.log("new url" + url);

    link.id = 'fakehref'; //give it an ID!
    link.href = url;

    // if (url.substring(0, 10) != window.location.origin) {
    //     link.target = "_blank";
    //     link.rel = "noopener noreferrer";
    // }

    // console.log(link);

    //Add the link somewhere, an appendChild statement will do.
    document.getElementById("fakeajaxcalls").appendChild(link);
    //Then run this
    link.click();

}

// Get a profile picture from a name
function getProfileImage(uname) {

    var name = uname.split(' ')[0];

    return "https://eu.ui-avatars.com/api/?size=180&?background=random&name=" + name;
}


function CopyShareLink() {
    navigator.clipboard.writeText(window.location.href);
}

//Toggle Class On Body
function ToggleClassOnBody(state, className) {
    if (state) {
        document.body.classList.add(className);
    } else {
        document.body.classList.remove(className);
    }
}

function ToggleClassOnDiv(state, div, className) {
    if (state) {
        div.classList.add(className);
    } else {
        div.classList.remove(className);
    }
}

//color Helper
"use strict";
class Color {
    constructor(r, g, b) { this.set(r, g, b); }
    toString() { return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`; }

    set(r, g, b) {
        this.r = this.clamp(r);
        this.g = this.clamp(g);
        this.b = this.clamp(b);
    }

    hueRotate(angle = 0) {
        angle = angle / 180 * Math.PI;
        let sin = Math.sin(angle);
        let cos = Math.cos(angle);

        this.multiply([
            0.213 + cos * 0.787 - sin * 0.213, 0.715 - cos * 0.715 - sin * 0.715, 0.072 - cos * 0.072 + sin * 0.928,
            0.213 - cos * 0.213 + sin * 0.143, 0.715 + cos * 0.285 + sin * 0.140, 0.072 - cos * 0.072 - sin * 0.283,
            0.213 - cos * 0.213 - sin * 0.787, 0.715 - cos * 0.715 + sin * 0.715, 0.072 + cos * 0.928 + sin * 0.072
        ]);
    }

    grayscale(value = 1) {
        this.multiply([
            0.2126 + 0.7874 * (1 - value), 0.7152 - 0.7152 * (1 - value), 0.0722 - 0.0722 * (1 - value),
            0.2126 - 0.2126 * (1 - value), 0.7152 + 0.2848 * (1 - value), 0.0722 - 0.0722 * (1 - value),
            0.2126 - 0.2126 * (1 - value), 0.7152 - 0.7152 * (1 - value), 0.0722 + 0.9278 * (1 - value)
        ]);
    }

    sepia(value = 1) {
        this.multiply([
            0.393 + 0.607 * (1 - value), 0.769 - 0.769 * (1 - value), 0.189 - 0.189 * (1 - value),
            0.349 - 0.349 * (1 - value), 0.686 + 0.314 * (1 - value), 0.168 - 0.168 * (1 - value),
            0.272 - 0.272 * (1 - value), 0.534 - 0.534 * (1 - value), 0.131 + 0.869 * (1 - value)
        ]);
    }

    saturate(value = 1) {
        this.multiply([
            0.213 + 0.787 * value, 0.715 - 0.715 * value, 0.072 - 0.072 * value,
            0.213 - 0.213 * value, 0.715 + 0.285 * value, 0.072 - 0.072 * value,
            0.213 - 0.213 * value, 0.715 - 0.715 * value, 0.072 + 0.928 * value
        ]);
    }

    multiply(matrix) {
        let newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
        let newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
        let newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
        this.r = newR;
        this.g = newG;
        this.b = newB;
    }

    brightness(value = 1) { this.linear(value); }
    contrast(value = 1) { this.linear(value, -(0.5 * value) + 0.5); }

    linear(slope = 1, intercept = 0) {
        this.r = this.clamp(this.r * slope + intercept * 255);
        this.g = this.clamp(this.g * slope + intercept * 255);
        this.b = this.clamp(this.b * slope + intercept * 255);
    }

    invert(value = 1) {
        this.r = this.clamp((value + (this.r / 255) * (1 - 2 * value)) * 255);
        this.g = this.clamp((value + (this.g / 255) * (1 - 2 * value)) * 255);
        this.b = this.clamp((value + (this.b / 255) * (1 - 2 * value)) * 255);
    }

    hsl() { // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
        let r = this.r / 255;
        let g = this.g / 255;
        let b = this.b / 255;
        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return {
            h: h * 100,
            s: s * 100,
            l: l * 100
        };
    }

    clamp(value) {
        if (value > 255) { value = 255; } else if (value < 0) { value = 0; }
        return value;
    }
}

class Solver {
    constructor(target) {
        this.target = target;
        this.targetHSL = target.hsl();
        this.reusedColor = new Color(0, 0, 0); // Object pool
    }

    solve() {
        let result = this.solveNarrow(this.solveWide());
        return {
            values: result.values,
            loss: result.loss,
            filter: this.css(result.values)
        };
    }

    solveWide() {
        const A = 5;
        const c = 15;
        const a = [60, 180, 18000, 600, 1.2, 1.2];

        let best = { loss: Infinity };
        for (let i = 0; best.loss > 25 && i < 3; i++) {
            let initial = [50, 20, 3750, 50, 100, 100];
            let result = this.spsa(A, a, c, initial, 1000);
            if (result.loss < best.loss) { best = result; }
        }
        return best;
    }

    solveNarrow(wide) {
        const A = wide.loss;
        const c = 2;
        const A1 = A + 1;
        const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
        return this.spsa(A, a, c, wide.values, 500);
    }

    spsa(A, a, c, values, iters) {
        const alpha = 1;
        const gamma = 0.16666666666666666;

        let best = null;
        let bestLoss = Infinity;
        let deltas = new Array(6);
        let highArgs = new Array(6);
        let lowArgs = new Array(6);

        for (let k = 0; k < iters; k++) {
            let ck = c / Math.pow(k + 1, gamma);
            for (let i = 0; i < 6; i++) {
                deltas[i] = Math.random() > 0.5 ? 1 : -1;
                highArgs[i] = values[i] + ck * deltas[i];
                lowArgs[i] = values[i] - ck * deltas[i];
            }

            let lossDiff = this.loss(highArgs) - this.loss(lowArgs);
            for (let i = 0; i < 6; i++) {
                let g = lossDiff / (2 * ck) * deltas[i];
                let ak = a[i] / Math.pow(A + k + 1, alpha);
                values[i] = fix(values[i] - ak * g, i);
            }

            let loss = this.loss(values);
            if (loss < bestLoss) {
                best = values.slice(0);
                bestLoss = loss;
            }
        }
        return { values: best, loss: bestLoss };

        function fix(value, idx) {
            let max = 100;
            if (idx === 2 /* saturate */ ) { max = 7500; } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */ ) { max = 200; }

            if (idx === 3 /* hue-rotate */ ) {
                if (value > max) { value = value % max; } else if (value < 0) { value = max + value % max; }
            } else if (value < 0) { value = 0; } else if (value > max) { value = max; }
            return value;
        }
    }

    loss(filters) { // Argument is array of percentages.
        let color = this.reusedColor;
        color.set(0, 0, 0);

        color.invert(filters[0] / 100);
        color.sepia(filters[1] / 100);
        color.saturate(filters[2] / 100);
        color.hueRotate(filters[3] * 3.6);
        color.brightness(filters[4] / 100);
        color.contrast(filters[5] / 100);

        let colorHSL = color.hsl();
        return Math.abs(color.r - this.target.r) +
            Math.abs(color.g - this.target.g) +
            Math.abs(color.b - this.target.b) +
            Math.abs(colorHSL.h - this.targetHSL.h) +
            Math.abs(colorHSL.s - this.targetHSL.s) +
            Math.abs(colorHSL.l - this.targetHSL.l);
    }

    css(filters) {
        function fmt(idx, multiplier = 1) { return Math.round(filters[idx] * multiplier); }
        return `filter: invert(${fmt(0)}%) sepia(${fmt(1)}%) saturate(${fmt(2)}%) hue-rotate(${fmt(3, 3.6)}deg) brightness(${fmt(4)}%) contrast(${fmt(5)}%);`;
    }
}
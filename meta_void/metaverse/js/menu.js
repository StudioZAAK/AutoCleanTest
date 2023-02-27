// When the user scrolls the page, execute myFunction
window.onscroll = function() { stickyMenuToggle() };

// Get the header
var header = document.getElementById("nav.navi");

// Get the offset position of the navbar
var sticky = 165; //header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyMenuToggle() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}
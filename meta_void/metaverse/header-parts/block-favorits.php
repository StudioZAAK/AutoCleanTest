<style>

#favorits_list {
    overflow: hidden;
    overflow-y: scroll;
    height: 408px;
	    margin-top: -7.5px;
}

#Favorits .close {
    z-index: 666;
}

#Favorits h3 {
    z-index: 555;
}

#Favorits>div {
    right: 32px;
    /* top: 31px; */
  
}

body.akk-watchlist #Favorits {
    display: block;
}

body.akk-watchlist #like {
    background-color: var(--headerActiveColor);
}


#favorits_list>div>div {
    display: flex;
}

#favorits_list #favorit_description {
    font-size: 12px;
    line-height: 1.3em;
	  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
.centertop {
	position: absolute;
	  left: 0%;
    top: 50%;
    transform: translate(-0%,-50%);
	padding-left: 10px;
	padding-right: 24px;
}
#favorits_list .left {
    text-align: left;
 
	width: 120px;
}

#favorits_list .text {
    text-align: left;
    font-family: 'D-DIN Regular';

    box-sizing: border-box;
    padding-right: 10px;
    padding-top: 15px;
    padding-left: 10px;
    position: relative;
	width: 300px;
}

.linehoch-fav {
    opacity: 0.1;
    position: absolute;
    top: 15px;
    bottom: 15px;
    right: 10px;
    width: 1px;
    background-color: #fff;
}

#favorits_list .right {
	 flex-direction: row-reverse;

   width: 104px;
	display: flex;
}

#favorits_list .button-game {
    width: 52px;

}

#favorits_list .button-game .button {
    padding: 9px 10px;
    text-align: left;
    font-size: 14px;
    line-height: 1.6;
    position: relative;
}

#favorits_list  .button-game .button.trans {

	width: 52px;
	color: #fff;
		text-align: center;
	font-size: 11px;
	position: relative;
	right: 0;
	top: 50%;
	margin-top: -31px;
}

#favorits_list .button-game .button.trans svg {
    width: 40px !important;
	margin-left:6px;
	background-color: #373341;
    border: 0px;
    color: #fff;
    width: 100%;
	border-radius: 15px;
	text-align: center;
}

#favorits_list .button-game .button.trans:hover svg {

	background-color: #42404d;

}



.quadrat-fav {
    width: 92px;
    height: 92px;
    overflow: hidden;
    margin: 10px;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
}


#favorits_list .button-game .button.grau svg {
    width: 40px;
    margin-right: 0px;
    position: absolute;
    top: 9px;
    left: 9px;
}

#favorits_list .button-game .button.grau {
    padding: 9px 10px 9px 38px;
    text-align: left;
    font-size: 14px;
    line-height: 1.6;
    position: relative;
}

#favorits_list .button-game .button.trans {
    padding: 0px 0px;

}

#favorits_list > div > div .button-game > button .textbo {
	opacity: 0;

}

#favorits_list > div > div .button-game > button:hover .textbo {
	opacity: 1;
}

#favorits_list .delete {
    text-align: left;
    flex-basis: 10%;
    position: relative;
}

</style>
<div id="Favorits">

    <div class="close">
        <svg xmlns="http://www.w3.org/2000/svg" width="16.782" height="16.782" viewBox="0 0 16.782 16.782">
            <g id="Button_close" data-name="Button close" transform="translate(1.591 1.591)">
                <line id="Linie_27" data-name="Linie 27" x2="13.6" y2="13.6" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="2.25" />
                <line id="Linie_28" data-name="Linie 28" y1="13.6" x2="13.6" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="2.25" />
            </g>
        </svg>
    </div>

    <h3 class="din">Watch List</h3>
    <hr>
    <div id="favorits_list">
    </div>
    <div id="favorits_empty" style="display:none;">
        <?php the_field('watchlist_empty', 'options'); ?>
    </div>

</div>
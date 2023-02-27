<script type="text/html" id="favorit_tmpl">
    <div id="{{uid}}">
        <div class="left">
            <div class="quadrat-fav">
                <img id="favorit_img" src="{{image}}">
            </div>
        </div>
        <div class="text">
            <div class="centertop">
                <div id="favorit_name"> {{name}}</div>
                <div id="favorit_description"> {{description}} </div>
            </div>
        </div>
        <div class="right">
            <div class="button-game">
                <button class="button trans" onclick="RemoveFavorit('{{uid}}')">
                    <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;" xml:space="preserve">
                        <style type="text/css">
                            .st0 {
                                fill: #FFFFFF;
                            }
                        </style>
                        <g id="Gruppe_1885" transform="translate(-1758.343 -91.641)">
                            <path class="st0" d="M1784.343,112.766h-12c-0.621,0-1.125-0.504-1.125-1.125s0.504-1.125,1.125-1.125h12
							c0.621,0,1.125,0.504,1.125,1.125S1784.964,112.766,1784.343,112.766z"></path>
                        </g>
                    </svg>
                    <div class="textbo">
                        Remove</div>
                </button>
            </div>

            <div class="button-game" style="display: {{button3D}};">
                <button class="button trans" onclick="downloadURI('{{url3D}}', '{{name3D}}')">
                    <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;" xml:space="preserve">
                        <style type="text/css">
                            .st0 {
                                fill: #FFFFFF;
                            }
                        </style>
                        <g id="Gruppe_1884" transform="translate(-1770.909 -198.375)">
                            <path class="st0" d="M1790.909,225.345c-0.621,0-1.125-0.504-1.125-1.125V211.53c0-0.621,0.504-1.125,1.125-1.125
								s1.125,0.504,1.125,1.125v12.689C1792.034,224.841,1791.53,225.345,1790.909,225.345z"></path>
                            <path class="st0" d="M1790.909,226.345c-0.288,0-0.576-0.109-0.795-0.329l-5-5c-0.439-0.439-0.439-1.152,0-1.592
								s1.151-0.439,1.591,0l5,5c0.439,0.439,0.439,1.152,0,1.592C1791.485,226.235,1791.197,226.345,1790.909,226.345z"></path>
                            <path class="st0" d="M1790.909,226.345c-0.288,0-0.576-0.109-0.795-0.329c-0.439-0.439-0.439-1.152,0-1.592l5-5
								c0.439-0.439,1.151-0.439,1.591,0s0.439,1.152,0,1.592l-5,5C1791.485,226.235,1791.197,226.345,1790.909,226.345z"></path>
                        </g>
                    </svg>
                    <div class="textbo"> 3D-Print </div>
                </button>
            </div>
        </div>
    </div>
</script>
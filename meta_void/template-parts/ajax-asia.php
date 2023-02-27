<?php
$id = $args['id'];
?>
<div class="contentbox asia">
    <div class="back">
                 <button class="grau" onclick="history.back()">Close</button>
    </div>
    <div class="flex">
        <div class="left w50">
            <div id="bg" style="background-image: url(<?php the_field('image', $id); ?>;)"> </div>
        </div>
        <div class="right w50">
            <div class="centercenter">
                <div class=""><?php the_field('content', $id); ?></div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    jQuery(document).ready(function($) {

        jQuery(".back button.asia").click(function() {
            jQuery("body").removeClass("akk-asia");
        });
    });
</script>
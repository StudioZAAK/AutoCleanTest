<?php
$id = $args['id'];
?>
<div class="content exhibitions exhibitions-top">
    <div class="back exhibitions">
        <button class="grau">Back</button>
    </div>
    <h2 class="center font_black">Exhibitions</h2>
    <div class="exhibitions top font_black">
        <h2 class="">Current Exhibitions </h2>
        <div class="flex">
            <?php while (have_rows('exhibitions', $id)) : the_row(); ?>
                <div class="content_50 font_black <?php if (get_sub_field('big_text')) : ?>big_text<?php endif; ?>">
                    <div class="">
                        <div class="imagebox">
                            <?php $img_acf = get_sub_field('image_extop'); ?>
                            <picture>
                                <source srcset="<?php echo  $img_acf['sizes']['exhuber-m'] ?> 2x" media="(min-width: 951px)" />
                                <source srcset="<?php echo  $img_acf['sizes']['exhuber-m'] ?> 1x" media="(min-width: 951px)" />
                                <source srcset="<?php echo  $img_acf['sizes']['exhuber-m'] ?> 2x" media="(min-width: 501px)" />
                                <source srmcset="<?php echo  $img_acf['sizes']['exhuber-m'] ?> 1x" media="(min-width: 501px)" />
                                <source srcset="<?php echo  $img_acf['sizes']['exhuber-m'] ?> 1x" media="(min-width: 1px)" />
                                <img src="<?php echo  $img_acf['sizes']['exhuber-m'] ?>" />
                            </picture>

                            <p class="legende"><?php the_sub_field('legende') ?></p>
                        </div>
                        <?php if (get_sub_field('titel', $id)) : ?><h3 class="h3ex"><?php the_sub_field('titel', $id) ?></h3><?php endif; ?>
                        <p><?php the_sub_field('text') ?></p>
                        <br />
                        <br />
                        <button class="button weiss line" data-id="<?php echo $post->ID; ?>" data-type="exhibitionsdetail">Discover more</button>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>
    </div>

    <div class="exhibitions top  font_black">
        <br /> <br /> <br />
        <br /><br />
        <br />
        <h2 class="">Upcoming Exhibitions</h2>

        <div class="flex">
            <?php while (have_rows('upcoming_exhibitions', $id)) : the_row(); ?>
                <div class="content_50 font_black <?php if (get_sub_field('big_text')) : ?>big_text<?php endif; ?>">
                    <div class="">
                        <div class="imagebox">
                            <?php $img_acf = get_sub_field('image_exunder'); ?>
                            <picture>
                                <source srcset="<?php echo  $img_acf['sizes']['exhuber-m'] ?> 2x" media="(min-width: 951px)" />
                                <source srcset="<?php echo  $img_acf['sizes']['exhuber-m'] ?> 1x" media="(min-width: 951px)" />
                                <source srcset="<?php echo  $img_acf['sizes']['exhuber-m'] ?> 2x" media="(min-width: 501px)" />
                                <source srmcset="<?php echo  $img_acf['sizes']['exhuber-m'] ?> 1x" media="(min-width: 501px)" />
                                <source srcset="<?php echo  $img_acf['sizes']['exhuber-m'] ?> 1x" media="(min-width: 1px)" />
                                <img src="<?php echo  $img_acf['sizes']['exhuber-m'] ?>" />
                            </picture>

                            <p class="legende"><?php the_sub_field('legende') ?></p>
                        </div>
                        <?php if (get_sub_field('titel', $id)) : ?><h3 class="h3ex"><?php the_sub_field('titel', $id) ?></h3><?php endif; ?>
                        <p><?php the_sub_field('text') ?></p>
                        <br />
                        <br />
                        <button class="button weiss line "  data-id="<?php echo $post->ID; ?>" data-type="exhibitionsdetail">Discover more</button>
                    </div>
                </div>
            <?php endwhile; ?>
            <br />
        </div>
        <br /> <br />
        <br /> <br />
        <br /> <br /> <br />
        <br /> <br />
        <br />
    </div>
</div>

<script type="text/javascript">
    jQuery('.slider-product').slick({
        lazyLoad: 'ondemand',
        dots: true,
        infinite: false,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 2000,


        arrows: true
    });
</script>

<!-- <script type="text/javascript">
    jQuery(document).ready(function($) {

        jQuery(".back.exhibitions .grau").click(function() {
            jQuery("body").removeClass("akk-exhibitions");


        });

        $("#exh1detail").click(function() {

            $("body").removeClass("akk-asia");
            $("body").removeClass("akk-partner");
            $("body").removeClass("akk-member");
            $("body").removeClass("akk-tutorial");
            $("body").removeClass("akk-shop");
            $("body").removeClass("akk-faq");
            $("body").removeClass("akk-about");
            $("body").removeClass("akk-menu");
            $("body").removeClass("akk-exhibitions");

            $("body").removeClass("akk-profile");
            $("body").removeClass("akk-debugger");
            $("#profile").removeClass("active");
            $("#tools").removeClass("active");
            $("body").removeClass("akk-debugger");
            $("body").removeClass("akk-afterlogin");
            // $("body").removeClass("screenmuseum");
            jQuery('.shop-detail').removeClass("showproduct").removeClass("opa");

            $("body").addClass("akk-exhibitionsdetails");


        });

        $("#exh2detail").click(function() {

            $("body").removeClass("akk-asia");
            $("body").removeClass("akk-partner");
            $("body").removeClass("akk-member");
            $("body").removeClass("akk-tutorial");
            $("body").removeClass("akk-shop");
            $("body").removeClass("akk-faq");
            $("body").removeClass("akk-about");
            $("body").removeClass("akk-menu");
            $("body").removeClass("akk-exhibitions");

            $("body").removeClass("akk-profile");
            $("body").removeClass("akk-debugger");
            $("#profile").removeClass("active");
            $("#tools").removeClass("active");
            $("body").removeClass("akk-debugger");
            $("body").removeClass("akk-afterlogin");
            // $("body").removeClass("screenmuseum");
            jQuery('.shop-detail').removeClass("showproduct").removeClass("opa");

            $("body").addClass("akk-exhibitionsdetails");


        });

        $("#exh3detail").click(function() {

            $("body").removeClass("akk-asia");
            $("body").removeClass("akk-partner");
            $("body").removeClass("akk-member");
            $("body").removeClass("akk-tutorial");
            $("body").removeClass("akk-shop");
            $("body").removeClass("akk-faq");
            $("body").removeClass("akk-about");
            $("body").removeClass("akk-menu");
            $("body").removeClass("akk-exhibitions");

            $("body").removeClass("akk-profile");
            $("body").removeClass("akk-debugger");
            $("#profile").removeClass("active");
            $("#tools").removeClass("active");
            $("body").removeClass("akk-debugger");
            $("body").removeClass("akk-afterlogin");
            // $("body").removeClass("screenmuseum");
            jQuery('.shop-detail').removeClass("showproduct").removeClass("opa");

            $("body").addClass("akk-exhibitionsdetails");


        });


        $("#exh4detail").click(function() {

            $("body").removeClass("akk-asia");
            $("body").removeClass("akk-partner");
            $("body").removeClass("akk-member");
            $("body").removeClass("akk-tutorial");
            $("body").removeClass("akk-shop");
            $("body").removeClass("akk-faq");
            $("body").removeClass("akk-about");
            $("body").removeClass("akk-menu");
            $("body").removeClass("akk-exhibitions");

            $("body").removeClass("akk-profile");
            $("body").removeClass("akk-debugger");
            $("#profile").removeClass("active");
            $("#tools").removeClass("active");
            $("body").removeClass("akk-debugger");
            $("body").removeClass("akk-afterlogin");
            // $("body").removeClass("screenmuseum");
            jQuery('.shop-detail').removeClass("showproduct").removeClass("opa");

            $("body").addClass("akk-exhibitionsdetails");


        });

        $("#exh5detail").click(function() {

            $("body").removeClass("akk-asia");
            $("body").removeClass("akk-partner");
            $("body").removeClass("akk-member");
            $("body").removeClass("akk-tutorial");
            $("body").removeClass("akk-shop");
            $("body").removeClass("akk-faq");
            $("body").removeClass("akk-about");
            $("body").removeClass("akk-menu");
            $("body").removeClass("akk-exhibitions");

            $("body").removeClass("akk-profile");
            $("body").removeClass("akk-debugger");
            $("#profile").removeClass("active");
            $("#tools").removeClass("active");
            $("body").removeClass("akk-debugger");
            $("body").removeClass("akk-afterlogin");
            // $("body").removeClass("screenmuseum");
            jQuery('.shop-detail').removeClass("showproduct").removeClass("opa");

            $("body").addClass("akk-exhibitionsdetails");
        });

        $("#exh6detail").click(function() {

            $("body").removeClass("akk-asia");
            $("body").removeClass("akk-partner");
            $("body").removeClass("akk-member");
            $("body").removeClass("akk-tutorial");
            $("body").removeClass("akk-shop");
            $("body").removeClass("akk-faq");
            $("body").removeClass("akk-about");
            $("body").removeClass("akk-menu");
            $("body").removeClass("akk-exhibitions");

            $("body").removeClass("akk-profile");
            $("body").removeClass("akk-debugger");
            $("#profile").removeClass("active");
            $("#tools").removeClass("active");
            $("body").removeClass("akk-debugger");
            $("body").removeClass("akk-afterlogin");
            // $("body").removeClass("screenmuseum");
            jQuery('.shop-detail').removeClass("showproduct").removeClass("opa");

            $("body").addClass("akk-exhibitionsdetails");


        });
    });
</script> -->
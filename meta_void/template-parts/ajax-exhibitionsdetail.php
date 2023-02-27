<?php
$id = $args['id'];
?>
<div class="content exhibitions exhibitions-top">

    <div class="back exhibitionsdetails">
        <button class="grau">Back</button>
    </div>

    <div class="exhibitions details top " style="background-color: <?php the_field('color_header', $id) ?>">
        <div class="centercenter">
            <div class="flex ">
                <div class="content_50 text big_text <?php if (get_field('font_black', $id)) : ?>font_black<?php endif; ?>">
                    <div class="">

                        <h4 class="uber"><?php the_field('ubertitel', $id) ?></h4>
                        <h2 class="bodoni"><?php the_field('titel', $id) ?></h2>
                        <p><?php the_field('text', $id) ?></p>
                    </div>
                </div>

                <div class="content_50 <?php if (get_sub_field('font_black', $id)) : ?>font_black<?php endif; ?>">
                    <div class="">
                        <div class="imagebox">
                            <?php $img_acf = get_field('headerimage', $id); ?>
                            <picture>
                                <source srcset="<?php echo  $img_acf['sizes']['exh-m'] ?> 2x" media="(min-width: 951px)" />
                                <source srcset="<?php echo  $img_acf['sizes']['exh-m'] ?> 1x" media="(min-width: 951px)" />
                                <source srcset="<?php echo  $img_acf['sizes']['exh-m'] ?> 2x" media="(min-width: 501px)" />
                                <source srmcset="<?php echo  $img_acf['sizes']['exh-m'] ?> 1x" media="(min-width: 501px)" />
                                <source srcset="<?php echo  $img_acf['sizes']['exh-m'] ?> 1x" media="(min-width: 1px)" />
                                <img src="<?php echo  $img_acf['sizes']['exh-m'] ?>" />
                            </picture>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="exhibitions details content  <?php if (get_field('font_black', $id)) : ?>font_black<?php endif; ?>" style="background-color: <?php the_field('color_content', $id) ?>">
        <div class="inner">

            <?php if (have_rows('slider', $id)) : ?>
                <div class="slider-exh">
                    <?php while (have_rows('slider', $id)) : the_row(); ?>

                        <?php $img_acf = get_sub_field('image'); ?>
                        <picture>
                            <source srcset="<?php echo  $img_acf['sizes']['image-sam'] ?> 2x" media="(min-width: 951px)" />
                            <source srcset="<?php echo  $img_acf['sizes']['image-sam'] ?> 1x" media="(min-width: 951px)" />
                            <source srcset="<?php echo  $img_acf['sizes']['image-sam'] ?> 2x" media="(min-width: 501px)" />
                            <source srcset="<?php echo  $img_acf['sizes']['image-sam'] ?> 1x" media="(min-width: 501px)" />
                            <source srcset="<?php echo  $img_acf['sizes']['image-sam'] ?> 1x" media="(min-width: 1px)" />
                            <img src="<?php echo  $img_acf['sizes']['image-sam'] ?>" />
                        </picture>
                    <?php endwhile; ?>
                </div>
            <?php endif;  ?>


            <div class="content-ex">
                <h4 class="uber"><?php the_field('titel_content', $id) ?></h3>
                    <hp><?php the_field('content', $id) ?></p>

            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    jQuery('.slider-exh').slick({
        lazyLoad: 'ondemand',
        dots: false,
        infinite: false,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,

        arrows: true
    });
</script>


<script type="text/javascript">
    jQuery(document).ready(function($) {

        $(".back.exhibitionsdetails .grau").click(function() {
            $("body").removeClass("akk-exhibitionsdetails");
        });

    });
</script>
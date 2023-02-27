<?php
$id = $args['id'];
?>
<div class="content shop shop-top">
    <div class="shoppage top">
        <div class="left w50">
            <div class="content-shop titlebox">
                <div class="back">
                    <button class="shop button grau">Back</button>
                </div>
                <div class="centercenter"><?php echo get_post_field('post_content', $id); ?></div>
            </div>
        </div>
        <div class="right w50">
            <div class=" shop">
                <div class="flex">

                    <?php
                    $args = array(
                        'post_type' => 'shop',
                        'posts_per_page' => 1000
                    ); ?>

                    <?php $the_query = new WP_Query($args); ?>
                    <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>
                        <div class="produktbox">
                            <div>
                                <?php $img_acf = get_field('teaser_image'); ?>
                                <picture>
                                    <source srcset="<?php echo  $img_acf['sizes']['shopteaser-m'] ?> 2x" media="(min-width: 951px)" />
                                    <source srcset="<?php echo  $img_acf['sizes']['shopteaser-m'] ?> 1x" media="(min-width: 951px)" />
                                    <source srcset="<?php echo  $img_acf['sizes']['shopteaser-m'] ?> 2x" media="(min-width: 501px)" />
                                    <source srcset="<?php echo  $img_acf['sizes']['shopteaser-m'] ?> 1x" media="(min-width: 501px)" />
                                    <source srcset="<?php echo  $img_acf['sizes']['shopteaser-m'] ?> 1x" media="(min-width: 1px)" />
                                    <img src="<?php echo  $img_acf['sizes']['shopteaser-m'] ?>" />
                                </picture>

                                <h3><?php the_field('author');  ?></h3>
                                <h2 class="titel-shop"><?php the_field('title');  ?></h2>
                                <p><?php the_field('description');  ?></p><br /><br />

                                <button class="button weiss ajax" data-id="<?php echo $post->ID; ?>" data-type="shopdetail">more</button>

                                <br /><br /><br />
                            </div>
                        </div>

                    <?php endwhile; ?>
                    <?php wp_reset_query(); ?>
                </div>
            </div>
        </div>
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
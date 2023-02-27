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
            </div>
        </div>
        <div class="right w50">
            <div class=" shop">
                <div class="flex">
                    <div class="content shop shop-detail">

                        <div class="shoppage">
                            <div class="back"><button class="shopdetail button grau">Back</button></div>
                            <div class="centercenter">
                                <div class="left w50">

                                    <div class="content-product">
                                        <h3><?php the_field('author', $id);  ?></h3>
                                        <h2 class="titel-shop"><?php the_field('title', $id);  ?></h2>

                                        <p><?php the_field('description', $id);  ?></p><br />
                                        <hr>
                                        <br />
                                        <?php the_field('content', $id);  ?><br /><br />

                                        <hr>
                                        <br />
                                        <?php if (have_rows('links')) : ?>
                                            <p>This book is available on:</p>
                                            <br />
                                            <div class="linkbox box">
                                                <?php while (have_rows('links')) : the_row(); ?>
                                                    <a target="_blank" class="button weiss" href="<?php the_sub_field('link');  ?>" title="<?php the_field('title');  ?>"><?php the_sub_field('linktext');  ?></a>
                                                <?php endwhile; ?>
                                            </div>
                                        <?php endif;  ?>
                                    </div>
                                </div>

                                <div class="right w50">
                                    <div class="slider-box">

                                        <?php if (have_rows('slider')) : ?>
                                            <div class="slider-exh">
                                                <?php while (have_rows('slider')) : the_row(); ?>

                                                    <?php $img_acf = get_sub_field('image'); ?>
                                                    <picture>
                                                        <source srcset="<?php echo  $img_acf['sizes']['shopslider-m'] ?> 2x" media="(min-width: 951px)" />
                                                        <source srcset="<?php echo  $img_acf['sizes']['shopslider-m'] ?> 1x" media="(min-width: 951px)" />
                                                        <source srcset="<?php echo  $img_acf['sizes']['shopslider-m'] ?> 2x" media="(min-width: 501px)" />
                                                        <source srcset="<?php echo  $img_acf['sizes']['shopslider-m'] ?> 1x" media="(min-width: 501px)" />
                                                        <source srcset="<?php echo  $img_acf['sizes']['shopslider-m'] ?> 1x" media="(min-width: 1px)" />
                                                        <img src="<?php echo  $img_acf['sizes']['shopslider-m'] ?>" />
                                                    </picture>
                                                <?php endwhile; ?>
                                            </div>
                                        <?php endif;  ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
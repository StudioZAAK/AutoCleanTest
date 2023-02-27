<?php
$id = $args['id'];
?>
<div class="contentbox  partner">
    <div class="back">
        <button class="partner">Back</button>
    </div>
    <div class="left w30">
        <div class="content-partner titlebox">
            <div class="">
                <h2><?php the_field('titel', $id); ?></h2>
                <p><?php the_field('content', $id); ?></p>
            </div>
        </div>
    </div>
    <div class="right w70">
        <?php if (have_rows('partner', $id)) : ?>
            <div class="float">
                <?php $count = 1;
                while (have_rows('partner', $id)) : the_row(); ?>
                    <div class="logobox">
                        <?php $img_acf = get_sub_field('image', $id); ?>
                        <picture>

                            <source srcset="<?php echo  $img_acf['sizes']['image-m'] ?> 1x" media="(min-width: 1px)" />
                            <img src="<?php echo  $img_acf['sizes']['image-m'] ?>" />
                        </picture>
                    </div>

                <?php $count++;
                endwhile;  ?>
            </div>
        <?php endif;  ?>
    </div>
</div>

<div class="contentstars">
    <div class="stars"></div>
    <div class="twinkling"></div>
    <div class="sterne-blau"></div>
    <div class="starstitle">
        <?php the_content('titel', $id); ?>
    </div>
</div>

<script type="text/javascript">
    jQuery(document).ready(function($) {
        jQuery(".back button.partner").click(function() {
            jQuery("body").removeClass("akk-partner");
        });
    });
</script>
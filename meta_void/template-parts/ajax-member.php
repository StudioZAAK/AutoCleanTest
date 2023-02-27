<?php
$id = $args['id'];
?>
<div class="contentbox  member">
    <div class="back">
        <button class="member">Back</button>
    </div>
    <div class="member-absolut">
        <h2 class="center din">Become a member</h2>
        <?php if (have_rows('members', $id)) : ?>
            <div class="memberbox center">
                <?php $count = 1;
                while (have_rows('members', $id)) : the_row(); ?>
                    <div class="member">
                        <div class="teaserimage">
                            <div class="titelbox">
                                <h2><?php the_sub_field('titel') ?></h2>
                                <p><?php the_sub_field('preis') ?></p>

                                <?php $img_acf = get_sub_field('image'); ?>
                            </div>
                            <picture>
                                <source srcset="<?php echo  $img_acf['sizes']['member-m'] ?> 2x" media="(min-width: 951px)" />
                                <source srcset="<?php echo  $img_acf['sizes']['member-m'] ?> 1x" media="(min-width: 951px)" />
                                <source srcset="<?php echo  $img_acf['sizes']['member-m'] ?> 2x" media="(min-width: 501px)" />
                                <source srcset="<?php echo  $img_acf['sizes']['member-m'] ?> 1x" media="(min-width: 501px)" />
                                <source srcset="<?php echo  $img_acf['sizes']['member-m'] ?> 1x" media="(min-width: 1px)" />
                                <img src="<?php echo  $img_acf['sizes']['member-m'] ?>" />
                            </picture>
                        </div>
                        <div class="content-text">
                            <p><?php the_sub_field('content') ?></p>
                        </div>
                        <button class="button grau big">View benefits</button>
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
    </div>
</div>
<script type="text/javascript">
    jQuery(document).ready(function($) {
        jQuery(".back button.member").click(function() {
            jQuery("body").removeClass("akk-member");
        });
    });
</script>
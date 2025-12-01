# HarvertHal

HAL block plugin.

Install and activate hal-publication-block.zip plugin.

Add hal-publications block to your page or post. Customize query, add author page link, filter some hadId, customize css, as you need. Query documentation is found on [hal api documentations](https://api.archives-ouvertes.fr/docs/search).

https://github.com/dlyr/HarvestHal/blob/main/demo.mp4

## Html output

Here is a sample output, with the css classes, so one can customize output in editor. See [default css](hal-publications-block/build/style-index.css) for default values.

```{html}

<div class="wp-block-dlyr-hal-publications">

<h2>Year n</h2>
<!-- For each publications in Year n -->
<div class="wp-block-columns is-layout-flex">
    <div class="wp-block-column is-layout-flow thumbnail">
        <figure class="wp-block-image size-full thumbnail">
            <img decoding="async" src="https://thumb.ccsd.cnrs.fr/9535290/" alt="Publication thumbnail" class="thumbnail">
        </figure>
    </div>
    <div class="wp-block-column is-content-justification-left is-layout-constrained publication-column">
        <div class="wp-block-group is-vertical is-content-justification-left is-layout-flex publication-group">
            <p class="title">
                <span class="hal-id">[hal-04738931]</span>
                <a href="https://hal.science/hal-04738931v1">Automatic Inbetweening for Stroke‐Based Painterly Animation</a>
            </p>
            <p class="authors">
                Authors, with homepage link if defined.
            </p>
            <p class="infos">
                How published, with <span class="note">comment</span>.
            </p>
            <p class="links">
                Links to publication pdf, code, youtube, project (as defined is seeAlso).
            </p>
        </div>
    </div>
</div>

<h2>Year n-1</h2>
<!-- same each publications in Year n-1 -->

</div>

```

# HarvertHal

The aim of the plugin is to query hal and display the results on a wordpress page or post.
Customize query, add author page link, filter some hadId, customize css, as you need. Query documentation is found on [hal api documentations](https://api.archives-ouvertes.fr/docs/search).

This plugin provides two version, short code and block. The shortcode version works at least on 6.2.6, the block version is not working on 6.2.6, but works at least on 6.6 (I haven't tested too much).


## HAL block plugin.

Install and activate hal-publication-block.zip plugin.
Add hal-publications block to your page or post.

https://github.com/user-attachments/assets/a620718e-3db8-4e0a-aba9-4b6125585575

## Short code.

Insert short code `[dlyr-hal-publications]`. It can be controlled with the following attributes

- query: the api query e.g. `query='authIdHal_s="vdh"'`
- fields: select fields to display on the pulbication list, default is `fields="source_s,description_s,authorityInstitution_s,bookTitle_s,page_s,title_s,journalTitle_s,conferenceTitle_s,fileMain_s,authFullNameIdHal_fs,uri_s,thumbId_i,comment_s,fileAnnexes_s,seeAlso_s"`, you can use a subset of these field to remove some information, e.g. to have only title `fields="title_s"`. Author name and idHal are extracted from `authFullNameIdHal_fs` any other author fields are silently ignored
- css: custom css to apply to the output e.g. `css=".authors{font-weight: bold;}"`, see html output for customization and default value.
- authorPages: halId=url, separated by commas, e.g. `authorPages="vdh=https://www.dlyr.fr"`. url must contains http:// or https:// to be valid.
- filter: a comma separated list of hal-id to remove from the query, e.g. `filter="hal-04738931,hal-03631518"`

https://github.com/user-attachments/assets/0e2f11bc-981e-4b80-8c24-e3f9f22920d7

## Html output

Here is a sample output, with the css classes, so one can customize output in editor. See [default css](hal-publications-block/src/style.scss) for default values.

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

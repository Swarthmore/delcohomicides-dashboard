# Data API and Entry

This document outlines the data api and entry process for the [Delco Homicides Website](https://delcohomicides.swarthmore.edu)


## Data Entry

Incidents (each homicide) are entered and managed through a WordPress instance. This is made possible due to a [custom post type](https://github.swarthmore.edu/aweed1/incident-post-type) that is installed. 

Please see `assets/acf-export-2023-01-06.json` for a scheme of the custom post type. You can import that file scheme using the [Advanced Custom Fields](https://delcohomicides.swarthmore.edu/wp-admin/plugin-install.php?tab=plugin-information&plugin=advanced-custom-fields&TB_iframe=true&width=600&height=550) WordPress plugin.

TODO: Move `incident-post-type` to another repo.

### How to

1. Log in to the Delco Homicides Website

2. Click on the **Incidents** menu item

3. Click on the **Add New** button

4. Enter your data, then click on the **Publish** button

## Data API

Incidents are provided via a combination of the [WordPress API](https://developer.wordpress.org/rest-api/) and [ACF to REST API](https://wordpress.org/plugins/acf-to-rest-api/) plugin.
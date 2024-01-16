# Website2.0

<img width="1440" alt="image" src="https://github.com/fayhsieh/Website2.0/assets/131230826/be48557a-cca8-4554-a1d4-860d92f4704e">


## SCSS Files
You can find the `Navigation > Codes > style.scss` and write SCSS here, this plugin can compiler SCSS to CSS automation.

![image](https://github.com/fayhsieh/Website2.0/assets/131230826/0e0f8f69-5f18-4f81-989b-f9466dda4da8)


## Plugins

| Name  | Description | Link |
|:---|:---|:---|
| CodeKit - Custom Codes Editor | Your custom SASS, CSS, JS and PHP customizations in same directory. | https://wordpress.org/plugins/custom-codes/ |
| Definitely allow mobile zooming | This tiny plugin adds the viewport meta tag with zooming permission to give your users the ability to zoom in your website with mobile browsers. | https://wordpress.org/plugins/definitely-allow-mobile-zooming/ |
| Duplicate Page | Duplicate Posts, Pages and Custom Posts using single click. | https://wordpress.org/plugins/duplicate-page/ |
| FileBird Lite | Organize thousands of WordPress media files into folders/ categories at ease. | https://wordpress.org/plugins/filebird/ |
| TranslatePress - Multilingual | Experience a better way of translating your WordPress site using a visual front-end translation editor, with full support for WooCommerce and site builders. | https://wordpress.org/plugins/translatepress-multilingual/ |
| WPCode Lite | Easily add code snippets in WordPress. Insert scripts to the header and footer, add PHP code snippets with conditional logic, insert ads pixel, custom content, and more. | https://wordpress.org/plugins/insert-headers-and-footers/ |
| WPForms Lite | Beginner friendly WordPress contact form plugin. Use our Drag & Drop form builder to create your WordPress forms. | https://wordpress.org/plugins/wpforms-lite/ |

# Synctify Public API Documentation

The Synctify Public API allows frontend developers to retrieve a list of supported integrations from our order management system. Currently, the API supports fetching data only, and no functionality for adding, deleting, or modifying data is provided. Authorization is not required to use the API.

Base URL: https://oms.synctify.net/api/public

&nbsp; 

## Usage

| Endpoints | Method | Path |
| -------- | -------- | -------- |
| Get All Datasources | GET | /dataSources |
| Get a Datasource | GET | /dataSources/{dataSourceId} |
| Get all Categories | GET | /dataSources/categories |

&nbsp; 

## Endpoints

### 1. Get All Datasources

#### Request

Method: GET
Endpoint: /dataSources
Headers:
- Accept: application/json
- Content-Type: application/json

#### Response

| Json Field | Description |
|------------|-------------|
| **id** | The unique identifier of the platform. |
| **name** | The name of the platform. |
| **categoryId** | The ID of the category to which the platform belongs. |
| **categoryName** | The name of the category to which the platform belongs. |
| **icon** | The file path of the platform's logo. |
| `Integration Logo - {name}` | A formatted string representing the integration logo with the platform name. |
| **tags.name** | The default name for the tags field. |
| **tags.localized** | Translations for the tags field; displays the default name if set to `false`. |
| **availableToConnect** | Indicates whether the platform should be displayed on the page (`true` or `false`). |


```=json
{
    "status": "success",
    "code": 200,
    "message": "Http ok",
    "data": {
        "contents": [
            {
                "id": 16,
                "name": "Amazon Seller Central",
                "category": {
                    "id": 3,
                    "name": "Marketplace"
                },
                "type": "API",
                "serviceRegions": [
                    "US"
                ],
                "icon": "http://v0.synctify.test/static/images/channels/logo-amazon.png",
                "features": [],
                "availableToConnect": true
            },
            {
                "id": 2,
                "name": "Wayfair",
                "category": {
                    "id": 2,
                    "name": "Wholesaler & Retail"
                },
                "type": "API",
                "serviceRegions": [
                    "US"
                ],
                "icon": "http://v0.synctify.test/static/images/channels/logo-wayfair.png",
                "features": {
                    "authorize_with_oauth2": false,
                    "sync_sales_order": true,
                    "acknowledge_sales_order": true,
                    "download_shipping_label": true,
                    "formatted_packing_slip": true,
                    "sync_advanced_shipment_notice": true,
                    "sync_inventory_advice": true,
                    "sync_invoice": false,
                    "download_product": true,
                    "multi_warehouses_supported": true,
                    "has_net_term_allowance": false,
                    "use_third_party_shipping_accounts": true
                },
                "availableToConnect": true
            }
        ]
    },
    "error": {}
}
```

&nbsp; 
---
&nbsp; 

### 2. Get a Datasource

#### Request

Endpoint: /dataSources/{dataSourceId}
Headers:
- Accept: application/json
- Content-Type: application/json

#### Response
```=json
{
    "status": "success",
    "code": 200,
    "message": "Http ok",
    "data": {
        "id": 2,
        "name": "Wayfair",
        "category": {
            "id": 2,
            "name": "Wholesaler & Retail"
        },
        "type": "API",
        "serviceRegions": [
            "US"
        ],
        "icon": "http://v0.synctify.test/static/images/channels/logo-wayfair.png",
        "features": {
            "authorize_with_oauth2": false,
            "sync_sales_order": true,
            "acknowledge_sales_order": true,
            "download_shipping_label": true,
            "formatted_packing_slip": true,
            "sync_advanced_shipment_notice": true,
            "sync_inventory_advice": true,
            "sync_invoice": false,
            "download_product": true,
            "multi_warehouses_supported": true,
            "has_net_term_allowance": false,
            "use_third_party_shipping_accounts": true
        },
        "availableToConnect": true
    },
    "error": {}
}
```
&nbsp; 
---
&nbsp; 

### 3. Get all Categories

#### Request

Endpoint: /dataSources/categories
Headers:
- Accept: application/json
- Content-Type: application/json

#### Response

| Json Field | Description |
|------------|-------------|
| **id** | The unique identifier of the category. |
| **name** | The name of the category. |
| **icon** | The icon associated with the category, accessible using `<i class="{icon}"></i>`. |


```=json
{
    "status": "success",
    "code": 200,
    "message": "Http ok",
    "data": {
        "contents": [
            {
                "id": 2,
                "name": "Wholesaler & Retail",
                "icons": {
                    "feather": "feather icon-home",
                    "tabler": "ti ti-building-store"
                }
            },
            {
                "id": 3,
                "name": "Marketplace",
                "icons": {
                    "feather": "feather icon-shopping-bag",
                    "tabler": "ti ti-basket"
                }
            },
            {
                "id": 4,
                "name": "Shopping Cart",
                "icons": {
                    "feather": "feather icon-shopping-cart",
                    "tabler": "ti ti-shopping-cart"
                }
            },
            {
                "id": 5,
                "name": "3PL & WMS & ERP",
                "icons": {
                    "feather": "feather icon-box",
                    "tabler": "ti ti-building-warehouse"
                }
            },
            {
                "id": 6,
                "name": "Financial Solutions",
                "icons": {
                    "feather": "feather icon-dollar-sign",
                    "tabler": "ti ti-file-dollar"
                }
            },
            {
                "id": 1,
                "name": "Others",
                "icons": {
                    "feather": "feather icon-plus-circle",
                    "tabler": "ti ti-circle-plus"
                }
            }
        ]
    },
    "error": {}
}
```

&nbsp; 
---
&nbsp; 

## Language Parameter

To specify the desired language for the response, include the following headers:

```=javascript
fetch('API-ENDPOINT', {
    method: 'GET',
    headers: {
        'Accept-Language': 'en_US',
        'Accept-Charset': 'utf-8'
    },
})
```

`Accept-Language`: Default is en_US; other options: zh_CN, zh_TW
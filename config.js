module.exports = {
    "metadata": {
        "name": "BooGi",
        "short_name": "BooGi",
        "description": "BooGi - awesome GitBook-like documentation generator using Gatsby",
        "language": "en",
        "url": "http://localhost",
        "pathPrefix": "/",
        "gaTrackingId": null,
        "siteImage": null,
        "favicon": "/assets/favicon.png",
        "themeColor": "#ff0000"
    },
    "header": {
        "logo": "/assets/code.svg",
        "logoLink": "/",
        "helpUrl": "",
        "links": [
            {
                "text": "BooGi",
                "link": "https://github.com/filipowm/boogi",
                "external": true
            },
            {
                "text": "Gatsby",
                "link": "https://www.gatsbyjs.org",
                "external": true
            },
            {
                "text": "Docs",
                "link": "/",
                "external": false
            }
        ],
        "enabled": true
    },
    "sidebar": {
        "enabled": true,
        "ignoreIndex": false,
        "forcedNavOrder": [],
        "expanded": [],
        "groups": [
            {
                "order": 1,
                "path": "/gettingstarted",
                "title": ":rocket: Getting Started"
            },
            {
                "order": 2,
                "path": "/configuration",
                "title": ":wrench: Configuration"
            },
            {
                "order": 3,
                "path": "/editing",
                "title": ":writing_hand: Editing Content"
            },
            {
                "order": 4,
                "path": "/deployment",
                "title": ":rocket: Deployment"
            },
            {
                "order": 5,
                "path": "/developing",
                "title": ":computer: Developing"
            }
        ],
        "links": [
            {
                "text": "BooGi",
                "link": "https://github.com/filipowm/boogi"
            },
            {
                "text": "React",
                "link": "https://reactjs.org"
            }
        ],
        "poweredBy": {
            "trademark": "/assets/gatsby.png",
            "name": "GatsbyJS",
            "link": "https://www.gatsbyjs.org"
        }
    },
    "pwa": {
        "manifest": {
            "name": "BooGi",
            "short_name": "BooGi",
            "start_url": "/",
            "background_color": "#6b37bf",
            "theme_color": "#6b37bf",
            "display": "standalone",
            "crossOrigin": "anonymous",
            "icon": "static/assets/favicon.png",
            "description": "BooGi - awesome GitBook-like documentation generator using Gatsby",
            "cache_busting_mode": "none",
            "include_favicon": false,
            "lang": "en"
        },
        "enabled": true
    },
    "social": {
        "facebook": "",
        "github": "https://github.com/filipowm/boogi",
        "gitlab": "",
        "instagram": "",
        "linkedin": "https://www.linkedin.com/in/mateusz-filipowicz-437b4768/",
        "mail": "",
        "gmail": "",
        "slack": "",
        "twich": "",
        "twitter": "twitter url",
        "youtube": ""
    },
    "features": {
        "editOnRepo": {
            "editable": true,
            "location": "https://github.com/filipowm/boogi",
            "type": "github"
        },
        "search": {
            "enabled": true,
            "indexName": "docs",
            "algoliaAppId": null,
            "algoliaSearchKey": null,
            "algoliaAdminKey": null,
            "excerptSize": 8000,
            "engine": "algolia",
            "placeholder": "Search",
            "startComponent": "input",
            "debounceTime": 380,
            "snippetLength": 23,
            "hitsPerPage": 10,
            "showStats": true,
            "localSearchEngine": {
                "encode": "advanced",
                "tokenize": "full",
                "threshold": 2,
                "resolution": 30,
                "depth": 20
            },
            "pagination": {
                "enabled": true,
                "totalPages": 10,
                "showNext": true,
                "showPrevious": true
            }
        },
        "toc": {
            "show": true,
            "depth": 4
        },
        "previousNext": {
            "enabled": true,
            "arrowKeyNavigation": true
        },
        "scrollTop": true,
        "showMetadata": true,
        "propagateNetlifyEnv": true,
        "pageProgress": {
            "enabled": true,
            "excludePaths": [
                "/"
            ],
            "height": 3,
            "prependToBody": false,
            "color": "#A05EB5",
            "includePaths": [
                "/configuration/settingup/features"
            ]
        },
        "mermaid": {
            "language": "mermaid",
            "theme": "dark",
            "options": {},
            "width": 400,
            "height": 300
        },
        "rss": {
            "enabled": true,
            "showIcon": false,
            "title": "BooGi Docs",
            "copyright": "2020, Mateusz Filipowicz",
            "webMaster": "Mateusz Filipowicz",
            "managingEditor": "Mateusz Filipowicz",
            "categories": [
                "Docs as Code",
                "GatsbyJS"
            ],
            "ttl": 60,
            "matchRegex": "^/",
            "outputPath": "/rss.xml",
            "generator": "boogi"
        },
        "darkMode": {
            "enabled": true,
            "default": false
        },
        "publishDraft": false,
        "fullScreenMode": {
            "enabled": true,
            "hideHeader": true,
            "hideToc": true,
            "hideSidebar": true
        }
    }
};
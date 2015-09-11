#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

# Note: this setting is feed-unfriendly
SITEURL = ''

###################################
#v v v COMMON TO BOTH CONFIG FILES

AUTHOR = u'Ambitious City'
SITENAME = u'Ambitious City'

TIMEZONE = 'America/Toronto'
DEFAULT_LANG = u'en'
#GITHUB_URL = 'http://github.com/MichaelCumming/'
PDF_GENERATOR = False
PATH = 'content'

#speed things up?
CACHE_CONTENT = True
LOAD_CONTENT_CACHE = True

# custom page generated with a jinja2 template
#TEMPLATE_PAGES = {'pages/jinja2_template.html': 'jinja2_template.html'}
#TAGS_SAVE_AS = ''
#TAG_SAVE_AS = ''

#dynamic content = 'articles'
ARTICLE_PATHS = ['articles']   #questions', 'articles/ideas', 'articles/sources'
USE_FOLDER_AS_CATEGORY = False 
DISPLAY_CATEGORIES_ON_MENU = False
DISPLAY_CATEGORY_IN_BREADCRUMBS = True # only works for articles (dynamic content)
DISPLAY_BREADCRUMBS = False
DISPLAY_ARTICLE_INFO_ON_INDEX = False
SHOW_DATE_MODIFIED = True
SHOW_ARTICLE_AUTHOR = True
SHOW_ARTICLE_CATEGORY = False

HIDE_SITENAME = True
FAVICON = 'images/favicon.png'
# SITELOGO = 'images/2013-11-26.VUE-trans.png'
SITELOGO = 'images/2013-11-26.png'
SITELOGO_SIZE = 205

#static content = 'pages'
STATIC_PATHS = ['pages', 'pdfs', 'images', 'article-graphs', 'code'] # 'downloads']
FAVICON = 'images/favicon.ico'
DISPLAY_PAGES_ON_MENU = False
HIDE_SIDEBAR = True

MENUITEMS = [
	('Urban Design Questions', '/category/question/'),
    # ('Observations', '/category/observation/'),
	# ('Ideas', '/tag/idea.html'),
	('About', '/pages/about/'),
    ('Subscribe', 'http://eepurl.com/xYI8j')
]

# if you only want to generate the page you are working on (speeds things up)
# WRITE_SELECTED = ['output/blog/2015/01/01/path-to-blog-post/index.html',
#                   'output/blog/pages/stuff/index.html',
#                  ]
    
ARTICLE_URL = 'articles/{category}/{slug}/'
ARTICLE_SAVE_AS = 'articles/{category}/{slug}/index.html'

PAGE_URL = 'pages/{slug}/'
PAGE_SAVE_AS = 'pages/{slug}/index.html'

CATEGORY_URL = "category/{slug}"
CATEGORY_SAVE_AS = "category/{slug}/index.html"

DEFAULT_DATE = 'fs'
TYPOGRIFY = True
THEME = 'themes/bootstrap' 
BOOTSTRAP_THEME = 'yeti' #others available 'cosmo' etc. all included already. See http://bootswatch.com/
# CUSTOM_CSS = 'theme/css/custom.css' #the location where you tell Pelican to put the file
CUSTOM_CSS = 'theme/css/custom.css' #the location where you tell Pelican to put the file in output

# # Tell Pelican to change the path to 'theme/css/custom.css' in the output dir
EXTRA_PATH_METADATA = {
    '/themes/bootstrap/static/css/custom.css': {'path': 'theme/css/custom.css'}
}
PLUGIN_PATHS = ["plugins", "/plugins"]
PLUGINS = [ "sitemap", "plantuml" ]

SITEMAP = {
    'format': 'xml',
    'priorities': {
        'articles': 0.5,
        'indexes': 0.5,
        'pages': 0.5
    },
    'changefreqs': {
        'articles': 'monthly',
        'indexes': 'daily',
        'pages': 'monthly'
    }
}

# Social widget
SOCIAL = (
# ('Ambitious City Google+ Images', '#'),
# ('SoundCloud Ambitious City', 'https://soundcloud.com/ambitiouscity'),
)

# Blogroll
LINKS = (
# ('OCADU University', 'http://www.ocadu.ca/'),
# ('DFI @ OCADU', 'http://www.ocadu.ca/academics/faculty-of-las-and-sis/digital-futures-initiative.htm'),
# ('Rhizome', 'http://rhizome.org/'),
)

#^ ^ ^ COMMON TO BOTH CONFIG FILES
###################################

###################################
#v v v FOR LOCAL TESTING

# SITEURL = ''
# GOOGLE_ANALYTICS = 'UA-44332815-1'

# Feed generation is usually not desired when developing
# FEED_DOMAIN = 'http://ambitiouscity.github.io' #this works
# FEED_ALL_ATOM = 'feeds/all.atom.xml' #this works
# FEED_DOMAIN = ''
FEED_ALL_ATOM = None
FEED_ALL_RSS = None #doesn't validate correctly like the Atom one
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None #don't use RSS, use Atom
# LOAD_CONTENT_CACHE = False # avoids caching of content

# DEFAULT_PAGINATION = False
# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = False

#^ ^ ^ FOR PUBLISHING
###################################



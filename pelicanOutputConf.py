#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

# This file used with `make publish` only, 
# or when explicitly specified in your config file.

import os
import sys
sys.path.append(os.curdir)
from pelicanconf import *


SITEURL = 'https://ambitiouscity.github.io' 
FEED_DOMAIN = 'https://ambitiouscity.github.io'
#valid feed: http://ambitiouscity.github.io/feeds/all.atom.xml
#this works too: http://ambitiouscity.com/feeds/all.atom.xml

GOOGLE_ANALYTICS = 'UA-44332815-1'
DISQUS_SITENAME = "ambitiouscity"
# DISQUS_DISPLAY_COUNTS = True

###################################
#v v v PUT COMMON STUFF HERE

AUTHOR = u'Ambitious City'
SITENAME = u'Ambitious City'

TIMEZONE = 'America/Toronto'
DEFAULT_LANG = u'en'
#GITHUB_URL = 'http://github.com/MichaelCumming/'
PDF_GENERATOR = False
PATH = 'content'
CACHE_CONTENT = False
LOAD_CONTENT_CACHE = False

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
    # ('Subscribe', 'http://eepurl.com/xYI8j')
    ('Subscribe', 'pages/subscribe/')
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

#^ ^ ^ PUT COMMON STUFF HERE
###################################

###################################
#v v v FOR PUBLISHING (feed-friendly)

DELETE_OUTPUT_DIRECTORY = True #deletes folder before generating all new files - use with caution
RELATIVE_URLS = False

FEED_ALL_ATOM = 'feeds/all.atom.xml'
CATEGORY_FEED_ATOM = 'feeds/%s.atom.xml'
TRANSLATION_FEED_ATOM = 'feeds/all-%s.atom.xml'
AUTHOR_FEED_ATOM = 'feeds/%s.atom.xml'

FEED_ALL_RSS = None #doesn't validate correctly like the Atom one
CATEGORY_FEED_RSS = None
TRANSLATION_FEED_RSS = None
AUTHOR_FEED_RSS = None

#^ ^ ^ FOR PUBLISHING
###################################

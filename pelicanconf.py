#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Ambitious City'
SITENAME = u'Ambitious City'
SITEURL = ''
TIMEZONE = 'America/Toronto'
DEFAULT_LANG = u'en'
#GITHUB_URL = 'http://github.com/ametaireau/'
PDF_GENERATOR = False
#for development
LOAD_CONTENT_CACHE = False
# custom page generated with a jinja2 template
#TEMPLATE_PAGES = {'pages/jinja2_template.html': 'jinja2_template.html'}
#TAGS_SAVE_AS = ''
#TAG_SAVE_AS = ''

PATH = 'content'

#dynamic content = 'articles'
ARTICLE_PATHS = ['articles']   #questions', 'articles/ideas', 'articles/sources'
USE_FOLDER_AS_CATEGORY = True
DISPLAY_CATEGORIES_ON_MENU = True #set these manually in the content
DISPLAY_CATEGORY_IN_BREADCRUMBS = True # only works for articles (dynamic content)
DISPLAY_ARTICLE_INFO_ON_INDEX = False
SHOW_DATE_MODIFIED = True
SHOW_ARTICLE_AUTHOR = True
SHOW_ARTICLE_CATEGORY = True
DISPLAY_BREADCRUMBS = True

#FAVICON = 'images/favicon.png'
#SITELOGO = 'images/my_site_logo.png'

#static content = 'pages'
STATIC_PATHS = ['pages', 'pdfs', 'images'] # 'downloads']
FAVICON = 'images/favicon.ico'
DISPLAY_PAGES_ON_MENU = False
HIDE_SIDEBAR = True

MENUITEMS = [
# ('Question', '/articles/questions'),
# ('Ideas', '/articles/ideas'),
# ('Sources', '/articles/sources')
]
    
# ARTICLE_SAVE_AS = 'articles/{date:%Y}/{slug}.html'
# ARTICLE_URL = 'articles/{date:%Y}/{slug}.html'
ARTICLE_SAVE_AS = 'articles/{category}/{slug}.html'
ARTICLE_URL = 'articles/{category}/{slug}.html'
DEFAULT_DATE = 'fs'
TYPOGRIFY = True
THEME = 'themes/bootstrap' 
BOOTSTRAP_THEME = 'yeti' #others available 'cosmo' etc. all included already. See http://bootswatch.com/
CUSTOM_CSS = 'theme/css/custom.css' #the location where you tell Pelican to put the file

# Tell Pelican to change the path to 'theme/css/custom.css' in the output dir
EXTRA_PATH_METADATA = {
    'extra/custom.css': {'path': 'theme/css/custom.css'}
}

# DEFAULT_PAGINATION = False
# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = False

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None
LOAD_CONTENT_CACHE = False # avoids caching of content

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

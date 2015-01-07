PY?=python
PELICAN?=pelican
PELICANOPTS=

BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/content
OUTPUTDIR=$(BASEDIR)/output
CONFFILE=$(BASEDIR)/pelicanconf.py
PUBLISHCONF=$(BASEDIR)/publishconf.py
GITHUB_PAGES_BRANCH=gh-pages
PORT=8001

DEBUG ?= 0
ifeq ($(DEBUG), 1)
	PELICANOPTS += -D
endif

help:
	@echo 'Makefile for a pelican Web site                                        '
	@echo '                                                                       '
	@echo 'Usage:                                                                 '
	@echo '   make html                        (re)generate the web site          '
	@echo '   make clean                       remove the generated files         '
	@echo '   make regenerate                  regenerate files upon modification '
	@echo '   make publish                     generate using production settings '
	@echo '   make serve [PORT=8000]           serve site at http://localhost:8000'
	@echo '   make devserver [PORT=8000]       start/restart develop_server.sh    '
	@echo '   make stopserver                  stop local server                  '
	@echo '   make github                      upload the web site via gh-pages   '
	@echo '                                                                       '
	@echo 'Set the DEBUG variable to 1 to enable debugging, e.g. make DEBUG=1 html'
	@echo '                                                                       '

html:
	$(PELICAN) $(INPUTDIR) -o $(OUTPUTDIR) -s $(CONFFILE) $(PELICANOPTS)

clean:
	[ ! -d $(OUTPUTDIR) ] || rm -rf $(OUTPUTDIR)

regenerate:
	$(PELICAN) -r $(INPUTDIR) -o $(OUTPUTDIR) -s $(CONFFILE) $(PELICANOPTS)

serve:
ifdef PORT
	cd $(OUTPUTDIR) && $(PY) -m pelican.server $(PORT)
else
	cd $(OUTPUTDIR) && $(PY) -m pelican.server
endif

devserver:
ifdef PORT
	$(BASEDIR)/develop_server.sh restart $(PORT)
else
	$(BASEDIR)/develop_server.sh restart
endif

stopserver:
	kill -9 `cat pelican.pid`
	kill -9 `cat srv.pid`
	@echo 'Stopped Pelican and SimpleHTTPServer processes running in background.'

Xpublish:
	$(PELICAN) $(INPUTDIR) -o $(OUTPUTDIR) -s $(PUBLISHCONF) $(PELICANOPTS)

push-github: 
	#for information purposes
	git push origin master:master
	git push html gh-pages:master

gh-pages:
	#moves content of the output directory to the 'gh-pages' branch
	ghp-import -m "Published html output to gh-pages branch" -b gh-pages output

pullSource:
	#pulls the website source from GitHub
	git pull origin master:master

pushSource:
	#pushes the website source to GitHub
	git push origin master:master

pushHtml:
	#assumes that 'output' directory has the latest html files and that you've checked locally that the html is OK.
	#publish
	#ghp-import copies the output directory to the 'gh-pages' branch of the repository
	#ghp-import -m "Published html output to gh-pages branch" -b gh-pages output
	
	#assumes there is a GitHub remote called 'publish'
	#git push <remote-name> <local-branch-name>:<remote-branch-name> as per GitHub user page specs.
	#UNCOMMENT THIS after testing:
	git push -f html gh-pages:master
	#other samples:
	#git push git@github.com:elemoine/elemoine.github.io.git gh-pages:master
	#git push origin $(GITHUB_PAGES_BRANCH) #this is suitable when the remote branch=gh-pages (GitHub non-user pages)

.PHONY: html help clean regenerate serve devserver publish ssh_upload rsync_upload dropbox_upload ftp_upload s3_upload cf_upload github

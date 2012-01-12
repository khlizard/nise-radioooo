#!/usr/bin/env python
# -*- coding:utf-8 -*-

from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.api import memcache
from django.utils import simplejson as json
import sys, os, re

sys.path.append('lib/')
import shorturl_config as config
import bitly

class MainHandler(webapp.RequestHandler):
  
  def get(self):
    baseuri = 'http://radioooclone.vanu.jp/'
    use_method = '-'
    chre = re.compile('[\w\-]{4,}', re.IGNORECASE)
    mt = chre.match(self.request.query_string)
    suri = None
    
    if mt:
      luri = baseuri + '?' + mt.group(0)
    else:
      luri = baseuri
    
    # preset
    if luri == 'http://radioooclone.vanu.jp/?radioooo-kichi':
      suri = 'http://j.mp/blsJRR'
      use_method = 'p'
    elif luri == 'http://radioooclone.vanu.jp/?radioyoutube':
      suri = 'http://j.mp/bLRgbI'
      use_method = 'p'
    elif luri == 'http://radioooclone.vanu.jp/':
      suri = 'http://j.mp/bLRgbI'  #'http://j.mp/aDQtKc'
      use_method = 'p'
    
    # memcache
    if suri is None:
      try:
        suri = memcache.get(luri)
        use_method = 'm'
      except KeyError:
        suri = None
    
    # bit.ly
    if suri is None:
      api = bitly.Api()
      api.set_account(config.bitly_name, config.bitly_key)
      suri = api.shorten(luri)
      memcache.set(luri, suri, 86400) # save
      use_method = 'a'
    
    msg = json.dumps({'short':suri, 'long':luri, 'method': use_method})
    
    self.response.headers.add_header('Content-Type', "text/javascript")
    self.response.out.write(msg)


def main():
  application = webapp.WSGIApplication([('.*', MainHandler)], debug=True)
  util.run_wsgi_app(application)


if __name__ == '__main__':
  main()

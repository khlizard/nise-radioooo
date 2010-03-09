#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

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
    chre = re.compile('[\w\-]{4,}', re.IGNORECASE)
    
    mt = chre.match(self.request.query_string)
    
    if mt:
      luri = baseuri + '?' + mt.group(0)
    else:
      luri = baseuri
    
    # memcache
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
  application = webapp.WSGIApplication([('.*', MainHandler)],
                                       debug=True)
  util.run_wsgi_app(application)


if __name__ == '__main__':
  main()

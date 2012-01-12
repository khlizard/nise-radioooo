#!/usr/bin/env python
# -*- coding:utf-8 -*-
import sys, os, re, logging, urllib, urllib2
from django.utils import simplejson as json

class BitlyError(Exception):
    """Base class for Bitly errors
    """
    pass

class BitlyRequestError(BitlyError):
    """Bitly API request error class
    """
    def __init__(self, code, msg):
        self.code = code
        self.msg = msg
    def __str__(self):
        return "Bit.ly API request error: %s (code: %s)" \
               % (self.msg, self.code)
    
class BitlyResponseError(BitlyError):
    """Bitly API response error class
    """
    def __init__(self, code, msg):
        self.code = code
        self.msg = msg
    def __str__(self):
        return "Bit.ly API response error: %s (code: %s)" \
               % (self.msg, self.code)

class Api(object):
    def __init__(self):
        self.base_url = 'http://api.j.mp'
        self.login = None
        self.apikey = None

    @property
    def base_query_dict(self):
        return {
            'login': self.login,
            'apiKey': self.apikey,
            'version': '2.0.1',
            'format': 'json',
            'history': 1,
            }

    def mk_query(self, **kwd):
        """クエリ文字列を生成
        """
        query_dict = self.base_query_dict
        query_dict.update(kwd)
        return urllib.urlencode(query_dict)

    def set_account(self, login, apikey):
        """API 実行アカウントを設定
        """
        self.login = login
        self.apikey = apikey

    def shorten(self, longUrl):
        """Given a long url, returns a shorter one.
        """
        command_name = 'shorten'
        
        query = self.mk_query(longUrl=longUrl)
        url = "%s/%s?%s" % (self.base_url, command_name, query)
        logging.debug("[%s] url: %s", command_name, url)

        data = self._get_data(command_name, url)
        logging.debug("[%s] data: %s", command_name, data)
        
        return data['results'][longUrl]['shortUrl']

    def expand(self, shortUrl):
        """Given a bit.ly url, return long source url. 
        """
        command_name = 'expand'
        
        query = self.mk_query(shortUrl=shortUrl)
        url = "%s/%s?%s" % (self.base_url, command_name, query)
        logging.debug("[%s] url: %s", command_name, url)

        data = self._get_data(command_name, url)
        logging.debug("[%s] data: %s", command_name, data)
        
        shortened = shortUrl.split('/')[-1]
        return data['results'][shortened]['longUrl']

    def _get_data(self, command_name, url):
        """指定APIを実行して結果を返す
        """
        data = {}
        f = urllib2.urlopen(url)
        #f = urlfetch.fetch(url)
        try:
            if not (200 <= f.code < 300):
                e = BitlyRequestError(f.code, f.msg)
                logging.error("[%s] BitlyRequestError: %s", command_name, e)
                raise e
            data = json.load(f)
        finally:
            f.close()
        self._check_api_success(command_name, data)
        return data

    def _check_api_success(self, command_name, data):
        """API 処理が失敗したら例外を発生させる
        """
        if data.get('statusCode', '') == 'OK':
            return
        code = data.get('errorCode', 0)
        msg = data.get('errorMessage', '')
        e = BitlyResponseError(code, msg)
        logging.error("[%s] BitlyResponseError: %s", command_name, e)
        raise e


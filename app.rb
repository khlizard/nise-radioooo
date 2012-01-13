# encoding: UTF-8

require 'rubygems'
require 'sinatra'

before do
  @host = env['HTTP_X_REAL_IP'] || env['REMOTE_ADDR']
end

get '/' do
  content_type 'text/html', :charset => 'utf-8'
  cache_control :public, :max_age => 3600
  File.read 'public/index.html'
end

get '/counter/:hashtag' do
  'そのうちカウンターとか'
end

#get '/shorturl/:videoid' do
#  '今はt.coあるしいらんよね'
#end

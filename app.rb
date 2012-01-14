# encoding: UTF-8

require 'rubygems'
require 'sinatra'

before do
  # enginxだったかVarnishだったかの仕様
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

get '/env' do
  content_type 'text/plain', :charset => 'utf-8'
  ENV.each.sort.map{|k,v| [k,v.inspect]*" => "} * "\n\n"
end

get '/version' do
  content_type 'text/plain', :charset => 'utf-8'
  File.read 'version'
end

#get '/shorturl/:videoid' do
#  '今はt.coあるしいらんよね'
#end

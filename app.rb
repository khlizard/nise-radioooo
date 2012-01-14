# encoding: UTF-8

require 'rubygems'
require 'sinatra'

before do
  # heroku or fluxflex
  @host    = env['HTTP_X_REAL_IP'] || env['REMOTE_ADDR']
  @version = File.read('version').strip.split(/[\-\.]/).map{|i|i[0,3]}*'.'
end



get '/' do
  content_type 'text/html', :charset => 'utf-8'
  cache_control :public, :max_age => 3600
  File.read('public/index.html').gsub('$Version$', @version)
end

get '/counter/:hashtag' do
  'not yet'
end



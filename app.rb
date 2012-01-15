# encoding: UTF-8

require 'rubygems'
require 'sinatra'

before do
  # heroku or fluxflex
  @host    = env['HTTP_X_REAL_IP'] || env['REMOTE_ADDR']
  @version = ENV['GIT_VERSION'] || `git describe --long --tags`
end



get '/' do
  content_type 'text/html', :charset => 'utf-8'
  cache_control :public, :max_age => 3600
  v = ENV['GIT_VERSION'] || `git describe --long --tags`
  
  File.read('public/index.html').gsub('$Version$', v)
end

get '/counter/:hashtag' do
  'not yet'
end



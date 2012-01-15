# encoding: UTF-8

require 'rubygems'
require 'sinatra'

helpers do
  def version
    (ENV['GIT_VERSION'] || `git describe --long --tags`).strip
  end
end



before do
  content_type 'text/plain', :charset => 'utf-8'
  @host    = env['HTTP_X_REAL_IP'] || env['REMOTE_ADDR'] # heroku or fluxflex
end

get '/' do
  content_type 'text/html', :charset => 'utf-8'
  cache_control :public, :max_age => 3600
  File.read('public/index.html').gsub('$Version$', version)
end

get '/counter/:tag' do
  "not yet #" + params[:tag]
end

get '/version' do
  version
end


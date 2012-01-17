# encoding: UTF-8

require 'rubygems'
require 'sinatra'

def version
  (ENV['GIT_VERSION'] || `git describe --long --tags`).strip
end



helpers do
  def raw(name, params)
    r = File.read('view/'+name.to_s)
    params.each {|k, v| r.gsub!(k, v)}
    r
  end
end



before do
  content_type 'text/plain', :charset => 'utf-8'
  @host    = env['HTTP_X_REAL_IP'] || env['REMOTE_ADDR'] # heroku or fluxflex
end

get '/' do
  content_type 'text/html', :charset => 'utf-8'
  cache_control :public, :max_age => 3600
  raw 'index.html', '$Version$' => version
end

get '/counter/:tag' do
  "not yet #" + params[:tag]
end

get '/version' do
  version
end

get %r!^/scripts/([\w\-]+)\.user\.js$! do |tag|
  content_type 'text/javascript', :charset => 'utf-8'
  raw 'userscript.js', '$Tag$' => tag
end

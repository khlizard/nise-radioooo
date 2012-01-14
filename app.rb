# encoding: UTF-8

require 'rubygems'
require 'sinatra'

before do
  # heroku or fluxflex
  @host    = env['HTTP_X_REAL_IP'] || env['REMOTE_ADDR']
  @version = File.read('version').strip.gsub("-",".").sub(/.{6}$/,"")
end

get '/' do
  content_type 'text/html', :charset => 'utf-8'
  cache_control :public, :max_age => 3600
  File.read('public/index.html').gsub('$Version$', @version)
end

get '/counter/:hashtag' do
  'not yet'
end



# dev
if ENV['RACK_ENV'] == 'development' then
  get '/env' do
    content_type 'text/plain', :charset => 'utf-8'
    ENV.each.sort.map{|k,v| [k,v.inspect]*" => "} * "\n\n"
  end

  get '/version' do
    content_type 'text/plain', :charset => 'utf-8'
    @version
  end
end

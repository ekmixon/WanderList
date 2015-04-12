require 'sinatra/base'

require_relative 'routes/wander_list'


class SimpleApp < Sinatra::Base

  set :root, File.dirname(__FILE__)

  enable :sessions
  enable :logging

  # produces a log file and a pipe to stdout
  file = File.new("#{settings.root}/log/#{settings.environment}.log", 'a+')
  file.sync = true

  configure do
    use Rack::CommonLogger, file
    Mongoid.load!("./mongoid.yml")
    require 'mongoid'
  end

  register Sinatra::SampleApp::Routing::WanderList

  before do
    enable_global_headers
  end

  options '/*' do
    response.headers['Access-Control-Allow-Headers'] = 'accept, Content-Type'
     "true"
  end
end

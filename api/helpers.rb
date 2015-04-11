require 'net/http'
require 'json'
# require 'sinatra'

puts 'start'
url = URI.parse('https://ridb.recreation.gov/api/v1/recareas.json?activity=15&apikey=E238B607349C4BEBA4F1E8F67861C2FD')
res = Net::HTTP::get(url)
# res = Net::HTTP.start(url.host, url.port) {|http|
  # http.request(req)
# }

puts res
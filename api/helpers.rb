require 'mongoid'
require 'json'
require 'sinatra'

Mongoid.load!("./mongoid.yml")

require_relative 'models/user_list'
puts UserList.new({:user_id => '1234', :park_id => '1234'}).insert
# UserList.new({:user_id => '1234', :park_id => '1235'}).insert

UserList.each do |a| 
  a.delete
end
puts UserList.first().inspect

userId = '1234'
puts UserList.where(:user_id => userId).to_a.to_json
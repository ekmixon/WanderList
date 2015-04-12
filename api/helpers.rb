require 'mongoid'
require 'json'
require 'sinatra'

Mongoid.load!("./mongoid.yml")

require_relative 'models/user_list'

# UserList.new({:user_id => '1234', :park_id => '1234'}).insert
# UserList.new({:user_id => '1235', :park_id => '1235'}).insert
# UserList.new({:user_id => '1236', :park_id => '1236'}).insert
# 
# UserList.each do |a| 
  # a.delete
# end
# puts UserList.first().inspect
# 
userId = '1234'
puts UserList.not.where(:user_id => userId).and.where(:park_id => '1236').to_a.to_json
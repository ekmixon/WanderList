require_relative '../models/user_list'
require_relative '../models/recommendation'

module Sinatra
  module SampleApp
    module Routing
      module WanderList

        def self.registered(app)

          add_list = lambda do
            bparams = JSON.parse(request.body.read)
            userId = bparams['userId']
            parkId = bparams['parkId']
            
            if userId != nil && parkId != nil then
              UserList.find_or_create_by(:user_id => userId, :park_id => parkId)
              return '{}'
            else
              return '{failure}'
            end
          end
          
          remove_list = lambda do
            bparams = JSON.parse(request.body.read)
            userId = bparams['userId']
            parkId = bparams['parkId']
            if userId != nil && parkId != nil then
              UserList.where(:user_id => userId, :park_id => parkId).delete
              return '{}'
            else
              return '{failure}'
            end
            
          end
          
          complete_list = lambda do
            bparams = JSON.parse(request.body.read)
            userId = bparams['userId']
            parkId = bparams['parkId']
            if UserList.where(:user_id => userId, :park_id => parkId).exists? then
              UserList.where(:user_id => userId, :park_id => parkId)
                .update_all(:completed => 'Y')
              return '{}'
            else
              return '{failure}'
            end
            
          end
          
          uncomplete_list = lambda do
            bparams = JSON.parse(request.body.read)
            userId = bparams['userId']
            parkId = bparams['parkId']
            if UserList.where(:user_id => userId, :park_id => parkId).exists? then
              UserList.where(:user_id => userId, :park_id => parkId)
                .update_all(:completed => 'N')
              return '{}'
            else
              return '{failure}'
            end
            
          end
          
          fetch_list = lambda do
            userId = params['userId']
            return  {"results" => UserList.only(:user_id, :park_id).where(:user_id => userId).to_a}.to_json
          end
          
          fetch_all = lambda do
            userId = params['userId']
            return UserList.only(:user_id, :park_id).all.to_a.to_json
          end
          
          
          app.post '/userList/add', &add_list
          app.post '/userList/remove', &remove_list
          app.post '/userList/complete', &complete_list
          app.post '/userList/uncomplete', &uncomplete_list
          app.get '/userList/fetch/:userId', &fetch_list
          app.get '/userList/fetchAll', &fetch_all

        end
        
      end
    end
  end
end

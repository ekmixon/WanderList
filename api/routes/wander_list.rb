require_relative '../models/user_list'

module Sinatra
  module SampleApp
    module Routing
      module WanderList

        def self.registered(app)

          add_list = lambda do
            bparams = JSON.parse(request.body.read)
            userId = bparams['userId']
            parkId = bParams['parkId']
            
            if userId != nil && parkId != nil then
              UserList.new({:user_id => userId, parkId => '1234'}).insert
              return 'success'
            else
              return 'failure'
            end
          end
          
          remove_list = lambda do
            bparams = JSON.parse(request.body.read)
            userId = bparams['userId']
            parkId = bParams['parkId']
            if userId != nil && parkId != nil then
              UserList.where(:user_id => userId, :park_id => parkId).delete
              return 'success'
            else
              return 'failure'
            end
            
          end
          
          fetch_list = lambda do
            userId = params['userId']
            return UserList.where(:user_id => userId).to_a.to_json
          end
          
          
          app.post '/userList/add', &add_list
          app.post '/userList/remove', &remove_list
          app.get '/userList/fetch/:userId', &fetch_list

        end
      end
    end
  end
end

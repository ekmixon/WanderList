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
              
              # #reccomendation prototype
              # Recommendation.where(:user_id => userId, :park_id => parkId).delete
              # parks = UserList.where(:user_id => userId).distinct(:park_id)
              # # UserList.where(:user_id.ne => userId).distinct(:user_id)
              # phash = {}
              # phash.default = 0
              # similar =  UserList.only(:park_id).not.where(:park_id.in => parks).and.where(:user_id.ne => userId).to_a
              # similar.each do |s|
                # phash[s['parkId']] += 1
              # end
              # phash.each do |k,v|
                # r = Reccomendation.find_or_create_by(:user_id => userId, :park_id => k)
                # r[priority] += v
                # r.update
              # end
              
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
          app.get '/userList/fetch/:userId', &fetch_list
          app.get '/userList/fetchAll', &fetch_all

        end
        
      end
    end
  end
end

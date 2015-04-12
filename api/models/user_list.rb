require 'mongoid'

class UserList
  include Mongoid::Document
  store_in collection: 'userList', database: 'mydb', session: 'default'

  field :'userId', as: :user_id, type: String
  field :'parkId', as: :park_id, type: String
  field :'completed', as: :completed, type: String, default: 'N'

end

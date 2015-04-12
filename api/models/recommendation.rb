require 'mongoid'

class Recommendation
  include Mongoid::Document
  store_in collection: 'recommendation', database: 'mydb', session: 'default'

  field :'userId', as: :user_id, type: String
  field :'parkId', as: :park_id, type: String
  field :'priority', as: :priority, type: Integer, default: 0

end

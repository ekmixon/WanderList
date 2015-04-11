require_relative '../app/questions_impl'

module Sinatra
  module SampleApp
    module Routing
      module Questions

        def self.registered(app)

          questions = QuestionsImpl.new

          ## Questions

          # get_questions gets all of the available questions
          # currently unused
          get_questions = lambda do

          end
          app.get '/questions', &get_questions


          ## Answers

          # get_answers_for_email gets all the answers for the
          # associated e-mail
          get_answers_for_email = lambda do
            questions.get_answers_for_email(params['email']).to_json(except: :_id)
          end

          # post_answer creates a new answer document and associates
          # it to the provided email
          post_answer = lambda do
            ret_body, ret_status = questions.post_answer(JSON.parse(request.body.read))

            body ret_body
            status ret_status

          end

          app.get  '/answers', &get_answers_for_email
          app.post '/answer', &post_answer


          ## Options

          # get_options_for_question_id will provide the appropriate
          # options for a particular question ID. Answers to questions
          # are required to return the appropriate options. If no answers
          # are provided, then all available options are returned
          get_options_for_question_id = lambda do
            questions.get_options_for_question_id(params['questionId'].to_i, params).to_json(except: :_id)
          end

          app.get '/question/:questionId/options', &get_options_for_question_id

          ## Opportunity Count

          # aggregate_opportunity_count aggregates the available options
          # for all possible options the user can make for all questions
          aggregate_opportunity_count = lambda do
            questions.aggregate_opportunity_count
          end

          app.get '/question/aggregate-opportunity-count', &aggregate_opportunity_count
        end
      end
    end
  end
end

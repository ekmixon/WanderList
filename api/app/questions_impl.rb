require 'json'
require 'mongoid'

require_relative '../models/question'
require_relative '../models/answer'
require_relative '../models/option'
require_relative '../models/combine'
require_relative '../models/agency'
require_relative '../models/naics'
require_relative '../models/counts/count'
require_relative '../models/setaside'

class QuestionsImpl

  # creates a new answer document
  # The supplied parameters are validated against a valid
  # questionId and valid option for that questionId
  def post_answer(body)
    ret_body, ret_status = '', 400

    questionId = body['questionId'].to_i
    selected_option = body['selectedOption']

    # validate the questionId is from 1 through 3,
    # and that the selectedOption is valid for that questionId
    if questionId == 1
      unless selected_option.casecmp('Large') == 0 || selected_option.casecmp('Small') == 0
        ret_body = 'The selected option for Question 1 is invalid.'
        return ret_body, ret_status
      end
    elsif questionId == 2
      unless Agency.distinct(:market).to_a.include?(selected_option)
        ret_body = 'The selected option for Question 2 is not a valid market.'
        return ret_body, ret_status
      end
      elsif questionId == 3
      unless Naics.distinct(:name).to_a.include?(selected_option)
        ret_body = 'The selected option for Question 3 is not a valid capability.'
        return ret_body, ret_status
      end
    else
      ret_body = 'Invalid question.'
      return ret_body, ret_status
    end

    prev_answer = Answer.where(question_id: questionId, email: body['email'])

    # if a prior answer does not exist, create a new one
    unless prev_answer.exists?
      answer = Answer.new
      answer.createdDate = Time.now
      answer.questionId = questionId
      answer.email = body['email']
      answer.insert
    end
    # otherwise, all we need to update is the option and the modified_time
    prev_answer.update_all(modified_date: Time.now, selected_option: body['selectedOption'])

    return ret_body, 200
  end

  # returns a list of answers associated to the provided email
  def get_answers_for_email(email)
    answers = []

    Answer.where(email: email).each do |answer|
      answers << answer
    end
    answers
  end

  # returns the list of options for a particular questionId
  def get_options_for_question_id(questionId, params)
    options = []

    # Getting the Large/Small business option
    if(questionId == 1)
      option = Option.new
      option.optionId = '1'
      option.text = ['Large', 'Small']
      options << option
    end

    # Getting all the markets
    if(questionId == 2)
      option = Option.new
      option.optionId = '2'
      if params['answer1'].nil?
        option.text = Agency.distinct(:market).as_json(except: :_id)
      else
        # Will be changing this later, once we recognize params
        option.text = Agency.distinct(:market).as_json(except: :_id)
      end
      options << option
    end

    # Getting all top-level capabilities
    if(questionId == 3)
      option = Option.new
      option.optionId = '3'
      option.text = Naics.where(naics: /^\d\d$/).as_json(except: :_id)
      options << option
    end
    options
  end

  # generates counts for all potential user answers to questions
  def aggregate_opportunity_count
    #generate_size_count
    #generate_markets_count
    generate_naics_count
  end

  # Question 1
  def generate_size_count
    large_count = Count.where(question_id: :'1', selection: :'Large')
    small_count = Count.where(question_id: :'1', selection: :'Small')

    total_combine_count = Combine.count
    total_small_count = Combine.where(setAside: /.*Small Business.*/).count

    if large_count.exists?
      large_count.update_all(counts: total_combine_count - total_small_count)
    else
      large_count = Count.new
      large_count.count = total_combine_count - total_small_count
      large_count.questionId = '1'
      large_count.selections = ['Large']
      large_count.insert
    end
    if small_count.exists?
      large_count.update_all(counts: total_small_count)
    else
      small_count = Count.new
      small_count.count = total_small_count
      small_count.questionId = '1'
      small_count.selections = ['Small']
      small_count.insert
    end
  end

  # Question 2
  def generate_markets_count
    q1_small = Count.where(question_id: '1', selections: 'Small')
    q1_large = Count.where(question_id: '1', selections: 'Large')

    # For each Market, find the Combines for that market
    # Then for each matching Combine, look up its SetAside and find what scale it belongs to
    # Then increment the small/large count depending on that scale

    agency_market_small = {}
    agency_market_large = {}
    Agency.each do |agency|

      agency_market_small[agency[:market]] ||= 0
      agency_market_small[agency[:market]] += agency[:totalcount]

      agency_market_large[agency[:market]] ||= 0
      agency_market_large[agency[:market]] += agency[:largecount]

    end
    agency_market_small.each do |agency|
      puts agency
    end

    agency_market_large.each do |agency|
        puts agency
    end

    agency_market_small.each do |market, value|
      market_doc = Count.where(question_id: :'2', selections: ['Small', market])
      if market_doc.exists?
        # If a market coll exists, then the q1 large/small colls are already linked
        # Go through the existing links from Q1's links field and update all the linked
        # documents
        q1_small.pluck(:_ids).each do |linkId|
          Count.where(_id: linkId).update_all(count: value)
        end
      else
        puts 'The current market does not exist. Creating new Market documents and updating the q1 documents with new links now'
        # If the market doc do not exist, then create one and add its ID to the
        # appropriate Q1 small/large docs. We cannot update the links until the
        # third step
        small_market_doc = Count.new

        # Setup the small doc
        q1_small.push(links: small_market_doc._id)
        small_market_doc.count = value
        small_market_doc.questionId = '2'
        small_market_doc.selections = ['Small', market]
        small_market_doc.insert
      end
    end

    agency_market_large.each do |market, value|
      market_doc = Count.where(question_id: :'2', selections: ['Large', market])
      if market_doc.exists?
        # If a market coll exists, then the q1 large/small colls are already linked
        # Go through the existing links from Q1's links field and update all the linked
        # documents
        q1_large.pluck(:_ids).each do |linkId|
          Count.where(_id: linkId).update_all(count: value)
        end
      else
        puts 'The current large market does not exist. Creating new Market documents and updating the q1 documents with new links now'
        # If the market doc do not exist, then create one and add its ID to the
        # appropriate Q1 small/large docs. We cannot update the links until the
        # third step
        large_market_doc = Count.new

        # Setup the small doc
        q1_large.push(links: large_market_doc._id)
        large_market_doc.count = value
        large_market_doc.questionId = '2'
        large_market_doc.selections = ['Large', market]
        large_market_doc.insert
      end
    end
  end

  # Question 3
  def generate_naics_count

    Naics.each do |naic|

      naic_count = Count.new
      # If the Combine collection has opportunities with the NAIC,
      # we have to actually count them
      if Combine.where(naicsName: naic['name']).exists?
          Combine.where(naicsName: naic['name']).each do |combine|
            #puts combine['setAside']
            scale = Setaside.where(setaside: combine['setAside'])
            puts scale.to_json
          end
      else
        # Otherwise, all we have to do is create the Count document
        # as usual, but set the count to 0

      end
    end
  end
end
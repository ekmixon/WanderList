echo $'\n test route to return a list of answers based on an email \n'
 
curl -w '\n' 52.4.166.149:9292/answers?email='mrtest'

echo $'\n test route to add an answer with bad data \n'

curl -w '\n' -v -X POST -d '{"questionId":"5","selectedOption":"International", "email":"mrtest"}' http://52.4.166.149:9292/answer

echo $'\n test route to add an answer with good data \n'

curl -w '\n' -v -X POST -d '{"questionId":"2","selectedOption":"International", "email":"mrtest"}' http://52.4.166.149:9292/answer

echo $'\n test route to get options for route 1 \n'

curl -w '\n' 52.4.166.149:9292/question/1/options

echo $'\n test route to get options for route 2 \n'

curl -w '\n' 52.4.166.149:9292/question/2/options

echo $'\n test route to get options for route 3 \n'

curl -w '\n' 52.4.166.149:9292/question/3/options?answer1=Large'&'answer2='Space%20and%20Science'

echo $'\n test route to get data visualization data for question 1 \n'

curl -w '\n' 52.4.166.149:9292/data/1?answer1='Large'

echo $'\n test route to get data visualization data for question 2 \n'

curl -w '\n' 52.4.166.149:9292/data/2?answer1='Large''&'answer2='International'

echo $'\n test route to get data visualization data for question 3 \n'

#curl -w '\n' 52.4.166.149:9292/data/3?answer1='Large'&answer


#get the latest code
#git pull

#remove old docker instances
#sudo docker stop $(sudo docker ps -a -q)
#sudo docker rm $(sudo docker ps -a -q)
#sudo docker rmi api_dev

#build and run the api service
docker build -t api_dev .
docker run -p 9292:9292 -d api_dev


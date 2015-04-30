# Database for WanderList

Set up a mongo database instance

Edit the mongoid.yml file and populate the database's host, port, and authentication information (username/password)

# API for WanderList

To start the api server, you need to navigate to the api directory in a console and use the following command:

rackup –o [host, ex: 0.0.0.0] –p [port, ex 9292] –D

the –D is to daemonize the process

ex:
rackup –o 0.0.0.0 –p 9292 –D

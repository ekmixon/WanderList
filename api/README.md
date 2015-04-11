# API for FedBoozOpps

This is the directory for all resources regarding the API layer of the FedBoozOpps application. To see existing documentation on routes please refer to [the documentation](docs/README.md).

## Usage:

    bundle install
    rackup

This will start a server at http://localhost:9292.

## Dockerfile

Run these command from directory that has Dockerfile.

To quickly get up and running a dockerfile is provided, as well as a [shell script](bin/start.sh) to bring it up with the correct port forwarding.

## Contributing:

If you are adding a route to the existing set, please make sure to also complete the following activities

- add to the documentation
- add a set of tests to the [test shell script](tests/route_tests.sh) file to verify your endpoint
- verify that your changes are valid with the docker instance provided through the commited dockerFile
- - You are expected to commit a working dockerFile with your push.

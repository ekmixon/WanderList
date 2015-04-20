nderList

Wanderlist is a bucket list app that allows you to search, create, and share your own curated lists that highlight your favorite parks.

##Install

These instructions assume that your environment has ruby installed (for the Compass gem).

1.) Install Node Version Manager

Visit https://github.com/creationix/nvm site for the latest instructions.

``` bash
curl https://raw.githubusercontent.com/creationix/nvm/v0.24.1/install.sh | bash
```

2.) Install node.
``` bash 
nvm install stable
```

3.) Install the required node modules.
``` bash
npm install nodejs -g
npm install bower -g
npm install compass -g
npm install grunt -g
npm install grunt-cli -g
```

4.) Install compass ruby gem (Depending on how your ruby is installed, this may require root).
``` bash
gem install compass
```

5.) Clone the git repos
```bash
git clone https://github.com/booz-allen-agile-delivery/myAmerica
```

6.) Run these commands in myAmerica directory
``` bash
npm install
bower install
```

7.) Edit the /app/app.js file to include your RIDB Api Key

8.) Start the grunt server.  By default, the site will be hosted on http://0.0.0.0:9000/
``` bash
grunt serve
```

## Helpful Tips

1.) If you are having problems running bower install, check to make sure the git protocol is not blocked by your firewall.  To configure the default to use https instead of the git protocol, use the following commands:

To set https as default:
``` bash
git config --global url."https://".insteadOf git://
```

To undo global configs:
``` bash
git config --global --unset
```

2.) If you are experiencing errors, the following commands are helpful to resetting your environment.

* Delete the node modules directory in your project root
* Clean your npm cache with → sudo npm cache clean
* Reinstall with super user privileges → sudo npm install

3.) We utilized the awesome work of the Stamen caliparks.org folks and their node harvester git branch to gather Flickr pictures of parks. Check it out here: https://github.com/stamen/caliparks.org/tree/node-harvester

##License

Add the open source license here.


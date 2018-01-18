# cailab-homepage-v2

> A rewritten hompeage website of Cai Lab.
> the website: https://www.cailab.org

## download, build and run the website

the website is using Docker

Linux, Node.js, yarn, docker, docker-compose are required.

``` bash
git clone --recursive https://github.com/hihilary/cailab-homepage-v2.git
cd cailab-homepage-v2
sh ./setup.sh
```

## how to install requirements

How to install docker: https://docs.docker.com/engine/installation/

How to install NodeJS: https://nodejs.org/en/download/package-manager/

How to install Yarn: https://yarnpkg.com/lang/en/docs/install/

## folder sturcture

### api-server
A RESTful API backend written by Node.js/Express, it provides the content of news, publications, pictures, and login stuff. this website is run as a docker image called api-server.

### frontend
the source codes of desktop website, it's written by Vue.js. the Webpack is used to pack the site into frontend/dist folder. the nginx docker images runs the webpages using the configuration file in config/nginx.conf

### mobile
the source codes of mobile phone website. It uses the Vue.js too. the configuration file is in config/nginx.conf too.

## other information
the default setup.sh mounts the website at port 10000. It's a good idea to change it to 80 if the website is the only runing website, or reverse proxy from 80 to 10000 if there are any other websites.


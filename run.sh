docker stop cailab-homepage
docker rm cailab-homepage-old
docker rename cailab-homepage cailab-homepage-old
docker run -d -p 3000:3000 -v /srv/cailab-homepage/db:/app/db -v /srv/cailab-homepage/log:/var/log/cailab-homepage --name cailab-homepage cailab-homepage
docker stop cailab-homepage-mobile
docker rm cailab-homepage-mobile-old
docker rename cailab-homepage-mobile cailab-homepage-mobile-old
docker run -d -p 3001:3001 --name cailab-homepage-mobile cailab-homepage-mobile sh ./start_prod_mobile.sh

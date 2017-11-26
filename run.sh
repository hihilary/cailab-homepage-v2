docker stop cailab-homepage
docker rm cailab-homepage-old
docker rename cailab-homepage cailab-homepage-old
docker run -d -p 3000:3000 -v /srv/cailab-homepage/db:/app/db -v /srv/cailab-homepage/log:/var/log/cailab-homepage --name cailab-homepage cailab-homepage

mkdir -p /srv/cailab-homepage/db
mkdir -p /srv/cailab-homepage/log
cp ./db/*.* /srv/cailab-homepage/db/
docker build -t cailab-homepage .


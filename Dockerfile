FROM node:carbon
RUN npm install -g forever
WORKDIR /app
ADD package*.json ./
VOLUME /app/db
RUN npm install
ADD . .
EXPOSE 3000
EXPOSE 3001
RUN npm run build
CMD ["sh", "./start_prod.sh"]


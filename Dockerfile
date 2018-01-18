FROM node
RUN yarn global add forever
WORKDIR /app
ADD package*.json ./
ADD yarn.* ./
VOLUME /app/db
RUN yarn install
ADD . .
EXPOSE 3000
RUN npm run build
CMD ["sh", "./start_prod.sh"]


FROM node:alpine
WORKDIR /app
ADD ./package.json ./
RUN yarn install
ADD . .
EXPOSE 13030
CMD ["yarn","start"]

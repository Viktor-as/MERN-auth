FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV MONGO_USER=root
ENV MONGO_PASS=pass
ENV MONGO_DATABSE=Stone
ENV PORT=5000
ENV NODE_ENV=production

EXPOSE 5000

CMD ["npm", "run", "docker-build-webapp"]



FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV MONGO_PASS = 8JJZmfRLFTOuPrlw
ENV MONGO_DB = MernApp
ENV JWT_SECRET = ZL7tlGDqLRiqrmCschj587v6yQvLKhvHDUMmCss5EYC2Dn05GKr6Z5M1SNHuaKLI
ENV PORT = 5000
ENV NODE_ENV = production

EXPOSE 5000

CMD ["npm", "start"]



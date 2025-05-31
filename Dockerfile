FROM node:21-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN chown -R node:node /usr/src/app
EXPOSE 3001
USER node
# Run the seed script and then start the application server
CMD ["sh", "-c", "node src/seed.js && node src/app.js"]

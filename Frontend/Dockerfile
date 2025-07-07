FROM node:18

WORKDIR /app

COPY forum-app/package.json forum-app/package-lock.json ./
RUN npm install

COPY forum-app/ .

EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
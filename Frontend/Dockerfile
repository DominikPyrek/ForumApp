FROM node:20

WORKDIR /app

COPY forum-app/package.json forum-app/package-lock.json ./
RUN npm install

COPY forum-app/ .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
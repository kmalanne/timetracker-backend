FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm i
EXPOSE 3000
CMD ["npm", "start"]
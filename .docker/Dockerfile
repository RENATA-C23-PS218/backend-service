# Create docker file for this node app
# Use node 10.15.3 as base image
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ./package*.json ./

RUN npm install
COPY . .
EXPOSE $PORT
CMD ["npm", "start"]

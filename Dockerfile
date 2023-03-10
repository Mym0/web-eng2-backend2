# Check out https://hub.docker.com/_/node to select a new base image
FROM node:12

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source code
COPY  . .

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=127.0.0.1 PORT=8080

EXPOSE ${PORT}
CMD [ "node", "dist/main" ]

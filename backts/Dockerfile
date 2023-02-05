FROM node:19.2.0
COPY . ./
RUN npm install
RUN npm run build
CMD [ "npm", "start" ]
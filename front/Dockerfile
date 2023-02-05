FROM node:19.2.0
COPY . ./
RUN npm install --legacy-peer-deps
EXPOSE 3000
CMD [ "npm", "start" ]
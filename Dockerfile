
#Stage 1 -- Work on node js from direct image creation
# Base image 
FROM node:18-alpine AS builder

# working directory in which all files save
WORKDIR /app

# copy package.json and install npm
COPY package*.json ./
RUN npm install

# copy all data and run build method
COPY . .
RUN npm run build

#Stage 2 -- Now Build its image with nginx

FROM nginx:alpine

#remove default page and add custom page on nginx
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]



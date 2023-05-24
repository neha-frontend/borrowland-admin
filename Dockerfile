FROM node:14.19.1

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN ls

EXPOSE 3000

ENTRYPOINT ["npm"]
CMD ["start"]

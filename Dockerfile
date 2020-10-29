FROM node:12.19.0

WORKDIR /app
COPY . .

# INSTALL DEPENDENCIES AND BUILD
RUN yarn install
RUN yarn build

# SERVE FILES
CMD ["npx", "serve", "build"]

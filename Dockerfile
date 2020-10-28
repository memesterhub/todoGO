FROM node:latest

COPY . .
WORKDIR ./

# INSTALL DEPENDENCIES AND BUILD
CMD ["npm", "install"]
CMD ["npm", "build"]

# SERVE FILES
CMD ["npx", "serve", "build"]
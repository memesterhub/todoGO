FROM node:12.19.0

COPY . .
WORKDIR ./

# INSTALL DEPENDENCIES AND BUILD
CMD ["npm", "install"]
CMD ["npm", "build"]

# SERVE FILES
CMD ["npx", "serve", "build"]
# Use node 10.16.0 LTS
FROM node:10.16.0
ENV LAST_UPDATED 201906019T165400

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Expose API port to the outside
EXPOSE 80

# Launch application
CMD ["npm","start"]
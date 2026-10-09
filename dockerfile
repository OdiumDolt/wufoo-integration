FROM node:20

# Set the working directory inside the container
WORKDIR /build

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which your Node.js application will run (if necessary)
EXPOSE 5532

# Define the command to run your Node.js application
CMD ["npm", "run", "serve"]
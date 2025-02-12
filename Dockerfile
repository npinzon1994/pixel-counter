# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

RUN npm run build

# Install a static file server (like serve)
RUN npm install -g serve

ENV PORT=5173

# Expose the default React development port
EXPOSE ${PORT}

# Start the React dev server
CMD ["serve", "-s", "dist"]
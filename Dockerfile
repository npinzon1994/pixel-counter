# Use Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

RUN npm run build

ENV PORT=${PORT:-5173}

# Expose the default React development port
EXPOSE ${PORT}

# Start the React dev server
CMD ["npx", "serve", "dist", "--port", "5173"]
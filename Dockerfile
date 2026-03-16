FROM node:18-alpine

ENV NODE_ENV=development

WORKDIR /workspace

# Install dependencies at build time; fall back to npm install if ci fails
COPY package.json package-lock.json* ./
RUN npm ci --silent || npm i --silent

# Copy app sources
COPY . .

# Ensure files are owned by the unprivileged node user
RUN chown -R node:node /workspace

USER node

EXPOSE 5173

# Run Vite in host mode so it is reachable from the host machine
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

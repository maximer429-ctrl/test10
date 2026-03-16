FROM node:18-alpine
WORKDIR /workspace
COPY package.json package-lock.json* ./
RUN npm ci --silent || npm i --silent
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

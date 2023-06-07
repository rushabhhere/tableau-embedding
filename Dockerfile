FROM node:18-alpine AS build
WORKDIR /app
COPY client/package.json client/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY client/ ./
RUN yarn build

FROM node:18-alpine
WORKDIR /app
COPY server/package.json server/yarn.lock ./
RUN yarn install --production
COPY server/ ./
COPY --from=build /app/dist ./public
RUN npx prisma generate
CMD ["yarn", "start"]
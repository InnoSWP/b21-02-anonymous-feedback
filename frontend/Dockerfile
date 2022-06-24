FROM node AS builder

WORKDIR /opt/dependencies
COPY package.json package-lock.json ./
RUN npm ci

# TODO: move build to separate stage
COPY tsconfig.json ./
COPY public/ ./public
COPY src/ ./src
RUN ls -a
RUN npm run build

FROM nginx:alpine as production

WORKDIR /usr/share/nginx/html

# Remove default nginx static resources
RUN rm -rf ./*

# COPY --from=builder /opt/dependencies/node_modules ./node_modules
COPY --from=builder /opt/dependencies/build ./
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN wget -P --progress=dot:giga /usr/bin https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for
RUN chmod +x /usr/bin/wait-for

CMD nginx -g "daemon off;"

# ---------- build ----------
FROM node:20-alpine AS build
WORKDIR /app

# package-lock.json está no .gitignore do repositório; se existir localmente ele é usado,
# se não existir o npm resolve as versões a partir do package.json.
COPY package*.json ./
RUN npm install --legacy-peer-deps --no-audit --no-fund

COPY . .

# CI=false: o CRA não trata warnings do ESLint como erro
# GENERATE_SOURCEMAP=false: build mais leve e menos memória
ENV CI=false \
    GENERATE_SOURCEMAP=false \
    NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build

# ---------- runtime ----------
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

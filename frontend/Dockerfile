FROM oven/bun:1

WORKDIR /app

COPY package.json ./

RUN bun install

EXPOSE 5173/tcp
ENTRYPOINT [ "bun", "run", "dev", "--host"]

# Use a imagem base Node.js
FROM node:14

# Crie um diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o código-fonte para o diretório de trabalho no contêiner
COPY . .

# Porta que seu aplicativo irá escutar (ajuste de acordo com o seu código)
EXPOSE 10000

# Comando para iniciar o servidor
CMD ["npm", "start"]

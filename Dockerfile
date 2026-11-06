FROM nginx:alpine

# Copia os arquivos estáticos do projeto para o diretório servido pelo Nginx
COPY . /usr/share/nginx/html

EXPOSE 80

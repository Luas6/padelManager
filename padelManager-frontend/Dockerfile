# Usa la imagen oficial de nginx como imagen base
FROM nginx:alpine

# Configurar Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia los archivos de la aplicación Angular al directorio de trabajo en el contenedor
COPY dist/padel-manager-frontend /usr/share/nginx/html

# Exponer el puerto 80 para que sea accesible desde fuera del contenedor
EXPOSE 80

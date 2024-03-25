# Usa la imagen oficial de nginx como imagen base
FROM nginx:alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/share/nginx/html

# Copia los archivos de la aplicación Angular al contenedor
COPY dist/padel-manager-frontend/ .

# Exponer el puerto 80 para que sea accesible desde fuera del contenedor
EXPOSE 80

# Comando para iniciar nginx en modo daemon
CMD ["nginx", "-g", "daemon off;"]

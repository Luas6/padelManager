# Use the official OpenJDK 17 image as a base image
FROM openjdk:17-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file of the Spring Boot application into the container
COPY target/padelManager-backend-1.0.0.jar app.jar

# Copy your application.properties file into the container
COPY src/main/resources/application.properties /app/

# Expose the port on which your Spring Boot application runs
EXPOSE 8080

# Command to run the Spring Boot application when the container starts
CMD ["java", "-jar", "app.jar"]

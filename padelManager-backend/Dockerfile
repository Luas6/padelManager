# Use the official Maven/Java 17 image as a base image for building
FROM maven:3.8.4-openjdk-17-slim AS build

# Set the working directory in the container
WORKDIR /app

# Copy the Maven project file
COPY pom.xml .

# Download all required dependencies into one layer
# This step is done before copying the source code to minimize the rebuilding of dependencies
RUN mvn dependency:go-offline -B

# Copy the project source code
COPY src ./src

# Package the application without running tests
RUN mvn package -DskipTests

# Use OpenJDK 17 image as a base image for the runtime
FROM openjdk:17-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file built in the previous stage
COPY --from=build /app/target/padelManager-backend-1.0.0.jar app.jar

# Expose the port on which your Spring Boot application runs
EXPOSE 8080

# Command to run the Spring Boot application when the container starts
CMD ["java", "-jar", "app.jar"]

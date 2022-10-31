FROM openjdk:8-jdk-alpine
WORKDIR /app
ARG JAR_FILE_PATH = target/app2.jar
COPY ${JAR_FILE_PATH} app3.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "/app3.jar"]
EXPOSE 8080

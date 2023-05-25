# FROM openjdk:8-jdk-alpine
# ARG JAR_FILE=target/*.jar
# COPY ${JAR_FILE} app.jar
# ENTRYPOINT ["java","-jar","/app.jar"]

# FROM openjdk:8-jdk-alpine
#RUN addgroup -S spring && adduser -S spring -G spring
#USER spring:spring
# ARG JAR_FILE = target/app.jar
#WORKDIR opt/app
# COPY ${JAR_FILE} app.jar
#RUN chmod +x app.jar
# ENTRYPOINT ["java", "-jar", "/app.jar"] 
#, "-Dspring.profiles.active=prod"
#, "-Duser.timezone=Asia/Seoul"
#EXPOSE 8080

FROM openjdk:8-jdk-alpine
WORKDIR /app
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]
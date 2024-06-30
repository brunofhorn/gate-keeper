# Use a imagem base do OpenJDK 21
FROM openjdk:21-jdk

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo JAR da aplicação para o contêiner
COPY target/gatekeeper-0.0.1-SNAPSHOT.jar /app/application.jar

# Exponha a porta que a aplicação usa
EXPOSE 8080

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "/app/application.jar"]

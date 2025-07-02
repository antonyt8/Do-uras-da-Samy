FROM gradle:jdk17-alpine AS BUILD_STAGE
COPY --chown=gradle:gradle ./backend /home/gradle
RUN gradle build -x test

FROM openjdk:17-oracle
ENV ARTIFACT_NAME=demo-0.0.1-SNAPSHOT.jar
ENV APP_HOME=/app
COPY --from=BUILD_STAGE /home/gradle/build/libs/$ARTIFACT_NAME $APP_HOME/
WORKDIR $APP_HOME
RUN groupadd -r -g 1000 user && useradd -r -g user -u 1000 user
RUN chown -R user:user /app
USER user
ENTRYPOINT exec java -jar ${ARTIFACT_NAME}

# nodejs_test_task

Deploying project
1. First of all, we need to deploy PostgresSQL database from docker container.
   We need to run command 'docker-compose up -d' in root of project directory.
2. When the container will have deployed, we need to run command 'npm run start:dev'
   to run our NestJS project.

Possible issues
1. If you already have deployed Postgres server or something in port 5432 you need to disable it.

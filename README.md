# Yap Assignment To Create Crud For User

This project is a Assignment for Crud Operation.

## Setup

- Make sure you have `NPM_TOKEN` set as an environment variable to pull private npm packages.

### External Services

- Database: MYSQL.

### Linux

1. Open the `.bashrc` file in your home directory (for example,
   `/home/your-user-name/.bashrc`) in a text editor.
2. Add `export NPM_TOKEN="00000000-0000-0000-0000-000000000000"` to the last line of the file, where
   *your-dir* is the directory you want to add.
3. Save the file.
4. Restart your terminal.

### Environment variables

| Name | Description | Default |
|---|---|---|
| ENVIRONMENT | Current environment of service  | `yap-local` |
| MICROSERVICE_NAME | Name of service | `yap_assignment` |
| MICROSERVICE_IP |  | `0.0.0.0`|
| APP_HOST | | `0.0.0.0`|
| APP_PORT | Service port | `8080`|
| SENTRY_PROJECT_DSN | | ``|
| MYSQL_HOST | MYSQL server host IP | `0.0.0.0`|
| MYSQL_USERNAME | MYSQL server user name | |
| MYSQL_PASSWORD | MYSQL server user password | |
| MYSQL_DB_NAME | MYSQL database name |`users` |
| MYSQL_PORT | MYSQL server port | `3306`|

### Using docker (recommended)

To run the project tests including required dependencies, `docker-compose up --build`

### Using npm

1. To build a project, `npm run build`
2. To test a project, `npm run test`
3. To test linter, `npm run lint`
4. To test and fix linter, `npm run lintfix`
5. To audit packages, `npm audit` and to fix minor package issues run `npm audit fix`
6. To start a project server, `npm run start`


# Home Library Service

## Installing NPM modules

```
npm install
```
- Change extension of .env.example file to .env and add the following variables:
POSTGRES_PORT=5432
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_HOST=postgres
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/mydb?schema=public"


## Running application

```
npm run docker:up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```


### Auto-fix and format

```
npm run lint
```

### Scanning for vulnerabilities

```
app:image:scan
```




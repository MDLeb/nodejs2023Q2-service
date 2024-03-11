# Home Library Service

## Installing NPM modules

```
npm install
```
- Change extension of .env.example file to .env 

## Running application
- in dev mode
```
npm run start:dev
```

- in prod mode
```
npm run build
```
```
npm run start:prod
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

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```


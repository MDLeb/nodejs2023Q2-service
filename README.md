# Home Library Service

## Installing NPM modules

```
npm install
```
- Change extension of .env.example file to .env and add the following variables:

## Running application

```
npm run docker:up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/

You can find logs in the files of the container named 'app', in the app/dist/log

[steps](https://ibb.co/GCvdh5Z)
[steps](https://ibb.co/cyXw3Pq)
[steps](https://ibb.co/wQ0ZvWh)

## Testing

After application running open new terminal and enter:

To run all tests with authorization

```
npm run test:auth

```
To run all refresh token test

```
npm run test:refresh

```
## Auto-fix and format

```
npm run lint
```




# 说明
react + redux + scss + koa2 + mongodb + typescript + resful  SSR


# 准备




## add config.js in server directory
```
module.exports = {
	dbhost: "xxxx:27017",
	dbName:'yourDB',
	dbUsername:'yourName',
	dbPassword:'yourPassword',
	tokenSecret:'yourtokensecret',
	saltRounds:10,
	webapp:'webapp'
}
```

# Script

## install global npm

```
 npm install -g webpack webpack-cli concurrently
``

## start


## dev

```
npm run dev
```

## production dev

```
npm run all

```


## webapck build analazy 

```
npm run build --report
```

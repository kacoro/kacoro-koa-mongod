# Base
react + redux + scss + koa2 + mongodb + typescript + resful  SSR


# prepare

## add config.js in client directory
module.exports = {
    prdhost:"http://127.0.0.1", //127.0.0.1
    prdport:"5200",
    localhost:"http://127.0.0.1",
    localport:"5200"
}

## add config.js in server directory
```
module.exports = {
	tokenSecret:'yourtokensecret',
	secretKey:'sercretKey',
	saltRounds:10,
	webapp:'webapp',
	database:{
		host:"127.0.0.1:27017",
		name:'kacoro',
		username:'',
		password:''
	},
	mail:{
		username:'kacoro',
		password:''
	}
}
```

# Script

## install global npm

```
 npm install -g webpack webpack-cli concurrently
``

## publish after build
```
PORT=5200 yarn prd --name kacoro
```

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

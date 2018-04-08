# Fishing in Brandenburg App
This app will present you with all DAV fishing locations in a table.
You can sort for areas and you can select more than one location to 
create a route, which you can see at google maps.

Demo: https://evening-plateau-57300.herokuapp.com/

## How to use

Install it and run:

```bash
cd server
npm i
npm run start
```

Run another console:

```bash
cd react-ui
npm install
npm run start
```

## Deployment
via Heroku, see: https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app

git push heroku master
heroku ps:scale web=1
heroku open

## Thx to..
https://github.com/mars/heroku-cra-node for this amazing package, which I use here as starting point to have it deploayble to heroku.
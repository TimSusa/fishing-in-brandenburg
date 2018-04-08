# Fishing in Brandenburg App

## Background of the story
If you are angler in Berlin/Brandenburg your are free to fish in a huge number of different Lakes and Rivers. In order to get an overview to the most interesting locations, you want to sort out the most important ones.

## What it does
This app will present you with all DAV fishing locations in a table. You can sort for areas or search for names. In order to create a route with several locations, you are free to select them and open that up on google maps.

## Demo 

https://evening-plateau-57300.herokuapp.com/

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
- https://github.com/mars/heroku-cra-node for this amazing package, which I use here as starting point to have it deploayble to heroku.

- DAV Brandenburg for providing map data

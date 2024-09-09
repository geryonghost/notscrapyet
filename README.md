# ![Not Scrap Yet Logo](/app/public/img/logo-white-32x107.png) Not Scrap Yet

# Purpose
When I search for cars I usually search for used cars. This leads me to autotrader.com, cars.com, cargurus.com, carmax.com, craigslist.org and many many more. Each of these sites have their own various search filters and some even make it hard to save that search for daily use.

I devised Not Scrap Yet to try and bridge that gap in a cost effective manner. Scrap the content directly off the dealers websites, catalog, standardize, and offer user friendly options for finding any used car within the USA easily.

## Struggles
- Since each dealer's website is unique, it is hard to standardize the scraping code.
- It can get expensive to run the scraping tools.
- Some sites use scraping prevention tools that would require a proxy potetially adding to the cost.

## Help
We would like to move this project forward, but need help being able to use AI to scrape websites efficiently and cost effectively.

# Development
## Install Dependencies
Local applications
```
NPM
MongoDB
Google Chrome
```
Python extensions
```
python3 -m pip install python-dotenv pymongo requests undetected_chromedriver pyvirtualdisplay webdriver_manager
```

Clone the repo

From `app` run `npm install`
From `mongodb` run `mongorestore --uri=mongodb://localhost:27017`

## Run the Node.js server via Nodemon
From `app` run 'nodemon server.js`

## Notes
The current demo environment only has a single dealership located in IL.

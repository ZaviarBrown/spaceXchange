# spaceXchange
*By [[Zaviar Brown](https://github.com/ZaviarBrown), [Ryan Dalton](https://github.com/DaltonR121), [Andrew Moss](https://github.com/aMoss5150), [John Sims](https://github.com/simzeee)*

See ya space cowboy...on [spaceXchange](https://spacexchange.herokuapp.com/)

The galactic empire is being developed as we speak, quickly transforming uninhabitable wastelands into industrial giants, and making a ton of money along the way. spaceXchange is your one stop shop for trading your USD into any other planet's currency, allowing you to take part in the universal stock market. 

## Index
* [API Documentation](https://github.com/ZaviarBrown/spaceXchange/wiki/API-Routes)
* [Database Schema](https://github.com/ZaviarBrown/spaceXchange/wiki/Database-Schema)
* [Frontend Routes](https://github.com/ZaviarBrown/spaceXchange/wiki/Frontend-Routes)
* [MVP Feature List](https://github.com/ZaviarBrown/spaceXchange/wiki/MVP-List)
* [User Stories](https://github.com/ZaviarBrown/spaceXchange/wiki/User-Stories)

## Technologies Used
* JavaScript
* React/Redux
* Recharts
* CSS
* Python
* Flask/SQLAlchemy
* Beautiful Soup
* Coingecko API
* Raspberry Pi

## Summary
spaceXchange is a Robinhood clone, created to allow a space-faring civilization to participate in the universal stock market. When a user first accesses the site, they are brought to the splash page, greeting the user and prompting them to signup. Attempting to access any page on the site without login/signup will redirect them to login.

![](assets/sXc1.jpg)

When logging into the site, the user is greeted with their portfolio, allowing them to quickly see the value of all their assets and watch their money move as the market fluctuates and updates in real time. The planet assets you own are displayed on the right, with the stock chart, the number of shares you own, and the price per share (which also updates in real time). 

![](assets/sXc2.jpg)

Difficult 
- Timing
- Search bar, web scraping, raspberry pi hosting api
- Recharts handling data
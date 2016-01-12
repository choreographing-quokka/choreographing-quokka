# choreographing-quokka

Rollercost

Build:

npm install

bower install

Getting Started:

Welcome to Rollercost: the applicaton that help users calculate the proportion of their income that is spent on different aspects of their life (e.g. rent, food, entertainment) and compare it to how the proportions spent by the average person.

You will find some insight into your own behaviors!

Client code

The client side code is an angular single page application using ngRoute. For each view there is a separate page that can be accessed via a navigation bar. The two principal pages are userSubmission, a survey quiz that takes in the users income and expenditures and analyze which compares the users spending habits with population averages (these averages are based on the users that have previously inputed data). Authentication is handled with cookies, which allows users to regain access to their data if the return to the app multiple times.

It is worth noting that in order to "get" user data a post request is sent with the user name

Client side styling is done with the help of bootstrap. 

Server code

The server side code uses express for routing 



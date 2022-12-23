Giftu - README 🎁
===

## Table of Contents
1. [Overview](#Overview)
1. [Demo](#Demo)
1. [Product Spec](#Product-Spec)
1. [Design](#Design)
1. [What's Next?](#What's-Next?)

## Link
Link: https://giftu-app.herokuapp.com/

## Overview
### Description
Giftu is a full stack web application that allows users to create and share lists for gift exchanges. It allows users to invite other users to interact with their wishlist and it also allows the creator of the wish list to not see any of the items that have been purchased to keep it a surprise for that user. The project uses EJS (Embedded JavaScript) as a template engine for generating HTML and Express as a framework for building server-side functionality. It also utilizes MongoDB as a database to store a collection of users and clients and Passport.js to authenticate users.

### App Evaluation
- **Category** Lifestyle
- **Story:** Back in Christmas of last year, my family ran into a problem - we all got my uncle the same gift from the same store. No one wants see someone opening another person's gift and realizing that you had bought them the same gift. That's why I created, Giftu. This application allows users to pick an item from a wishlist and removes that item once picked so another user can't purchase it. To add an element of surprise, the web app also keeps it so that the recipient cannot see which gifts have been purchased.
- **Market:** This application is for anyone who wants a way to organize their wishlist without the ability to see which gifts have been purchased ahead of time. 
- **Scope:** Users will be able to login/logout with their unique username and password. Currently, there is no fuctionality for retrieving forgotten passwords. The collection includes users and gifts, which are tied to the users. 

## Demo
Signing Up:<br />
<img src="http://g.recordit.co/r6WSrjvzEy.gif" width="300"/><br />
Adding a Group:<br />
<img src="http://g.recordit.co/Jr8fXuSe3n.gif" width="300" /> <br />
Adding/Deleting a Gift:<br />
<img src="http://g.recordit.co/QvZJYPIMwj.gif" width="300" /> <br />
Sending an Invite<br />
<img src="http://g.recordit.co/6RoYTTcnNP.gif" width="300" /> <br />

## Product Spec
The project uses EJS (Embedded JavaScript) as a template engine to render HTML and Express for middleware. It has routes for handling user authentication, as well as routes for creating and managing wish lists. Users can create an account and log in to the application, and once logged in, can create a wish list by assing items and specifying details such as the item name, description and price. Users can also view and edit their wish lists, as well as view the wish lists of other users who have made them public (by invite). 
<br />
Passport.js is used as an authentication middleware for Node.js. It provides a simple yet flexible way to authenticate users. The passport-jwt strategy is used to allow userse to authenticate using JSON Web Tokens (JWTs).

## Design
The project uses a very simple design scheme with Bootstrap

## What's Next?
Here are some future updates I plan on accomplishing:
<ul>
<li> Use a framework like React or Next: The project was made with EJS, which allowed me to embed JavaScript code directly into HTML code. Though useful for keeping track of routes, I would like to separate these out in different files and directories to keep it more organized. Additionally, it would be nice to user reusabale components and state like in React apps. This may be the most significant update since it will require me to migrate to a completely different framework.
<li> Use a different CSS framework: I used Bootstrap because of its simple interface but would love to use TailwindCSS to improve on the design and appearance of the project. TailwindCSS is a utility-first CSS framework that also has a set of predefined classes for styling elements but with more flexibility in the design.
<li> Use a different database: Instead of MongoDB I can use another document based database like, Firestore, but that would require complete refactoring of the models. Both are scalable and are great at indexing/querying so this change may not be necessary. Another update could be to use a SQL database instead, Postgres or Firebase. However, this may also require significant changes to the data model of the project and will be a significant change that may not be necessary for this project.
</ul>

Thanks for visiting!

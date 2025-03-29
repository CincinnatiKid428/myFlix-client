# myFlix-client: ![Matinee navigation bar brand logo](/src/img/matinee-logo2-navbar-sm.png)
## Description
This is the client-side React application called *Matinee* (*myFlix-client*) that will use the API under the **movie_api** project repository. 
See https://fast-taiga-09096-54ce00eca848.herokuapp.com/documentation for the backend API documentation. <br/>

*Matinee* is a single-page application that allows movie enthusiat users to find information about movies, create accounts where they can store their favorite movies and access them through their profile view and manage their account and profile information.
## Features
- Allows users to register (username, password, email & birthdate)
- Allows users to login with username & password, and logout
- Allows for persistent login should the user close the browser and navigate back to the app without logout
- Displays list of movies with an image & title that can be clicked for more information about the movie
- Allows users to get additional information about genre and director when viewing details about a specific movie
- Allows users to update account information (passowrd, email & birthdate)
- Allows users to add/remove movies from a favorites list
- Allows users to deregister their account
## Usage
### Login/Signup
Users will initially be presented a login page to enter Username/Password if they have an account: 
![Matinee login screen](/src/img/screenshot-LoginView.png)
or they can use the navbar menu to go to a singup page to create an account:
![Matinee signup screen](/src/img/screenshot-SignupView.png)

### MainView
After authentication, users will be presented with a view of a list of movie cards, a search bar filter, new navbar menu options to view Home (MainView), Profile or Logout. Each movie card can be clicked to get more specific information about the movie and each card has a button to add/remove that movie from the user's favorite movies.
![Matinee home screen](/src/img/screenshot-MainView.png)

### MovieView
After clicking a movie card, movie-specific information will be displayed with the option to gain additional genre info (via Tooltip) and director info (via Offcanvas). Movies can be added/removed to/from the favorites list and there will be a list of similar movies by genre listed after the movie info.
![Matinee movie info view](/src/img/screenshot-MovieView.png)

### ProfileView
Users selecting Profile from the navbar will be shown their accout information, offer the delete account button and have the option to update their info using the update section. *Note: All fields must be filled to complete an account info update, even if you enter the same value as stored in the database:*
![Matinee profile account info](/src/img/screenshot-ProfileView1.png)

A list of the user's favorite movies will follow the account information/update section:
![Matinee profile favorite movies](/src/img/screenshot-ProfileView2.png)
## Technologies Used
- React
- React-Bootstrap
- Redux
- RecraftAI (all *Matine* images created using RecraftAI)
- Parcel & gh-pages (build automation)
### Dependencies
- movie_api - See https://fast-taiga-09096-54ce00eca848.herokuapp.com/documentation
- MongoDB

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
- Allows users to update account information (password, email & birthdate)
- Allows users to add/remove movies from a favorites list
- Allows users to deregister their account
## Usage
### Login/Signup
Users will initially be presented a login page to enter Username/Password if they have an account: 
![Matinee login screen](/src/img/screenshot-LoginView.png)
or they can use the navbar menu to go to a singup page to create an account:
![Matinee signup screen](/src/img/screenshot-SignupView.png)

### MainView
After authentication, users will be presented with a view of a list of movie cards, a search bar filter, new navbar menu options to view Home (MainView), Profile or Logout. Each movie card can be clicked to get more specific information about the movie and each card has a heart-shaped favorite button to add/remove that movie from the user's favorite movies.

<img width="1150" height="1150" alt="image" src="https://github.com/user-attachments/assets/7dca5957-a35d-49ef-9502-5d672470257f" />


### MovieView
After clicking a movie card, movie-specific information will be displayed with the option to gain additional genre info (via Tooltip) and director info (via Offcanvas). Movies can be added/removed to/from the favorites list by toggling the heart-shaped button in the bottom right corner of the movie poster images and there will be a list of similar movies by genre listed after the movie info.

<img width="1152" height="600" alt="image" src="https://github.com/user-attachments/assets/3f1a92eb-ecf7-411d-9a73-56fc39c410aa" />


### ProfileView
Users selecting Profile from the navbar will be shown their accout information, offer the delete account button and have the option to update their info using the update section. *Note: All fields must be filled to complete an account info update, even if you enter the same value as stored in the database:*
![Matinee profile account info](/src/img/screenshot-ProfileView1.png)

A list of the user's favorite movies will follow the account information/update section:
![Matinee profile favorite movies](/src/img/screenshot-ProfileView2.png)

## Logging with *Matinee*
Logging for this application is done through a utility module `/util/log-it.js` and will log messages according to an environment variable which sets a log level.  This variable is `SYS_LOG_LEVEL` and should be assigned a value from 0-3 where the values correspond to :
- 0 : Error
- 1 : Info
- 2 : Debug
- 3 : Log
  
For example, setting `SYS_LOG_LEVEL` to 2 will allow logging for Error, Info and Debug levels.  A value of 3 will show ALL logging messages.  Some browsers will not show Debug logging by default when inspecting a page, but can be allowed if verbose logging is enabled in the console settings.  *Note: The default value will be 1 allowing only Error and Info logging into the console log.*

## Technologies Used
- React
- React-Bootstrap
- Redux
- RecraftAI (all *Matine* images created using RecraftAI)
- Parcel & gh-pages (build automation)
### Dependencies
- movie_api - See https://fast-taiga-09096-54ce00eca848.herokuapp.com/documentation
- MongoDB

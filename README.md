# Igor's Anime Forum

This is my final project. An anime forum site inspired by My Anime List, using MAL's api.

## APIs & Packages Used
API: MyAnimeList API: https://myanimelist.net/apiconfig/references/api/v2 

## Packages:

### Frontend
- Vite
- React
- React router
- Styled Components
- auth0

### Backend
- NodeJS
- Express.js
- nodemon
- dotenv
- morgan
- http-proxy-middleware

### Database
- MongoDB

## Features:

- User profiles
 - Users are able to sign up and login
 - Users can create and manage an anime watchlist which will include:
   - Shows the user plans to watch
   - Shows the user is watching
   - Shows the user has already watched
   - The user’s rating for the show (out of 10)
- Discovery feed
 - A list of available anime
 - Filterable
 - Paginated

- Individual anime pages
  - Anime details (some are missing sometimes, depending on the API):
   - Synopsys
   - Number of episodes/seasons
   - Air dates
   - Broadcast times
   - Studios
   - Genres
    
- User comment section
  - Users can leave comments
  - Comment shows whether the user has watched the show or not (on hover)
  - Comments can be edited (by the commenting user)

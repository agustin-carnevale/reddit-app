This is the repo for the Reddit Client Challenge app.

## Demo

You can find this app deployed at:

https://reddit-challenge.herokuapp.com/

### To run the app locally 

Just clone this repository and in the project directory, run:

### `npm i`
and then:
### `npm start`

This runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# A few notes on the technical decisions made:

This project has a very clean and clear structure, very easy to scale, but at the same time was treated as an exercise, keeping things as simple as posible, and with minimal attention to design aspects.

For example, the app it self has only one "page" (technically), not needing the use of, for example, React Router for routing, although it could be used to split the screen, navigate, etc.

### App State persistance:
The app supports a simple app-state local persistance, by saving the redux store to Local Storage. This state keeps record of the posts already loaded or dismissed, read status of each post (red bell), etc. And can easily be restored/refreshed by the floating action button.
(Note that if you refresh the browser or open the app in a different tab/window on the same device, the state will be loaded as it was left, the only way of really restoring the app is through the floating action button, which was added specially for this functionality).

### Pagination:
The app also supports pagination when fetching the posts, at this time, an arbitrary number of 10 posts per request was set. The 'load more' button allows you to fetch the next ten posts.

Also, in order to get a more organic behavior, I decided that when you refresh the browser's tab (technically speaking when you reload and 'mount' again the app), if the store has no posts to show because you dismissed all of them, then the app refetches the first 10 (like 'forcing' a restore).

### Animations:

For animations, I used a very simple and clear, yet powerful and performant library, called react-spring, which allows to add animations to components in a very simple way. React-Spring is a physics-based animation library. It calculates all the mechanics behind the scenes and works independently from React.

### Other observations:

For styles, I used Styled-Components (css-in-js),FontAwesome to add some icons, and material-ui only for the floating action button. But other than that I tried to use as few external libs as possible and keep it simple.





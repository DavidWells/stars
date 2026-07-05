---
repo: Fomtriok/sessionExpiration.js
url: 'https://github.com/Fomtriok/sessionExpiration.js'
homepage: null
starredAt: '2021-05-21T04:07:49Z'
createdAt: '2018-07-02T18:51:30Z'
updatedAt: '2024-02-26T12:23:51Z'
language: JavaScript
license: MIT
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:39.059Z'
description: A lightweight session expiration tool in pure JS without any dependencies.
tags: []
---

# sessionExpiration.js
A lightweight session expiration tool in pure JS without any dependencies.

- Works across all tabs in the browser (that are part of your domain), that you call this function from. The user won't be logged out as long as at least one (of those) tabs is being regularly used.

- Includes countdown and warning to move in order to remain logged in.

- Function takes optional URL as fourth argument, for the purpose of server-side session refresh too. For detailed instructions, see the comments in sessionExpiration.js.

### How to use:

1. Include the JS in your markup on all pages that are to be subjected to sessionExpiration. (Thus, it is preferable to include the JS in your footer.) If you exclude one page, then the user will be logged out if another page (with this function) is open in another tab, but the user is merely using the page without this function. **sessionExpiration.js only notices the activity of a user on those pages that have the function called.**

```html
<script type="text/javascript" src="http://localhost/sessExp/sessionExpiration.js"></script>
```

2. Create a div with id "sessExpirDiv" somewhere on each page that will be subject to sessionExpiration (preferably in your footer or header). This will contain the warning message and countdown to logout.

```html
<div id="sessExpirDiv">
</div>
```

3. Put the CSS in your stylesheet (or redesign it to your liking) which you find as a comment in the JS file - providing design of the warning message and countdown.

```css
#sessExpirDiv { }
#sessExpirP { }
```

4. Call the function (from each page you included the script in, thus also; preferably from your footer) along with the arguments [1] number of minutes the user is allowed to be idle, [2] number of minutes the user is allowed to be idle before the warning and countdown begins, [3] the url for your server-side logout.

```javascript
sessionExpiration(idleMinutes = 1, warningMinutes = 0.5, logoutUrl = 'http://localhost/path/to/logout');
```

_Notice: The only way to enforce client side logout with absolute certainty, is by redirecting all tabs to the logoutUrl. Therefore, if you want the redirects to behave differently, the safe way to do this is by redirecting the user on the backend, in the script found at logoutUrl._

### Optional - Server-side session expiration too:

5. Include as a fourth argument the URL of your refresh_session page (an example for php is provided by the name refresh_session.php). This is however advisable to implement, since it expires any session which the user has not been active in, even if the user has closed the browser window or browser. (For more detailed instructions, see the comments in the sessionExpiration.js file.)

---

This is an example of what it looks like in action, if you don't change the CSS:

![alt text](https://i.stack.imgur.com/z0d2n.png)

---
repo: icodeforlove/react-rcs
url: 'https://github.com/icodeforlove/react-rcs'
homepage: null
starredAt: '2014-11-19T23:58:35Z'
createdAt: '2014-07-12T14:10:42Z'
updatedAt: '2018-09-23T23:17:09Z'
language: JavaScript
license: NA
branch: master
stars: 50
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:01.762Z'
description: Component specific styles for react!
tags: []
---

# React Component Styles (RCS)

Component specific styles for react!

React solved the issue with organizing DOM components, but it was still missing a clean way to manage component specific styling.

# Demo / Example

- [live demo](http://jsfiddle.net/icodeforlove/pn2g6/embedded/result%2Ccss%2Cjs/)
- [example project](https://github.com/icodeforlove/react-rcs-example)

# How?

With RCS your CSS rules are scoped specificly to the component you're working on.

So heres your react component

```html
var Header = React.createClass({
	render: function () {
		return <div><a class="link"></a></div>;
	}
});
```

and heres some RCS

```css
view {
	height: 50px;
	background: blue;
}

.link {
	color: red;

	:hover {
		color: blue;
	}
}
```

we will render this component like this

<div class="react-view react-header"><a class="react-header_link"></a></div>

and we will transform the RCS into this

```css
.react-view.react-header {
	height: 50px;
	background: blue;
}

.react-view.react-header .react-header_link:hover {
	color: blue;
}

.react-view.react-header .react-header_link {
	color: red;
}
```

## Best Practices

We recommand that you seperate your RCS from your components so you can compile to css with `grunt-react-rcs`, just like you do with `jsx`.

## In browser transformations

You can take use in browser transformations like this just make sure use `rcs-with-transformer.js` instead of `rcs.js`

```sass
<style type="text/rcs">
	@component Header {
		view {
			height: 50px;
			background: blue;
		}

		.link {
			color: red;

			:hover {
				color: blue;
			}
		}
	}
</style>
```

or 

```sass
<style type="text/rcs" component="Header">
	view {
		height: 50px;
		background: blue;
	}

	.link {
		color: red;

		:hover {
			color: blue;
		}
	}
</style>
```

or

```
<link rel="stylesheet/rcs" type="text/css" href="style.rcs">
```

or

```
<link rel="stylesheet/rcs" type="text/css" href="style.rcs" component="Header">
```

or

```javascript
var Header = React.createClass({
	render: function () {
		return <div><a class="link"></a></div>;
	},

	style: {
		view: {
			height: '50px',
			background: 'blue'
		},

		'.link': {
			color: 'red',

			':hover': {
				color: 'blue'
			}
		}
	}
});

```

or if you are using JSX with harmony

```javascript
var Header = React.createClass({
	render: function () {
		return <div><a class="link"></a></div>;
	},

	style: `
		view {
			height: 50px;
			background: blue;
		}

		.link {
			color: red;

			:hover {
				color: blue;
			}
		}
	`
});

```

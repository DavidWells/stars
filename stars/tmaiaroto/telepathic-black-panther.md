---
repo: tmaiaroto/telepathic-black-panther
url: 'https://github.com/tmaiaroto/telepathic-black-panther'
homepage: null
starredAt: '2016-10-06T01:20:26Z'
createdAt: '2015-04-02T23:32:52Z'
updatedAt: '2022-06-02T00:22:23Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:18.762Z'
description: >-
  Automatically track events in Google Analytics based on your web site's
  content and UI.
tags: []
---

Telepathic Black Panther
---------

[![Build Status](https://travis-ci.org/tmaiaroto/telepathic-black-panther.svg?branch=master)](https://travis-ci.org/tmaiaroto/telepathic-black-panther) [![Test Coverage](https://codeclimate.com/github/tmaiaroto/telepathic-black-panther/badges/coverage.svg)](https://codeclimate.com/github/tmaiaroto/telepathic-black-panther) [![Code Climate](https://codeclimate.com/github/tmaiaroto/telepathic-black-panther/badges/gpa.svg)](https://codeclimate.com/github/tmaiaroto/telepathic-black-panther)

This handy JavaScript utility can be easily placed on your web pages to automatically report various events and extra detail to Google (universal) Analytics, 
a dataLayer, or just for you to capture and handle yourself in your own JavaScript. 

The name? Well, it's "telepathic" in the sense that it uses logic to understand your web site and user behavior. Then of course what do black panthers do best? 
Stalk! We're talking about analytics and tracking after all.

In all seriousness, this script should provide you with a great set of events and the ability to listen for them and changes to a dataLayer should you 
be working with one. By deafult it's going to report to Google Analytics so you shouldn't have to do much to set it up.

### Events tracked

There are some events out of the box that will be tracked if your page meets the requirements. They are as follows:

* **read** If a visitor has actually read the content on your page, this event gets logged. Telepathic?! No, we watch the amount of time spent 
on the page along with how far down the visitor scrolled.
* **scroll %** How far down the page a visitor has scrolled at set intervals, 25%, 50%, 75%, and 100%.
* **form abandonment** If a visitor starts filling out a form, but then doesn't finish before leaving.
* **slow form response** If a vistor takes a long time to fill out a form. This could mean they are debating something or having trouble for some reason.
* **outbound** Links being clicked that aren't your site's pages.
* **hashbang change** Links on site that perhaps link to an anchor farther down the page or for single-page JavaScript apps.
* **history change** When visitors click backward/forward on their browser.
* **mouseleave** When visitors move their mouse outside of an element on the page (can be the page itself).
* **inactivity** When visitors have been inactive for defined periods of time (1, 3, and 5 minutes by default).
* **time to engage** How long it took visitors, in seconds, to engage with elements on the page. Forms are automatically handled by default, but you can 
watch other elements for specific events.

With some configuration and quick calls to some JavaScript functions you can leverage many of the functions responsible for these events to get 
a far greater level of detail in your events. For example, by default, the **mouseleave** event only looks when a visitor's mouse has left the 
page toward the top of the window. However, you could call the function from Telepathic Black Panther yourself for something more specific, like 
a modal dialog or a form area.

Another good example would be in the **time to engage** event. By default, Telepathic Black Panther looks for forms on the page and applies the 
function to them in order to report the number of seconds before a visitor begins filling out your form on the page. However, you could instead 
apply that to a call to a specific link or button.

### How do I get my own Telepathic Black Panther?

Well, there's already a distribution waiting for you in the ```dist``` directory. Simply include that on your page. You can use Bower of course:

```bower install telepathic-black-panther```

Then add the script to your site pages.

```<script type="text/javascript" src="telepathic-black-panther.js"></script>```

Instantiate it after your Google Analytics embed code at the bottom of your pages.

```<script type="text/javascript">var panther = new Tbp();</script>```

The use of Google Analytics is optional, but it is recommended to include this script at the bottom of your page after Google Analytics. 
That's it! You have a basic implementation ready to go. Take a look at your Google Analytics real-time data and you should see some custom events 
coming in depending on what actions you take on your web page.

You should also be able to put it on your page as a Google Analytics plugin as described here: 
https://developers.google.com/analytics/devguides/collection/analyticsjs/plugins

This way you won't need to worry about the load order, but it likely won't be a problem either way.

### Configuration

TBD

### How Events are Tracked

Events can be complex and have a lot of pieces of information that we'd like to run reports with. Google Analytics unfortunately only has three
(technically four, but that doesn't help much) attributes for an event - ```category```, ```action```, and ```label```. The fourth is ```value``` 
but that doesn't help much, it's more of a "how many times did this event occur" value and we can't use it for anything other than a number. 

So this leaves us a little bit stuck at times. Some actions are global and not related to an element on the page, but others do relate to an 
element on the page and then have some sort of measurement or value we need to put into the label since Google's ```value``` is limited to 
only a number.

This is why Telepathic Black Panther will combine ```action:target``` into the action field. If there is no element or target then it'll just 
be the action. However, this method of concatenation affords us a much greater level of detail with Google Analytics events.

**Specifying the Target Name**    
You can manually adjust your HTML to include an attribute on an element to define the name (and you can use spaces, etc.). Like so:    
```panther-target="My Login Form"```    
Or you can simply let the name be calculated automatically. Note that this may be confusing in your reporting if the elements aren't unique. 
For example, you may have multiple forms on a page and if they don't have id attributes it'll be hard to tell them apart from one another.

Fortunately Google Analytics has a very complex condition builder so we can easily break these apart with "beginsWith" or even regular expressions. 
Google gets quite advanced for building segments into its reports so no problem there.

If you're pushing your events to other systems just be aware of this convention but also be aware that you can add to the event any additional 
data you like. All of the options you pass when calling the event function are passed back in the emitted event and so you can capture them 
there to push to whatever event system you wish to use if it's not Google Analytics.

You'll find that Telepathic Black Panther events do contain more than simply the category, action, and label. You'll find the time it occurred 
as well as the internal function name used to trigger the event and all other options passed to that function. Simply put; if you don't like 
something, you are always able to change it.

### The API

Telepathic Black Panther aims to be automatated so you don't need to work with the API all that much and configuration is minor, typically 
for when you don't want something tracked or for clarification in the labeling of elements on your page. However, you can manually call 
the functions yourself in your own JavaScript code and sometimes you can also leverage special attributes on your HTML elements to track 
specific events such as **time to engage** (see the configuration section above).

**Calling Event Emitters Manually**    
The functions that ultimately emit events are all available through your instantiated Telepathic Black Panther object (referred to as "panther"). 
So, given: ```var panther = new Tbp();```    

You can now call a function like this: ```panther.timeToEngage({element: $ki('#my-button')[0]});```    

Telepathic Black Panther comes with ki.js (https://github.com/dciccale/ki.js) which is a super slim jQuery like library. You can instead use jQuery 
if you have it available on your page, but ki is available globally for you under ```$ki``` and also under ```panther.$``` (in this example). So 
there should be no conflicts if you are using jQuery or some other library like it. Aside from internal needs and conflict concerns, the other 
reason for the use of ki.js was filesize. ki.js by itself (though some things have been added to it here) is less than half a kilobyte!

Every event emitting function that you can call will take a single options argument. It's an object containing everything the function needs 
as well as everything about the event and everything Google Analytics needs. So if you were to push events to any other solution, be aware 
that the emitted event object you listen for will contain everything passed in to the function.

This options object is where you'll also be able to override event values. Telepathic Black Panther has a specific convention (see the section above), 
but you are absolutely free and able to change that if you work with the functions manually and not in an automatic fashion.

Until more complex API documentation is complete, the best way to know what to pass is by reading through the source code.

Telepahtic Black Panther's code is well commented, but one of the most important things about it is it's message bus. The panther bus will emit all 
events and also emit an event when the dataLayer has something new pushed on to it. So if you are using a dataLayer for Google Tag Manager or 
any other purpose, you can listen in to it. Note that should you need more advanced dataLayer functions, you can take a look at: 
https://github.com/google/data-layer-helper

It's not the goal of this project to add a whole ton of functionality around the dataLayer, but you can certainly catch any event that's pushed 
onto it with ease. You may even find it easier than adding a listener with the data-layer-helper. So if that's all you need, then you're ok 
with Telepathic Black Panther alone. To do that, you can use:

```
var panther = new Tbp();

panther.bus.on("dataLayer", function(event, theDataLayer) {
	// `event` will be the data pushed on to the dataLayer array    
	// `theDataLayer` will be the entire array    
});
```

Again, Telepathic Black Panther will push onto the ```dataLayer``` if it is set on the page before ```new Tbp();``` is instantiated. If you named 
your dataLayer something else you can pass that in the options. Likewise, you can pass ```false``` to the ```dataLayer``` option and not have anything 
pushed on to the dataLayer from Telepathic Black Panther. You can also pass ```false``` to the ```ga``` option for that mattter and have nothing pushed 
to Google Analytics. See more under the configuration section.

You can also watch the panther bus for all events like so:

```
var panther = new Tbp();

panther.bus.on("event", function(event) {
});
```

Each event from Telephatic Black Panther is going to follow Google Analytic's event format so it will have a ```category```, ```action```, and ```label```. 
Each event will also contain the time when it occurred (under ```_occurred```), the internal function used from Telepathic Black Panther (under ```_method```), 
the time since the visitor's first visit to the site (under ```_firstVisit```), as well as all of the options for the method. Many of these will be ignored 
by Google Analytics, but you may find them useful.

For example, you can present the user with different content or a modal that automatically displays if it's been a week since the visitor first came to your site 
and they have scrolled down 50% on some page. There's a lot you can do with the events, but most importantly you can use them in your Google Analytics reporting 
to help create segments and such.

Telepathic Black Panther uses minibus (https://github.com/axelpale/minibus), so you may be interested in looking through it's API for additional functions.

You can get the number of milliseconds since Telepathic Black Panther has loaded too (the current page session) by calling: 

```
panther.timeSinceLoad();
```

You can also get the time (in milliseconds) since loaded from the property: 

```
panther.loadTime;
```

Again, you may find these values useful when dislpaying content to a visitor based on certain conditions.


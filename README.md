# IONIC-STARTER-FIREBASE

Just a simple Ionic starting template with Firebase set up and sidemenu.

*This template does not work on its own. It is missing the Ionic library, and AngularJS.*

##### [Original Repository at GitLab](https://gitlab.com/reneabreu/ionic-starter-firebase/)


## Installing

Since Ionic doesn't use GitLab as a source for themes, you have to install it manually. :(

But no need to be sad, it's still simple! Just start a new project, as usual:

```
$ ionic start myApp
```
Download this repo and replace the `www` folder content with this.

### Update

To make things easier I've created a mirror to my github and now you can install it like this:

```
ionic start myApp https://github.com/reneabreu/ionic-starter-firebase
```

*Don't forget the main repo is in [GitLab](https://gitlab.com/reneabreu/ionic-starter-firebase), so everything will happen there.*

## Configuring Firebase

Change your database rules:

```
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

In the `config.js` file, replace this with your firebase project info:

```
.constant("CONFIG", {
  "FIREBASE_API": '',
  "FIREBASE_AUTH_DOMAIN": '',
  "FIREBASE_DB_URL": '',
  "FIREBASE_STORAGE": '',
  "MESSAGE_SENDER_ID": ''
});
```

You can find your info under Authentication > Web Setup

## Author

* **René Abreu** - [reneabreu](https://gitlab.com/reneabreu)

## Credits 

* [Sunil Kumar](http://market.ionic.io/starters/ionic-firebase-3-starter) - I've used his auth system as a starter point

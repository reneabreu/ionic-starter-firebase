# IONIC-STARTER-FIREBASE

Just a simple Ionic starting template with Firebase configured and sidemenu.

*This template does not work on its own. It is missing the Ionic library, and AngularJS.*

## Installing

Since Ionic doesn't use GitLab as a source for themes, you have to install it manually. :(

But don't need to be sad, it's still simple! Just start a new project, as usual:

```
$ ionic start myApp
```
Download this repo and replace the `www` folder content with this.

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

In the `config.js` file replace this with your firebase project info:

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

## Credits 
[Sunil Kumar](http://market.ionic.io/starters/ionic-firebase-3-starter) - I've used his auth system as a starter point

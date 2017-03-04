angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $state) {

    $scope.doLogout = function() {

      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        //console.log("Logout successful");
        $state.go("login");

      }, function(error) {
        // An error happened.
        console.log(error);
      });

    } // end dologout()


  })

  /**
   * Login Controller
   */
  .controller('loginController', ['$scope', '$firebaseArray', 'CONFIG', '$document', '$state', '$ionicModal', function($scope, $firebaseArray, CONFIG, $document, $state, $ionicModal) {

    // Perform the login action when the user submits the login form
    $scope.doLogin = function(userLogin) {

      console.log(userLogin);

      if (userLogin.email != "" && userLogin.password.value != "") {

        firebase.auth().signInWithEmailAndPassword(userLogin.email, userLogin.password).then(function() {

          // Sign-In successful.
          //console.log("Login successful");

          var user = firebase.auth().currentUser;

          var name, email, photoUrl, uid;

          /**
           * Check if User had Verified Email
           * It's deactivated by default. If you want this feature just uncomment the lines below
           * and delete the uncommented lines
           */

          /*if(user.emailVerified) {

            console.log("email verified");

            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            uid = user.uid;

            $state.go("app.profile");

          }else{

              alert("Email not verified, please check your inbox or spam messages")
              return false;

          } /* End of Email Verification */

          // Delete this, if you uncommented the email verification
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          uid = user.uid;

          $state.go("app.profile");

        }, function(error) {
          // An error happened.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          if (errorCode === 'auth/invalid-email') {
            alert('Enter a valid email.');
            return false;
          } else if (errorCode === 'auth/wrong-password') {
            alert('Incorrect password.');
            return false;
          } else if (errorCode === 'auth/argument-error') {
            alert('Password must be string.');
            return false;
          } else if (errorCode === 'auth/user-not-found') {
            alert('No such user found.');
            return false;
          } else if (errorCode === 'auth/too-many-requests') {
            alert('Too many failed login attempts, please try after sometime.');
            return false;
          } else if (errorCode === 'auth/network-request-failed') {
            alert('Request timed out, please try again.');
            return false;
          } else {
            alert(errorMessage);
            return false;
          }
        });

      } else {

        alert('Please enter email and password');
        return false;

      } //end check client username password

    }; // end $scope.doLogin()

  }])

  /**
   * Sign-Up Controller
   */
  .controller('signupController', ['$scope', '$state', '$document', '$firebaseArray', 'CONFIG', function($scope, $state, $document, $firebaseArray, ProfilePic, CONFIG) {

    /**
     * Hack to get file from input
     */
    var ctrl = this;
    ctrl.onChange = function onChange(fileList) {
      ProfilePic.file = fileList[0];
      console.log(ProfilePic.file);
    };

    /**
     * Sign-up Function
     */
    $scope.doSignup = function(userSignup) {

      /** Check if email and password aren't empty */
      if (userSignup.email != "" && userSignup.password != "") {

        /** Create new user with email and password */
        firebase.auth().createUserWithEmailAndPassword(userSignup.email, userSignup.password).then(function() {

          // Sign-Up successful.
          //console.log("Signup successful");

          var user = firebase.auth().currentUser;

          /**
           * Send verification email
           * It's deactivated by default. If you want this feature just uncomment the line below
           */
          //user.sendEmailVerification().then(function(result) { console.log(result) },function(error){ console.log(error)});

          /**
           * Upload Profile Picture
           */
          // Create a root reference of Firebase Storage
          // This reference is needed to upload files
          var storageRef = firebase.storage().ref();

          // File from input
          var file = ProfilePic.file;

          // Upload the file to the specified path
          // In this case it's uploaded at 'profilePics/UserID/ProfilePic'
          var uploadTask = storageRef.child('profilePics/' + user.uid + '/profilepic').put(file);

          // Register three observers:
          // 1. 'state_changed' observer, called any time the state changes
          // 2. Error observer, called on failure
          // 3. Completion observer, called on successful completion
          uploadTask.on('state_changed', function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            // See below for more detail
          }, function(error) {
            // Handle unsuccessful uploads
          }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            var downloadURL = uploadTask.snapshot.downloadURL;
            // Update User Profile
            user.updateProfile({
              displayName: userSignup.firstName + " " + userSignup.lastName,
              photoURL: downloadURL
            }).then(function() {
              // Update user info successful.

              /**
               * Create User Data on DB.
               * Here we can expand the user data creating an user entry in the DB
               */
              firebase.database().ref('users/' + user.uid).set({
                // New Entry Data
                firstName: userSignup.firstName,
                lastName: userSignup.lastName,
                displayName: userSignup.firstName + " " + userSignup.lastName,
                email: userSignup.email,
                profile_picture: downloadURL,
                birthday: userSignup.birthday.valueOf()

              });

              $state.go("login");
            }, function(error) {
              // An error happened.
              console.log(error);
            });
          });

        }, function(error) {
          // An error happened.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);

          if (errorCode === 'auth/weak-password') {
            alert('Password is weak, choose a strong password.');
            return false;
          } else if (errorCode === 'auth/email-already-in-use') {
            alert('Email you entered is already in use.');
            return false;
          }

        });

      } else {

        alert('Please enter email and password');
        return false;

      } //end check client username password

    }; // end $scope.doSignup()

  }])

  /**
   * Reset Password Controller
   */
  .controller('resetController', ['$scope', '$state', '$document', '$firebaseArray', 'CONFIG', function($scope, $state, $document, $firebaseArray, CONFIG) {

    $scope.doResetemail = function(userReset) {

      //console.log(userReset);

      if (userReset != "") {


        firebase.auth().sendPasswordResetEmail(userReset).then(function() {
          // Email Sent
          //console.log("Reset email sent successful");

          $state.go("login");

        }, function(error) {
          // An error happened.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);

          if (errorCode === 'auth/user-not-found') {
            alert('No user found with provided email.');
            return false;
          } else if (errorCode === 'auth/invalid-email') {
            alert('Email you entered is not complete or invalid.');
            return false;
          }

        });

      } else {

        alert('Please enter registered email to send reset link');
        return false;

      } //end check client username password

    }; // end $scope.doResetemail()

  }])

  /**
   * Navbar Controller
   */
  .controller('NavController', function($scope, $ionicHistory) {
    $scope.GoBack = function() {
      $ionicHistory.goBack();
    };
  })

  /**
   * Profile Controller
   * Let's read some data from Firebase
   */
  .controller('profileController', function($scope, $firebase, GetData, Auth) {

    $scope.auth = Auth;

    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.me = GetData.getObject('users', firebaseUser.uid);
    });
  })

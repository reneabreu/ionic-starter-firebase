angular.module('starter.services', [])

  /**
   * Get Any Data From DB
   */
  .factory('GetData', function($firebaseArray, $firebaseObject) {

    var ref = firebase.database().ref();

    return {
      getArray: function(arrayID) {
        return $firebaseArray(ref.child(arrayID));
      },
      getObject: function(arrayID, objectID) {
        return $firebaseObject(ref.child(arrayID).child(objectID));
      }
    }
  })

  /**
   * Get authentication state
   */
  .factory("Auth", ["$firebaseAuth",
   function($firebaseAuth) {
     return $firebaseAuth();
   }
 ])

  /**
   *  Hack to Get Files From Input
   */

  .service("ProfilePic", function() {
    var file;

    return {
      file
    }
  })

  .directive("fileUpload", function(ProfilePic) {

    var photo = ProfilePic.file;
    return {
      restrict: "E",
      transclude: true,
      scope: {
        onChange: "="
      },
      template: '<input type="file" name="file" accept="image/*" /><label><ng-transclude></ng-transclude></label>',
      link: function(scope, element, attrs) {
        element.bind("change", function() {
          scope.onChange(element.children()[0].files);
        });
      }
    };
  })

// Declare module.
var myApp = angular.module('myApp', ['oitozero.ngSweetAlert']);

// Define controller.
myApp.controller('myController', function($scope, SweetAlert) {
    // Initial text.
    $scope.text = "Some text";

    // Font properties.
    $scope.size = 18;
    $scope.unit = "px";
    $scope.bold = false;
    $scope.italic = false;
    $scope.upper = false;

    // List of safe fonts.
    $scope.fonts = {
        Serif: [
            'Georgia, serif',
            '"Palatino Linotype", "Book Antiqua", Palatino, serif',
            '"Times New Roman", Times, serif',
        ],
        SansSerif: [
            'Arial, Helvetica, sans-serif',
            '"Arial Black", Gadget, sans-serif',
            'Verdana, Geneva, sans-serif',
            'Tahoma, Geneva, sans-serif',
            '"Trebuchet MS", Helvetica, sans-serif',
            '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
            '"Comic Sans MS", cursive, sans-serif',
            'Impact, Charcoal, sans-serif',
        ],
        Monospace: [
            '"Courier New", Courier, monospace',
            '"Lucida Console", Monaco, monospace',
        ],
    };

    // Display the name of the font selected by the user.
    $scope.clicked = function(font) {
        SweetAlert.swal("font-family: " + font + ";");
    }

    // Extract the first font from a list of fonts.
    $scope.getFirst = function(font) {
        var res = font;

        var index = res.indexOf(', ')
        if(index > 0) res = res.slice(0, index);

        res = res.replace('"', '');
        res = res.replace('"', '');

        return res;
    }
});

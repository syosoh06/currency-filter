/**
 * Created by sohamchakraborty on 9/30/15.
 */
var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
    $scope.name = 'World';
    $scope.nmbr = 0;
    $scope.testNumber = 233.555;
});
app.$inject = ['$filter'];
angular.module('plunker').
    directive('onlyDigits', ['$filter', function($filter) {

        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, element, attrs, ngModel) {
                if (!ngModel) return;
                /**
                 * This function is added to the list of the $parsers.
                 * It will be executed the DOM (the view value) change.
                 * Array.unshift() put it in the beginning of the list, so
                 * it will be executed before all the other
                 */
                ngModel.$parsers.unshift(function(inputValue) {
                    console.log(inputValue);
                    //var digits = inputValue.split('').filter(function (s) { return (!isNaN(s) && s != ' '); }).join('');
                    var d1 = inputValue.split('');
                    console.log("d1 is", d1);
                    var d2 = d1.filter(function(s) {
                        return ((!isNaN(s) && s != ' ') || s == '.' || s == ',');
                    });
                    console.log("d2 is", d2);

                    var digits = d2.join('');


                    console.log("the filtered digits are", digits);

                    ngModel.$viewValue = digits;

                    ngModel.$render();

                    return digits;
                });
                element.bind('blur', function() {

                    var valueWithoutCommas = (ngModel.$modelValue).split('').filter(function (s) { return ((!isNaN(s) && s != ' ') || s == '.'); }).join('');
                    ngModel.$viewValue = $filter('currency')(valueWithoutCommas);
                    ngModel.$modelValue = valueWithoutCommas;
                    ngModel.$render();
                    console.log('valueWithoutCommas', valueWithoutCommas);
                    console.log("the final ngmodel on blur is --", ngModel);
                });
            }
        };
    }]);
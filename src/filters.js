import moment from 'moment';

export default angular.module('todoApp.filters', [])
    .filter('customDate', function () {
        return function (d) {
            return moment(d).format('DD/MM/YYYY hh:mm');
        };
    })
    .filter('startsWithLetter', function () {
        return function (items, letter) {
            let filtered = [];
            let letterMatch = new RegExp(letter, 'i');
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                if (letterMatch.test(item.text.substring(0, 1))) {
                    filtered.push(item);
                }
            }
            return filtered;
        };
    });



// app.directive('min20symbols', function () {
//     return {
//         require: 'ngModel',
//         link: function (scope, element, attr, ngModel) {
//             ngModel.$validators.lengthCheck = function (modelValue, viewValue) {
//                 if (ngModel.$isEmpty(modelValue)) {
//                     return true;
//                 }
//
//                 return viewValue.length > 20;
//             };
//         }
//     };
// });


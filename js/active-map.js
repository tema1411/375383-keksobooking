'use strict';
(function () {
  var fieldsets = document.querySelectorAll('fieldset');
  // определяем контейнера пина
  var containerPins = document.querySelector('.map__pins');
  var changeFormState = function (сonfiguring) {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = сonfiguring;
    }
  };
  changeFormState('disabled');
  // удаления пинов
  var deletePin = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].remove();
    }
  };
  // генерируем пины для заданного колличтсва объявлений
  window.activeMap = {
    onActiveMap: function (array) {
      var mapPinsElement = window.getMapPinsElements(array);
      changeFormState(null);
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      containerPins.appendChild(mapPinsElement);
      window.variables.inputAdress.value = window.util.getСoordinatesMainPin();
    },
    disableMap: function () {
      var allPins = containerPins.querySelectorAll('[type = button]');
      deletePin(allPins);
      changeFormState('disabled');
      document.querySelector('.map').classList.add('map--faded');
      document.querySelector('.ad-form').classList.add('ad-form--disabled');
    }
  };
})();

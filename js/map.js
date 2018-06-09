'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES_CHECKINS_AND_CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_MIN_X = 300;
var LOCATION_MAX_X = 900;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var MIX_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_GUESTS = 1;
var MAX_GUESTS = 12;
var MIN_LENGTH_ARRAY = 1;
var QUANTITY_OFFER = 8;
var WIDTH_PIN = 62;
var HEIGHT_PIN = 84;
var MIN_ROOM = 1;
var MAX_ROOM = 5;
// Функция случайное рандомное число без учета максимального.
var getRandomNumberWithoutMaximum = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};
// Функция случайное рандомное число с учеета максимального.
var getRandomNumberWithMaximum = function (min, max) {
  return Math.floor(min + Math.random() * ((max + 1) - min));
};
// Функция случайный элемент массива.
var getRandomItemFromArray = function (array) {
  return array[getRandomNumberWithoutMaximum(0, array.length)];
};
// Функция случаная длина массива.
var getrandomLengthArray = function (array, minLengthArray) {
  array.length = getRandomNumberWithMaximum(minLengthArray, array.length);
  return array;
};
// Функция перемешивает массив случайным образом.
var randomMixArray = function (array) {
  return array.sort(function () {
    return Math.random() - 0.5;
  });
};
// Функция генерации одного объявления с случаными параматерами.
var getRandomOffer = function (linkAvatar) {
  var offerInfo = {
    author: {
      avatar: linkAvatar
    },
    offer: {
      title: getRandomItemFromArray(TITLES),
      price: getRandomNumberWithMaximum(MIX_PRICE, MAX_PRICE),
      type: getRandomItemFromArray(TYPES),
      rooms: getRandomNumberWithMaximum(MIN_ROOM, MAX_ROOM),
      guests: getRandomNumberWithMaximum(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomItemFromArray(TIMES_CHECKINS_AND_CHECKOUTS),
      checkout: getRandomItemFromArray(TIMES_CHECKINS_AND_CHECKOUTS),
      features: getrandomLengthArray(FEATURES, MIN_LENGTH_ARRAY),
      description: '',
      photos: randomMixArray(PHOTOS)
    },
    location: {
      x: getRandomNumberWithMaximum(LOCATION_MIN_X, LOCATION_MAX_X),
      y: getRandomNumberWithMaximum(LOCATION_MIN_Y, LOCATION_MAX_Y)
    }
  };
  offerInfo.offer.address = offerInfo.location.x + ', ' + offerInfo.location.y;
  return offerInfo;
};
// Функция генерации массива с заднным(quantity) колличеством объявлений с случаными параматерами.
var getRandomsOffers = function (quantity) {
  var randomsOffers = [];
  var currentNumberTitlesAndAvatar = quantity;
  for (var i = 0; i <= quantity - 1; i++) {
    var currentRandomOffer = getRandomOffer();
    currentRandomOffer.offer.title = TITLES[currentNumberTitlesAndAvatar - 1];
    currentRandomOffer.author.avatar = 'img/avatars/user0' + currentNumberTitlesAndAvatar + '.png';
    randomsOffers.push(currentRandomOffer);
    currentNumberTitlesAndAvatar--;
  }
  return randomsOffers;
};

// Функция возвращает элемента пин.
var getMapPinElement = function (obj) {
  var pinElement = similarMapPinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (obj.location.x - WIDTH_PIN / 2) + 'px; top: ' + (obj.location.y - HEIGHT_PIN) + 'px';
  pinElement.querySelector('img').src = obj.author.avatar;
  pinElement.querySelector('img').alt = obj.offer.title;
  return pinElement;
};
// Функция возвращает множество элемнтов пин//
var getMapPinsElements = function (array) {
  var pinsElements = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    pinsElements.appendChild(getMapPinElement(array[i]));
  }
  return pinsElements;
};


var translateType = function (typeEn) {
  if (typeEn === 'flat') {
    return 'Квартира';
  } else if (typeEn === 'bungalo') {
    return 'Бунгало';
  } else if (typeEn === 'house') {
    return 'Дом';
  } else {
    return 'Дворец';
  }
};

// var getDescriptionsElements = function (array) {
//   var descriptionsElements = document.createDocumentFragment();
//   for (var i = 0; i < array.length; i++) {
//     var bb;
//     bb = bb.createElement('li');
//     descriptionsElements.appendChild(bb);
//   }
//   return descriptionsElements;
// };
// Функция возвращает элемент объявления
var getOfferElement = function (obj) {
  var offerElement = similarOfferTemplate.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = obj.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = obj.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = obj.offer.price + '&#x20bd';
  offerElement.querySelector('.popup__type').textContent = translateType(obj.offer.type);
  offerElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  offerElement.querySelector('.popup__description').textContent = obj.offer.description;
  offerElement.querySelector('.popup__photos').textContent = obj.offer.photos;
  return offerElement;
};


// Генерируем массив с 8 случаными объявлениями.
var offers = getRandomsOffers(QUANTITY_OFFER);

document.querySelector('.map').classList.remove('map--faded');
// определяем шаблон пина и объявления.
var similarMapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var similarOfferTemplate = document.querySelector('template').content.querySelector('.map__card');
var listFeatures = document.querySelector('template').content.querySelector('.popup__features')
// генерируем пины для заданного колличтсва объявлений
var mapPinsElement = getMapPinsElements(offers);
// вставляем сгенерированные пины в разметку.
var containerPins = document.querySelector('.map__pins');
containerPins.appendChild(mapPinsElement);
console.log('offers', offers)
console.log('getrandomLengthArray', getrandomLengthArray(FEATURES, MIN_LENGTH_ARRAY))
console.log('getrandomLengthArray', getrandomLengthArray(TYPES, MIN_LENGTH_ARRAY))
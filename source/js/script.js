(function mobileMenu() {
	var mainNavigation = document.querySelector('.main-nav');
	var hamburgerToggle = document.querySelector('#nav-toggle');

	hamburgerToggle.addEventListener('click', function (event) {
		event.preventDefault();
		this.classList.toggle('active');
		mainNavigation.classList.toggle('is-open');
	});
})();

(function sorting() {
	var priceSortingButton = document.querySelector('#sorting-by-price');
	var roomsSortingButton = document.querySelector('#sorting-by-rooms');
	var catalogList = document.querySelector('.catalog-items');

	function sortingDirectionHelper() {
		var currentButton = event.target;
		var currentSortingDirection = currentButton.dataset.sorting;

		if (currentSortingDirection === 'down') {
			currentButton.dataset.sorting = 'up';
		} else {
			currentButton.dataset.sorting = 'down';
		}
		return currentButton.dataset.sorting;
	}

	function doSortingByPrice() {
		var sortingDirection = sortingDirectionHelper();
		if (sortingDirection === 'up') {
			sortingPriceUp();
		} else {
			sortingPriceDown();
		}
	}

	function doSortingByRooms() {
		var sortingDirection = sortingDirectionHelper();
		if (sortingDirection === 'up') {
			sortingRoomsUp();
		} else {
			sortingRoomsDown();
		}
	}

	function sortingHelper(sorter) {
		var catalogItems = catalogList.childNodes;
		var catalogItemsArray = [];
		for (var i in catalogItems) {
			if (catalogItems[i].nodeType == 1) { // get rid of the whitespace text nodes
				catalogItemsArray.push(catalogItems[i]);
			}
		}

		sorter(catalogItemsArray);

		for (i = 0; i < catalogItemsArray.length; ++i) {
			catalogList.appendChild(catalogItemsArray[i]);
		}
	}

	function sortingPriceUp() {
		// Сортируем по возрастанию цены
		var priceUpSorter = function (catalogItemsArray) {
			return catalogItemsArray.sort(function (a, b) {
				var valueA = a.querySelector('.catalog-item__price').innerHTML.replace(/\D/g, '');
				var valueB = b.querySelector('.catalog-item__price').innerHTML.replace(/\D/g, '');
				return valueA - valueB;
			});
		};
		sortingHelper(priceUpSorter);
	}

	function sortingPriceDown() {
		// Сортируем по убыванию цены'
		var priceDownSorter = function (catalogItemsArray) {
			return catalogItemsArray.sort(function (a, b) {
				var valueA = a.querySelector('.catalog-item__price').innerHTML.replace(/\D/g, '');
				var valueB = b.querySelector('.catalog-item__price').innerHTML.replace(/\D/g, '');
				return valueB - valueA;
			});
		};
		sortingHelper(priceDownSorter);
	}

	function sortingRoomsUp() {
		// Сортируем по возрастанию кол-ва комнат
		var roomsUpSorter = function (catalogItemsArray) {
			return catalogItemsArray.sort(function (a, b) {
				var valueA = a.querySelector('.catalog-item__title').dataset.rooms;
				var valueB = b.querySelector('.catalog-item__title').dataset.rooms;
				return valueA - valueB;
			});
		};
		sortingHelper(roomsUpSorter);
	}

	function sortingRoomsDown() {
		// Сортируем по убыванию кол-ва комнат
		var roomsDownSorter = function (catalogItemsArray) {
			return catalogItemsArray.sort(function (a, b) {
				var valueA = a.querySelector('.catalog-item__title').dataset.rooms;
				var valueB = b.querySelector('.catalog-item__title').dataset.rooms;
				return valueB - valueA;
			});
		};
		sortingHelper(roomsDownSorter);
	}

	document.addEventListener('DOMContentLoaded', function (event) {
		var defaultPriceSortingDirection = priceSortingButton.dataset.sorting;
		if (defaultPriceSortingDirection === 'up') {
			sortingPriceUp();
		} else {
			sortingPriceDown();
		}

		var defaultRoomsSortingDirection = roomsSortingButton.dataset.sorting;
		if (defaultRoomsSortingDirection === 'up') {
			sortingRoomsUp();
		} else {
			sortingRoomsDown();
		}
	});

	priceSortingButton.addEventListener('click', function (event) {
		event.preventDefault();
		doSortingByPrice();
	});

	roomsSortingButton.addEventListener('click', function (event) {
		event.preventDefault();
		doSortingByRooms();
	});
})();

(function addMoreCatalogItems() {
	var showMoreButton = document.querySelector('.button--show-more');
	showMoreButton.addEventListener('click', function (event) {
		event.preventDefault();
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'apartment.json', true);

		xhr.onload = function () {
			if (this.status == 200) {
				var catalogContainer = document.querySelector('.catalog-items');
				var apartments = JSON.parse(this.responseText);
				var outputTemplate = '';

				for (var i in apartments) {
					outputTemplate += '<div class="catalog-item ' + apartments[i].statusClass + '">' +
						'<div class="catalog-item__header">' +
						'<ul class="flag-list">' +
						'<li class="flag-list__item">' + apartments[i].flags.percentage + '</li>' +
						'<li class="flag-list__item">' + apartments[i].flags.title + '</li>' +
						'</ul>' +
						'<p class="add-to-favorite">' +
						'<input class="visually-hidden add-to-favorite__input" type="checkbox" name="add-to-favorite" id="add-to-favorite-11">' +
						'<label class="add-to-favorite__label" for="add-to-favorite-11"></label>' +
						'</p>' +
						'</div>' +
						'<div class="catalog-item__image">' +
						'<picture>' +
						'<source type="image/webp" srcset="' + apartments[i].imageWEBP + '">' +
						'<source type="image/png" srcset="' + apartments[i].imagePNG + '">' +
						'<img src="' + apartments[i].imagePNG + '" alt="План помещения">' +
						'</picture>' +
						'</div>' +
						'<div class="catalog-item__data">' +
						'<div class="catalog-item__body">' +
						'<h4 class="catalog-item__title" data-rooms="' + apartments[i].rooms + '">' + apartments[i].title + '</h4>' +
						'<div class="data-main">' +
						'<table class="catalog-item__data-table data-table">' +
						'<tr>' +
						'<td class="data-table__finish">' + apartments[i].finish + '</td>' +
						'<td class="data-table__space">' +
						'<dl class="data-table__parameter parameter">' +
						'<dt class="parameter__value">' + apartments[i].space + '</dt>' +
						'<dd class="parameter__description">площадь</dd>' +
						'</dl>' +
						'</td>' +
						'<td class="data-table__floor">' +
						'<dl class="data-table__parameter parameter">' +
						'<dt class="parameter__value">' + apartments[i].floor + '</dt>' +
						'<dd class="parameter__description">этаж</dd>' +
						'</dl>' +
						'</td>' +
						'</tr>' +
						'</table>' +
						'<p class="catalog-item__price">' + apartments[i].price + '</p>' +
						'</div>' +
						'</div>' +
						'<footer class="catalog-item__footer">' +
						'<span class="catalog-item__status">' + apartments[i].statusText + '</span>' +
						'</footer>' +
						'</div>' +
						'</div>';
				}
				catalogContainer.insertAdjacentHTML('beforeend', outputTemplate);
			}
		}

		xhr.send();
	});
})();

(function scrollTopButton() {
	var scrollTopButton = document.querySelector('.button--scroll-top');
	scrollTopButton.addEventListener('click', function (event) {
		event.preventDefault();
		scrollTo(0, 1250);
	});

	var scrollTo = function (to, duration) {
		var element = document.scrollingElement || document.documentElement;
		var start = element.scrollTop;
		var change = to - start;
		var startDate = +new Date();
		// t = current time
		// b = start value
		// c = change in value
		// d = duration
		var easeInOutQuad = function (t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		};

		var animateScroll = function () {
			var currentDate = +new Date();
			var currentTime = currentDate - startDate;
			element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
			if (currentTime < duration) {
				requestAnimationFrame(animateScroll);
			} else {
				element.scrollTop = to;
			}
		};
		animateScroll();
	};
})();

(function validateEmail() {
	var form = document.querySelector('.subscribtion__form');
	var emailInput = document.querySelector('.subscribtion__email-input');
	var inputContainer = document.querySelector('.subscribtion__input-wrapper');
	var submitButton = document.querySelector('.button--subscription');
	var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	form.addEventListener('invalid', function (event) {
		event.preventDefault();
	}, true);

	emailInput.addEventListener('blur', function (event) {
		var currentField = event.target;
		var currentMessage = currentField.parentNode.querySelector('.error-message');
		if (currentMessage) {
			removeMessage(currentMessage);
		}	
	});

	var addMessage = function (message) {
		var messageElement = document.createElement('span');
		messageElement.textContent = message;
		messageElement.classList.add('error-message');
		inputContainer.appendChild(messageElement);
	};

	var removeMessage = function (messageElement) {
		messageElement.parentNode.removeChild(messageElement);
	}

	submitButton.addEventListener('click', function (event) {
		event.preventDefault();
		if (emailInput.value.match(mailFormat)) {
			console.log('валидно');
		} else {
			addMessage('Неправильный формат');
			emailInput.focus();
		}
	});
})();
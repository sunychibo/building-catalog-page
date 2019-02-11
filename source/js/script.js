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

    function sortingPriceUp() {
        console.log('Сортируем по возрастанию цены');
        var catalogItems = catalogList.childNodes;
        var catalogItemsArray = [];

        for (var i in catalogItems) {
            if (catalogItems[i].nodeType == 1) { // get rid of the whitespace text nodes
                catalogItemsArray.push(catalogItems[i]);
            }
        }

        catalogItemsArray.sort(function (a, b) {
            var valueA = a.querySelector('.catalog-item__price').innerHTML.replace(/\D/g, '');
            var valueB = b.querySelector('.catalog-item__price').innerHTML.replace(/\D/g, '');
            return valueA - valueB;
        });

        for (i = 0; i < catalogItemsArray.length; ++i) {
            catalogList.appendChild(catalogItemsArray[i]);
        }
    }

    function sortingPriceDown() {
        console.log('Сортируем по убыванию цены');
        var catalogItems = catalogList.childNodes;
        var catalogItemsArray = [];
        for (var i in catalogItems) {
            if (catalogItems[i].nodeType == 1) { // get rid of the whitespace text nodes
                catalogItemsArray.push(catalogItems[i]);
            }
        }

        catalogItemsArray.sort(function (a, b) {
            var valueA = a.querySelector('.catalog-item__price').innerHTML.replace(/\D/g, '');
            var valueB = b.querySelector('.catalog-item__price').innerHTML.replace(/\D/g, '');
            return valueB - valueA;
        });

        for (i = 0; i < catalogItemsArray.length; ++i) {
            catalogList.appendChild(catalogItemsArray[i]);
        }
    }

    function sortingRoomsUp() {
        console.log('Сортируем по возрастанию кол-ва комнат');
        var catalogItems = catalogList.childNodes;
        var catalogItemsArray = [];
        for (var i in catalogItems) {
            if (catalogItems[i].nodeType == 1) { // get rid of the whitespace text nodes
                catalogItemsArray.push(catalogItems[i]);
            }
        }

        catalogItemsArray.sort(function (a, b) {
            var valueA = a.querySelector('.catalog-item__title').dataset.rooms;
            var valueB = b.querySelector('.catalog-item__title').dataset.rooms;
            return valueA - valueB;
        });

        for (i = 0; i < catalogItemsArray.length; ++i) {
            catalogList.appendChild(catalogItemsArray[i]);
        }
    }

    function sortingRoomsDown() {
        console.log('Сортируем по убыванию кол-ва комнат');
        var catalogItems = catalogList.childNodes;
        var catalogItemsArray = [];
        for (var i in catalogItems) {
            if (catalogItems[i].nodeType == 1) { // get rid of the whitespace text nodes
                catalogItemsArray.push(catalogItems[i]);
            }
        }

        catalogItemsArray.sort(function (a, b) {
            var valueA = a.querySelector('.catalog-item__title').dataset.rooms;
            var valueB = b.querySelector('.catalog-item__title').dataset.rooms;
            return valueB - valueA;
        });

        for (i = 0; i < catalogItemsArray.length; ++i) {
            catalogList.appendChild(catalogItemsArray[i]);
        }
    }

    priceSortingButton.addEventListener('click', function (event) {
        event.preventDefault();
        doSortingByPrice();
    });

    roomsSortingButton.addEventListener('click', function (event) {
        event.preventDefault();
        doSortingByRooms();
    });
})();

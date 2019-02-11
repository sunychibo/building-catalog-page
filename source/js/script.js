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
        var priceUpSorter = function(catalogItemsArray) {
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
        var priceDownSorter = function(catalogItemsArray) {
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
        var roomsUpSorter = function(catalogItemsArray) {
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
        var roomsDownSorter = function(catalogItemsArray) {
            return catalogItemsArray.sort(function (a, b) {
                var valueA = a.querySelector('.catalog-item__title').dataset.rooms;
                var valueB = b.querySelector('.catalog-item__title').dataset.rooms;
                return valueB - valueA;
            });
        };    
        sortingHelper(roomsDownSorter);
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


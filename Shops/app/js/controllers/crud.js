shopApp.controller("showController", function ($scope) {
    $scope.list = model;
    $scope.listProductsOn = productsOnModel;

    $scope.addShop = function (name, address, timeWorking, id) {

        if (name != "" && address != "" && timeWorking != "" && id != "") {
            var boolArray = true;
            $scope.list.shops.forEach(function (item, i, arr) {
                if (item.name == name || item.id == id) {
                    boolArray = false;
                    return;
                }
            });
            if (boolArray) $scope.list.shops.push({ name: name, address: address, timeWorking: timeWorking, id: id });
            var boolSelect = true;
            $('.list-shops option').each(function () {
                if ($('.list-shops option')[0] != this && this.text == name) {
                    boolSelect = false;
                    return;
                }
            });
            if (boolSelect) $('.list-shops').append('<option  value="' + id + '">' + name + '</option>');
        }
    }

    $scope.delShop = function (id) {

        if (id != "") {
            $scope.list.shops.splice({ id: id }, 1);
            $('.list-shops [value = ' + id + ']').remove();
        }
    }

    $scope.editShop = function (name, address, timeWorking, id) {
        var i = 0;
        for (i; i < $scope.list.shops.length; i++) {
            if (name != "" && address != "" && timeWorking != "" && id != "" && $scope.list.shops[i].id == id) {
                var boolArray = true;
                $scope.list.shops.forEach(function (item, i, arr) {
                    if (item.name == name) {
                        boolArray = false;
                        return;
                    }
                });
                if (boolArray) $scope.list.shops.splice(i, 1, { name: name, address: address, timeWorking: timeWorking, id: id });
                $('.list-shops [value = ' + id + ']').text(name);
            }
        }
    }

    $scope.getShop = function (name, address, timeWorking, id) {

        for (var i = 0; i < $scope.list.shops.length; i++) {
            if ($scope.list.shops[i].name == name &&
                $scope.list.shops[i].address == address &&
                $scope.list.shops[i].timeWorking == timeWorking &&
                $scope.list.shops[i].id == id) {
                $scope.name = $scope.list.shops[i].name
                $scope.address = $scope.list.shops[i].address;
                $scope.timeWorking = $scope.list.shops[i].timeWorking;
                $scope.id = $scope.list.shops[i].id;
            }
        }
    }

    $scope.addProduct = function (nameProduct, information) {

        if (nameProduct != "" && information != "") {

            var boolArray = true;
            $scope.list.products.forEach(function (item, i, arr) {
                if (item.nameProduct == nameProduct) {
                    boolArray = false;
                    return;
                }
            });
            if (boolArray) $scope.list.products.push({ nameProduct: nameProduct, information: information });
            var boolSelect = true;
            $('.list-products option').each(function () {
                if ($('.list-products option')[0] != this && this.text == nameProduct) {
                    boolSelect = false;
                    return;
                }
            });
            if (boolSelect) $('.list-products').append('<option  value="' + nameProduct + '">' + nameProduct + '</option>');
        }
    }

    $scope.delProduct = function (nameProduct) {

        if (nameProduct != "") {
            $scope.list.products.splice({ nameProduct: nameProduct }, 1);
            $('.list-products [value = ' + nameProduct + ']').remove();
        }
    }

    $scope.editProduct = function (nameProduct, information) {
        var i = 0;
        for (i; i < $scope.list.products.length; i++) {
            if (nameProduct != "" && information != "" && $scope.list.products[i].nameProduct == nameProduct) {
                var boolArray = true;
                $scope.list.products.forEach(function (item, i, arr) {
                    if (item.information == information) {
                        boolArray = false;
                        return;
                    }
                });
                if (boolArray) $scope.list.products.splice(i, 1, { nameProduct: nameProduct, information: information });
                $('.list-products [value = ' + nameProduct + ']').text(nameProduct);
            }
        }
    }

    $scope.getProduct = function (nameProduct, information) {
        for (var i = 0; i < $scope.list.products.length; i++) {
            if ($scope.list.products[i].nameProduct == nameProduct &&
                $scope.list.products[i].information == information) {
                $scope.nameProduct = $scope.list.products[i].nameProduct
                $scope.information = $scope.list.products[i].information;
            }
        }
    }

    $scope.addOnStore = function () {
        var boolSelect = true;

        var nameShop, addressShop, timeWorkingShop, informationProduct, id, information, nameProduct = '';


        if ($('.list-shops').val() == $('.list-shops option')[0] &&
            $('.list-shops').val() == '' &&
            $('.list-products').val() == $('.list-products option')[0] &&
            $('.list-shops').val() == '') {
            boolSelect = false;
            return;
        }
        if (boolSelect) this.id = $('.list-shops').val();//id
        this.nameProduct = $('.list-products').val();//value

        var y = 0;
        for (y; y <= $scope.list.products.length - 1; y++) {
            if ($scope.list.products[y].nameProduct == this.nameProduct) {
                this.informationProduct = $scope.list.products[y].information;
                break;
            }
        }

        var x = 0;
        for (x; x <= $scope.list.shops.length - 1; x++) {
            if ($scope.list.shops[x].id == this.id) {
                this.nameShop = $scope.list.shops[x].nameShop;
                this.addressShop = $scope.list.shops[x].address;
                this.timeWorkingShop = $scope.list.shops[x].timeWorking;
                break;
            }
        }
        if ($scope.list.shops[x].productsOn)
            $scope.list.shops[x].productsOn.push({ nameProduct: this.nameProduct, information: this.informationProduct });
        else
            $scope.list.shops[x].productsOn = [{ nameProduct: this.nameProduct, information: this.informationProduct }];
    }

    $scope.getFullProducts = function (id) {
        for (var z = 0; z < $scope.list.shops.length; z++) {
            if ($scope.list.shops[z].id == id) {
                    $scope.listProductsOn = $scope.list.shops[z].productsOn;
            }
        }
    }
});
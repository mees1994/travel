// Load configuration
var env = process.env.NODE_ENV || 'development',
    config = require('../../server/config/config.js')[env],
    localConfig = require('./../config-test.json');


describe('Book test homepage', function () {

    beforeEach(function () {
        browser.get('http://' + localConfig.host + ':' + config.port);
    });

    it('should get the titles', function () {

        expect(browser.getTitle()).toBe('Laid Back Reizen demo');
        expect(element(by.tagName('h1')).getText()).toBe('Laid Back Reizen demo');
        expect(element(by.tagName('h2')).getText()).toBe('Op Vakantie? Kies uit een van de onderstaande landen:');

        // Get CSS value
        element(by.tagName('h1')).getCssValue('color')
            .then(function (v) {
                expect(v).toBe('rgba(255, 87, 34, 1)');
            });

    });

    it('should count the number of countries', function () {

        var countries = element.all(by.repeater('country in countries'));

        expect(countries.count()).toBe(2);

    });

    it('should get the first country', function () {

        var countries = element.all(by.repeater('country in countries'));

        expect(countries.get(0).getText()).toEqual('De Antillen');

    });

    it('should get the last country', function () {

        var countries = element.all(by.repeater('country in countries'));

        expect(countries.last().getText()).toEqual('Amerika');

    });
});

describe('CRUD on hotel', function () {

    var _id;

    beforeEach(function () {
        browser.get('http://' + localConfig.host + ':' + config.port + '/#/hotels/new');
    });

    it('should get the titles', function () {

        browser.get('http://' + localConfig.host + ':' + config.port + '/#/hotels/new');

        expect(browser.getTitle()).toBe('Laid Back Reizen demo');
        expect(element(by.tagName('h1')).getText()).toBe('Laid Back Reizen demo');
        expect(element(by.tagName('h2')).getText()).toBe('Hotel beheren');

        // Get CSS value
        element(by.tagName('h1')).getCssValue('color')
            .then(function (v) {
                expect(v).toBe('rgba(255, 87, 34, 1)');
            });

    });


    it('should display an empty form', function () {

        browser.get('http://' + localConfig.host + ':' + config.port + '/#/hotels/new');

        expect(element(by.model('hotels.doc._id')).getText()).toBe('');
        expect(element(by.model('hotels.doc.hotelName')).getText()).toBe('');
        expect(element(by.model('hotels.doc.address')).getText()).toBe('');
        expect(element(by.model('hotels.doc.postcode')).getText()).toBe('');
        expect(element(by.model('hotels.doc.phoneNumber')).getText()).toBe('');
        expect(element(by.model('hotels.doc.locationId')).getText()).toBe('');

    });

    var selectDropdownbyNum = function ( element, optionNum ) {
        if (optionNum){
            var options = element.all(by.tagName('option'))
                .then(function(options){
                    options[optionNum].click();
                });
        }
    };

    it('should create a hotel', function () {

        browser.get('http://' + localConfig.host + ':' + config.port + '/#/hotels/new');

        element(by.model('hotels.doc.hotelName')).sendKeys('AAAAA');
        element(by.model('hotels.doc.address')).sendKeys('Anthony Doerrweg 1');
        element(by.model('hotels.doc.postcode')).sendKeys('6666QQ');
        element(by.model('hotels.doc.phoneNumber')).sendKeys('5476435645');
        var location = element(by.model('selectedOption'));
        selectDropdownbyNum(location, 2);

        element(by.id('saveBtn')).click();

    });

    it('should update the new created hotel', function () {

        browser.get('http://' + localConfig.host + ':' + config.port + '/#/hotels');


        expect(element.all(by.repeater('hotel in hotels.doc')).last().getText()).toBe('AAAAA, Anthony Doerrweg 1');
        //element.all(by.repeater('hotel in hotels.doc')).last().$('a').click();

        // Click on list item (note the nested selector)
        element.all(by.repeater('hotel in hotels.doc')).last().$('a').click();

        // Retrieve id for later retrieval
        // Issue with retrieving value from input field, @see https://github.com/angular/protractor/issues/140
        element(by.model('hotels.doc._id')).getAttribute('value')
            .then(function (v) {
                _id = v;

                // Set new values
                element(by.model('hotels.doc.hotelName')).clear();
                element(by.model('hotels.doc.hotelName')).sendKeys('BBBBB');

                element(by.model('hotels.doc.address')).clear();
                element(by.model('hotels.doc.address')).sendKeys('Changed');

                element(by.model('hotels.doc.postcode')).clear();
                element(by.model('hotels.doc.postcode')).sendKeys('1111QQ');

                // Save new values
                element(by.id('saveBtn')).click();

                // Verify new values
                expect(element.all(by.repeater('hotel in hotels.doc')).last().getText()).toBe('BBBBB, Changed');

            });

    });

    it('should delete the new created hotel', function () {

        browser.get('http://' + localConfig.host + ':' + config.port + '/#/hotels');

        element.all(by.repeater('hotel in hotels.doc')).last().$('a').click();

        // Delete hotel
        element(by.id('deleteBtn')).click();

        // Verify that the number of hotels is 17
        browser.get('http://' + localConfig.host + ':' + config.port + '/#/hotels');

        var books = element.all(by.repeater('hotel in hotels'));

        expect(books.count()).toBe(17);

    });


});


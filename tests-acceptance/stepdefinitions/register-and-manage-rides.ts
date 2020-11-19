import Ride from '../../common/src/Ride/ride';
import { defineSupportCode } from 'cucumber';
import {
  browser,
  $,
  element,
  ElementArrayFinder,
  by,
  ElementFinder,
} from 'protractor';
import { protractor } from 'protractor/built/ptor';
const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

// prettier-ignore
const sameDepartureTime = (elem, departureTime) => elem.element(by.name('departureTimeField')).getText().then(text => text === departureTime);
// prettier-ignore
const samePrice = (elem, price) => elem.element(by.name('priceField')).getText().then(text => text === price);
// prettier-ignore
const samePrivacy = (elem, isPrivate) => elem.element(by.name('isPrivateField')).getText().then(text => text === isPrivate);
// prettier-ignore
const sameSeats = (elem, seats) => elem.element(by.name('seatsField')).getText().then(text => text === seats);
// prettier-ignore
const sameDeparturePlace = (elem, departurePlace) => elem.element(by.name('departurePlaceField')).getText().then(text => text === departurePlace);
// prettier-ignore
const sameArrivalPlace = (elem, arrivalPlace) => elem.element(by.name('arrivalPlaceField')).getText().then(text => text === arrivalPlace);
// prettier-ignore
function checkAllProperties(elem: ElementFinder, departureTime, price, isPrivate, seats, departurePlace, arrivalPlace): boolean {
  return sameDepartureTime(elem, departureTime).then(dT => {
    return samePrice(elem, price).then(pric => {
      return samePrivacy(elem, isPrivate).then(priv => {
        return sameSeats(elem, seats).then(s => {
          return sameDeparturePlace(elem, departurePlace).then(dP => {
            return sameArrivalPlace(elem, arrivalPlace).then(aP => {
                return (dT && pric && priv && s && dP && aP);
            });
          });
        });
      });
    });
  });
}

var until = protractor.ExpectedConditions;

const translator: { [portugueseKeys: string]: string } = {
  CaronasDisponíveis: 'available-rides',
  CaronasSolicitadas: 'requested-rides',
  MinhasCaronas: 'my-rides',
  MeuPerfil: 'my-profile',
  Pedidos: '',
};

defineSupportCode(({ Given, When, Then }) => {
  Given(
    /^I am logged in with user apt to register rides "([^\"]*)" with email "([^\"]*)" and password "([^\"]*)"$/,
    async (userName, email, password) => {
      await browser.get(`http://localhost:4200/my-profile`);
      await $("input[name='emailLoginBox']").sendKeys(<string>email);
      await $("input[name='passwordLoginBox']").sendKeys(<string>password);
      await $("button[name='submitLogin']").click();
      // prettier-ignore
      await browser.wait(
        until.presenceOf(element(by.name('nameField'))),
        5000,
        'Element taking too long to appear in the DOM'
      );
      await expect(element(by.name('nameField')).getText()).to.eventually.equal(
        userName
      );
    }
  );

  Given(/^I am at the "([^\"]*)" page$/, async pageTitle => {
    pageTitle = pageTitle.toString();
    const name = translator[pageTitle.replace(' ', '')];
    await $(`a[name='${name}']`).click();
    await expect(browser.getTitle()).to.eventually.equal(pageTitle);
  });

  Given(
    /^at the page "Caronas Disponíveis" I can see a notification about pending requests for my ride$/,
    async () => {}
  );

  Given(
    /^at the page "Minhas Caronas" I can see "(\d*)" requests for my ride$/,
    async requestQtt => {}
  );

  Given(
    /^I can see pending requests for users "([^\"]*)" and "([^\"]*)"$/,
    async (firstUser, secondUser) => {}
  );

  When(
    /^I try to register a new ride with properties: Departure time: "([^\"]*)", Price: "([^\"]*)", Private: "([^\"]*)", Seats: "(\d*)", Departure place: "([^\"]*)", Arrival place: "([^\"]*)"$/,
    async (
      departureTime,
      price,
      isPrivate,
      seats,
      departurePlace,
      arrivalPlace
    ) => {
      await $("button[name='registerRide']").click();
      await $("input[name='departureTimeBox']").sendKeys(<string>departureTime);
      await $("input[name='priceBox']").sendKeys(<string>price);
      if (isPrivate === 'Yes') await $("input[name='isPrivate']").click();
      await $("input[name='seatsBox']").sendKeys(<string>seats);
      await $("select[name='departurePlaceSelect']")
        .$(`[value="${departurePlace}"]`)
        .click();
      await $("select[name='arrivalPlaceSelect']")
        .$(`[value="${arrivalPlace}"]`)
        .click();
      await $("button[name='submitRide']").click();
    }
  );

  When(
    /^I try to confirm the request from user "([^\"]*)"$/,
    async confirmedUser => {}
  );

  When(
    /^I try to reject the request from user "([^\"]*)"$/,
    async rejectedUser => {}
  );

  Then(/^I am still at the "([^\"]*)" page$/, async pageTitle => {
    pageTitle = pageTitle.toString();
    await expect(browser.getTitle()).to.eventually.equal(pageTitle);
  });

  Then(/^a confirmation message is shown$/, async () => {
    await browser.wait(
      until.presenceOf($("button[name='closeConfirmationMessage']")),
      5000,
      'Element taking too long to appear in the DOM'
    );
    await $("button[name='closeConfirmationMessage']").click();
  });
  // prettier-ignore
  Then(
    /^I can see my newly registered ride with properties: Departure time: "([^\"]*)", Price: "([^\"]*)", Private: "([^\"]*)", Seats: "(\d*)", Departure place: "([^\"]*)", Arrival place: "([^\"]*)"$/,
    async (departureTime, price, isPrivate, seats, departurePlace, arrivalPlace) => {
      const myRides: ElementArrayFinder = element.all(by.name('rideList'));
      await myRides.filter(elem =>checkAllProperties(elem, departureTime, price, isPrivate, seats, departurePlace, arrivalPlace))
        .then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }
  );
  // prettier-ignore
  Then(
    /^at the page Caronas Disponíveis any user can see the newly registered ride with properties: Departure time: "([^\"]*)", Price: "([^\"]*)", Private: "([^\"]*)", Seats: "(\d*)", Departure place: "([^\"]*)", Arrival place: "([^\"]*)"$/,
    async (departureTime, price, isPrivate, seats, departurePlace, arrivalPlace) => {
      await $(`a[name='available-rides']`).click();
      await expect(browser.getTitle()).to.eventually.equal('Caronas Disponíveis');

      const availableRides: ElementArrayFinder = element.all(by.name('rideList'));
      await availableRides.filter(elem =>checkAllProperties(elem, departureTime, price, isPrivate, seats, departurePlace, arrivalPlace))
        .then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }
  );

  Then(
    /^I can see only the user "([^\"]*)" as a confirmed user$/,
    async confirmedUser => {}
  );
  Then(
    /^the user "([^\"]*)" can see a notification about the request confirmation$/,
    async confirmedUser => {}
  );
  Then(
    /^the user "([^\"]*)" can see a notification about the request rejection$/,
    async rejectedUser => {}
  );
});

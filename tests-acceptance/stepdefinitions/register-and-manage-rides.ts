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
  sameDepartureTime(elem, departureTime).then(dT => {
    samePrice(elem, price).then(pric => {
      samePrivacy(elem, isPrivate).then(priv => {
        sameSeats(elem, seats).then(s => {
          sameDeparturePlace(elem, departurePlace).then(dP => {
            sameArrivalPlace(elem, arrivalPlace).then(aP => {
                return (dT && pric && priv && s && dP && aP);
            });
          });
        });
      });
    });
  });
  return false;
}

let pAND = (p, q) => p.then(a => q.then(b => a && b));

const translator: { [portugueseKeys: string]: string } = {
  CaronasDisponíveis: 'available-rides',
  CaronasSolicitadas: 'requested-rides',
  MinhasCaronas: 'my-rides',
  MeuPerfil: 'my-profile',
};

defineSupportCode(({ Given, When, Then }) => {
  Given(
    /^I am logged in with user apt to register rides "([^\"]*)"$/,
    async userName => {}
  );

  Given(/^I am at the "([^\"]*)" page$/, async pageTitle => {
    pageTitle = pageTitle.toString();
    const name = translator[pageTitle.replace(' ', '')];
    await browser.get(`http://localhost:4200/${name}`);
    await expect(browser.getTitle()).to.eventually.equal(pageTitle);
    await $(`a[name='${name}']`).click();
  });

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
  Then(/^I am still at the "([^\"]*)" page$/, async pageTitle => {
    pageTitle = pageTitle.toString();
    await expect(browser.getTitle()).to.eventually.equal(pageTitle);
  });

  Then(/^a confirmation message is shown$/, async () => {
    await $("button[name='confirmRegister']").click();
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
});

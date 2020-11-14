/*import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, ElementFinder } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameCPF = ((elem, cpf) => elem.element(by.name('cpflist')).getText().then(text => text === cpf));
let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

let currentAlunoList: ElementFinder = null;

async function criarAluno(name, cpf) {
  await $("input[name='namebox']").sendKeys(<string> name);
  await $("input[name='cpfbox']").sendKeys(<string> cpf);
  await element(by.buttonText('Adicionar')).click();
}

async function assertTamanhoEqual(set,n) {
  await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

async function assertElementsWithSameCPFAndName(n,cpf,name) { 
  var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
  var samecpfsandname = allalunos.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name)));
  await assertTamanhoEqual(samecpfsandname,n);
}

async function assertElementsWithSameCPF(n,cpf) {
  var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
  var samecpfs = allalunos.filter(elem => sameCPF(elem,cpf));
  await assertTamanhoEqual(samecpfs,n);
  if(n > 0) {
    currentAlunoList = samecpfs.get(0);
  }
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the students page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='alunos']").click();
    })

    Given(/^I cannot see a student with CPF "(\d*)" in the students list$/, async (cpf) => {
        var allcpfs : ElementArrayFinder = element.all(by.name('cpflist'));
        var samecpfs = allcpfs.filter(elem =>
                                      elem.getText().then(text => text === cpf));
        await samecpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    Given(/^I can see a student with CPF "(\d*)" in the students list$/, async (cpf) => {
        await criarAluno("Clarissa",cpf);
        await assertElementsWithSameCPF(1,cpf);
    });
  
    When(/^I try to register the student "([^\"]*)" with CPF "(\d*)"$/, async (name, cpf) => {
        await $("input[name='namebox']").sendKeys(<string> name);
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await element(by.buttonText('Adicionar')).click();
    });

    When(/^I try to delete the student with CPF "(\d*)"$/, async (cpf) => {
      await currentAlunoList.element(by.name('deletebuttonlist')).click()
    });

    Then(/^I can see "([^\"]*)" with CPF "(\d*)" in the students list$/, async (name, cpf) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        await allalunos.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name))).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^I cannot see the student with CPF "(\d*)" in the students list$/, async (cpf) => {
        await assertElementsWithSameCPF(0,cpf);
        currentAlunoList = null;
    });
})*/

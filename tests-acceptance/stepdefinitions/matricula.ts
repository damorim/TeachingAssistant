import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

const matricularAluno = async (nome, cpf, course) => {
  await element(by.id('name-form')).sendKeys(<string> nome);
  await element(by.id('cpf-form')).sendKeys(<string> cpf);
  await element(by.id('course-form')).sendKeys(<string> course);
  await element(by.id('add-matricula')).click();
}

const daysum = { tomorrow: 1, today: 0 };

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the enrollment page$/, async () => {
      await browser.get("http://localhost:4200/matriculas");
      const buttonText = element(by.id('add-matricula')).getText();
      await expect(buttonText).to.eventually.equal("Cadastrar nova matrícula");
    })

    Given(/^I can see the maximum date is set to ([^\"]*)$/, async (day) => {
      const setDate = element.all(by.id('set-date'));
      var result = new Date();
      result.setDate(result.getDate() + daysum[<string>day]);
      const date = new Date(result)
      await setDate.sendKeys(<string> date.toLocaleDateString());
      await element(by.id('send-date')).click();

    })

    When(/^I try to change the deadline to ([^\"]*)$/, async (day) => {
      const setDate = element.all(by.id('set-date'));
      var result = new Date();
      result.setDate(result.getDate() + daysum[<string>day]);
      const date = new Date(result)
      await setDate.sendKeys(<string> date.toLocaleDateString());
      await element(by.id('send-date')).click();
    })

    Then(/^I can see the maximum date is changed to ([^\"]*)$/, async (day) => {
      var result = new Date();
      result.setDate(result.getDate() + daysum[<string>day]);
      const f = new Date(result).toLocaleDateString();
      const datebt = await element(by.id('set-date')).getAttribute('value');
      const bd = new Date(`${datebt}T00:00`).toLocaleDateString();
      expect(bd).to.equal(f);
    })

    When(/^I try to register the student "([^\"]*)" with CPF "([^\"]*)" and course "([^\"]*)"$/, async (nome, cpf, course) => {
      await matricularAluno(nome, cpf, course);
      expect((await element.all(by.id(<string>cpf))).length).to.equal(1);
    })
    
    Then(/^I can see "([^\"]*)" with CPF "([^\"]*)" and course "([^\"]*)" in the students list$/, async (nome, cpf, course) => {
      expect((await element.all(by.id(`${cpf}-${nome}`))).length).to.equal(1);
      expect((await element.all(by.id(<string>course))).length).to.equal(1);
      expect((await element.all(by.id(<string>cpf))).length).to.equal(1);
    });
    
    Given(/^I can see "([^\"]*)" with CPF "([^\"]*)" and course "([^\"]*)" in the students enrollment list$/, async (nome, cpf, course) => {
      await matricularAluno(nome, cpf, course);
      expect((await element.all(by.id(`${cpf}-${nome}`))).length).to.equal(1);
      expect((await element.all(by.id(<string>course))).length).to.equal(1);
      expect((await element.all(by.id(<string>cpf))).length).to.equal(1);
    });

    When(/^I try to delete the student enrollment with CPF "([^\"]*)" and Course "([^\"]*)" from the list$/, async (cpf, course) => {
      await element(by.id(`delete-${cpf}-${course}`)).click();
    });

    Then(/^I cannot see enrollment with CPF "([^\"]*)" and course "([^\"]*)" in the students enrollment list$/, async (cpf, course) => {
      expect((await element.all(by.id(`delete-${cpf}-${course}`))).length).to.equal(0);
    });

    When(/^I try to change the name of the student in the enrollment from "([^\"]*)" to "([^\"]*)" with CPF "([^\"]*)" and Course "([^\"]*)" from the list$/, async (oldNome, nome, cpf, course) => {
      await element(by.id(`${cpf}-${oldNome}`)).clear()
      await element(by.id(`${cpf}-${oldNome}`)).sendKeys(<string> nome);
      await element(by.id(`att-${cpf}`)).click();
    });

    Given(/^I can see "([^\"]*)" with CPF "([^\"]*)" and course "([^\"]*)" in the students enrollment list, with grades "([^\"]*)", "([^\"]*)" and "([^\"]*)", respectively$/, async (nome, cpf, course, g1, g2, g3) => {
      await matricularAluno(nome, cpf, course);
      await element(by.id(`${cpf}-${course}-g1`)).clear();
      await element(by.id(`${cpf}-${course}-g2`)).clear();
      await element(by.id(`${cpf}-${course}-g3`)).clear();
      await element(by.id(`${cpf}-${course}-g1`)).sendKeys(<string> g1);
      await element(by.id(`${cpf}-${course}-g2`)).sendKeys(<string> g2);
      await element(by.id(`${cpf}-${course}-g3`)).sendKeys(<string> g3);
      expect((await element.all(by.id(`${cpf}-${nome}`))).length).to.equal(1);
      expect((await element.all(by.id(<string>course))).length).to.equal(1);
      expect((await element.all(by.id(<string>cpf))).length).to.equal(1);
    });

    When(/^I try to change the grades of the student with CPF "([^\"]*)" and course "([^\"]*)" to "([^\"]*)", "([^\"]*)" and "([^\"]*)"$/, async (cpf, course, g1, g2, g3) => {
      await element(by.id(`${cpf}-${course}-g1`)).clear();
      await element(by.id(`${cpf}-${course}-g2`)).clear();
      await element(by.id(`${cpf}-${course}-g3`)).clear();
      await element(by.id(`${cpf}-${course}-g1`)).sendKeys(<string> g1);
      await element(by.id(`${cpf}-${course}-g2`)).sendKeys(<string> g2);
      await element(by.id(`${cpf}-${course}-g3`)).sendKeys(<string> g3);
      await element(by.id(`att-${cpf}`)).click();
    });


    Then(/^I can see student enrollment with CPF "([^\"]*)" and course "([^\"]*)" with grades "([^\"]*)", "([^\"]*)" and "([^\"]*)", with media "([^\"]*)" in the students enrollment list$/, async (cpf, course, g1, g2, g3, mean) => {
      const g1r = await element(by.id(`${cpf}-${course}-g1`)).getAttribute('value')
      const g2r = await element(by.id(`${cpf}-${course}-g2`)).getAttribute('value')
      const g3r = await element(by.id(`${cpf}-${course}-g3`)).getAttribute('value')
      const meanr = await element(by.id(`${cpf}-${course}-mean`)).getText();
      expect(g1r).to.equal(g1);
      expect(g2r).to.equal(g2);
      expect(g3r).to.equal(g3);
      expect(meanr).to.equal(mean);
    });


})
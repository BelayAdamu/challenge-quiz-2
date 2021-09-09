/// <reference types="cypress" />

const questions = require("../../src/questions");

const getStarCount = (difficulty) => {
  if (difficulty === "easy") return 1;
  if (difficulty === "medium") return 2;
  return 3;
};

describe("Quiz app test cases", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should properly load the quiz app", () => {
    // Assert first question header
    cy.get("h1").should("have.text", "Question 1 of 20");
    // Assert first question category
    cy.get(".header-wrapper > p").should(
      "have.text",
      unescape(questions[0].category)
    );
    // Assert first question difficulty
    cy.get(".fa-star").should(
      "have.length",
      getStarCount(questions[0].difficulty)
    );
    // Assert first question actual score
    cy.get(".txt-actual-score > p").should("have.text", "Score 0%");
    // Assert first question max score
    cy.get(".txt-max-score > p").should("have.text", "Max Score 100%");
  });

  it("Should properly mark correct answer", () => {
    // Click correct answer
    cy.contains(unescape(questions[0].correct_answer)).click();
    // Correct label should show
    cy.get("h2").should("have.text", "Correct!");
    // Correct answer should have black background
    cy.contains(unescape(questions[0].correct_answer)).should(
      "have.css",
      "background-color",
      "rgb(0, 0, 0)"
    );
    
    // Incorrect answers should have grey background
    cy.wrap(questions[0].incorrect_answers).each((ans) => {
      cy.contains(unescape(ans)).should(
        "not.have.css",
        "background-color",
        "rgb(0, 0, 0)"
      );
    });
    // All choices should be disabled
    cy.get(".choise-wrapper button").should("be.disabled");
    // Next question should be enabled
    cy.get(".btn-next").should("be.enabled");
  });

  it("Should properly mark incorrect answer", () => {
    // Click correct answer
    cy.contains(unescape(questions[0].incorrect_answers[0])).click();
    // Correct label should show
    cy.get("h2").should("have.text", "Sorry!");
    // All choices should be disabled
    cy.get(".choise-wrapper button").should("be.disabled");
    // Next question should be enabled
    cy.get(".btn-next").should("be.enabled");
  });

  it("Should update score properly", () => {
    // Select incorrect answer for first question
    cy.contains(unescape(questions[0].incorrect_answers[0])).click();
    // Click next question
    cy.get(".btn-next").click();
    // Max score should be 95%
    cy.get(".txt-max-score > p").should("have.text", "Max Score 95%");
    // progress bar should be 10% of bar length,
    // since currently answering 2 out of 20 questions,
    // 2/20 = 10% = 0.1
    cy.wait(1000);
    cy.get(".qtn-pg-bar")
      .invoke("width")
      .then((width) => {
        expect(Math.round(width)).to.equal(
          Math.round(Cypress.$(".question-progress").width() * 0.1)
        );
      });
  });
  
  it("Should mark the correct answer with a green border when incorrect answer is chosen", () => {
    cy.contains(unescape(questions[0].incorrect_answers[0])).click()
    cy.contains(unescape(questions[0].correct_answer))
      .invoke('css', 'border')
      .should('equal', '3px solid rgb(0, 128, 0)')
  })
});

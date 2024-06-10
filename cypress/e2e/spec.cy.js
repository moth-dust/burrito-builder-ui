describe("Page Load", () => {
  beforeEach(()=>{
    cy.intercept("GET", "http://localhost:3001/api/v1/orders",{
      statusCode: 200, 
      fixture: 'orders.json'
    }).as('getData')
    cy.visit("http://localhost:3000/");
    cy.wait('@getData')
  })

  it("Loads", () => {
  });
  it("As a user if the page successfully loads, I should see all server side orders populated on the main page.", () => {
    cy.get('.order')
    .first()
    .find('h3')
    .contains('TEST_0')
    .next()
    .invoke('attr', 'class')
    .should('contain', 'ingredient-list')
    .get('.order')
    .last()
    .find('h3')
    .contains('TEST_2')
  });
  it(('Should display a form with an input with the following elements'),()=>{
    cy.get('input')
    .get('.ingredients-button')
    .get('#submit-button')
    .get('p')
    .contains('Order: Nothing selected')
  });
});

describe("Form Submission", () => {
  beforeEach(()=>{
    cy.intercept("GET", "http://localhost:3001/api/v1/orders",{
      statusCode: 200, 
      fixture: 'orders.json'
    }).as('getData')
    cy.visit("http://localhost:3000/");
    cy.wait('@getData')
    cy.intercept("POST", "http://localhost:3001/api/v1/orders",{
      statusCode: 201,
      body: {
        id: 3,
        name: "TEST_3",
        ingredients: ["beans"]
      }
    }).as('successfulPost')
  })

  it("As a user, if I click ingredients button and enter a name, clicking the submit order button", () => {
    cy.get('input')
    .type("TEST_3")
    .get('.ingredients-button')
    .first()
    .click()
    .get('#submit-button')
    .click()
    .wait('@successfulPost')
    .get('.order')
    .last()
    .find('h3')
    .contains("TEST_3")
    .next()
    .contains('beans')
  });
  it("If I do not enter a name, my submission should not be successful",()=>{
    cy.get('.ingredients-button')
    .first()
    .click()
    .get('#submit-button')
    .click()
    .get('.order')
    .last()
    .find('h3')
    .contains("TEST_2")
  })
  it("If I do not select any ingredients, my submission should not be successful",()=>{
    cy.get('.ingredients-button')
    cy.get('input')
    .type("TEST_3")
    .get('#submit-button')
    .click()
    .get('.order')
    .last()
    .find('h3')
    .contains("TEST_2")
  });
});

describe("Improper Form Submission", () => {
  beforeEach(()=>{
    cy.intercept("GET", "http://localhost:3001/api/v1/orders",{
      statusCode: 200, 
      fixture: 'orders.json'
    }).as('getData')
    cy.visit("http://localhost:3000/")
    cy.wait('@getData')
  });
  it("If I do not enter a name, my submission should not be successful",()=>{
    cy.get('.ingredients-button')
    .first()
    .click()
    .get('#submit-button')
    .click()
    .get('.order')
    .last()
    .find('h3')
    .contains("TEST_2")
  })
  it("If I do not select any ingredients, my submission should not be successful",()=>{
    cy.get('.ingredients-button')
    cy.get('input')
    .type("TEST_3")
    .get('#submit-button')
    .click()
    .get('.order')
    .last()
    .find('h3')
    .contains("TEST_2")
  });
});

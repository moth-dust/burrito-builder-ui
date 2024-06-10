describe("Page Load", () => {
  beforeEach(()=>{
    cy.intercept("GET", "http://localhost:3001/api/v1/orders",{
      statusCode: 200, 
      fixture: 'orders.json'
    }).as('getData')
  })
  it("passes", () => {
    cy.visit("http://localhost:3000/");
    cy.wait('@getData')
  });
});

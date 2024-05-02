/// <reference types="cypress" />

describe('Board View', () => {
  it('User goes to chosen tasks board if exists', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid=hint-homepage-testid]')
      .should('exist')
      .should(
        'have.text',
        'Hint: You can click on the drawer to navigate to the board.'
      )
      .click();
    cy.get('[data-testid=hint-homepage-testid]').should('not.exist');
    cy.get("button[data-testid='drawer-button']").click();
    cy.get('li').should('exist');
    cy.get('li').first().click();
    cy.url().should('include', '/board/');
    cy.location().should((loc) => {
      const [, boardId] = loc.pathname.split('board/');
      expect(boardId).to.eq('1');
    });
  });
  it(' User create a new tasks board then type new name', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid=hint-homepage-testid]')
      .should('exist')
      .should(
        'have.text',
        'Hint: You can click on the drawer to navigate to the board.'
      )
      .click();
    cy.get("button[data-testid='drawer-button']").click();
    cy.get("button[data-testid='add-workspace-button']")
      .should('exist')
      .click();
    cy.get("textarea[data-testid='workspace-title']")
      .clear()
      .type('New Board')
      .blur();
  });
});

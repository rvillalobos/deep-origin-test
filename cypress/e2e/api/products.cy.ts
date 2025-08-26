/// <reference types="cypress" />

import { PRODUCTS_ENDPOINT } from '../../config/endpoints';
import { Product } from '../../types/product';
import { NEW_PRODUCT, UPDATED_PRODUCT } from '../../config/testData';

describe('DummyJSON Products API - Organized Tests', () => {
  
  it('GET - Should fetch list of products', () => {
    cy.request(PRODUCTS_ENDPOINT.list).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.products).to.be.an('array');
      const first: Product = response.body.products[0];
      expect(first).to.have.property('id');
      expect(first).to.have.property('title');
    });
  });

  it('GET - Should fetch a single product by ID', () => {
    cy.request<Product>(PRODUCTS_ENDPOINT.single(1)).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(1);
      expect(response.body.title).to.be.a('string');
    });
  });

  it('POST - Should add a new product', () => {
    cy.request('POST', PRODUCTS_ENDPOINT.add, NEW_PRODUCT).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.include(NEW_PRODUCT);
      expect(response.body).to.have.property('id');
    });
  });

  it('PUT - Should update an existing product', () => {
    cy.request('PUT', PRODUCTS_ENDPOINT.update(1), UPDATED_PRODUCT).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('title', UPDATED_PRODUCT.title);
    });
  });

  it('DELETE - Should delete a product', () => {
    cy.request('DELETE', PRODUCTS_ENDPOINT.delete(1)).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('isDeleted', true);
    });
  });

});

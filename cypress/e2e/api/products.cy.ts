/// <reference types="cypress" />

import { PRODUCTS_ENDPOINT } from '../../config/endpoints';
import { Product } from '../../types/product';
import {
  NEW_PRODUCT,
  UPDATED_PRODUCT,
  SEARCH_QUERY,
  PAGINATION,
  SELECT_FIELDS,
  SORTING,
  CATEGORY,
} from '../../config/testData';

describe('DummyJSON Products API - Complete Suite', () => {
  //
  // CRUD
  //
  describe('CRUD Operations', () => {
    it('GET - Should fetch list of products within 1000ms', () => {
      cy.request(PRODUCTS_ENDPOINT.list).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.products).to.be.an('array');
        expect(response.duration).to.be.lessThan(1000);
      });
    });

    it('GET - Should fetch a single product by ID', () => {
      cy.request<Product>(PRODUCTS_ENDPOINT.single(1)).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(1);
        expect(response.body.title).to.be.a('string');
        expect(response.duration).to.be.lessThan(300);
      });
    });

    it('POST - Should add a new product (mocked)', () => {
      cy.request('POST', PRODUCTS_ENDPOINT.add, NEW_PRODUCT).then((response) => {
        expect(response.status).to.eq(201); // created
        expect(response.body).to.include(NEW_PRODUCT);
        expect(response.body).to.have.property('id');
      });
    });

    it('PUT - Should update an existing product (id:1)', () => {
      cy.request('PUT', PRODUCTS_ENDPOINT.update(1), UPDATED_PRODUCT).then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('title', UPDATED_PRODUCT.title);
        }
      );
    });

    it('DELETE - Should delete a product (id:1)', () => {
      cy.request('DELETE', PRODUCTS_ENDPOINT.delete(1)).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('isDeleted', true);
      });
    });
  });

  //
  // Search & Queries
  //
  describe('Search and Query Operations', () => {
    it('Search - Should return products matching query', () => {
      cy.request(PRODUCTS_ENDPOINT.search(SEARCH_QUERY)).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.products).to.be.an('array');
        expect(response.body.products[0].title.toLowerCase()).to.include(
          SEARCH_QUERY.toLowerCase()
        );
        expect(response.duration).to.be.lessThan(600);
      });
    });

    it('Pagination - Should return correct limit and skip values', () => {
      cy.request(
        PRODUCTS_ENDPOINT.pagination(PAGINATION.limit, PAGINATION.skip)
      ).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.products).to.have.length(PAGINATION.limit);
        expect(response.body.limit).to.eq(PAGINATION.limit);
        expect(response.body.skip).to.eq(PAGINATION.skip);
      });
    });

    it('Select fields - Should return only title and price', () => {
      cy.request(PRODUCTS_ENDPOINT.select(SELECT_FIELDS, 2)).then((response) => {
        expect(response.status).to.eq(200);
        const first = response.body.products[0];
        expect(first).to.have.all.keys('id', 'title', 'price'); // id siempre viene
        expect(response.duration).to.be.lessThan(600);
      });
    });

    it('Sort - Should return products sorted by title asc', () => {
      cy.request(
        PRODUCTS_ENDPOINT.sort(SORTING.field, SORTING.order, SORTING.limit)
      ).then((response) => {
        expect(response.status).to.eq(200);
        const titles = response.body.products.map((p: any) => p.title);
        const sorted = [...titles].sort();
        expect(titles).to.deep.equal(sorted);
      });
    });
  });

  //
  // Categories
  //
  describe('Category Operations', () => {
    it('Categories - Should fetch all categories', () => {
      cy.request(PRODUCTS_ENDPOINT.categories).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        expect(response.body[0]).to.have.property('name');
        expect(response.body[0]).to.have.property('url');
        expect(response.body[0]).to.have.property('slug');
      });
    });

    it('Category list - Should fetch category list', () => {
      cy.request(PRODUCTS_ENDPOINT.categoryList).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });

    it('Category products - Should fetch products by category', () => {
      cy.request(PRODUCTS_ENDPOINT.category(CATEGORY)).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.products).to.be.an('array');
        expect(response.body.products[0].category).to.eq(CATEGORY);
      });
    });
  });
});

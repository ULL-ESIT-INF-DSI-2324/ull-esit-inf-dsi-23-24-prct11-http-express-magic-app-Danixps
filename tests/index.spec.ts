import { expect } from "chai";
import { addCardToCollection, deleteCardToCollection, Card, Color, LineType, Rarity, modifyCardToCollection } from "../src/index.js";

import * as http from 'http';
import request from 'request';

describe("Conjuntos de pruebas para manipulacion de cartas magic", () => {

  it("addCardToCollection debería eliminar una carta con éxito", (done) => {
    addCardToCollection("edusegre",  new Card(777, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ), (error, data) => {
      if (!error) {
        expect(error).to.be.equal(undefined);
        expect(data).to.be.equal("Éxito al añadir la carta a edusegre");
        done();
      }
    });
  });
  it("addCardToCollection debería eliminar una carta con error de que la carta ya existe", (done) => {

    addCardToCollection("edusegre",  new Card(777, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ), (error, data) => {
      if (error) {
        expect(error.message).to.be.equal("La carta ya existe en la colección.");
        expect(data).to.be.equal(undefined);
        done();
      }
    });
  });
  it ("deleteCardToCollection debería eliminar una carta con éxito", (done) => {
    deleteCardToCollection("edusegre",  777, (error, data) => {
      if (!error) {
        expect(error).to.be.equal(undefined);
        expect(data).to.be.equal("Éxito al eliminar la carta");
        done();
      }
    });
  });

  it ("modifyCardToCollection deberia modificar la carta con error de que la carta no existe", (done) => {
    modifyCardToCollection("edusegre",  new Card(9, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ), (error, data) => {
      if (error) {
        expect(error).to.be.eql(new Error('La carta no existe en la colección de edusegre.'));
        expect(data).to.be.eql(undefined);
        done();
      }
    });
  });

});


describe('Get tests', () => {
  it('It should response the GET method', done => {
    const req = http.request('http://localhost:3001/cards?user=edusegre&id=2', res => {
      expect(res.statusCode).to.equal(200);
      done();
    });

    req.on('error', error => {
      done(error);
    });

    req.end();
  });
  it('It should response error the GET method', done => {
    const req = http.request('http://localhost:3001/cards?uer=edusegre&id=2', res => {
      expect(res.statusCode).to.equal(400);
      done();
    });

    req.on('error', error => {
      done(error);
    });

    req.end();
  });


});


describe('POST funcionalities', () => {

  it('should add a card', (done) => {
    request.post('http://localhost:3001/cards?id=100&user=edusegre&name=danixps&manaCost=12&color=negro&type=tierra&rarity=rara&rulesText=carta1&marketValue=1', {

    }, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Éxito al añadir la carta a edusegre');
      done();
    });
  });
  it('error not should add a card', (done) => {
    request.post('http://localhost:3001/cards?id=100&usr=edusegre&name=danixps&manaCost=12&color=negro&type=tierra&rarity=rara&rulesText=carta1&marketValue=1', {

    }, (error, response, body) => {
      expect(response.statusCode).to.equal(400);
      expect(body).to.equal('Missing required fields');
      done();
    });
  });
});

describe('DELETE funcionalities', () => {

  it('should delete a card with bad lore', (done) => {
    request.delete('http://localhost:3001/cards?user=edusegre&id=100', {

    }, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Éxito al eliminar la carta');
      done();
    });
  });
  it('should not delete a card', (done) => {
    request.delete('http://localhost:3001/cards?user=edusegre&id=100', {

    }, (error, response, body) => {
      expect(response.statusCode).to.equal(500);
      expect(body).to.equal('La carta no existe en la colección.');
      done();
    });
  });
});

describe('PATCH funcionalities', () => {

  it('should modify a card', (done) => {
    request.patch('http://localhost:3001/cards?id=100&user=danixps&name=WhiteLion&manaCost=120&color=negro&type=tierra&rarity=rara&rulesText=carta1&marketValue=1', {

    }, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Éxito al modificar la carta de danixps');
      done();
    });
  });
  it('should not modify a card', (done) => {
    request.patch('http://localhost:3001/cards?id=100&usr=danixps&name=WhiteLion&manaCost=120&color=negro&type=tierra&rarity=rara&rulesText=carta1&marketValue=1', {

    }, (error, response, body) => {
      expect(response.statusCode).to.equal(400);
      expect(body).to.equal('Missing required fields');
      done();
    });
  });
});
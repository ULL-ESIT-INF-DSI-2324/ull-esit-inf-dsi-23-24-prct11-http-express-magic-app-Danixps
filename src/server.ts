import express, { Request, Response } from 'express';
import { Card, addCardToCollection, Color, Rarity, deleteCardToCollection, LineType, modifyCardToCollection, showCards } from './index.js';
const app = express();

// Obtener información sobre una carta o listar todas las cartas
app.get('/cards', (req: Request, res: Response) => {
  const user = typeof req.query.user === 'string' ? req.query.user : undefined;
  const id = typeof req.query.id === 'string' ? parseInt(req.query.id) : undefined;

  if (user && id) {
    showCards(user, id, (err, data) => {
      if (err) {
        res.status(404).send(err.message);
      } else {
        res.status(200).send(data);
      }
    });
  } else if (user) {
    showCards(user, undefined, (err, data) => {
      if (err) {
        res.status(404).send(err.message);
      }
      res.status(200).send(data);
    });
  } else {
    res.status(400).send('Petición incorrecta');
  }
});


// Añadir una carta a la colección
//ej: http://localhost:3000/cards?usr=edusegre&id=1&name=carta1&manaCost=1&color=red&type=creature&rarity=common&rulesText=carta1&marketValue=1
app.post('/cards', (req: Request, res: Response) => {
  // Extraer los datos de la carta del cuerpo de la solicitud
  //id es un numero
  const id = typeof req.query.id === 'string' ? parseInt(req.query.id) : undefined;
  const name = typeof req.query.name === 'string' ? req.query.name : undefined;
  const manaCost = typeof req.query.manaCost === 'string' ? parseInt(req.query.manaCost) : undefined;
  const color: Color | undefined = typeof req.query.color === 'string' ? req.query.color as Color : undefined;
  const type: LineType | undefined = typeof req.query.type === 'string' ? req.query.type as LineType : undefined;
  const rarity: Rarity | undefined = typeof req.query.rarity === 'string' ? req.query.rarity as Rarity : undefined;
  const rulesText = typeof req.query.rulesText === 'string' ? req.query.rulesText : undefined;
  const marketValue = typeof req.query.marketValue === 'string' ? parseInt(req.query.marketValue) : undefined;
  const user = typeof req.query.user === 'string' ? req.query.user : undefined;
  // Asegúrate de que todos los campos necesarios están presentes
  console.log(id, name, user, manaCost, color, type, rarity, rulesText, marketValue);
  if (user && id && name && manaCost && color && type && rarity && rulesText && marketValue) {
    const  card = new Card(id, name, manaCost, color, type, rarity, rulesText, marketValue);
    // Llamar a una función para añadir la carta a la colección
    addCardToCollection(user, card, (err, data) => {
      if (err) {
        // Si hay un error, enviar una respuesta con el error
        res.status(500).send(err.message);
      } else {
        // Si no hay errores, enviar una respuesta de éxito
        res.status(200).send(data);
      }
    });
  } else {
    // Si faltan campos, enviar una respuesta de error
    res.status(400).send('Missing required fields');
  }
});
// Eliminar una carta de la colección
app.delete('/cards', (req: Request, res: Response) => {
  // Extraer los datos de la carta del cuerpo de la solicitud
  const id = typeof req.query.id === 'string' ? parseInt(req.query.id) : undefined;
  const user = typeof req.query.user === 'string' ? req.query.user : undefined;
  // Asegúrate de que todos los campos necesarios están presentes
  if (user && id) {
    // Llamar a una función para eliminar la carta de la colección
    deleteCardToCollection(user, id, (err, data) => {
      if (err) {
        // Si hay un error, enviar una respuesta con el error
        res.status(500).send(err.message);
      } else {
        // Si no hay errores, enviar una respuesta de éxito
        res.status(200).send(data);
      }
    });
  } else {
    // Si faltan campos, enviar una respuesta de error
    res.status(400).send('Missing required fields');
  }
});
// Modificar la información de una carta
app.patch('/cards', (req: Request, res: Response) => {
  // Extraer los datos de la carta del cuerpo de la solicitud
  const id = typeof req.query.id === 'string' ? parseInt(req.query.id) : undefined;
  const name = typeof req.query.name === 'string' ? req.query.name : undefined;
  const manaCost = typeof req.query.manaCost === 'string' ? parseInt(req.query.manaCost) : undefined;
  const color: Color | undefined = typeof req.query.color === 'string' ? req.query.color as Color : undefined;
  const type: LineType | undefined = typeof req.query.type === 'string' ? req.query.type as LineType : undefined;
  const rarity: Rarity | undefined = typeof req.query.rarity === 'string' ? req.query.rarity as Rarity : undefined;
  const rulesText = typeof req.query.rulesText === 'string' ? req.query.rulesText : undefined;
  const marketValue = typeof req.query.marketValue === 'string' ? parseInt(req.query.marketValue) : undefined;
  const user = typeof req.query.user === 'string' ? req.query.user : undefined;
  // Asegúrate de que todos los campos necesarios están presentes
  if (user && id && name && manaCost && color && type && rarity && rulesText && marketValue) {
    const card = new Card(id, name, manaCost, color, type, rarity, rulesText, marketValue);
    // Llamar a una función para modificar la carta de la colección
    modifyCardToCollection(user, card, (err, data) => {
      if (err) {
        // Si hay un error, enviar una respuesta con el error
        res.status(500).send(err.message);
      } else {
        // Si no hay errores, enviar una respuesta de éxito
        res.status(200).send(data);
      }
    });
  } else {
    // Si faltan campos, enviar una respuesta de error
    res.status(400).send('Missing required fields');
  }
});
app.listen(3001, () => {
  console.log('Servidor Express ejecutándose en el puerto 3000');
});

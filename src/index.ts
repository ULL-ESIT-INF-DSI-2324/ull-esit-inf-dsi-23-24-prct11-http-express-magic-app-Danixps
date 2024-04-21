import fs from 'fs';


/**
 * Descripcion: Enumerado de rarezas de cartas
 */
export enum Rarity {
    Common = 'común',
    Uncommon = 'infrecuente',
    Rare = 'rara',
    Mythic = 'mítica'
}

/**
 * Descripcion: Enumerado de colores de cartas
 */
export enum Color {
    White = 'blanco',
    Blue = 'azul',
    Black = 'negro',
    Red = 'rojo',
    Green = 'verde',
    Colorless = 'incoloro',
    Multicolor = 'multicolor'
}

/**
 * Descripcion: Enumerado de linea de tipos
 */
export enum LineType {
    Tierra = 'tierra',
    Criatura = 'criatura',
    Encantamiento = 'encantamiento',
    Conjuro = 'conjuro',
    Instantaneo = 'instantaneo',
    Artefacto = 'artefacto',
    Planeswalker = 'planeswalker'
}

/**
 * Descripcion: La interfaz card_characteristics representa los aributos de las cartas
 */
export interface Card_Characteristics {
    id: number,
    color: Color,
    type: LineType,
    rarity: Rarity,
    rulesText: string,
    marketValue: number,
    powerandtoughness?: [number, number],
    loyalty?: number,
}

/**
 * Descripción: Clase carta que implementas las caracteristicas de una carta
 */
export class Card implements Card_Characteristics {
    id: number;
    name: string;
    manaCost: number;
    color: Color;
    type: LineType;
    rarity: Rarity;
    rulesText: string;
    marketValue: number;
    powerandtoughness?: [number, number];
    loyalty?: number;

    /**
     * Crea una instancia de la clase Card.
     * @param id - El ID de la carta.
     * @param name - El nombre de la carta.
     * @param manaCost - El costo de maná de la carta.
     * @param color - El color de la carta.
     * @param type - El tipo de la carta.
     * @param rarity - La rareza de la carta.
     * @param rulesText - El texto de las reglas de la carta.
     * @param marketValue - El valor de mercado de la carta.
     * @param powerandtoughness - La fuerza y resistencia de la carta (solo para criaturas).
     * @param loyalty - La lealtad de la carta (solo para planeswalkers).
     */
    constructor(id: number, name: string, manaCost: number, color: Color, type: LineType, rarity: Rarity, rulesText: string, marketValue: number, powerandtoughness?: [number, number], loyalty?: number) {
        this.id = id;
        this.name = name;
        this.manaCost = manaCost;
        this.color = color;
        this.type = type;
        this.rarity = rarity;
        this.rulesText = rulesText;
        this.marketValue = marketValue;
        this.powerandtoughness = powerandtoughness;
        this.loyalty = loyalty;
    }
}
type Data = string;


export const showCards = (user: string, id : number | undefined, callback:( err: Error | undefined, data: Data | undefined) => void) => {
    //si no hay id, se listan todas las cartas
    if (!id) {
        fs.readdir(`./collections/${user}`, (err, files) => {
            if (err) {
                callback(err, undefined);
            } else {
                const cards = files.map((file) => {
                    return JSON.parse(fs.readFileSync(`./collections/${user}/${file}`, 'utf-8'));
                });
                callback(undefined, JSON.stringify(cards));
            }
        });
    } else {
        //si hay id, se busca la carta con ese id
        fs.readFile(`./collections/${user}/${id}.json`, 'utf-8', (err, data) => {
            if (err) {
                callback(err, undefined);
            } else {
                callback(undefined, data);
            }
        });
    }
}


//ADDCARD
/**
 * Descripcion: Añade la carta de la collection de forma asyncrona
 * @param user usuario propietario de la carta
 * @param card carta a manipular
 * @callback manejador donde tengo como argumento data y error donde los ire manipulando dependiendo de la situacion
 */
export const addCardToCollection = (user: string, card: Card, callback:( err: Error | undefined, data: Data | undefined) => void) => {
    const filePath = `./collections/${user}/${card.id}.json`;
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            // la carta ya existe, emitir un mensaje de error
            callback(new Error("La carta ya existe en la colección."), undefined);
        } else {
           if (!fs.existsSync(`./collections/${user}`)) {
                fs.mkdirSync(`./collections/${user}`);
            }
            // si la carta no existe, se crea el archivo
            fs.writeFile(filePath, JSON.stringify(card), (err) => {
                if (err) {
                    callback(err, undefined); // error al escribir el archivo
                } else {
                    callback(undefined, 'Éxito al añadir la carta a ' + user); // éxito al añadir la carta
                }
            });
        }
    });
}

//DELETE CARD
/**
 * Descripcion: Elimia la carta de la collection de forma asyncrona
 * @param user usuario propietario de la carta
 * @param card carta a manipular
 * @callback manejador donde tengo como argumento data y error donde los ire manipulando dependiendo de la situacion
 */
export const deleteCardToCollection = (user: string, id: number, callback:( err: Error | undefined, data: Data | undefined) => void) => {
    const filePath = `./collections/${user}/${id}.json`;
    //compruebo si puedo acceder al archivo 
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            // si la carta ya existe a elimina el archivo
            fs.unlink(filePath, (err) => {
                if (err) {
                    callback(err, undefined); // error al eliminar el archivo
                } else {
                    callback(undefined, 'Éxito al eliminar la carta'); // éxito al eliminar la carta
                }
            });
        // si la carta no existe, emitir un mensaje de error
        } else {
            callback(new Error("La carta no existe en la colección."), undefined);
        }
    });
}


//MODIFY CARD
/**
 * Descripcion: Modifica la carta de la collection de forma asyncrona
 * @param user usuario propietario de la carta
 * @param card carta a manipular
 * @callback manejador donde tengo como argumento data y error donde los ire manipulando dependiendo de la situacion
 */
export const modifyCardToCollection = (user: string, card: Card, callback:( err: Error | undefined, data: Data | undefined) => void) => {
    const filePath = `./collections/${user}/${card.id}.json`;
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            // si en el json de la carta se puede escribir 
            fs.writeFile(filePath, (JSON.stringify(card)), (err) => {
                //si hay error de escritura en el archivo, notificarlo
                if (err) {
                    callback(err, undefined); // error al eliminar el archivo
                } else {
                    callback(undefined, 'Éxito al modificar la carta de ' + user ); // éxito al eliminar la carta
                } 
            });
        } else {
            // en cambio si el archivo no se puede accedera, emitir un mensaje de error
            callback(new Error("La carta no existe en la colección de " + user + "."), undefined);
        }
    });
}



showCards("edusegre", 777, (error, data) => {
    if (error) {
      console.error("Error:", error.message);
    } else {
        console.log("Carta encontrada:");
        console.log(data);
    }
});

showCards("edusegre", undefined, (error, data) => {
    if (error) {
      console.error("Error:", error.message);
    } else {
        console.log(data);
    }
});
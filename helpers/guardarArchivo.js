const fs = require('fs');
const { arch } = require('os');

const archivo = './db/data.json';

const guardarDB = ( data ) => {

    fs.writeFileSync( archivo, JSON.stringify(data)); //convierte el arreglo a string json

}

const leerDB = () => {

    if( !fs.existsSync(archivo) ){
        return null;
    }
    
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse( info ); //vuelve el string en objeto
    return data;
}

module.exports = { 
    guardarDB,
    leerDB
};
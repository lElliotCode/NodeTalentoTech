// generar-env.js
import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('./src/firebase/node-api-rest.json', 'utf8'));

// escapamos los \n
raw.private_key = raw.private_key.replace(/\n/g, '\\n');

// generamos el string
const envVar = `GOOGLE_CREDENTIALS=${JSON.stringify(raw)}`;

fs.writeFileSync('.env', envVar);
console.log('✅ .env generado correctamente.');
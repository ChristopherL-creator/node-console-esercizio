const prompt = require('prompt');
const model = require('./model.js'); 
const fs = require('fs'); 

const dinosaurArray = loadData(); 

console.log('benvenuto in dinosaur manager!')

startMenu();

function startMenu() {
  console.log('sono disponibili tre opzioni');
  console.log('1) aggiungi dinosauro');
  console.log('2) lista dinosauri'); 
  console.log('3) esci');

  prompt.start();

  const schema = {
    properties: {
      selection: {
        description: 'Seleziona una delle opzioni',
      }
    }
  };

  prompt.get(schema, startMenuManager);
} 
  
function startMenuManager(err, result){
    if (result.selection === '1') {
      insertDinosaur();
    } else if (result.selection === '2'){
      printDinosaur();
    } else if (result.selection === '3') {
      console.log('Grazie e a Presto!')
      process.exit(); 
    } else {
      console.log('selezione non disponibile');
      startMenu();
    }
  }
  
  function insertDinosaur() {
  
    // prompt.start();
  
    const schema = {
      properties: {
        name: {
          description: 'inserisci il nome', 
        },
          family: {
          description: 'inserisci famiglia',
        },
          timeline: {
          description: 'inserisci periodo (mya)', 
        }, 
          diffusion: {
            description: 'inserisci area',
        }, 
          diet: {
            description: 'inserisci dieta',
        }, 
          size: {
              description: 'inserisci dimensioni',
        }, 
          weight: {
            description: 'inserisci peso', 
        } 
      }
    };
  
    prompt.get(schema, insertDinosaurManager);
    
  }
  
  function insertDinosaurManager(err, result){
  
    const dino = new model.Dinosaur(result.name, result.family, parseInt(result.timeline), result.diffusion, result.diet, parseInt(result.size), parseInt(result.weight));
  
    dinosaurArray.push(dino);
  
    saveData(dinosaurArray); 
  
    startMenu();
  } 

  function saveData(arrayToSave) {
    
    const jsonArray = JSON.stringify(arrayToSave); 

    try {
      fs.writeFileSync('./data_file.json', jsonArray); 
    } catch (error) {
      console.log('impossibile salvare');
    }
} 

function printDinosaur() {
  console.log('sono disponibili tre opzioni');
  console.log('1) lista in ordine di inserimento');
  console.log('2) lista in ordine alfabetico');
  console.log('3) lista in ordine di lunghezza');
  console.log('4) torna al menù principale');

  const schema = {
    properties: {
      selection: {
        description: 'Seleziona una delle opzioni',
      }
    }
  };

  prompt.get(schema, printMenuManager);
}

function printMenuManager(err, result) {
  if (result.selection === '1') {
    printArray(dinosaurArray);
    startMenu();
  } else if (result.selection === '2') {
    printArrayOrderedByName();
    startMenu();
  } else if (result.selection === '3') {
    printArrayOrderedBySize();
    startMenu(); 
  } else if (result.selection === '4') { 
    startMenu();
  } else {
    console.log('selezione non disponibile');
    startMenu();
  }
} 

function printArrayOrderedByName(){

  const copy = [...dinosaurArray];

  copy.sort(compareDinosByName);

  printArray(copy);
}

function compareDinosByName(d1, d2){
  return d1.name.localeCompare(d2.name);
} 

function printArrayOrderedBySize(){

  const copy = [...dinosaurArray];

  copy.sort(compareDinosByPrice);

  printArray(copy);
} 


function compareDinosByPrice(d1, d2){
  return d1.timeline - d2.timeline;
}

function printArray(arrayToPrint){

for (const d of arrayToPrint) {
  console.log(d.toString());
  console.log('----------------------')
}

} 

function loadData() {
  let jsonArray;

  try {
    jsonArray = fs.readFileSync('./data_file.json', 'utf-8'); 
  } catch (error) {
    jsonArray = '[]';
  } 

  jsonArray = jsonArray.trim(); 
  let array = []; 
  if (jsonArray) {
    array = JSON.parse(jsonArray); 
  }
//  trasforma stringa in oggetti
  
  const dinoArray = []; 
  
  for (const obj of array) {
    const dinosaur = model.dinosaurFactory(obj); 
    dinoArray.push(dinosaur);
  }

  return dinoArray;
} 

//  aggiungere funzione search; 
//  aggiungere funzione delete; 


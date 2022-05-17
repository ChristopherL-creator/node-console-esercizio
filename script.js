const prompt = require('prompt');
const model = require('./model.js'); 
const fs = require('fs'); 

const dinoArray = loadData(); 

console.log('benvenuto in dinosaur manager!')

startMenu();


function startMenu() {
  console.log('sono disponibili tre opzioni');
  console.log('1) aggiungi dinosauro');
  console.log('2) lista dinosauri');
  console.log('3) esci')

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
          description: 'inserisci periodo',
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
  
  function insertDinosaurManger(err, result){
  
    const dino = new model.Dinosaur(result.name, result.family, parseInt(result.timeline), result.diffusion, parseFloat(result.price), parseInt(result.copies), parseInt(result.pagesNumber), parseFloat(result.yop), parseFloat(result.discount));
  
    publicationArray.push(book);
  
    saveData(publicationArray); 
  
    startMenu();
  
  }
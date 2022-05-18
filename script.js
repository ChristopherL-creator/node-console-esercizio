const prompt = require('prompt');
const model = require('./model.js'); 
const fs = require('fs'); 

const dinosaurArray = tryToLoadData(); 

console.log('Welcome to Dinosaur Manager!');

startMenu();

function startMenu() {
  console.log("Choose an option:");
  console.log('1) Add dinosaur;');
  console.log('2) Show dinosaur list;'); 
  // console.log('3) trova dinosauro'); 
  // console.log('4) azzera lista'); 
  console.log('3) Exit.');

  prompt.start();

  const schema = {
    properties: {
      selection: {
        description: 'Choose an option',
      }
    }
  };

  prompt.get(schema, startMenuManager);
} 
  
function startMenuManager(err, result){
    if (result.selection === '1') { 
      // startMenu();
      insertDinosaur();
    } else if (result.selection === '2'){
      printDinosaur();
    } else if (result.selection === '3') {
      console.log('See You soon!');
      process.exit();  
    // } else if (result.selection === '3') {
    //   visualizeDinosaurs();
    //   process.exit(); 
    // } else if (result.selection === '3') {
    //   visualizeDinosaurs();
    //   process.exit(); 
    } else {
      console.log('Invalid option!');
      startMenu();
    }
  }
  
  function insertDinosaur() {
  
    // prompt.start();
  
    const schema = {
      properties: {
        name: {
          description: 'Insert name', 
        },
          family: {
          description: 'Insert family',
        },
          timeline: {
          description: 'Insert timeline (mya)', 
        }, 
          diffusion: {
            description: 'Insert diffusion',
        }, 
          diet: {
            description: 'Insert diet',
        }, 
        //   diet: {
        //     description: 'Insert diet ("c" => carnivorous, "h" => herbivorous, "o" => omnivorous)',
        // }, 
          size: {
              description: 'Insert size (m)',
        }, 
          weight: {
            description: 'Insert weight (t)', 
        } 
      }
    };
  
    prompt.get(schema, insertDinosaurManager);
    
  }
  
  function insertDinosaurManager(err, result){ 

    // if (result.diet === "c") {
    //   diet = model.Dinosaur.DIET.carnivorous;
    // } else if (result.diet === "h") {
    //   diet = model.Dinosaur.DIET.herbivorous;
    // } else { 
    //   diet = model.Dinosaur.DIET.omnivorous;
    // }
  
    const dino = new model.Dinosaur(result.name, result.family, result.timeline, result.diffusion, result.diet, parseInt(result.size), parseInt(result.weight));
//                                                                                                     diet
    dinosaurArray.push(dino);
  
    tryToSaveData(dinosaurArray); 
  
    startMenu();
  } 

  function tryToSaveData(arrayToSave) {
    
    const jsonArray = JSON.stringify(arrayToSave); 

    try {
      fs.writeFileSync('./data_file.json', jsonArray); 
    } catch (error) {
      console.log("Can't save!");
    }
} 

//  finzopni di ricerca:
// function searchDinosaur() {
//   const schema = { 
//     properties: { 
//       searchWord: { 
//         description: "insert word to search";
//       }
//     }
//   } 

//   prompt.get(schema, executeSearch);
// } 

// function executeSearch(err, result) {
  
//   const tempArray = []; 

//   for (const dinosaur of dinosaurArray) { 
    
//     const foundInName = dinosaur.name.toLowerCase().includes(result.searchWord.toLowerCase()); 
//     const foundInFamily = dinosaur.family.toLowerCase().includes(result.searchWord.toLowerCase());

//     if ( foundInName || foundInFamily) {
//       tempArray.push(dinosaur);
//     } 
//   } 

//   visualizeDinosaurs(tempArray); 
//   startMenu();
// } 

//  funzioe per rimuovere dinosauri:
// function removeDinosaur() {
//   console.log("ecco gli studenti attualmente registrati: "); 
//   visualizeDinosaurs(dinosaurArray); 

//   const schema = { 
//     properties: { 
//       selectedIndex: { 
//         description: "Inserisci numero dello studente da eliminare";
//       }
//     }
//   } 

//   prompt.get(schema, executeRemoveDinosaur); 
// } 

// function executeRemoveDinosaur(err, res) {
  
//   const dinoIndex = parseInt(res.selectedIndex); 
  
//   if (dinoIndex === NaN) {
//     startMenu(); 
//     return;
//   }
  
//   const index = dinoIndex - 1; 

//   const isInArray = index >= 0 && index < dinosaurArray.length; 

//   if (isInArray) {
//     dinosaurArray.splice(index, 1); 
//     tryToSaveData();
//     startMenu()
//   } else { 
//     console.log("indice non trovato!"); 
//     startMenu(); 
//     return;
//   }
// }

function printDinosaur() {
  console.log('Choose an option:');
  console.log('1) Standard order;');
  console.log('2) Alphabetical order;');
  console.log('3) Order by size;');
  console.log('4) Back to main menu.');

  const schema = {
    properties: {
      selection: {
        description: 'Choose an option',
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
    console.log('Invalid option!');
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

//       visualizeDinosaurs(arrayToVisualize)
function printArray(arrayToPrint){ 

//                    arrayToVisualize
  for (let i = 0; i < arrayToPrint.length; i++) {
    const d = arrayToPrint[i]; 
//  const dinoIndex = i + 1; assegno indice univoco a dinosauri;
//              dinoIndex +  ") " + d.toString()
    console.log(d.toString());
    console.log('-----------------------');
  }
} 

function tryToLoadData() {
  
  let jsonArray; 
  // let array; 

  // try {
  //   jsonArray = fs.readFileSync('./data_file.json', 'utf-8'); 
  //   array = JSON.parse(jsonArray);
  // } catch (error) {
  //   array = '[]';
  // } 
//  posso canellare quindi : 
// jsonArray = jsonArray.trim(); 
// let array = []; 

// if (jsonArray) {
//   array = JSON.parse(jsonArray); 
// }

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

  // for (const obj of array) {
  //   const dinosaur = model.Dinosaur.createDinosaurFromObject(obj); 
  //   dinoArray.push(dinosaur);
  // }

  return dinoArray;
} 

//  aggiungere funzione delete; 


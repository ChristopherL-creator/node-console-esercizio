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
      insertDinosaur();
    } else if (result.selection === '2'){
      printDinosaur();
    } else if (result.selection === '3') {
      console.log('See You soon!');
      process.exit(); 
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

function printArray(arrayToPrint){

for (const d of arrayToPrint) {
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
  //   const dinosaur = model.dinosaurFactory(obj); 
  //   dinoArray.push(dinosaur);
  // }

  return dinoArray;
} 

//  aggiungere funzione search; 
//  aggiungere funzione delete; 


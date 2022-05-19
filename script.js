const prompt = require('prompt');
const model = require('./model.js'); 
const fs = require('fs'); 

prompt.start();

const dinosaurArray = tryToLoadData(); 

console.log('Welcome to Dinosaur Manager!');

startMenu();

function startMenu() {
  console.log("Choose an option:");
  console.log('1) Show dinosaur list;'); 
  console.log('2) Add dinosaur;');
  console.log('3) Find dinosaur;'); 
  console.log('4) Update dinosaur;'); 
  console.log('5) Remove dinosaur;'); 
  console.log('6) Exit.');

  const schema = {
    properties: {
      selection: {
        description: 'Choose an option',
      }
    }
  }

  prompt.get(schema, startMenuManager);
} 
  
function startMenuManager(err, result){
    if (result.selection === '1') { 
      printDinosaur();
    } else if (result.selection === '2'){
      insertDinosaur();
    } else if (result.selection === '3') {
      searchDinosaur(); 
    } else if (result.selection === '4') {
      updateDinosaur();
    } else if (result.selection === '5') {
      removeDinosaur();
    } else if (result.selection === '6') {
      console.log('See You soon!');
      process.exit();  
    } else {
      console.log('Invalid option!');
      startMenu();
    }
  }
  
  function insertDinosaur() {
  
  
    const schema = {
      properties: {
        name: {
          description: 'Insert name' 
        },
          family: {
          description: 'Insert family'
        },
          timeline: {
          description: 'Insert timeline (mya)' 
        }, 
          diffusion: {
            description: 'Insert diffusion'
        }, 
          diet: {
            description: 'Insert diet ("c" => carnivorous, "h" => herbivorous, "o" => omnivorous)'
        }, 
          size: {
              description: 'Insert size (m)'
        }, 
          weight: {
            description: 'Insert weight (t)' 
        } 
      }
    }
  
    prompt.get(schema, insertDinosaurManager);
    
  }
  
  function insertDinosaurManager(err, result){ 
    let diet;
    if (result.diet === 'c') {
      diet = model.Dinosaur.DIET.c;
    } else if (result.diet === 'h') {
      diet = model.Dinosaur.DIET.h;
    } else { 
      diet = model.Dinosaur.DIET.o;
    }
  
    const dino = new model.Dinosaur(result.name, result.family, result.timeline, result.diffusion, diet, parseInt(result.size), parseInt(result.weight));

    dinosaurArray.push(dino);
  
    tryToSaveData(); 
  
    startMenu();
  } 

  function tryToSaveData() {
    
    const jsonArray = JSON.stringify(dinosaurArray); 

    try {
      fs.writeFileSync('./data_file.json', jsonArray); 
    } catch (error) {
      console.log("Can't save!");
    }
} 

//  finzopni di ricerca:
function searchDinosaur() {
  const schema = { 
    properties: { 
      searchWord: { 
        description: "insert word to search"
      }
    }
  } 

  prompt.get(schema, executeSearch);
} 

function executeSearch(err, result) {
  
  const tempArray = []; 

  for (const dinosaur of dinosaurArray) { 
    
    const foundInName = dinosaur.name.toLowerCase().includes(result.searchWord.toLowerCase()); 
    const foundInFamily = dinosaur.family.toLowerCase().includes(result.searchWord.toLowerCase());

    if ( foundInName || foundInFamily) {
      tempArray.push(dinosaur);
    } 
  } 

  visualizeDinosaurs(tempArray); 
  startMenu();
} 

//  funzioe per rimuovere dinosauri:
function removeDinosaur() {
  console.log("Here are the dinosaurs currently listed: "); 
  visualizeDinosaurs(dinosaurArray); 

  const schema = { 
    properties: { 
      selectedIndex: { 
        description: "Insert index number of the dinosaur to delete"
      }
    }
  } 

  prompt.get(schema, executeRemoveDinosaur); 
} 

function executeRemoveDinosaur(err, res) {
  
  const dinoIndex = parseInt(res.selectedIndex); 
  
  if (dinoIndex === NaN) {
    startMenu(); 
    return;
  }
  
  const index = dinoIndex - 1; 

  const isInArray = index >= 0 && index < dinosaurArray.length; 

  if (isInArray) {
    dinosaurArray.splice(index, 1); 
    tryToSaveData();
    startMenu()
  } else { 
    console.log("Index not found!"); 
    startMenu(); 
    return;
  }
} 

function updateDinosaur() {
  console.log("Here are the dinosaurs currently listed:");
  visualizeDinosaurs(dinosaurArray);

  const schema = {
    properties: {
      selectedIndex: {
        description: 'Insert dinosaur index number'
      },
      selectedName: {
          description: 'Insert dinosaur name'
        }, 
      selectedFamily: {
          description: 'Insert dinosaur family'
      },  
      selectedTimeline: {
          description: 'Insert dinosaur timeline (mya)'
      },  
      selectedDiffusion: {
          description: 'Insert dinosaur diffusion'
      },   
      selectedDiet: {
        description: 'Insert dinosaur diet ("c" => carnivorous, "h" => herbivorous, "o" => omnivorous)'
      },  
      selectedSize: {
        description: 'Insert dinosaur size (m)'
      }, 
      selectedWeight: {
        description: 'Insert dinosaur wieght (t)'
      } 
    }
  }
  prompt.get(schema, executeUpdateDinosaur);
} 

function executeUpdateDinosaur(error, result) {
  const dinosaurIndex = parseInt(result.selectedIndex);

  if (dinosaurIndex === NaN) {
      startMenu();
      return;
  }

  const index = dinosaurIndex - 1;

  const isInArray = index >= 0 && index <= dinosaurArray.length;

  if (isInArray) { 
    dinosaurArray[index].name = result.selectedName; 
    dinosaurArray[index].family = result.selectedFamily; 
    dinosaurArray[index].timeline = result.selectedTimeline; 
    dinosaurArray[index].diffusion = result.selectedDiffusion; 
    dinosaurArray[index].diet = result.selectedDiet === "c" ? model.Dinosaur.DIET.c : result.selectedDiet === "h" ? model.Dinosaur.DIET.h :  model.Dinosaur.DIET.o;
    dinosaurArray[index].size = result.selectedSize; 
    dinosaurArray[index].weight = result.selectedWeight;
    tryToSaveData(); 
    startMenu();
  } else {
    console.log('Index not found!');
    startMenu();
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
    visualizeDinosaurs(dinosaurArray);
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

  visualizeDinosaurs(copy);
}

function compareDinosByName(d1, d2){
  return d1.name.localeCompare(d2.name);
} 

function printArrayOrderedBySize(){

  const copy = [...dinosaurArray];

  copy.sort(compareDinosBySize);

  visualizeDinosaurs(copy);
} 

function compareDinosBySize(d1, d2){
  return d1.size - d2.size;
} 

//       
function visualizeDinosaurs(arrayToVisualize){ 

//                    
  for (let i = 0; i < arrayToVisualize.length; i++) {
    const d = arrayToVisualize[i]; 
    // assegno indice univoco a dinosauri;
    const dinoIndex = i + 1; 
    console.log(dinoIndex +  ") " + d.toString());
    console.log('-----------------------');
  }
} 

function tryToLoadData() {
  
  let array; 

  try {
    const jsonArray = fs.readFileSync('./data_file.json', 'utf-8'); 
    array = JSON.parse(jsonArray);
  } catch (error) {
    array = [];
  } 

  //  trasforma stringa in oggetti  
  const dinoArray = []; 

  for (const obj of array) {
    const dinosaur = model.Dinosaur.createDinosaurFromObject(obj); 
    dinoArray.push(dinosaur);
  }

  return dinoArray;
} 


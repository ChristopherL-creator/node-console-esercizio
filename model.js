class Dinosaur{ 

    // static DIET = { 
    //     c: 'carnivorous', 
    //     h: 'herbivorous', 
    //     o: 'omnivorous';
    // } 

    // static createDinoFromObject(obj){ 
    //     return new Dinosaur(obj.name, obj.family, obj.timeline, obj.diffusion, obj.diet, obj.size, obj.weight);
    // }

    constructor (name, family, timeline, diffusion, diet, size, weight){ 

        this.name = name; 
        this.family = family; 
        this.timeline = timeline; 
        this.diffusion = diffusion;
        this.diet = diet; 
        this.size = size; 
        this.weight = weight; 
    }; 

    // maxSize(){ 

    //     let maxLenght = 0;
                
    //     for (const sample of this.size) {
                    
    //         if (maxLenght < sample) {
    //             maxLenght = sample;
    //         }
    //     } 
            
    //     return maxLenght;
    // } 

    // maxWeight(){ 

    //     let maxW = 0;
                
    //     for (const sample of this.weight) {
                    
    //         if (maxW < sample) {
    //             maxW = sample;
    //         }
    //     } 
            
    //     return maxW;
    // } 

    toString(){ 
        
        // const diet = this.diet === 'c' ? 'carnivore' : 'herbivore'; 
    
        const dinoString = 'Name: ' + this.name + ';' + '\n' + 
                              'Family: ' + this.family + ';' + '\n' + 
                              'Timeline: ' + this.timeline + ' mya' + ';' + '\n' + 
                              'Diffusion: ' + this.diffusion + ';' + '\n'+  
                              'diet: ' + this.diet + ';' + '\n' + 
                              'size: ' + this.size + ' m' + ';' + '\n' + 
                              'Weight: ' + this.weight + ' t' + '.' ;
        return dinoString;
    }

} 

function dinosaurFactory(obj) {
    return new Dinosaur(obj.name, obj.family, obj.timeline, obj.diffusion, obj.diet, obj.size, obj.weight);
}

exports.Dinosaur = Dinosaur; 
exports.dinosaurFactory = dinosaurFactory;
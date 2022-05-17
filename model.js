class Dinosaur{ 

    constructor (name, family, timeline, diffusion, diet, size, weight){ 

        this.name = name; 
        this.family = family; 
        this.timeline = timeline; 
        this.diffusion = diffusion;
        this.diet = diet; 
        this.size = size; 
        this.weight = weight; 
    }; 

    maxSize(size){ 

        let maxLenght = 0;
                
        for (const sample of this.size) {
                    
            if (maxLenght < sample) {
                maxLenght = sample;
            }
        } 
            
        return maxLenght;
    } 

    maxWeight(weight){ 

        let maxW = 0;
                
        for (const sample of this.weight) {
                    
            if (maxW < sample) {
                maxW = sample;
            }
        } 
            
        return maxW;
    } 

    toString(){ 
        
        const diet = this.diet === 'c' ? 'carnivore' : 'herbivore'; 
    
        const dinoString = 'Name: ' + this.name + '\n' + 
                              'Family: ' + this.family + '\n' + 
                              'Timeline: ' + this.timeline + '\n' + 
                              'Diffusion: ' + this.diffusion + '\n'+  
                              'diet: ' + diet + '\n' + 
                              'size: ' + this.maxSize() + ' m' + '\n' + 
                              'Weight: ' + this.maxWeight() + ' t';
        return dinoString;
    }

}

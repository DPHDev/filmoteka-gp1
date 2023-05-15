import { getGenres } from "./request-api";

export function setWatched(id){
    let ids = [];    
    if(JSON.parse(localStorage.getItem('Watched'))  === null){
        localStorage.setItem('Watched', id.toString());
        console.log('Listo el Primero');
    }else{
        let getId =JSON.parse(localStorage.getItem('Watched'));        
        if(getId.length > 1){            
            for (const id of getId) {
                ids.push(id);
            }
            console.log(getId.length);
        }else{
            ids.push(getId);
            console.log(getId.length);
        }
             
        ids.push(id);
        localStorage.setItem('Watched', JSON.stringify(ids));
    }
    
}

export function setQueue(id){   
    let ids = [];    
    if((JSON.parse(localStorage.getItem('Queue')))  === null){
        localStorage.setItem('Queue', id.toString());
        console.log('Listo el Primero');
    }else{
        let getId =JSON.parse(localStorage.getItem('Queue'));        
        if(getId.length > 1){            
            for (const id of getId) {
                ids.push(id);
            }
            console.log(getId.length);
        }else{
            ids.push(getId);
            console.log(getId.length);
        }
             
        ids.push(id);
        localStorage.setItem('Queue', JSON.stringify(ids));
    }
}

export function getWatched(){
    let result;
    if(localStorage.getItem('Watched') != null){
        result = JSON.parse(localStorage.getItem('Watched'));
    }else{
        result = null;
    }
    return result;
}

export function getQueue(){
    let result;
    if(localStorage.getItem('Queue') != null){
        result = JSON.parse(localStorage.getItem('Queue'));
    }else{
        result = null;
    }
    return result;
}

export function getGenre(rengers){
    let result = "";   
    let i = 0;
    if(rengers.length > 1){
        for (const renger of rengers) {        
            result += renger.name+" ";  
            if(i == 3) {
                break;
            }    
        }
    }else{
        result += rengers.name+" "
    }
        
    return result;
}

export function deletechildrens(element){
    while(element.hasChildNodes()){
        element.removeChild(element.firstChild);	
   }
  }



export function UUID() {  
    var id = '';  
    for (var i = 0; i < 8; i++) {  
        id += Math.floor(Math.random() * 16).toString(16);  
    }  
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { return id[c === 'x' ? Math.floor(Math.random() * 4) : id.length - 1]; });  
}
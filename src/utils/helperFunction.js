export const compareArray = (a1,a2) => {
    let changed = false
    if(a1.length!==a2.length) return true
    if(!a1.length) return false;
    a1.forEach((element,index) => {
         if(JSON.stringify(element)!==JSON.stringify(a2[index])){
            changed=true
         }
    });
    return changed
}
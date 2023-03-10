import {AbstractControl} from "@angular/forms";

export function checkInDate(control :AbstractControl) {

 const inDate = new Date(control.value);
 if(dateDiff(inDate,new Date())<0){
   return {flag : true}
 }
 return null;

}
function dateDiff(first,second) {
  return Math.round((second-first)/(1000*60*60*24));
}

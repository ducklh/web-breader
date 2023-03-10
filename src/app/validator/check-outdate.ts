import {AbstractControl, ValidationErrors} from "@angular/forms";

export function checkOutDate(control :AbstractControl){
  const outDate = new Date(control.value);
  if(dateDiff(new Date(),outDate)>=365) {
    return {flag: true};
  }
  return null;



}
function dateDiff(first,second) {
  return Math.round((second-first)/(1000*60*60*24));
}

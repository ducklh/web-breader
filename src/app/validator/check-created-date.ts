import {AbstractControl} from "@angular/forms";

export function checkCreatedDate(control :AbstractControl) {

  const checkCreatedDate = new Date(control.value);
  if(dateDiff(checkCreatedDate, new Date().getMilliseconds()) >= 0 ){
    return {flag : true}
  }
  return null;

}
function dateDiff(first,second) {
  return Math.round((second-first)/(1000*60*60*24));
}

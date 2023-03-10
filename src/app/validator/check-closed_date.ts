import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const checkClosedDate: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const inputCloseDate = control.get('closedDate').value;
  const inputOpenDate = control.get('createdDate').value;
  // console.log("inputCloseDate: " +inputCloseDate + "inputOpenDate: " + inputOpenDate)
  const openDate = new Date(inputOpenDate)
  const closeDate = new Date(inputCloseDate)
  if(dateDiff(openDate,closeDate) <= 0 ) {
    return {flag: true};
  }
  return null;

}
function dateDiff(first,second) {
  return Math.round((second-first)/(1000*60*60*24));
}

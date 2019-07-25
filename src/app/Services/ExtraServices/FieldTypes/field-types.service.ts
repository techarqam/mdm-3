import { Injectable } from '@angular/core';
import { MainServiceService } from '../../mainService/main-service.service';

@Injectable({
  providedIn: 'root'
})
export class FieldTypesService {

  textBox: any = {
    controlType: 'textbox',
    maxLength: '10',
    minLength: '4',
    fieldType: 'text',
  }
  number: any = {
    controlType: 'textbox',
    maxLength: '10',
    minLength: '1',
    fieldType: 'number',
  }
  phoneNumber: any = {
    controlType: 'textbox',
    maxLength: '10',
    minLength: '10',
    fieldType: 'number',
  }
  email: any = {
    controlType: 'textbox',
    maxLength: '',
    minLength: '3',
    pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    fieldType: 'text',
  }

  textarea: any = {
    controlType: "textarea",
  }

  timer: any = {
    controlType: "dateTime",
    displayFormat: "DD MMMM YYYY",
    pickerformat: "DD MMMM YYYY",
  }

  checker: any = {
    controlType: "checkbox",
    value: false,
  }


  picture: any = {
    controlType: "picture",
  }

  constructor(
    public mainService: MainServiceService,
  ) { }


  selectType(type, order) {
    switch (type) {
      case 'textbox': this.mainService.masterField.patchValue(this.textBox)
        break;

      case 'number': this.mainService.masterField.patchValue(this.number)
        break;

      case 'phone': this.mainService.masterField.patchValue(this.phoneNumber)
        break;
      case 'email': this.mainService.masterField.patchValue(this.email)
        break;
      case 'textarea': this.mainService.masterField.patchValue(this.textarea)
        break;
      case 'timer': this.mainService.masterField.patchValue(this.timer)
        break;
      case 'checker': this.mainService.masterField.patchValue(this.checker)
        break;
      case 'picture': this.mainService.masterField.patchValue(this.picture)
        break;

      default:
        break;
    }

    this.mainService.masterField.patchValue({ order: order });


  }
}

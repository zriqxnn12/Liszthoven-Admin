import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import {
  faCheckCircle,
  faChevronDown,
  faComments,
  faTimes,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { UniqueComponentId } from '../fc-toast/uniquecomponentid';
import CountryCodeList from 'src/assets/country-code.json';

@Component({
  selector: 'app-fc-input-tel',
  templateUrl: './fc-input-tel.component.html',
  styleUrls: ['./fc-input-tel.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FcInputTelComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FcInputTelComponent,
    },
  ],
})
export class FcInputTelComponent {
  faChevronDown = faChevronDown;
  faTimesCircle = faTimesCircle;
  faCheckCircle = faCheckCircle;
  faComments = faComments;
  faTimes = faTimes;

  @Input() value: string = '';

  countryCode: string = '62';
  countryName: string = 'Indonesia';

  countryCodeList = CountryCodeList.data;

  @Input() title = 'Title';
  @Input() placeholder = '';
  @Input() type = 'tel';
  @Input() inputId = 'textInput';
  @Input() isInvalid: boolean | undefined = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Output() onRemove = new EventEmitter<any>();
  @Input() uniqueId = UniqueComponentId();
  @Input() required: boolean = false;

  searchQuery = '';

  constructor() {}
  onChange: any = () => {};

  onTouch: any = () => {};

  writeValue(value: any) {
    this.value = value;
    // search country code by value
    if (this.value != null || this.value != undefined) {
      this.setCountrycode();
    }
  }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (control.validator) {
      const validator = control.validator({} as AbstractControl);
      if (validator && validator['required']) {
        this.required = true;
      }
    }
    if (control) {
      setTimeout(() => {
        this.isInvalid = control.invalid && control.touched;
      }, 1);
    }
    return null;
  }
  setCountrycode() {
    this.countryCodeList.find((x: any) => {
      if (this.value.startsWith(x.dial_code)) {
        // remove country code from value
        let newValue = this.value.replace(x.dial_code, '');
        this.value = newValue;
        this.onChangeCountryCode(x);
        return true;
      }
      return false;
    });
  }
  onChangeCountryCode(countryCode: any) {
    this.countryCode = countryCode.dial_code;
    this.countryName = countryCode.name;
    this.onValueChange(this.value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
  onRemoveValue() {
    this.onValueChange(null);
    this.onRemove.emit(null);
  }

  validateNumber(event: any) {
    let isAllowed = Boolean(event.key.match(/^[0-9]*$/));
    return isAllowed;
  }
  onValueChange(val: any) {
    // generat value like 122-4526-7890
    this.value = val;
    this.onChange(this.countryCode + this.value);
    this.onTouch(this.countryCode + this.value);
  }
  chat() {
    // send message to wa
    window.open('https://wa.me/' + this.countryCode + this.value, '_blank');
  }
  onSearchQueryChange() {
    this.countryCodeList = CountryCodeList.data.filter((x: any) => {
      return (
        x.dial_code.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        x.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        x.code.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Rate } from 'src/app/_model/Rate';
import { ExchangerateService } from 'src/app/_servicos/exchangerate.service';

@Component({
  selector: 'app-exchangerate',
  templateUrl: './exchangerate.component.html',
  styleUrls: ['./exchangerate.component.scss']
})
export class ExchangerateComponent implements OnInit {

  formGroup: FormGroup;
  rate: Rate
  codes = [];
  codesCompare = []
  base_code = 'MZN'
  base_exchange = 0

  constructor(private exchangerate: ExchangerateService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getExchangeRate()

    this.formGroup = this.fb.group({
      base: [''],
      result: [''],
      baseCoin: ['MZN'],
      compareCoin: ['ZAR']
    })
  }

  get f() {
    return this.formGroup.controls
  }

  getBase() {
    this.base_exchange = this.rate.rates[`${this.f['compareCoin'].value}`]
  }

  onChange() {
    this.base_code = this.f['baseCoin'].value
    this.getExchangeRate()
    this.getBase()
  }

  onChangeCompare() {
    this.getBase()
  }

  onInput() {
    this.f['result'].patchValue((this.f['base'].value * this.base_exchange).toLocaleString())
  }

  onInvert() {
    this.f['baseCoin'].patchValue(this.f['compareCoin'].value)
    this.f['compareCoin'].patchValue(this.base_code)
    this.base_code = this.f['baseCoin'].value
    this.getExchangeRate()
    this.getBase()
  }


  getExchangeRate() {
    this.exchangerate.getExchangerate(this.base_code).subscribe({next: (data) => {
      this.rate = data
      for(let property in this.rate.rates) {
        this.codes.push(property)
        this.codesCompare.push(property)
      }
      this.getBase()
    }})
  }

}

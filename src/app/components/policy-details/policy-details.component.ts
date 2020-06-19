import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css']
})
export class PolicyDetailsComponent implements OnInit {

  @Output() OnRegister = new EventEmitter()
  @Output() OnToggle = new EventEmitter()
  registerForm: FormGroup;
  todaydate=new Date()
  day=''
  month=''
  mindate=""
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      policyDate: ['', Validators.required],
      policyLength: ['', Validators.required],
      check1: ['', Validators.requiredTrue],
      check2: ['', Validators.requiredTrue]
    });
    this.todaydate.setDate(this.todaydate.getDate() + 1);
    console.log(this.todaydate);
    if((this.todaydate.getMonth()+1)<10){
      this.month="0"+(this.todaydate.getMonth()+1)
    }else{
      this.month=""+(this.todaydate.getMonth()+1)
    }
    if(this.todaydate.getDate()<10){
      this.day="0"+this.todaydate.getDate()
    }else{
      this.day=""+this.todaydate.getDate()
    }
    this.mindate=""+this.todaydate.getFullYear()+"-"+this.month+"-"+this.day
    console.log(this.mindate);
    
  }
  submit=()=>{
    console.log(this.registerForm.value, "policy details");
    this.OnRegister.emit(this.registerForm.value);
  }
  change=()=>{
    if(this.registerForm.valid){
      this.OnToggle.emit(true)
      this.OnRegister.emit(this.registerForm.value);
    }else{
      this.OnToggle.emit(false)
    }
  }
  get formControls(){
    return this.registerForm.controls
  }
}

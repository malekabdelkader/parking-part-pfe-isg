import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UserComponent implements OnInit{
timer:number;
  profileForm: FormGroup;

  constructor(
  
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
    private router: Router

  ) {

  }

  ngOnInit(): void {
    this.timer=30;
    setInterval(() => this.increment(), 1000);

  }


  increment()
  {
    this.timer--;
    if(this.timer==0)
    {this.logout()}
  }


  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ]
    });
  }



  logout(){
  
    this.router.navigate(['auth']);
  }
}

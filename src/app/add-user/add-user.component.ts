import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.
import { AbonnementService } from '../shared/abonnement.service';    // CRUD services API

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  public userForm: FormGroup;  // Define FormGroup to user's form

  today:Date;
  time:string;
  constructor(
    public crudApi: AbonnementService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService,  // Toastr service for alert message
    private router: Router
  ) { }


  ngOnInit() {
    

    this.crudApi.GetAbonnementsList(); 
    this.today = new Date();
     this.time = this.today.getFullYear() + "/"+this.today.getMonth() + "/"+this.today.getDay() + "  "+ +this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();      // Call user form when component is ready // Call ModifierClientsList() before main form is being called
    this.studenForm();        
    
  }

  // Reactive user form
  studenForm() {
    this.userForm = this.fb.group({
      mode: this.time,
      code:    1000000 + Math.round(Math.random()*(100000-999999)) ,
      expiration:['',[Validators.required,Validators.max(24),Validators.min(1)]],
      etat:"on",
      nom:'Visiteur',
      email:""

    })
  }

  // Accessing form control using getters
  get code() {
    return this.userForm.get('code');
  }
  get mode() {
    return this.userForm.get('mode');
  }
  get expiration() {
    return this.userForm.get('grade');
  }
  get nom() {
    return this.userForm.get('nom');
  }
 


  submitUserData() {
    
   // this.userForm.controls['visiteur'].setValue(this.userForm.controls['visiteur']+"h")
    this.crudApi.AjouterAbonnement(this.userForm.value); // Submit user data using CRUD API
    this.toastr.success(this.userForm.controls['code'].value + 'Abonnement Ajouté'); // Show success message when data is successfully submited
    this.router.navigate(['users']);
  };

}
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { Location } from '@angular/common';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { Abonnement } from '../shared/abonnement'; // Parking interface class for Data types.
import { AbonnementService } from '../shared/abonnement.service'; // CRUD API service class
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  invalide:string="";
  p: number = 1;     
  capacite:string;                 // Settup up pagination variable
  Abonnement: Abonnement[];                 // Save Parks data in Park's array.
  hideWhenNoStudent: boolean = false; // Hide Parks data table when no Park.
  noData: boolean = false;            // Showing No Park Message, when no Park in database.
  preLoader: boolean = true;          // Showing Preloader to show Park data is coming for you from thre server(A tiny UX Shit)

  public userForm: FormGroup;  // Define FormGroup to user's form

  constructor(
    private location : Location,

    public crudApi: AbonnementService, // Inject Park CRUD services in constructor.
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService,  // Toastr service for alert message
    private router: Router
  ) { }


  ngOnInit() {
    this.dataState(); 
    this.capacite=localStorage.getItem("reserve");
    console.log("capacité="+this.capacite);
    this.studenForm(); 
    let s = this.crudApi.GetAbonnementsList();
    console.log(s);

    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Abonnement = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        //console.log(a);
        a['$key'] = item.key;
       
        this.Abonnement.push(a as Abonnement);
      })
    })

  }
 studenForm() {
    this.userForm = this.fb.group({
    
      code: ['', [Validators.required, Validators.minLength(4)]],
     
    })
  }

  dataState() {
    this.crudApi.GetAbonnementsList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        console.log(data.length);
        localStorage.setItem("reserve",data.length.toString());
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })

  }

  get code() {
    return this.userForm.get('code');
  }
  get etat() {
    return this.userForm.get('etat');
  }


 
 

  // Method to delete user object
  Searchannonce(abonnement) {
   let code=this.userForm.controls['code'].value;
let n=0;
let b=0;
let on="on"
    for (let us of this.Abonnement)
   {
    n=n+1;
     if((code==us.code))
     {
      this.router.navigate(['users']);
      us.etat=on;
      console.log(us.etat)
     }
     else{
       b=b+1;
     }
    

   }
   if(b==n)
   {
this.invalide="* Code d'abonnement invalide" ;
 }
 console.log("invalide ="+ this.invalide);
 console.log("n ="+ n);
 console.log("b ="+ b);


  }
login(){
  
  this.router.navigate(['add-user']);}
}
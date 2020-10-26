import { Component, OnInit } from '@angular/core';
import { AbonnementService } from '../shared/abonnement.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.

@Component({
  selector: 'app-add-abonnement',
  templateUrl: './add-abonnement.component.html',
  styleUrls: ['./add-abonnement.component.css']
})
export class AddAbonnementComponent implements OnInit {

  public abonnementForm: FormGroup;  // Define FormGroup to park's form

  constructor(
    public crudApi: AbonnementService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService,  // Toastr service for alert message
    private router: Router
  ) { }
  ngOnInit() {
    this.crudApi.GetAbonnementsList();  // Call ModifierClientsList() before main form is being called
    this.studenForm();   
  }
  studenForm() {
    this.abonnementForm = this.fb.group({
      mode: ['', [Validators.required, Validators.minLength(3)]],
      code: [''],
      expiration: ['', [Validators.required, Validators.minLength(3)]]
    })
  }
  get mode() {
    return this.abonnementForm.get('mode');
  }

  get code() {
    return this.abonnementForm.get('code');
  }

  get expiration() {
    return this.abonnementForm.get('expiration');
  }
  ResetForm() {
    this.abonnementForm.reset();
  }

  submitAbonnementData() {
    this.crudApi.AjouterAbonnement(this.abonnementForm.value); // Submit park data using CRUD API
    this.toastr.success(this.abonnementForm.controls['mode'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
    this.router.navigate(['abonnements']);
  };
}
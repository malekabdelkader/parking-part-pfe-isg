import { Component, OnInit } from '@angular/core';
import { Park } from '../shared/park'; // Parking interface class for Data types.
import { ParkService } from '../shared/park.service'; // CRUD API service class
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { User } from '../shared/user'; // user interface class for Data types.
import { UserService } from '../shared/user.service'; // CRUD API service class


@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent implements OnInit {
  p: number = 1;                      // Settup up pagination variable
  Park: Park[];                 // Save Parks data in Park's array.
  hideWhenNoStudent: boolean = false; // Hide Parks data table when no Park.
  noData: boolean = false;            // Showing No Park Message, when no Park in database.
  preLoader: boolean = true;          // Showing Preloader to show Park data is coming for you from thre server(A tiny UX Shit)


  constructor(
    public crudApi: ParkService, // Inject Park CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
  ) { }


  ngOnInit() {
    this.dataState(); // Initialize Park's list, when component is ready
    let s = this.crudApi.GetParksList();
    console.log(s);

    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Park = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        //console.log(a);
        a['$key'] = item.key;
       
        this.Park.push(a as Park);
      })
    })
  }

  // Using valueChanges() method to fetch simple list of Parks data. It updates the state of hideWhenNoStudent, noData & preLoader variables when any changes occurs in Park data list in real-time.
  dataState() {
    this.crudApi.GetParksList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }

  // Method to delete Park object
  Supprimerannonce(Park) {
    if (window.confirm('Are sure you want to delete this Park ?')) { // Asking from Park before Deleting Park data.
      this.crudApi.SupprimerPark(Park.$key) // Using Delete Park API to delete Park.
      this.toastr.success(Park.firstName + ' successfully deleted!'); // Alert message will show up when Park successfully deleted.
    }
  }


}

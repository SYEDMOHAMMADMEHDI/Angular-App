import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';
import { VehicleModel } from '../data.model';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';
import { IfStmt } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  public vehicleList: VehicleModel[] = [];
  favouriteId: string[] = [];
  favouriteIdData: string[] = [];

  cartId: string[]=[];
  cartIdData: string[]=[];
  
  constructor(private dataservice: DataService, private route: ActivatedRoute, private cartService: CartService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
    this.dataservice.fetchData().subscribe(response => {
      
      this.vehicleList = response;
   

      let vehicleId = localStorage.getItem('favouriteList');
      this.favouriteIdData = vehicleId ? JSON.parse(vehicleId) : [];


      console.log('favouriteIdData',this.favouriteIdData)

      for (let i = 0; i < this.vehicleList.length-1; i++) {
        let vehicle = this.vehicleList[i];
        for (let j = 0; j < this.favouriteIdData.length; j++) {
          if (vehicle.id == this.favouriteIdData[j]) {
            vehicle.favourite = true;
          }
        }
      }

      let cartVehicleId = localStorage.getItem('cartList');
      this.cartIdData = cartVehicleId ? JSON.parse(cartVehicleId) : [];

      console.log('cartIdData',this.cartIdData);

      for (let i = 0; i < this.vehicleList.length-1; i++) {
        let vehicle = this.vehicleList[i];
        for (let j = 0; j < this.cartIdData.length; j++) {
          if (vehicle.id == this.cartIdData[j]) {
            vehicle.cart = true;
          }
        }
      }

      
    })

    

  }
  addFavourite(vehicleid: string) {

    var id = parseInt(vehicleid) - 1;
    

    this.vehicleList[id].favourite = !this.vehicleList[id].favourite;

    let vehicleId = localStorage.getItem('favouriteList');
    this.favouriteId = vehicleId ? JSON.parse(vehicleId) : [];
    

   
    if (this.vehicleList[id].favourite) {
      this.favouriteId.push(vehicleid);
     
    } else {
      this.favouriteId = this.favouriteId.filter(function (id) {
        
        return id !== vehicleid;
        
      })
    }
    localStorage.setItem("favouriteList", JSON.stringify(this.favouriteId));

  }

  addCart(vehicleIdCart: string) {

    var id = parseInt(vehicleIdCart) - 1;
    

    this.vehicleList[id].cart = !this.vehicleList[id].cart;

    let cartVehicleId = localStorage.getItem('cartList');
    this.cartId = cartVehicleId ? JSON.parse(cartVehicleId) : [];
    

   
    if (this.vehicleList[id].cart) {
      this.cartId.push(vehicleIdCart);
    } else {
      this.cartId = this.cartId.filter(function (id) {
        return id !== vehicleIdCart;
      })
    }
    localStorage.setItem("cartList", JSON.stringify(this.cartId));
    
  }
  durationInSeconds = 5;

  // openSnackBar() {
  //   this._snackBar.open("Added"),
  //     duration: this.durationInSeconds * 1000
    
   
  // }
  
  
}

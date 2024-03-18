import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { DataService } from '../data.service';
import { VehicleModel } from '../data.model';



@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

 
  
  favouriteId: string[] = [];
  
  cartId: string[]=[];

  favouriteVehicleData: any[] = [];



  constructor(private dataservice: DataService,private cartService: CartService) { }

  ngOnInit(): void {

    // this.dataservice.fetchDataById().subscribe(response => {
    //   this.vehicleList = response;

      let vehicleId = localStorage.getItem('favouriteList');
      this.favouriteId = vehicleId ? JSON.parse(vehicleId) : [];

      console.log('favouriteId',this.favouriteId)

      for(var i = 0 ; i<this.favouriteId.length;i++){
        this.dataservice.fetchDataById(this.favouriteId[i]).subscribe((response:VehicleModel)=> {
          
          this.favouriteVehicleData.push(response)
          
          // this.favouriteVehicleData.sort((a,b) => {
          //   return a.id - b.id;
          // });
        });
      }

   

      console.log('favouriteVehicleData',this.favouriteVehicleData)
      // for(var j=0;j<this.vehicleList.length;j++){
      //   this.favouriteVehicleData.push(this.vehicleList[j]);
      //   //console.log('favouriteVehicleData',this.favouriteVehicleData)
      // }

  }

 addToCart(vehicleId: string){
  let cartVehicleId = localStorage.getItem('cartList');
  this.cartId = cartVehicleId ? JSON.parse(cartVehicleId) : [];
  
  if(!this.cartId[parseInt(vehicleId)])
  {
    this.cartId.push(vehicleId);
  }
  

  localStorage.setItem("cartList", JSON.stringify(this.cartId));

  this.remove(vehicleId);

  console.log(this.cartId)
 }

  
  remove(vehicleId: string) {

    //var id = parseInt(vehicleid) - 1;

    let favouriteIdList = localStorage.getItem('favouriteList');
    this.favouriteId = favouriteIdList ? JSON.parse(favouriteIdList) : [];
    
      this.favouriteId = this.favouriteId.filter(function (id) {
        
        return id !== vehicleId;
        
        
      })
      
    localStorage.setItem("favouriteList", JSON.stringify(this.favouriteId));
    
    

    let newId = localStorage.getItem('favouriteList');
    this.favouriteId = newId ? JSON.parse(newId) : [];


    this.favouriteVehicleData = this.favouriteVehicleData.filter(function (favouriteObject) {
      return favouriteObject.id != vehicleId
    })
    
      
 
    console.log('favouriteId',this.favouriteId)

    console.log('favouriteVehicleData',this.favouriteVehicleData)

  }


  

}


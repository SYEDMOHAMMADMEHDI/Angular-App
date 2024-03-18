import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { DataService } from '../data.service';
import { VehicleModel } from '../data.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public vehicleList: VehicleModel[] = [];
  
  quantityCount : any = {};

  quantityList : any ={};
  
  //quantityValue: any;

  cartId: string[] = [];

  cartVehicleData: VehicleModel[] = [];
  totalPrice = 0;

  constructor(private dataservice: DataService, private cartService: CartService) { }

  ngOnInit(): void {
    
    let vehicleId = localStorage.getItem('cartList');
    this.cartId = vehicleId ? JSON.parse(vehicleId) : [];

    let quantityValue =  localStorage.getItem('quantityCount');
    this.quantityList = quantityValue ? JSON.parse(quantityValue) : {};

    // for(let i=0;i<this.cartVehicleData.length;i++){
    //   if(this.quantityList[parseInt(this.cartVehicleData[i].id)] == undefined){
    //     this.quantityList[parseInt(this.cartVehicleData[i].id)] = 1;
    //   }
    // }
      
    

    

    console.log('quantityCount',this.quantityCount)

    console.log('cartId', this.cartId)

    for (var i = 0; i < this.cartId.length; i++) {
      this.dataservice.fetchDataById(this.cartId[i]).subscribe((response: VehicleModel) => {

      

        this.cartVehicleData.push(response)
        this.quantityCount[response.id] = 1;

        
        if(this.quantityList[response.id] == undefined){
          this.quantityList[response.id] = 1;
        }
       

        // this.favouriteVehicleData.sort((a,b) => {
        //   return a.id - b.id;
        // });
        this.total();
      });
      
    }
    
    // this.cartVehicleData.forEach(vehicle => {
    //   this.quantityCount[vehicle.id] = 0;
    // })
    
    console.log('cartVehicleData', this.cartVehicleData)
   
    
    
  }

  remove(vehicleId: string) {

    //var id = parseInt(vehicleid) - 1;

    let cartIdList = localStorage.getItem('cartList');
    this.cartId = cartIdList ? JSON.parse(cartIdList) : [];

    this.cartId = this.cartId.filter(function (id) {

      return id !== vehicleId;

    })

    localStorage.setItem("cartList", JSON.stringify(this.cartId));


    let newId = localStorage.getItem('cartList');
    this.cartId = newId ? JSON.parse(newId) : [];


    this.cartVehicleData = this.cartVehicleData.filter(function (cartObject) {
      return cartObject.id != vehicleId
    })

    localStorage.removeItem('quantityCount');

    
    

    this.total();

    console.log('cartId', this.cartId)

    console.log('cartVehicleData', this.cartVehicleData)
  }
  


  qtyIncrease(cartVehicleId: string) {

    for (let i = 0; i < this.cartVehicleData.length; i++) {
      if (cartVehicleId == this.cartVehicleData[i].id) {
        if(this.quantityList[cartVehicleId]!=10){
         this.quantityList[cartVehicleId] +=1;
        }
         
        //  this.quantity=this.quantityCount[i]
         
      }
    }

    localStorage.setItem("quantityCount", JSON.stringify(this.quantityList));

    console.log(this.quantityList);
    this.total();
  }
 
  

  qtyDecrease(cartVehicleId: string) {

    // this.quantityCount--;
    // this.vehicleQuantity = this.quantityCount;
    for (let i = 0; i < this.cartVehicleData.length; i++) {
      if (cartVehicleId == this.cartVehicleData[i].id) {
         if(this.quantityList[cartVehicleId]!=1){
          this.quantityList[cartVehicleId] -=1;
         }
        
        //  this.quantity=this.quantityCount[i]
         
      }
    }
    localStorage.setItem("quantityCount", JSON.stringify(this.quantityList));
    console.log(this.quantityList)
    this.total();
  }

  total(){
  
    this.totalPrice = 0;
      for(let i=0;i<this.cartVehicleData.length;i++){
        

        this.totalPrice +=  parseFloat(this.cartVehicleData[i].price) * parseInt(this.quantityList[this.cartVehicleData[i].id]);

        
      }
      
      console.log(this.totalPrice);
 
   
    
  }

  


  convertString(value: string): number {
    return parseFloat(parseFloat(value).toFixed(2))
    }



}



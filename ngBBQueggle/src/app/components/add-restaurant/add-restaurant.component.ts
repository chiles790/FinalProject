import { style } from '@angular/animations';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { StyleService } from './../../services/style.service';
import { SauceService } from './../../services/sauce.service';
import { Sauce } from './../../models/sauce';
import { MainDish } from './../../models/main-dish';
import { SideDishService } from './../../services/sidedish.service';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { SideDish } from 'src/app/models/side-dish';
import { Address } from 'src/app/models/address';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { createArrayBindingPattern } from 'typescript';
import { Style } from 'src/app/models/style';
import { MainDishService } from 'src/app/services/maindish.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {

  stylesForm: FormGroup;
  stylesArray: Style[];
  styleResult = [];
  styleToPush = [];

  sideDishesForm: FormGroup;
  sideDishesArray: SideDish[];
  sideDishResult = [];
  sideDishToPush = [];

  mainDishesForm: FormGroup;
  mainDishesArray: MainDish[];
  mainDishResult = [];
  mainDishToPush = [];

  // saucesArray: Sauce[];





  newRestaurant: Restaurant = new Restaurant();
  newAddress: Address = new Address();


  constructor(private restService: RestaurantService, private styleServ: StyleService, private sideDishServ: SideDishService, private mainDishServ: MainDishService, private sauceServ: SauceService, private formBuilder: FormBuilder, private router: Router) {
    this.stylesForm = this.formBuilder.group({
      selectedStyles: this.formBuilder.array([], [Validators.required])
    })

    this.sideDishesForm = this.formBuilder.group({
      selectedSides: this.formBuilder.array([], [Validators.required])
    })

    this.mainDishesForm = this.formBuilder.group({
      selectedMains: this.formBuilder.array([], [Validators.required])
    })
   }

  ngOnInit(): void {
    if (localStorage.getItem('role') === 'ROLE_ADMIN' || localStorage.getItem('role') === 'ROLE_USER') {
      this.index();
    } else {
      this.router.navigateByUrl('home');
    }
  }



  index(): void{
    this.sideDishServ.index().subscribe(
      good=>{
        this.sideDishesArray = good;
        console.log(this.sideDishesArray);

      },
      error=>{
        console.error('failed to load index of side dishes()');
        console.error(error);
      }
    );

    this.mainDishServ.index().subscribe(
      good=>{
        this.mainDishesArray = good;
        console.log(this.mainDishesArray);

      },
      error=>{
        console.error('failed to load index of main dishes()');
        console.error(error);
      }
    );

    this.styleServ.index().subscribe(
      good=>{
        this.stylesArray = good;
        console.log(this.stylesArray);

      },
      error=>{
        console.error('failed to load index of styles()');
        console.error(error);
      }
    );
  }

  onStyleCheckboxChange(e) {
    const styleList: FormArray = this.stylesForm.get('selectedStyles') as FormArray;

    if (e.target.checked) {
      styleList.push(new FormControl(e.target.value));
    } else {
       const index = styleList.controls.findIndex(x => x.value === e.target.value);
       styleList.removeAt(index);
    }
  }

  onSideCheckboxChange(e) {
    const sideList: FormArray = this.sideDishesForm.get('selectedSides') as FormArray;

    if (e.target.checked) {
      sideList.push(new FormControl(e.target.value));
    } else {
       const index = sideList.controls.findIndex(x => x.value === e.target.value);
       sideList.removeAt(index);
    }
  }

  onMainCheckboxChange(e) {
    const mainList: FormArray = this.mainDishesForm.get('selectedMains') as FormArray;

    if (e.target.checked) {
      mainList.push(new FormControl(e.target.value));
    } else {
       const index = mainList.controls.findIndex(x => x.value === e.target.value);
       mainList.removeAt(index);
    }
  }

  submit(){

    this.newAddress.enabled = true;
    this.newRestaurant.address = this.newAddress;
    this.newRestaurant.enabled = false;

    console.log(this.newRestaurant);
    console.log(this.stylesForm.value);
    console.log(this.sideDishesForm.value);
    console.log(this.mainDishesForm.value);

  //Add Styles to Restaurant
  this.styleResult = (this.stylesForm.get('selectedStyles').value);

   for (var i = 0; i < this.styleResult.length; i++) {

      for (var j = 0; j < this.stylesArray.length; j++) {
        if (parseInt(this.styleResult[i]) === this.stylesArray[j].id) {
          this.styleToPush.push(this.stylesArray[j]);
        }
      }
    }

    this.newRestaurant.styles = this.styleToPush;

  //Add Main Dishes to Restaurant
  this.mainDishResult = (this.mainDishesForm.get('selectedMains').value);

  for (var i = 0; i < this.mainDishResult.length; i++) {

     for (var j = 0; j < this.mainDishesArray.length; j++) {
       if (parseInt(this.mainDishResult[i]) === this.mainDishesArray[j].id) {
         this.mainDishToPush.push(this.mainDishesArray[j]);
       }
     }
   }

   this.newRestaurant.mainDishes = this.mainDishToPush;

    //Add Side Dishes to Restaurant

  this.sideDishResult = (this.sideDishesForm.get('selectedSides').value);

  for (var i = 0; i < this.sideDishResult.length; i++) {

     for (var j = 0; j < this.sideDishesArray.length; j++) {
       if (parseInt(this.sideDishResult[i]) === this.sideDishesArray[j].id) {
         this.sideDishToPush.push(this.sideDishesArray[j]);
       }
     }
   }

   this.newRestaurant.sideDishes = this.sideDishToPush;
   console.log(this.newRestaurant);

   //Push Restaurant

  this.restService.create(this.newRestaurant).subscribe(
    (success) => {
      console.log(success);
      console.log('creation success!');
      window.alert('Restaurant Created and Will be Reviewed by Admin for Posting');
    },
    (fail) => {
      console.error('problem with adding Restaurant');
    }
  );


    }








}



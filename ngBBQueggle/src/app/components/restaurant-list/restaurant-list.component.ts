import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Address } from './../../models/address';
import { Restaurant } from './../../models/restaurant';
import { RestaurantService } from './../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants = [];
  address = [];
  selected: Restaurant = null;
  selectedAd: string = null;
  searchTerm: string = null;
  newRestaurant: Restaurant = new Restaurant();
  searchType: string = null;
  baseUrl = environment.baseUrl;

    constructor(private RestaurantService: RestaurantService, private currentRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.RestaurantService.index();
    }

    index(): void{
      this.RestaurantService.index().subscribe(
        good=>{
          this.restaurants = good;
        },
        error=>{
          console.error('failed to load index()');
          console.error(error);
        }
      );
    }


    show(): void{
      this.RestaurantService.show(this.selected.id).subscribe(
        good=>{
          this.restaurants = [];
          this.restaurants.push(good);
          console.log('restaurant selected');
        },
        error=>{
          console.error('failed to select restaurant');
          console.error(error);

        }
      );
    }

    create(): void{
      this.RestaurantService.create(this.newRestaurant).subscribe(
        good=>{
         this.newRestaurant = good;
          console.log('restaurant created');
        },
        error=>{
          console.error('failed to create restaurant');
          console.error(error);
        }
      );
    }

    update(): void{
      this.RestaurantService.update(this.selected.id, this.selected).subscribe(
        good=>{
          this.newRestaurant = good;
          console.log('updated restaurant received');

        },
        error=>{
          console.error('failed to update restaurant');
          console.error(error);

        }
      );
    }

    delete(): void{
      this.RestaurantService.delete(this.selected.id).subscribe(
        good=>{
          this.selected = good;
          console.log('Successfully deleted restaurant');
        },
        error=>{
          console.error('failed to delete restaurant');
          console.error(error);

        }
      );
    }
    findRestaurantsByState(): void{
      this.RestaurantService.findRestaurantsByState(this.selectedAd).subscribe(
        good=>{
          this.restaurants = good;
          console.log('restaurant selected');
        },
        error=>{
          console.error('failed to select restaurant');
          console.error(error);

        }
      );
    }
    findRestaurantsByMeatType(): void{
      this.RestaurantService.findRestaurantsByMeatType(this.selectedAd, this.searchTerm).subscribe(
        good=>{
          this.restaurants = good;
          console.log('restaurant selected');
        },
        error=>{
          console.error('failed to select restaurant');
          console.error(error);

        }
      );
    }
    findRestaurantsByName(): void{
      this.RestaurantService.findRestaurantsByName(this.selectedAd, this.searchTerm).subscribe(
        good=>{
          this.restaurants = good;
          console.log('restaurant selected');
        },
        error=>{
          console.error('failed to select restaurant');
          console.error(error);

        }
      );
    }
    findRestaurantsBySideDish():  void{
      this.RestaurantService.findRestaurantsBySideDish(this.selectedAd, this.searchTerm).subscribe(
        good=>{
          this.restaurants = good;
          console.log('restaurant selected');
        },
        error=>{
          console.error('failed to select restaurant');
          console.error(error);

        }
      );
    }
    findRestaurantsByMainDish():  void{
      this.RestaurantService.findRestaurantsByMainDish(this.selectedAd, this.searchTerm).subscribe(
        good=>{
          this.restaurants = good;
          console.log('restaurant selected');
        },
        error=>{
          console.error('failed to select restaurant');
          console.error(error);

        }
      );
    }
    findRestaurantsByStyle(): void{
      this.RestaurantService.findRestaurantsByStyle(this.selectedAd, this.searchTerm).subscribe(
        good=>{
          this.restaurants = good;
          console.log('restaurant selected');
        },
        error=>{
          console.error('failed to select restaurant');
          console.error(error);
        }
      );
    }

    search(): void {
      console.log(this.searchType);

      if(this.searchType === 'side dish'){
        console.log("here");

        this.findRestaurantsBySideDish();
      }
      if(this.searchType === 'main dish'){
        console.log("here");

        this.findRestaurantsByMainDish();
      }
      else if(this.searchType === 'style'){
        console.log("here");

        this.findRestaurantsByStyle();
      }
      else if(this.searchType === 'name'){
        console.log("here");

        this.findRestaurantsByName();
      }
      else if(this.searchType === 'meat type'){
        console.log("here");

        this.findRestaurantsByMeatType();
      }
      else if(this.searchType === 'state'){
        console.log("here");

        this.findRestaurantsByState();
      }
      console.log('work plz');

    }
}

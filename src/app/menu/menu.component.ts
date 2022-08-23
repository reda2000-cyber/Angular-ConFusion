import { Component, OnInit,Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from "../services/dish.service";
import {flyInOut ,expand} from "../animations/app-animation";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host : {
    '[@flyInOut]':'true',
    'style':'display : block;'

  },
  animations :[
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {


  dishes : Dish[] ;
  errmsg : string;

  selectedDish : Dish;


  constructor(private dishservice : DishService,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getDishes().subscribe(dishes => this.dishes = dishes,
      errmsg => this.errmsg =<any>errmsg);

  }

  onSelect(dish :Dish){
    this.selectedDish=dish;
  }

}

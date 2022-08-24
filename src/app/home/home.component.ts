import { Component, OnInit ,Inject} from '@angular/core';
import {Dish} from "../shared/dish";
import {DishService} from "../services/dish.service";
import {Promotion} from "../shared/promotion";
import {PromotionService} from "../services/promotion.service";
import {LeaderService} from "../services/leader.service";
import {Leader} from "../shared/leader";
import {expand, flyInOut} from "../animations/app-animation";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host : {
    '[@flyInOut]':'true',
    'style':'display : block;'

  },
  animations :[
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {
  dish :Dish;
  promotion : Promotion;
  leader :Leader;
  dishErrMsg : string;
  promotionErrMsg : string;
  leaderErrMsg : string;

  constructor(private dishservice : DishService ,
              private promotionservice : PromotionService,
              private leaderservice :LeaderService,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dishes => this.dish = dishes,errmsg => this.dishErrMsg =<any>errmsg);
    this.promotionservice.getFeaturedPromotion().subscribe(pr => this.promotion = pr,errmsg => this.promotionErrMsg =<any>errmsg);

    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader,errmsg => this.leaderErrMsg =<any>errmsg);
  }

}

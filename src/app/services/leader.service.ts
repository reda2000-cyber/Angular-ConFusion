import { Injectable } from '@angular/core';
import {Leader} from "../shared/leader";
import {LEADERS} from "../shared/leaders";
import {Promotion} from "../shared/promotion";
import {PROMOTIONS} from "../shared/promotions";

import {DISHES} from "../shared/dishes";
import {Observable,of} from "rxjs";
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {

    return of(LEADERS).pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Leader> {

    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }


  }



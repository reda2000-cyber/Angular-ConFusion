import { Injectable } from '@angular/core';
import {Leader} from "../shared/leader";
import {LEADERS} from "../shared/leaders";
import {Promotion} from "../shared/promotion";
import {PROMOTIONS} from "../shared/promotions";

import {DISHES} from "../shared/dishes";
import {Observable,of} from "rxjs";
import {catchError, delay, map} from "rxjs/operators";

import {HttpClient ,HttpHeaders} from "@angular/common/http";
import {baseURL} from "../shared/baseurl";
import {ProcessHTTPMsgService} from "./process-httpmsg.service";
import {Dish} from "../shared/dish";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http : HttpClient,
              private processHTTPMsgService : ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {

    return this.http.get<Leader[]>(baseURL + 'leadership').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {

    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }


  }



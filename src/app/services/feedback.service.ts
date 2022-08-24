import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProcessHTTPMsgService} from "./process-httpmsg.service";
import {Dish} from "../shared/dish";
import {Observable} from "rxjs";
import {baseURL} from "../shared/baseurl";
import {catchError, map} from "rxjs/operators";
import {Feedback} from "../shared/feedback";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  feedback :Feedback;

  constructor(private http : HttpClient,
              private processHTTPMsgService : ProcessHTTPMsgService) { }

  submitFeedback(feedback :Feedback): Observable<Feedback>{
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback', feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLastFeedBack ():Observable<Feedback>{
    return this.http.get<Feedback[]>(baseURL + 'feedback').pipe(map(feedback => feedback[feedback.length-1])).pipe(catchError(this.processHTTPMsgService.handleError));

  }

}

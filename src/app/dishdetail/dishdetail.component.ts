import {Component, OnInit, Input, ViewChild ,Inject} from '@angular/core';
import {Dish} from "../shared/dish";
import {Params,ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {DishService} from "../services/dish.service";
import {switchMap} from "rxjs/operators";
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import {Feedback} from "../shared/feedback";



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {


  dish :Dish;
  dishIds : string[];
  prev : string;
  next : string ;
  errmsg : string;

  commentForm : FormGroup;


  @ViewChild('fform') commentFormDirective;


  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',

    },
    'comment': {
      'required':      'Last Name is required.'
    }
  };

  constructor(private dishservice :DishService,
              private location : Location,
              private route :ActivatedRoute,
              private fb : FormBuilder,
              @Inject('BaseURL') private BaseURL) {
    this.createForm();

  }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); },errmsg => this.errmsg =<any>errmsg);

  }

  goBack():void{
    this.location.back();
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  createForm(){
    const date = new Date();
    this.commentForm = this.fb.group({
      rating:[1],
      comment: ['', Validators.required ],
      author: ['', [Validators.required, Validators.minLength(2)] ],
      date:[date.toISOString()]

    });

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data),errmsg => this.errmsg =<any>errmsg);

    this.onValueChanged(); // (re)set validation messages now

  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {



    console.log(this.commentForm.value);
    this.dish.comments.push(this.commentForm.value);
    this.commentForm.reset({
      rating:'1',
      comment: '',
      author: ''

    });

    this.commentFormDirective.resetForm();
  }

}

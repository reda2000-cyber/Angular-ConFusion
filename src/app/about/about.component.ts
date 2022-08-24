import {Component, Inject, OnInit} from '@angular/core';
import {LeaderService} from "../services/leader.service";
import {Leader} from "../shared/leader";
import {expand, flyInOut} from "../animations/app-animation";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host : {
    '[@flyInOut]':'true',
    'style':'display : block;'

  },
  animations :[
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders :Leader[];
  leaderErrMsg : string;

  constructor(private leaderservice : LeaderService,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.leaderservice.getLeaders().subscribe(leaders => this.leaders=leaders , errmsg => this.leaderErrMsg =<any>errmsg);


  }

}

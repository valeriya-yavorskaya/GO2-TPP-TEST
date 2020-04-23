import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserInfo, UserInfo } from '../reducers/dashboard.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userInfo$: Observable<UserInfo>;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.pipe(select(selectUserInfo));
  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as loginActions from './login.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit(): void {}

  onLoginButtonClick() {
    this.store.dispatch(new loginActions.AuthRequest());
  }

}

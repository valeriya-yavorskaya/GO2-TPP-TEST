import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as loginActions from './login.actions';
import { Observable } from 'rxjs';
import { selectIsError } from '../reducers/login.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginError$: Observable<string>;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.loginError$ = this.store.pipe(select(selectIsError));
  }

  onLoginButtonClick() {
    this.store.dispatch(new loginActions.AuthRequest());
  }

}

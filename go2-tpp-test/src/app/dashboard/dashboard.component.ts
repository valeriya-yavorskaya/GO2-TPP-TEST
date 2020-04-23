import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectSelectedRepo,
  selectUserInfo,
  selectUserRepos,
  UserInfo,
  UserRepos
} from '../reducers/dashboard.reducer';
import { UserRepoContribRequest, UserRepoSelected } from './dashboard.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userInfo$: Observable<UserInfo>;
  userRepos$: Observable<UserRepos>;
  selectedRepo$: Observable<any>;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.pipe(select(selectUserInfo));
    this.userRepos$ = this.store.pipe(select(selectUserRepos));
    this.selectedRepo$ = this.store.pipe(select(selectSelectedRepo));
  }

  onSelectRepo(repo) {
    const { id, name, owner } = repo;
    const { login } = owner;
    this.store.dispatch(new UserRepoSelected(id));
    this.store.dispatch(new UserRepoContribRequest({name, login}));
  }

}

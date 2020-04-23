import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepos } from '../../reducers/dashboard.reducer';

@Component({
  selector: 'app-repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.scss']
})
export class ReposListComponent implements OnInit {

  @Input() reposList$: Observable<UserRepos>;
  @Output() selectRepo: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectRepo(repo: any): void {
    this.selectRepo.emit(repo);
  }

}

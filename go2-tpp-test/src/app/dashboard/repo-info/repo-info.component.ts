import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-repo-info',
  templateUrl: './repo-info.component.html',
  styleUrls: ['./repo-info.component.scss']
})
export class RepoInfoComponent implements OnInit {

  @Input() selectedRepo$: Observable<any>;

  constructor() { }

  ngOnInit(): void {
  }

}

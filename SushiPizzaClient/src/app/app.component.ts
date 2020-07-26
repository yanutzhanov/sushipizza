import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'SushiPizzaClient';
  public isAdminPanel = false;

  constructor(private route: Router) {
  }

  ngOnInit(): void {
    this.route.events.subscribe(res => {
      if (this.route.url.includes('admin')) {
        this.isAdminPanel = true;
      }
      else {
        this.isAdminPanel = false;
      }
    });
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }
}

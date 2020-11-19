import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    const currentTitle = this.titleService.getTitle();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          const child = this.getChild(this.activatedRoute);
          const pageTitle = child.snapshot.data['title'];
          if (pageTitle) return pageTitle;
          return currentTitle;
        })
      )
      .subscribe((title) => {
        this.titleService.setTitle(title);
      });
  }

  getChild(activatedRoute: ActivatedRoute) {
    let child = activatedRoute.firstChild;
    while (child.firstChild) {
      child = child.firstChild;
    }
    return child;
  }
}

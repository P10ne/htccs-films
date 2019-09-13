import { Component, OnInit } from '@angular/core';

interface LinkItem {
  text: string;
  link: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showNavBar = false;
  navLinks: LinkItem[] = [
    {text: 'Главная', link: ''},
    {text: 'Сохраненные', link: 'saved'},
    {text: 'Просмотренные', link: 'viewed'}
  ];

  constructor() { }

  ngOnInit() {
  }

  showNavBarClickHandler() {
    this.showNavBar = !this.showNavBar;
  }

}

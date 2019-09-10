import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() itemsCountOnPage: number;
  @Input() itemsCount: number;
  @Output() onPageChanged = new EventEmitter<number>();
  currentPage: number;
  maxPageNumber: number;
  startPage: number;
  endPage: number;
  visiblePages: number[];
  constructor() { }

  ngOnInit() {
    this.maxPageNumber = Math.ceil(this.itemsCount / this.itemsCountOnPage);
    this.update(1);
  }

  update(current) {
    if (this.maxPageNumber > 5) {
      // this.startPage = this.currentPage
    } else {
      this.startPage = 1;
      this.endPage = this.maxPageNumber;
    }
    this.currentPage = current;
    this.visiblePages = [];
    for (let i = this.startPage; i <= this.maxPageNumber; i++) {
      this.visiblePages.push(i);
    }
  }

  pageChangedHandler(event) {
    const pageto = Number.parseInt(event.target.dataset.pageto);
    if (pageto) {
      console.log(`pagination: ${pageto}`);
      this.onPageChanged.emit(pageto);
      this.update(pageto);
    }
  }
}

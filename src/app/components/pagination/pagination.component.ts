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

  update(newPage) {
    // Отображаются по две страницы слева и справа от newPage
    this.startPage = newPage > 3 ? newPage - 2 : 1;
    this.endPage = newPage > this.maxPageNumber - 3 ? this.maxPageNumber : newPage + 2;

    this.currentPage = newPage;
    this.visiblePages = [];
    for (let i = this.startPage; i <= this.endPage; i++) {
      this.visiblePages.push(i);
    }
  }

  pageChangedHandler(event) {
    const pageto = Number.parseInt(event.target.dataset.pageto);
    if (pageto && pageto !== this.currentPage) {
      console.log(`pagination: ${pageto}`);
      this.onPageChanged.emit(pageto);
      this.update(pageto);
    }
  }
}

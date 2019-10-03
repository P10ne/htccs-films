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
  _currentPage: number;
  @Input()
  set currentPage(value) {
    this._currentPage = value;
    this.update(value);
  };
  get currentPage() {return this._currentPage}
  maxPageNumber: number;
  startPage: number;
  endPage: number;
  visiblePages: number[];
  constructor() {
  }

  ngOnInit(): void {
    this.update(this.currentPage);
  }

  update(newPage: number): void {
    this.maxPageNumber = Math.ceil(this.itemsCount / this.itemsCountOnPage);
    this.startPage = newPage > 3 ? newPage - 2 : 1;
    this.endPage = newPage > this.maxPageNumber - 3 ? this.maxPageNumber : newPage + 2;

    this.visiblePages = [];
    for (let i = this.startPage; i <= this.endPage; i++) {
      this.visiblePages.push(i);
    }
  }

  pageChangedHandler(event: any): void {
    const pageto = Number.parseInt(event.target.dataset.pageto);
    if (pageto && pageto !== this.currentPage) {
      this.onPageChanged.emit(pageto);
      this.update(pageto);
    }
  }
}

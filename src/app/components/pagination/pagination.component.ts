import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MediatorService} from '../../services/mediator.service';

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
  constructor(private mediatorService: MediatorService) {
  }

  ngOnInit(): void {
    this.update(1);
    this.subscribe();
  }

  searchFilmsHandler(): void {
    this.update(1);
  }

  subscribe(): void {
    this.mediatorService.subscribe(MediatorService.searchEvent, () => {
      this.searchFilmsHandler();
    });
  }

  update(newPage: number): void {
    // Отображаются по две страницы слева и справа от newPage
    this.maxPageNumber = Math.ceil(this.itemsCount / this.itemsCountOnPage);
    this.startPage = newPage > 3 ? newPage - 2 : 1;
    this.endPage = newPage > this.maxPageNumber - 3 ? this.maxPageNumber : newPage + 2;

    this.currentPage = newPage;
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

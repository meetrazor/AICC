import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { CardData, TableData } from './tickets.model';

import { cardData, tableData } from './data';

import { TicketService } from './ticket.service';

import { TicketsSortableDirective, SortEvent } from './tickets-sortable.directive';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [TicketService, DecimalPipe]
})

/**
 * Tickets component - handling the tickets with sidebar and content
 */
export class TicketsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Card Data
  cardData: CardData[];

  // Table data
  tableData: TableData[];

  tickets$: Observable<TableData[]>;
  total$: Observable<number>;

  @ViewChildren(TicketsSortableDirective) headers: QueryList<TicketsSortableDirective>;

  constructor(public service: TicketService) {
    this.tickets$ = service.tickets$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Apps', path: '/' }, { label: 'Tickets', path: '/', active: true }];

    /**
     * Fetches Data
     */
    this._fetchData();
  }

  /**
   * Sort table data
   * @param param0 fetch the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  private _fetchData() {
    // Tickets Card Data
    this.cardData = cardData;
    // Tickets Table Data
    this.tableData = tableData;
  }
}

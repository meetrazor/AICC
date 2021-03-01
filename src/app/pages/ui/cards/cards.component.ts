import { Component, OnInit } from '@angular/core';

import { SimpleCard, Card, CardColor, CardGroups } from './cards.model';

import { cardData, card, cardColor, cardGroup } from './data';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})

/**
 * Card component - handling the card with sidebar and content
 */
export class CardsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Card data
  cardData: SimpleCard[];
  card: Card[];
  cardColor: CardColor[];
  cardGroup: CardGroups[];

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'UI Elements', path: '/' }, { label: 'Cards', path: '/', active: true }];

    /**
     * Fetches Data
     */
    this._fetchData();
  }

  /**
   * fetches the card data
   */
  private _fetchData() {

    // simple card
    this.cardData = cardData;
    // small card
    this.card = card;
    // card color
    this.cardColor = cardColor;
    // Card group
    this.cardGroup = cardGroup;
  }
}

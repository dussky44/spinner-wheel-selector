import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'lib-spinner-wheel-selector',
  templateUrl: 'spinner-wheel-selector.component.html',
  styleUrls: ['spinner-wheel-selector.component.less'
  ]
})
export class SpinnerWheelSelectorComponent implements OnInit {

  @Input()
  private items: string[];
  @Input()
  public displayedItemsNumber: number = 5;
  @Input()
  public width = 'fit-content';
  @Input()
  public height: string;
  @Input()
  public centerFontSize: string;
  @Input()
  public textColor = 'black';
  @Input()
  public background = 'none';
  @Input()
  public circularList = false;
  @Input()
  public displayArrow = false;
  @Input()
  public centerIndicator = '➤';
  @Input()
  public customElementCss: any = {};
  @Input()
  public customComponentCss: any = {};
  @Output()
  private selectionChange?= new EventEmitter<{ value: string, index: number }>();

  public dispalyedList: any[] = [];
  public index: number;

  private offset: number;
  private circularIndex = 0;

  constructor() { }

  ngOnInit(): void {
    this.validateInputParameters();
    this.initList();
  }

  private validateInputParameters(): void {
    let showError = false;
    let errorMessage = 'Provide the following attributes for lib-spinner-wheel-selector:';
    if (this.height == null) {
      errorMessage += '\narray of string values for "height"';
      showError = true;
    }

    if (this.items == null) {
      errorMessage += '\narray of string values for "items"';
      showError = true;
    }

    if (this.centerFontSize == null) {
      errorMessage += '\nstring value for "centerFontSize"';
      showError = true;
    }
    if (showError === true) {
      throw new Error(errorMessage);
    }
  }

  private initList(): void {
    this.customElementCss['font-size'] = this.centerFontSize;
    this.customElementCss['color'] = this.textColor;

    this.customComponentCss['width'] = this.width;
    this.customComponentCss['height'] = this.height;
    this.customComponentCss['background'] = this.background;

    this.offset = (this.displayedItemsNumber - 1) / 2;
    this.index = (this.displayedItemsNumber - 1) / 2;
    if (this.circularList === false) {
      this.dispalyedList = [...Array(this.offset).fill(''), ...this.items, ...Array(this.offset).fill('')];
    } else {
      this.updateCircularList(this.circularIndex);
    }
  }

  private updateCircularList(index: number): void {
    const arr = [...Array(this.displayedItemsNumber)];
    let ind = this.circularIndex - this.offset;
    for (let i = 0; i < this.displayedItemsNumber; i++) {
      if (ind < 0) {
        ind += this.items.length;
      }
      if (ind >= this.items.length) {
        ind -= this.items.length;
      }
      arr[i] = this.items[ind];
      ind += 1;
    }
    this.dispalyedList = arr;
  }

  private changeCenter(): void {
    if (this.selectionChange == null) {
      return;
    }
    if (this.circularList === true) {
      this.selectionChange.emit({ value: this.items[this.circularIndex], index: this.circularIndex });
    } else {
      this.selectionChange.emit({ value: this.dispalyedList[this.index], index: this.index - this.offset });
    }
  }


  public onUp(steps: number = 1): number {
    if (this.circularList === false) {
      if (this.index - steps >= this.offset) {
        this.index = this.index - steps;
      }
      this.changeCenter();
      return this.index - steps - this.offset;
    } else {
      this.circularIndex -= steps;
      if (this.circularIndex < 0) {
        this.circularIndex += this.items.length;
      }
      this.changeCenter();
      this.updateCircularList(this.circularIndex);
      return this.circularIndex;
    }
  }

  public onDown(steps: number = 1): number {
    if (this.circularList === false) {
      if (this.index + steps < this.dispalyedList.length - this.offset) {
        this.index = this.index + steps;
      }
      this.changeCenter();
      return this.index + steps - this.offset;
    } else {
      this.circularIndex += steps;
      if (this.circularIndex >= this.items.length) {
        this.circularIndex -= this.items.length;
      }
      this.updateCircularList(this.circularIndex);
      this.changeCenter();
      return this.circularIndex;
    }
  }

  public getSelectedElement(): string {
    if (this.circularList === true) {
      return this.items[this.circularIndex];
    } else {
      return this.dispalyedList[this.index];
    }
  }
  public getSelectedIndex(): number {
    if (this.circularList === true) {
      return this.circularIndex;
    } else {
      return this.index - this.offset;
    }
  }
}


# spinner-wheel-selector

Spinner Wheel Selector Readme

This component was created with the purpose of providing a solution to the lack of standalone spinner selector akin to the ones found in iOS operating system.
This component was made for [Angular](https://angular.io/) and should not be used with any other framework.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
  - [Required Inputs](#required-inputs)
  - [Optional Inputs](#optional-inputs)
  - [Outputs and Public Methods](#outputs-and-public-pethods)
- [License](#license)

## Install

This component requires [node](https://nodejs.org), [npm](https://npmjs.com), and [angular](https://angular.io/).

You can install it by running:

```sh
npm install spinner-wheel-selector
```

## Usage

After installing, simply import 'SpinnerWheelSelectorModule' from 'spinner-wheel-selector' and add it to the imports array of the module where you want to use it.

```js script
import { SpinnerWheelSelectorModule } from 'spinner-wheel-selector';
.
.
.
imports: [
    SpinnerWheelSelectorModule
  ],
```

If the import worked sucessfully, you should be able to use the component directly into your HTML using
```html
<lib-spinner-wheel-selector></lib-spinner-wheel-selector>
```

### Required Inputs

`lib-spinner-wheel-selector` will require a few input parameters by default. These are:

- ```height: string``` The desired height of the component, given in px, em, vw or %;
- ```centerFontSize: string``` The desired font size of the text, given in px, em, vw or %;
- ```items: string[]``` The the list of strings that should be displyed;

### Optional Inputs

In addition, `lib-spinner-wheel-selector` allows for aditional input parameters that result in different condfiguration and stylistic appearances.

- `displayedItemsNumber: number` - `default value = 5` The number of lines displayed. Must be one of the following `{3, 5, 7}`;
- `width: string` - `default value = 'fit-content'` The desired width of the component;
- `textColor: string` - `default value = 'black'` The color of the text;
- `background: string` - `default value = 'none'` The background of the component;
- `circularList: boolean` - `default value = false` If set to true, the spinner will act as a circular list;
- `displayArrow: boolean` - `default value = false` If set to true, the spinner will display an arrow besides the center element;
- `centerIndicator: string` - `default value = '➤' ` The extended ASCII symbol used as an indicator for the center of the spinner;

Besides these, `lib-spinner-wheel-selector` provides two more input values, which allow for the additon and use of custom CSS proprieties. Both of them require a JSONObject that describes the desired CSS:
- `customElementCss: JSONObject` - `default value = {}` Special CSS class used spinner text elements;
- `customComponentCss: JSONObject` - `default value = {}` Special CSS class used overarching component;
Example of use:
    ```html
    [customComponentCss]="{'border-radius': '50px', 'border': '2px solid gray'}"
    [customElementCss]="{'font-family': 'serif', 'text-transform': 'uppercase'}"
    ```
    
### Outputs and Public Methods
The `lib-spinner-wheel-selector` component also provides an output parameter and a few public methods:
- `selectionChange : new EventEmitter()` - `returns { value: string, index: number }` The selectionChange events triggers when the center of the spinner has been change and emits an object of the form `<{ value: string, index: number }>`, where `value` is the selected string and `index` is the index of the element in the given array;
Public Methods:
- `getSelectedElement(): string` Return the value of the center element;
- `getSelectedIndex(): number` Return the index of the center element in the given array;
- `onUp(steps: number = 1): number` Goes up a number of given steps and returns the index of the center element;
- `onDown(steps: number = 1): number` Goes down a number of given steps and returns the index of the center element;

Exemple of use:
```html
<lib-spinner-wheel-selector [displayedItemsNumber]="9" [items]="array" [height]="'300px'"[centerFontSize]="'2em'" [textColor] ="'blue'" [background]="'lightblue'" [displayArrow]="true" [centerIndicator]="'o'" [circularList]="true" [customComponentCss]="{'border-radius': '50px', 'border': '2px solid gray'}" [customElementCss]="{'font-family': 'serif', 'text-transform': 'uppercase'}" (selectionChange)="onSelectionChanged($event)"></lib-spinner-wheel-selector>
```
## Maintainer

[@Dussky44](https://github.com/dussky44) -aka- Rares Coanta

## License

The `lib-spinner-wheel-selector` is open source and falls under that fair use license, granting permision of usage to anyone who my desire it. 
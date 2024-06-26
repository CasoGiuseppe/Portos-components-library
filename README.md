# Component Library

Welcome to the Noatum component library by [vue-components-noatum]. This library provides a collection of reusable components for Vue.js.

## Installation

You can install this component library using npm:

```bash
npm i vue-components-noatum
```

## Import Global Styles from Your Library

Add this in the main.ts of your project:
```bash
import 'vue-components-noatum/dist/style.css';
```

And add this in the in assets in global.scss of your project:
```bash
@import '../../node_modules/vue-components-noatum/src/assets/global.scss';
```

## Declarate Modules

Create a file vue-components-noatum.d.ts in your project and add the following line:
```bash
declare module 'vue-components-noatum';
```

## Import Components

```bash
import { BaseButton, BaseCard, BaseIcon, BaseInput, BaseSearch, BaseTable, NavigationItem, DefaultLoader, DefaultError } from 'vue-components-noatum'
```

## Using Component

```bash
< BaseTable />
```
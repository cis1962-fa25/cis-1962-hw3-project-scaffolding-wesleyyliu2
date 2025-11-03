# Pizza Validation

A TypeScript package for validating pizza objects using Zod.

## Installation

Install the package:

```bash
npm install pizza-validation
```

## Usage as a Package

The package exports a `validatePizza` function that validates pizza objects:

```typescript
import { validatePizza } from 'pizza-validation';

const pizza = {
    size: 16,
    crust: 'stuffed',
    isDeepDish: true,
    toppings: ['pepperoni', 'cheese', 'mushroom']
};

const result = validatePizza(pizza);

if (result.isPizza) {
    console.log('Valid pizza!', result.pizza);
} else {
    console.log('Invalid:', result.errors);
}
```

### Function: `validatePizza`

**Input:** Takes an `unknown` parameter, which is data to evaluate

**Output:** Returns a discriminated union object:
- If valid: `{ isPizza: true, pizza: Pizza }`
- If invalid: `{ isPizza: false, errors: string[] }`

## CLI Usage

Install globally:

```bash
npm install --global .
```

Validate a JSON file:

```bash
pizza-validation test-pizza.json
```

### Example test-pizza.json

```json
{
    "size": 20,
    "crust": "stuffed",
    "isDeepDish": false,
    "toppings": ["pepperoni", "cheese"],
}
```

## Pizza Schema

A valid pizza has:
- `size` (number): diameter in inches
- `crust` (string): "stuffed" or "normal"
- `isDeepDish` (boolean, optional): defaults to false
- `toppings` (array of strings, optional): no invalid toppings

Invalid toppings: pineapple, apple, banana, orange

## Development

Build: `npm run build`

Test: `npm test`

Lint: `npm run lint`

Format: `npm run format`

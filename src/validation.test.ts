import { validatePizza } from './validation';
import { describe, expect, test } from '@jest/globals';

describe('validatePizzaTests', () => {
    // Test 1: Valid pizza
    test('accepts valid pizza', () => {
        const validPizza = {
            size: 10,
            crust: 'stuffed',
            isDeepDish: false,
            toppings: ['pepperoni', 'cheese', 'mushrooms'],
        };

        const result = validatePizza(validPizza);

        expect(result.isPizza).toBe(true);
        if (result.isPizza) {
            expect(result.pizza.size).toBe(10);
            expect(result.pizza.crust).toBe('stuffed');
            expect(result.pizza.isDeepDish).toBe(false);
            expect(result.pizza.toppings).toEqual([
                'pepperoni',
                'cheese',
                'mushrooms',
            ]);
        }
    });

    // Test 2: Reject pizza with invalid crust
    test('rejects pizza with invalid crust', () => {
        const invalidPizza = {
            size: 12,
            crust: 'thin',
            toppings: ['cheese', 'pepperoni'],
        };

        const result = validatePizza(invalidPizza);

        expect(result.isPizza).toBe(false);
        if (!result.isPizza) {
            expect(result.errors.length).toBeGreaterThan(0);
            expect(result.errors).toContain(
                'Invalid option: expected one of "stuffed"|"normal"',
            );
        }
    });

    // Test 3: Reject pizza with invalid toppings
    test('rejects pizza with invalid toppings', () => {
        const invalidPizza = {
            size: 18,
            crust: 'normal',
            toppings: ['cheese', 'pineapple', 'banana'],
        };

        const result = validatePizza(invalidPizza);

        expect(result.isPizza).toBe(false);
        if (!result.isPizza) {
            expect(result.errors).toContain('Contains invalid topping');
        }
    });

    // Test 4: Reject pizza with unknown fields
    test('rejects pizza with unknown field', () => {
        const invalidPizza = {
            size: 20,
            crust: 'stuffed',
            isDeepDish: false,
            toppings: ['pepperoni', 'cheese', 'mushrooms'],
            woohoo: 'test',
        };

        const result = validatePizza(invalidPizza);

        expect(result.isPizza).toBe(false);
        if (!result.isPizza) {
            expect(result.errors).toContain('Unrecognized key: "woohoo"');
        }
    });

    // Test 5: Reject pizza with missing required fields
    test('rejects pizza with missing required fields', () => {
        const invalidPizza = {
            size: 22,
            toppings: ['pepperoni', 'cheese', 'mushrooms'],
        };

        const result = validatePizza(invalidPizza);

        expect(result.isPizza).toBe(false);
        if (!result.isPizza) {
            expect(result.errors).toContain(
                'Invalid option: expected one of "stuffed"|"normal"',
            );
        }
    });
});

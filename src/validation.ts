import { z } from 'zod';

const FORBIDDEN_TOPPINGS = ['pineapple', 'apple', 'banana', 'orange'];

// Pizza schema
const Pizza = z
    .object({
        size: z.number(),
        crust: z.enum(['stuffed', 'normal']),
        isDeepDish: z.boolean().default(false).optional(),
        toppings: z
            .array(z.string())
            .optional()
            .refine(
                (toppings) => {
                    if (!toppings) {
                        return true;
                    }
                    for (const topping of toppings) {
                        if (
                            FORBIDDEN_TOPPINGS.includes(topping.toLowerCase())
                        ) {
                            return false;
                        }
                    }
                    return true;
                },
                {
                    message: 'Contains invalid topping',
                },
            ),
    })
    .strict();

type ValidatorResult =
    | { isPizza: false; errors: string[] }
    | { isPizza: true; pizza: z.infer<typeof Pizza> };

export function validatePizza(input: unknown): ValidatorResult {
    const result = Pizza.safeParse(input);
    if (!result.success) {
        return {
            isPizza: false,
            // format errors
            errors: result.error.issues.map((e) => e.message),
        };
    }
    return { isPizza: true, pizza: result.data };
}

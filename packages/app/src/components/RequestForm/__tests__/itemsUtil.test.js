import * as Util from '../itemsUtil';

describe('Item Utilities', () => {
    describe('Male clothing sizes', () => {
        it('fetches the correct sizes for a male shirt', () => {
            const sizes = Util.getItemGenderSizes('Clothing', 'Shirt', 'Male');
            expect(sizes).toStrictEqual([
                'XS (32)',
                'S (34-36)',
                'M (38-40)',
                'L (42-44)',
                'XL (46)',
                'XXL (48)',
                'XXXL (50)'
            ]);
        });

        it('fetches the correct sizes for a male coat', () => {
            const sizes = Util.getItemGenderSizes('Clothing', 'Coat', 'Male');
            expect(sizes).toStrictEqual([
                'XS (32)',
                'S (34-36)',
                'M (38-40)',
                'L (42-44)',
                'XL (46)',
                'XXL (48)',
                'XXXL (50)'
            ]);
        });

        it('fetches the correct sizes for male pants', () => {
            const sizes = Util.getItemGenderSizes('Clothing', 'Pants', 'Male');
            expect(sizes).toStrictEqual([
                'XS (waist 28)',
                'S (waist 30)',
                'M (waist 32)',
                'L (waist 34)',
                'XL (waist 36)',
                'XXL (waist 38)',
                'XXXL (waist 40+)'
            ]);
        });

        it('non clothing items have no sizes', () => {
            const result = Util.getItemGenderSizes('Household', 'Pillow');
            expect(result).toStrictEqual([]);
        });
    });

    describe('Female clothing sizes', () => {
        it('fetches the correct sizes for female shirt', () => {
            const sizes = Util.getItemGenderSizes('Clothing', 'Shirt', 'Female');
            expect(sizes).toStrictEqual([
                'XS (0)',
                'S (2-4)',
                'M (6-8)',
                'L (10-12)',
                'XL (14-16)',
                'XXL (18-20)',
                'XXXL (22-24)'
            ]);
        });

        it('fetches the correct sizes for female coat', () => {
            const sizes = Util.getItemGenderSizes('Clothing', 'Coat', 'Female');
            expect(sizes).toStrictEqual([
                'XS (0)',
                'S (2-4)',
                'M (6-8)',
                'L (10-12)',
                'XL (14-16)',
                'XXL (18-20)',
                'XXXL (22-24)'
            ]);
        });

        it('fetches the correct sizes for  female pants', () => {
            const sizes = Util.getItemGenderSizes('Clothing', 'Pants', 'Female');
            expect(sizes).toStrictEqual([
                'XS (25-26)',
                'S (27-29)',
                'M (30-32)',
                'L (33-37)',
                'XL (38-41)',
                'XXL (42-46)',
                'XXXL (47+)'
            ]);
        });
    });

    describe('Non gender sizes', () => {
        it('fetches the correct sizes for gloves', () => {
            const gloves = Util.getItemNonGenderSizes('Clothing', 'Gloves');
            expect(gloves).toStrictEqual(['S', 'M', 'L']);
        });

        it('fetches the correct sizes for socks', () => {
            const socks = Util.getItemNonGenderSizes('Clothing', 'Socks');
            expect(socks).toStrictEqual(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']);
        });

        it('non clothing items have no sizes', () => {
            const result = Util.getItemNonGenderSizes('Household', 'Pillow');
            expect(result).toBeUndefined();
        });
    });

    describe('Determines if items are gendered', () => {
        it('shirts are gendered', () => {
            expect(Util.isItemGendered('Clothing', 'Shirt')).toBe(true);
        });

        it('coats are gendered', () => {
            expect(Util.isItemGendered('Clothing', 'Coat')).toBe(true);
        });

        it('socks are not', () => {
            expect(Util.isItemGendered('Clothing', 'Socks')).toBe(false);
        });

        it('pillows are not', () => {
            expect(Util.isItemGendered('Household', 'Pillow')).toBe(false);
        });
    });
});

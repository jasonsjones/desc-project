export default {
    Household: {
        Bedding: {},
        Pillow: {},
        Plates: {},
        Cutlery: {}
    },

    'Personal Hygeine': {
        Soap: {},
        Shampoo: {},
        Conditioner: {},
        'Brush/Comb': {},
        Toothbrush: {},
        Toothpaste: {}
    },

    Clothing: {
        Shirt: {
            gender: {
                Male: {
                    sizes: [
                        'XS (32)',
                        'S (34-36)',
                        'M (38-40)',
                        'L (42-44)',
                        'XL (46)',
                        'XXL (48)',
                        'XXXL (50)'
                    ]
                },
                Female: {
                    sizes: [
                        'XS (0)',
                        'S (2-4)',
                        'M (6-8)',
                        'L (10-12)',
                        'XL (14-16)',
                        'XXL (18-20)',
                        'XXXL (22-24)'
                    ]
                }
            }
        },

        Coat: {
            gender: {
                male: {},
                female: {}
            }
        },

        Socks: {
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            gender: {
                male: {},
                female: {}
            }
        },

        Gloves: {
            sizes: ['S', 'M', 'L']
        }
    },

    Engagement: {
        Artwork: {},
        Games: {}
    }
};

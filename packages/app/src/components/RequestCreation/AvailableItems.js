module.exports = {
    Household: {
        bedding: {},
        pillow: {},
        plates: {},
        cutlery: {}
    },

    PersonalHygiene: {
        soap: {},
        shampoo: {},
        conditioner: {},
        'brush/comb': {},
        toothbrush: {},
        toothpaste: {}
    },

    Clothing: {
        shirt: {
            gender: {
                male: {
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
                female: {
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
        coat: {
            gender: {
                male: {},
                female: {}
            }
        },
        socks: {
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            gender: {
                male: {},
                female: {}
            }
        },
        gloves: {
            sizes: ['S', 'M', 'L']
        }
    },

    Engagement: {
        artwork: {},
        games: {}
    }
};

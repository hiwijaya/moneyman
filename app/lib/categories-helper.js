
export default class CategoriesHelper {

    // TODO: write some functions to manage categories easily


    static COLORS = [
        '#FF7675',  // 0
        '#778BEB',
        '#2DB4E7',
        '#F19066',
        '#65C6C4',
        '#E3646D',
        '#9F90F1',
        '#74B9FF',
        '#FFF3A3',
        '#7FE7CC',
        '#E0555E',
        '#9B59B6',
        '#3498DB',
        '#F5CD79',
        '#92CEBE'   // 14
    ];

    static EXPENSE_ASSETS = [
        {
            category: 'Food',
            icons: ['cat-food-apple.png', 'cat-food-broccoli.png', 'cat-food-burger.png', 
                'cat-food-cheese.png', 'cat-food-chicken.png', 'cat-food-cocktail.png', 
                'cat-food-coffee.png', 'cat-food-fridge.png', 'cat-food-icecream.png', 
                'cat-food-kettle.png', 'cat-food-pizza.png', 'cat-food-rice.png', 
                'cat-food-tea.png', 'cat-food-toast.png', 'cat-food-wine.png'
            ],
            color_index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        },
        {
            category: 'Shopping',
            icons: ['cat-shopping-bag.png', 'cat-shopping-bills.png', 'cat-shopping-bodysoap.png', 
                'cat-shopping-boots.png', 'cat-shopping-cart.png', 'cat-shopping-coupon.png', 
                'cat-shopping-dress.png', 'cat-shopping-glasses.png', 'cat-shopping-haircut.png', 
                'cat-shopping-heels.png', 'cat-shopping-lipstick.png', 'cat-shopping-masker.png', 
                'cat-shopping-necklace.png', 'cat-shopping-perfume.png', 'cat-shopping-shirt.png', 
                'cat-shopping-tag.png'
            ],
            color_index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0]
        },
        {
            category: 'Transportation', 
            icons: ['cat-transportation-bicycle.png', 'cat-transportation-bike.png', 'cat-transportation-boarding.png', 
                'cat-transportation-bus.png', 'cat-transportation-car.png', 'cat-transportation-chopper.png', 
                'cat-transportation-gas.png', 'cat-transportation-parking.png', 'cat-transportation-plane.png', 
                'cat-transportation-ship.png', 'cat-transportation-taxi.png', 'cat-transportation-tow.png', 
                'cat-transportation-train.png'
            ],
            color_index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
        {
            category: 'Furniture',
            icons: ['cat-furniture-bathub.png', 'cat-furniture-bed.png', 'cat-furniture-fan.png', 
                'cat-furniture-flower.png', 'cat-furniture-home.png', 'cat-furniture-laundry.png', 
                'cat-furniture-light.png', 'cat-furniture-sofa.png', 'cat-furniture-toilet.png', 
                'cat-furniture-tools.png', 'cat-furniture-tv.png', 'cat-furniture-wardrobe.png', 
                'cat-furniture-water.png'
            ],
            color_index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
        {
            category: 'Entertainment',
            icons: ['cat-entertainment-badminton.png', 'cat-entertainment-basket.png', 'cat-entertainment-biking.png', 
                'cat-entertainment-bowling.png', 'cat-entertainment-boxing.png', 'cat-entertainment-card.png', 
                'cat-entertainment-disco.png', 'cat-entertainment-dumbbell.png', 'cat-entertainment-game.png', 
                'cat-entertainment-movies.png', 'cat-entertainment-music.png', 'cat-entertainment-skates.png', 
                'cat-entertainment-ticket.png'
            ],
            color_index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
        {
            category: 'Education',
            icons: ['cat-education-archive.png', 'cat-education-book.png', 'cat-education-guitar.png', 
                'cat-education-painting.png', 'cat-education-piano.png'
            ],
            color_index: [0, 1, 2, 3, 4]
        },
        {
            category: 'Family',
            icons: ['cat-family-baby.png', 'cat-family-babybottle.png', 'cat-family-babycare.png', 
                'cat-family-beach.png', 'cat-family-camping.png', 'cat-family-dino.png', 
                'cat-family-family.png', 'cat-family-gift.png', 'cat-family-horse.png', 
                'cat-family-stroley.png'
            ],
            color_index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        },
        {
            category: 'Medical',
            icons: ['cat-medical-ambulance.png', 'cat-medical-bandage.png', 'cat-medical-hospital.png', 
                'cat-medical-inject.png', 'cat-medical-insurance.png', 'cat-medical-pills.png', 
                'cat-medical-transfusion.png'],
            color_index: [0, 1, 2, 3, 4, 5, 6]
        },
        {
            category: 'Gadget',
            icons: ['cat-gadget-camera.png', 'cat-gadget-headphone.png', 'cat-gadget-laptop.png', 
                'cat-gadget-mobile.png', 'cat-gadget-pc.png', 'cat-gadget-phone.png', 
                'cat-gadget-printer.png', 'cat-gadget-simcard.png', 'cat-gadget-watch.png'],
            color_index: [0, 1, 2, 3, 4, 5, 6, 7, 8]
        }
    ];

    static INCOME_ASSETS = {
        category: 'Gadget',
        icons: ['cat-finance-atm.png', 'cat-finance-bag.png', 'cat-finance-bitcoin.png', 
            'cat-finance-card.png', 'cat-finance-check.png', 'cat-finance-diamond.png', 
            'cat-finance-mastercard.png', 'cat-finance-money.png', 'cat-finance-piggy.png', 
            'cat-finance-safe.png', 'cat-finance-stock.png', 'cat-finance-visa.png', 
            'cat-finance-wallet.png'
        ],
        color_index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }

}
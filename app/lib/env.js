import Realm from 'realm';
import moment from 'moment';


export default class Env {

    static getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    static getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static getRandomString(length) {
        let string = '';
        let possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            string += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return string;
    }

    static getHeightTopBar() {
        // if (this.isIOS()) {
        //     return (this.isIphoneX()) ? 50 : 20;
        // }
        return 0;
    }

    static getHeightActionBar() {
        return 50;
    }

    static now() {
        return moment().toDate();
    }

    static isToday(date){
        if(date !== null){
            if(date.toDateString() === Env.now().toDateString()){
                return true
            }
        }
        return false;
    }

    // formate date --> 31/07
    static formatDateMonth(date) {
        if(date !== null){
            return moment(date).format('DD/MM');
        }
        return '-';
    }

    static formatCurrency(amount) {
        if (amount != "") {
            let value = parseFloat(amount.replace(/\,/g, "")).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return value;
        }
        return '0';
    }

    static convertCurrency(amountStr) {
        if (amountStr != "") {
            let value = parseFloat(amountStr.replace(/\,/g, ""));
            return value;
        }
        return 0;
    }












    // REALM DATABASE -----------------

    static key = {
        USER_INFO: 'USER_INFO',     // refer to 'userInfo' object from react-native-google-signin
        // many more..
    }

    static schema = {
        name: 'Env',
        primaryKey: 'key',
        properties: {
            key: 'string',
            val: 'string',
            time: {
                type: 'date',
                default: Env.now()
            }
        }
    };

    // it will overwrite if the key already exist
    // give null as val to delete
    static writeStorage(key, val) {
        if (val !== null) {
            val = JSON.stringify(val);
        }

        let realm = new Realm({
            schema: [Env.schema, Env.categorySchema, Env.transactionSchema]
        });
        let records = realm.objects(Env.schema.name)
            .filtered('key = "' + key + '"');
        realm.write(() => {
            if (records.length > 0) {
                realm.delete(records);
            }
            if (val != null) {
                realm.create(Env.schema.name, {
                    key,
                    val
                });
            }
        });

    }

    // if the key doesn't exist, it will return null
    static readStorage(key) {
        let realm = new Realm({
            schema: [Env.schema, Env.categorySchema, Env.transactionSchema]
        });
        let records = realm.objects(Env.schema.name)
            .filtered('key = "' + key + '"');
        let result = (records.length > 0) ? records[0].val : null;

        return JSON.parse(result);
    }


    // CATEGORY MANAGER ----------------------------------------------

    //Transaction Type
    static EXPENSE_TYPE = 'Expense';
    static INCOME_TYPE = 'Income';

    static categorySchema = {
        name: 'Category',
        primaryKey: 'id',
        properties: {
            id: 'string',
            title: 'string',
            icon: 'int',        // contain require()
            color: 'string',
            type: 'string'
        }
    }

    static transactionSchema = {
        name: 'Transaction',
        properties: {
            id: 'string',
            categoryId: 'string',
            amount: 'int',
            memo: 'string',
            date: {
                type: 'date',
                default: Env.now()
            },
            type: 'string'
        }
    }


    static addCategory(category) {
        // consider add logic to check existing id.

        let realm = new Realm({
            schema: [Env.schema, Env.categorySchema, Env.transactionSchema]
        });
        realm.write(() => {
            realm.create('Category', category);
        });

    }

    // set id=null to retrieve all categories
    static getCategories(id, type) {
        let realm = new Realm({
            schema: [Env.schema, Env.categorySchema, Env.transactionSchema]
        });

        let categories = realm.objects('Category');

        if (id !== null && type !== null) {
            return categories.filtered('id = "' + id + '" AND type = "' + type + '"');
        }

        if(type !== null){
            return categories.filtered('type = "' + type + '"');
        }

        return categories
    }

    // delete > means wipe out/erase/destroy from existance
    // remove > means move to somewhere else (e.g trash)
    static deleteCategory(id, type){

        // TODO: Add logic to delete transaction records also.

        let realm = new Realm({
            schema: [Env.schema, Env.categorySchema, Env.transactionSchema]
        });
        let categories = realm.objects('Category');
        let category = categories.filtered('id = "' + id + '" AND type = "' + type + '"');
        realm.write(() => {
            if (category !== null) {
                realm.delete(category);
            }
        });
    }



    // TODO: add transaction query functions too

    static initDefaultCategories() {

        // if category already exist, ignore this function
        // consider if user delete all categories
        let categories = Env.getCategories(null, null);
        if (categories.length > 0) {
            return;
        }

        let defaultCategories = [
            {
                id: Env.getRandomString(16),
                title: 'Bills',
                icon: require('../asset/categories/cat-shopping-bills.png'),
                color: '#778BEB',
                type: Env.EXPENSE_TYPE
            },
            {
                id: Env.getRandomString(16),
                title: 'Food',
                icon: require('../asset/categories/cat-food-chicken.png'),
                color: '#65C6C4',
                type: Env.EXPENSE_TYPE
            },
            {
                id: Env.getRandomString(16),
                title: 'Transportation',
                icon: require('../asset/categories/cat-transportation-bus.png'),
                color: '#F19066',
                type: Env.EXPENSE_TYPE
            },
            {
                id: Env.getRandomString(16),
                title: 'Hangout',
                icon: require('../asset/categories/cat-food-cocktail.png'),
                color: '#E3646D',
                type: Env.EXPENSE_TYPE
            },
            {
                id: Env.getRandomString(16),
                title: 'Phone',
                icon: require('../asset/categories/cat-gadget-mobile.png'),
                color: '#F19066',
                type: Env.EXPENSE_TYPE
            },
            {
                id: Env.getRandomString(16),
                title: 'Health',
                icon: require('../asset/categories/cat-medical-hospital.png'),
                color: '#2DB4E7',
                type: Env.EXPENSE_TYPE
            },

            {
                id: Env.getRandomString(16),
                title: 'Salary',
                icon: require('../asset/categories/cat-finance-wallet.png'),
                color: '#3498DB',
                type: Env.INCOME_TYPE
            },
            {
                id: Env.getRandomString(16),
                title: 'Investments',
                icon: require('../asset/categories/cat-finance-piggy.png'),
                color: '#FFF3A3',
                type: Env.INCOME_TYPE
            }
        ];

        defaultCategories.forEach((value, index, array) => {
            Env.addCategory(value);
        });
    }


    // category icon colors
    static COLORS = [
        '#FF7675', // 0
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
        '#92CEBE', // 14
    ];


    static INCOME_ASSETS = [
        {
            category: 'Finance',
            icons: [
                {
                    icon: require('../asset/categories/cat-finance-atm.png'),
                    color: '#FF7675',
                }, 
                {
                    icon: require('../asset/categories/cat-finance-bag.png'),
                    color: '#778BEB'
                }, 
                {
                    icon: require('../asset/categories/cat-finance-bitcoin.png'),
                    color: '#2DB4E7'
                }, 
                {
                    icon: require('../asset/categories/cat-finance-card.png'),
                    color: '#F19066'
                }, 
                {
                    icon: require('../asset/categories/cat-finance-check.png'),
                    color: '#65C6C4'
                }, 
                {
                    icon: require('../asset/categories/cat-finance-diamond.png'),
                    color: '#E3646D'
                }, 
                {
                    icon: require('../asset/categories/cat-finance-mastercard.png'),
                    color: '#9F90F1'
                }, 
                {
                    icon: require('../asset/categories/cat-finance-money.png'),
                    color: '#74B9FF'
                }, 
                {
                    icon: require('../asset/categories/cat-finance-piggy.png'),
                    color: '#FFF3A3'
                }, 
                {
                    icon: require('../asset/categories/cat-finance-safe.png'),
                    color: '#7FE7CC'
                }, 
                {
                    icon: require('../asset/categories/cat-finance-stock.png'),
                    color: '#E0555E'
                }, 
                {
                    icon: require('../asset/categories/cat-finance-visa.png'),
                    color: '#9B59B6'
                }, 
                {
                    icon: require('../asset/categories/cat-finance-wallet.png'),
                    color: '#3498DB'
                },
            ]
        }
    ];

    static EXPENSE_ASSETS = [
        {
            category: 'Food',
            icons: [
                {
                    icon: require('../asset/categories/cat-food-apple.png'),
                    color: '#FF7675'
                },
                {
                    icon: require('../asset/categories/cat-food-broccoli.png'),
                    color: '#778BEB'
                },
                {
                    icon: require('../asset/categories/cat-food-burger.png'),
                    color: '#2DB4E7'
                },
                {
                    icon: require('../asset/categories/cat-food-cheese.png'),
                    color: '#F19066'
                },
                {
                    icon: require('../asset/categories/cat-food-chicken.png'),
                    color: '#65C6C4'
                },
                {
                    icon: require('../asset/categories/cat-food-cocktail.png'),
                    color: '#E3646D'
                },
                {
                    icon: require('../asset/categories/cat-food-coffee.png'),
                    color: '#9F90F1'
                },
                {
                    icon: require('../asset/categories/cat-food-fridge.png'),
                    color: '#74B9FF'
                },
                {
                    icon: require('../asset/categories/cat-food-icecream.png'),
                    color: '#FFF3A3'
                },
                {
                    icon: require('../asset/categories/cat-food-kettle.png'),
                    color: '#7FE7CC'
                },
                {
                    icon: require('../asset/categories/cat-food-pizza.png'),
                    color: '#E0555E'
                },
                {
                    icon: require('../asset/categories/cat-food-rice.png'),
                    color: '#9B59B6'
                },
                {
                    icon: require('../asset/categories/cat-food-tea.png'),
                    color: '#3498DB'
                },
                {
                    icon: require('../asset/categories/cat-food-toast.png'),
                    color: '#F5CD79'
                },
                {
                    icon: require('../asset/categories/cat-food-wine.png'),
                    color: '#92CEBE'
                },
            ]
        },
        {
            category: 'Transportation',
            icons: [
                {
                    icon: require('../asset/categories/cat-transportation-bicycle.png'),
                    color: '#FF7675'
                },
                {
                    icon: require('../asset/categories/cat-transportation-bike.png'),
                    color: '#778BEB'
                },
                {
                    icon: require('../asset/categories/cat-transportation-boarding.png'),
                    color: '#2DB4E7'
                },
                {
                    icon: require('../asset/categories/cat-transportation-bus.png'),
                    color: '#F19066'
                },
                {
                    icon: require('../asset/categories/cat-transportation-car.png'),
                    color: '#65C6C4'
                },
                {
                    icon: require('../asset/categories/cat-transportation-chopper.png'),
                    color: '#E3646D'
                },
                {
                    icon: require('../asset/categories/cat-transportation-gas.png'),
                    color: '#9F90F1'
                },
                {
                    icon: require('../asset/categories/cat-transportation-parking.png'),
                    color: '#74B9FF'
                },
                {
                    icon: require('../asset/categories/cat-transportation-plane.png'),
                    color: '#FFF3A3'
                },
                {
                    icon: require('../asset/categories/cat-transportation-ship.png'),
                    color: '#7FE7CC'
                },
                {
                    icon: require('../asset/categories/cat-transportation-taxi.png'),
                    color: '#E0555E'
                },
                {
                    icon: require('../asset/categories/cat-transportation-tow.png'),
                    color: '#9B59B6'
                },
                {
                    icon: require('../asset/categories/cat-transportation-train.png'),
                    color: '#3498DB'
                },
            ]
        },
        {
            category: 'Entertainment',
            icons: [
                {
                    icon: require('../asset/categories/cat-entertainment-badminton.png'),
                    color: '#FF7675'
                },
                {
                    icon: require('../asset/categories/cat-entertainment-basket.png'),
                    color: '#778BEB'
                },
                {
                    icon: require('../asset/categories/cat-entertainment-biking.png'),
                    color: '#2DB4E7'
                },
                {
                    icon: require('../asset/categories/cat-entertainment-bowling.png'),
                    color: '#F19066'
                },
                {
                    icon: require('../asset/categories/cat-entertainment-boxing.png'),
                    color: '#65C6C4'
                },
                {
                    icon: require('../asset/categories/cat-entertainment-card.png'),
                    color: '#E3646D'
                },
                {
                    icon: require('../asset/categories/cat-entertainment-disco.png'),
                    color: '#9F90F1'
                },
                {
                    icon: require('../asset/categories/cat-entertainment-dumbbell.png'),
                    color: '#74B9FF'
                },
                {
                    icon: require('../asset/categories/cat-entertainment-game.png'),
                    color: '#FFF3A3'
                },
                {
                    icon: require('../asset/categories/cat-entertainment-movies.png'),
                    color: '#7FE7CC'
                },
                {
                    icon: require('../asset/categories/cat-entertainment-music.png'),
                    color: '#E0555E'
                },
                {
                    icon: require('../asset/categories/cat-entertainment-skates.png'),
                    color: '#9B59B6'
                },
                {
                    icon: require('../asset/categories/cat-entertainment-ticket.png'),
                    color: '#3498DB'
                },
            ]
        },
        {
            category: 'Shopping',
            icons: [
                {
                    icon: require('../asset/categories/cat-shopping-bag.png'),
                    color: '#FF7675'
                },
                {
                    icon: require('../asset/categories/cat-shopping-bills.png'),
                    color: '#778BEB'
                },
                {
                    icon: require('../asset/categories/cat-shopping-bodysoap.png'),
                    color: '#2DB4E7'
                },
                {
                    icon: require('../asset/categories/cat-shopping-boots.png'),
                    color: '#F19066'
                },
                {
                    icon: require('../asset/categories/cat-shopping-cart.png'),
                    color: '#65C6C4'
                },
                {
                    icon: require('../asset/categories/cat-shopping-coupon.png'),
                    color: '#E3646D'
                },
                {
                    icon: require('../asset/categories/cat-shopping-dress.png'),
                    color: '#9F90F1'
                },
                {
                    icon: require('../asset/categories/cat-shopping-glasses.png'),
                    color: '#74B9FF'
                },
                {
                    icon: require('../asset/categories/cat-shopping-haircut.png'),
                    color: '#FFF3A3'
                },
                {
                    icon: require('../asset/categories/cat-shopping-heels.png'),
                    color: '#7FE7CC'
                },
                {
                    icon: require('../asset/categories/cat-shopping-lipstick.png'),
                    color: '#E0555E'
                },
                {
                    icon: require('../asset/categories/cat-shopping-masker.png'),
                    color: '#9B59B6'
                },
                {
                    icon: require('../asset/categories/cat-shopping-necklace.png'),
                    color: '#3498DB'
                },
                {
                    icon: require('../asset/categories/cat-shopping-perfume.png'),
                    color: '#F5CD79'
                },
                {
                    icon: require('../asset/categories/cat-shopping-shirt.png'),
                    color: '#92CEBE'
                },
                {
                    icon: require('../asset/categories/cat-shopping-tag.png'),
                    color: '#FF7675'
                },
            ]
        },
        {
            category: 'Furniture',
            icons: [
                {
                    icon: require('../asset/categories/cat-furniture-bathub.png'),
                    color: '#FF7675'
                },
                {
                    icon: require('../asset/categories/cat-furniture-bed.png'),
                    color: '#778BEB'
                },
                {
                    icon: require('../asset/categories/cat-furniture-fan.png'),
                    color: '#2DB4E7'
                },
                {
                    icon: require('../asset/categories/cat-furniture-flower.png'),
                    color: '#F19066'
                },
                {
                    icon: require('../asset/categories/cat-furniture-home.png'),
                    color: '#65C6C4'
                },
                {
                    icon: require('../asset/categories/cat-furniture-laundry.png'),
                    color: '#E3646D'
                },
                {
                    icon: require('../asset/categories/cat-furniture-light.png'),
                    color: '#9F90F1'
                },
                {
                    icon: require('../asset/categories/cat-furniture-sofa.png'),
                    color: '#74B9FF'
                },
                {
                    icon: require('../asset/categories/cat-furniture-toilet.png'),
                    color: '#FFF3A3'
                },
                {
                    icon: require('../asset/categories/cat-furniture-tools.png'),
                    color: '#7FE7CC'
                },
                {
                    icon: require('../asset/categories/cat-furniture-tv.png'),
                    color: '#E0555E'
                },
                {
                    icon: require('../asset/categories/cat-furniture-wardrobe.png'),
                    color: '#9B59B6'
                },
                {
                    icon: require('../asset/categories/cat-furniture-water.png'),
                    color: '#3498DB'
                },
            ]
        },
        {
            category: 'Family',
            icons: [
                {
                    icon: require('../asset/categories/cat-family-baby.png'),
                    color: '#FF7675'
                },
                {
                    icon: require('../asset/categories/cat-family-babybottle.png'),
                    color: '#778BEB'
                },
                {
                    icon: require('../asset/categories/cat-family-babycare.png'),
                    color: '#2DB4E7'
                },
                {
                    icon: require('../asset/categories/cat-family-beach.png'),
                    color: '#F19066'
                },
                {
                    icon: require('../asset/categories/cat-family-camping.png'),
                    color: '#65C6C4'
                },
                {
                    icon: require('../asset/categories/cat-family-dino.png'),
                    color: '#E3646D'
                },
                {
                    icon: require('../asset/categories/cat-family-family.png'),
                    color: '#9F90F1'
                },
                {
                    icon: require('../asset/categories/cat-family-gift.png'),
                    color: '#74B9FF'
                },
                {
                    icon: require('../asset/categories/cat-family-horse.png'),
                    color: '#FFF3A3'
                },
                {
                    icon: require('../asset/categories/cat-family-stroley.png'),
                    color: '#7FE7CC'
                },
            ]
        },
        {
            category: 'Gadget',
            icons: [
                {
                    icon: require('../asset/categories/cat-gadget-camera.png'),
                    color: '#FF7675'
                },
                {
                    icon: require('../asset/categories/cat-gadget-headphone.png'),
                    color: '#778BEB'
                },
                {
                    icon: require('../asset/categories/cat-gadget-laptop.png'),
                    color: '#2DB4E7'
                },
                {
                    icon: require('../asset/categories/cat-gadget-mobile.png'),
                    color: '#F19066'
                },
                {
                    icon: require('../asset/categories/cat-gadget-pc.png'),
                    color: '#65C6C4'
                },
                {
                    icon: require('../asset/categories/cat-gadget-phone.png'),
                    color: '#E3646D'
                },
                {
                    icon: require('../asset/categories/cat-gadget-printer.png'),
                    color: '#9F90F1'
                },
                {
                    icon: require('../asset/categories/cat-gadget-simcard.png'),
                    color: '#74B9FF'
                },
                {
                    icon: require('../asset/categories/cat-gadget-watch.png'),
                    color: '#FFF3A3'
                },
            ]
        },
        {
            category: 'Education',
            icons: [
                {
                    icon: require('../asset/categories/cat-education-archive.png'),
                    color: '#FF7675'
                },
                {
                    icon: require('../asset/categories/cat-education-book.png'),
                    color: '#778BEB'
                },
                {
                    icon: require('../asset/categories/cat-education-guitar.png'),
                    color: '#2DB4E7'
                },
                {
                    icon: require('../asset/categories/cat-education-painting.png'),
                    color: '#F19066'
                },
                {
                    icon: require('../asset/categories/cat-education-piano.png'),
                    color: '#65C6C4'
                },
            ]
        },
        {
            category: 'Medical',
            icons: [
                {
                    icon: require('../asset/categories/cat-medical-ambulance.png'),
                    color: '#FF7675'
                },
                {
                    icon: require('../asset/categories/cat-medical-bandage.png'),
                    color: '#778BEB'
                },
                {
                    icon: require('../asset/categories/cat-medical-hospital.png'),
                    color: '#2DB4E7'
                },
                {
                    icon: require('../asset/categories/cat-medical-inject.png'),
                    color: '#F19066'
                },
                {
                    icon: require('../asset/categories/cat-medical-insurance.png'),
                    color: '#65C6C4'
                },
                {
                    icon: require('../asset/categories/cat-medical-pills.png'),
                    color: '#E3646D'
                },
                {
                    icon: require('../asset/categories/cat-medical-transfusion.png'),
                    color: '#9F90F1'
                },
            ]
        },
    ];

    

}
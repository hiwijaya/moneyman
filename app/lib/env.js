import Realm from 'realm';


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
        return new Date();
    }


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
    static EXPENSE_TYPE = 'EXPENSE';
    static INCOME_TYPE = 'INCOME';

    static categorySchema = {
        name: 'Category',
        primaryKey: 'id',
        properties: {
            id: 'string',
            title: 'string',
            icon: 'string',
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

        

        if (id !== null) {
            return categories.filtered('id = "' + id + '" AND type = "' + type + '"');
        }

        return categories
    }

    // TODO: add transaction query functions too

    static initDefaultCategories() {

        // if category already exist, ignore this function
        let categories = Env.getCategories(null);
        if (categories.length > 0) {
            return;
        }

        let defaultCategories = [{
                id: Env.getRandomString(16),
                title: 'Bills',
                icon: 'cat-shopping-bills.png',
                color: '#FF7675',
                type: Env.EXPENSE_TYPE
            },
            {
                id: Env.getRandomString(16),
                title: 'Food',
                icon: 'cat-food-burger.png',
                color: '#778BEB',
                type: Env.EXPENSE_TYPE
            },
            {
                id: Env.getRandomString(16),
                title: 'Transportation',
                icon: 'cat-transportation-bus.png',
                color: '#2DB4E7',
                type: Env.EXPENSE_TYPE
            },
            {
                id: Env.getRandomString(16),
                title: 'Hangout',
                icon: 'cat-food-cocktail.png',
                color: '#9F90F1',
                type: Env.EXPENSE_TYPE
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

    static EXPENSE_ASSETS = [
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
        // TODO: add more assets and do some sort
    ]

    

}
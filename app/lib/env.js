import Realm from 'realm';


export default class Env {

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
            schema: [Env.schema]
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
            schema: [Env.schema]
        });
        let records = realm.objects(Env.schema.name)
            .filtered('key = "' + key + '"');
        let result = (records.length > 0) ? records[0].val : null;

        return JSON.parse(result);
    }

}
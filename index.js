class RedisClone {
    _database = [];
    _secToDelete;

    constructor(secToDelete) {
        this._secToDelete = secToDelete * 1000;
    }

    deleteKey(key) {
        setTimeout(() => {
            this._database = this._database.filter(item => item.key !== key)
        }, this._secToDelete);
    }
    
    get(key) {
        const respond = this._database.find(item => item.key === key);

        if (!respond) return 'Such key does not exist';

        return `value is ${JSON.stringify(respond.value)}`;
    }

    set(key, value) {
        const dataToStore = {
            key,
            value
        };

        this._database.push(dataToStore);

        this.deleteKey(key);

        return `'${key}' key has been created`;
    }

    clear() {
        this._database = [];
        return this._database;
    }
}

// const cacheTen = new RedisClone(10);

// cacheTen.set('hello', 'world');

// console.log(cacheTen.get('hello'));

// setTimeout(() => {
//     console.log('in 1 sec', cacheTen.get('hello'));
// }, 1000);

// setTimeout(() => {
//     console.log('in 11 sec', cacheTen.get('hello'));
// }, 11000);

module.exports = { RedisClone }
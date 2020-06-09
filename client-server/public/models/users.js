class User {

    constructor(name, gender, birth, country, email, password, photo, admin, register) {

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();

    } // fim constructor

    // getters
    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    get birth() {
        return this._birth;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get photo() {
        return this._photo;
    }

    get admin() {
        return this._admin;
    }

    get register() {
        return this._register;
    }
    // fim geters

    // setters
    set photo(value) {
        this._photo = value;
    }

    set id(value){
        this._id = value;
    }
    // fim setes

    loadFromJSON(json) {

        for (let name in json) {

            switch (name) {
                case '_register':
                    this[name] = new Date(json[name]);
                    break;
                default:
                    this[name] = json[name];
            }
        }

    } // fim loadFromJSON

    static getUsersStorage() {

        //verifica o DB
        //return HttpRequest.get('/users');
        return Fetch.get('/users');

    } // fim getUsers

    toJson() {

        let json = {};

        Object.keys(this).forEach(key => {
            if (this[key] !== undefined) {
                json[key] = this[key];
            }
        });

        return json;

    } // fim toJSON

    save() {

        return new Promise((resolve, reject) => {
            let promise;

            if (this.id) {
                promise = HttpRequest.put(`/users/${this.id}`, this.toJson() );
            } else {
                promise = HttpRequest.post(`/users`, this.toJson() );
            }

            promise.then(data => {

                this.loadFromJSON(data);

                resolve(this);

            }).catch(e=>{
                reject(e);
            });
        });

    }

    remove() {

        //remove os datos do DB
        return HttpRequest.delete(`/users/${this.id}`);

    }

}
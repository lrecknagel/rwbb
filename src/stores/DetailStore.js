import { observable } from "mobx";

class DetailStore {

  @observable data = [];

  fetchData = () => {
    console.log('HERE');
    console.log(fetch);
    return new Promise( (resolve, reject) => {
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }).then(_data => {
        _data.json().then(data => {
          this.data = data;
          resolve(true)
        })
      }).catch( error => reject(error))
    });
  }
}

export default DetailStore;
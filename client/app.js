// fetch를 사용하여 요청
fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({query: `{ customers { name } }`})
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));


const counter = {
  _val: 0,
  add() {
    this._val += 1;
  },
  get val() {
    return this._val;
  }
}

document.getElementById('add').addEventListener('click', function() {
  // fetch를 사용하여 요청
  fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: `mutation { addCustomer(name: "hello${counter.val}", email: "world${counter.val}@naver.com", age: 11) }`})
  })
    .then(r => r.json())
    .then((data) => {
      counter.add();
      console.log(data, counter.val)
    });
});
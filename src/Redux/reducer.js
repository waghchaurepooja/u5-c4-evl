const init = {

    clientusername : "",
    clientproblems : [],
    admin : []

};

export const reducer = (store = init, { type, payload }) => {
  console.log('type:', type)
  console.log('payload:', payload)
  switch (type) {
      case "CLIENT_USERNAME" : return {...store, clientusername : payload };
      case "CLIENT_PROBLEMS" : return {...store, clientproblems : [...store.clientproblems , payload]};
      case "ERASE" : return {...store, clientproblems : payload};
      case "ADMIN" : return {...store, admin : payload};
    default:
      return store;
  }
};
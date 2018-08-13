import React, { Component } from 'react'

const getHashParams = () => {
  let hashParams = {};
  let e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

const setImplicitAccessToken = async () => {
  let params = getHashParams();
  let access_token = params.access_token;
  sessionStorage.setItem('access_token', access_token);
  return access_token;
};

class SetImplicitToken extends Component {
  componentDidMount() {
    setImplicitAccessToken()
      .then((token) => {
        console.log(token);
        window.location.replace('/');
      })
      .catch(err => {
        console.log(err);
        console.log('There was an error logging you in');
      })
  }
  render() {
    return(
      <React.Fragment>
      </React.Fragment>
    )
  }
}

export default SetImplicitToken;

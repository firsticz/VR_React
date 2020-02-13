import React from 'react';
import { Redirect } from 'react-router-dom'


const Check = props =>{
    if(window.sessionStorage.getItem("jwt") !== null){
      return <Redirect to={window.location.pathname} />
    }
    else{
      return <Redirect to="/login" />
    }
}

export default Check;
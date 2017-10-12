import React from 'react';
import {Link} from 'react-router';
import './Menu.css';

function Menu({city}) {
  let toggle = false;
  //show/hide dropbox menu on Menu component click
  let _handleClick = () => {
    toggle = !toggle;
    if(toggle) {
      console.log("Show")
      document.getElementById("dropdown").classList.toggle("show");
    } else {
      console.log("Hide");
      document.getElementById("dropdown").classList.remove("show");
    }
  }
  //hide dropbox menu on click outsude the Menu component
  window.onclick = event => {
    if (!event.target.matches(".fa-bars")) {
      var dropdwn = document.getElementsByClassName("Menu-dropdown");
      for(var i = 0; i<dropdwn.length; i++) {
        var openDropdwn = dropdwn[i];
        if(openDropdwn.classList.contains("show")){
          openDropdwn.classList.remove("show");
          toggle = false;
        }
      }
    }
  }

  return(
    <div className="Menu">
      <button className="Menu-btn" onClick={() => _handleClick()}>
        <i className="fa fa-bars fa-2x" aria-hidden="true" id="i-bars"/>
      </button>
      <div className="Menu-dropdown" id="dropdown">
        <Link to="/">Clear</Link>
        <Link to={`/${city.city}`}>Hourly</Link>
        <Link to={`/${city.city}/daily`}>Daily</Link>
      </div>
    </div>
  );
}

export default Menu;

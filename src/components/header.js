import React from "react";

export default function Header() {
  return (
    <header>
      <div className='header-inner'>
        <div className='logo'>Plants.</div>
        <nav>
          <ul>
            <li>
              <a href='/'>discover</a>
            </li>
            <li>
              <a href='https://taylor-abbott.dev/'>contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

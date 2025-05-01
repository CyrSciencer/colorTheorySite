import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <header>
        <h1>Color Theory Site</h1>
      </header>
      <main>
        <nav>
          <ul>
            <li>
              <Link to="/single-color">Single Color Analysis</Link>
            </li>
            <li>
              <Link to="/composition-of-two">Composition of Two Colors</Link>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
};

export default HomePage;

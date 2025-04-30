import React from "react";
import { Link } from "react-router-dom";
const CodePage = () => {
  return (
    <div>
      <header>
        <h1>Code Snippets</h1>
        <Link to="/">
          <button>HomePage</button>
        </Link>
      </header>
      <main>
        <p>This page will contain various code snippets.</p>
        {/* Add your code content here */}
      </main>
    </div>
  );
};

export default CodePage;

/** @jsx h */
import { h, Component, render } from "preact";
import { Router } from "preact-router";
import { Link } from 'preact-router/match';
import AsyncRoute from 'preact-async-route';

import "./index.css";

import Home from "./Components/Home/Home";

const NODE = document.body.querySelector("#root");
let new_scroll_position = 0;

class Navbar extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const NAV_NODE = document.querySelector("#APP_NAV");
    let last_scroll_position = window.scrollY;
    if (
      new_scroll_position < last_scroll_position &&
      last_scroll_position > 50
    ) {
      NAV_NODE.classList.add("is__pinned");
      new_scroll_position = window.scrollY;
    } else if (new_scroll_position > last_scroll_position) {
      NAV_NODE.classList.remove("is__pinned");
    }
    new_scroll_position = last_scroll_position;
  };

  render() {
    return (
        <nav id="APP_NAV" className="navigation">
          <Link activeClassName="active" href="/" aria-label="Read more about..">
            <svg id="icon-home" viewBox="0 0 32 32">
              <path d="M32 19l-6-6v-9h-4v5l-6-6-16 16v1h4v10h10v-6h4v6h10v-10h4z" />
            </svg>
          </Link>
          <Link activeClassName="active" href="/about" aria-label="Read more about..">
            <svg id="icon-bubble" viewBox="0 0 32 32">
              <path d="M16 6c-1.717 0-3.375 0.271-4.928 0.804-1.46 0.502-2.76 1.211-3.863 2.108-2.069 1.681-3.209 3.843-3.209 6.088 0 1.259 0.35 2.481 1.039 3.63 0.711 1.185 1.781 2.268 3.093 3.133 0.949 0.625 1.587 1.623 1.755 2.747 0.056 0.375 0.091 0.753 0.105 1.129 0.233-0.194 0.461-0.401 0.684-0.624 0.755-0.755 1.774-1.172 2.828-1.172 0.168 0 0.336 0.011 0.505 0.032 0.655 0.083 1.325 0.126 1.99 0.126 1.717 0 3.375-0.271 4.928-0.804 1.46-0.502 2.76-1.211 3.863-2.108 2.069-1.681 3.209-3.843 3.209-6.088s-1.14-4.407-3.209-6.088c-1.104-0.897-2.404-1.606-3.863-2.108-1.553-0.534-3.211-0.804-4.928-0.804zM16 2v0c8.837 0 16 5.82 16 13s-7.163 13-16 13c-0.849 0-1.682-0.054-2.495-0.158-3.437 3.437-7.539 4.053-11.505 4.144v-0.841c2.142-1.049 4-2.961 4-5.145 0-0.305-0.024-0.604-0.068-0.897-3.619-2.383-5.932-6.024-5.932-10.103 0-7.18 7.163-13 16-13z" />
            </svg>
          </Link>
          <Link activeClassName="active" href="/contact" aria-label="Read more about..">
            <svg id="icon-location" viewBox="0 0 32 32">
              <path d="M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" />
            </svg>
          </Link>
          <Link activeClassName="active" href="/more" aria-label="Read more about..">
            <svg id="icon-navigation-more" viewBox="0 0 20 20">
              <path d="M4 12c-1.105 0-2-0.895-2-2s0.895-2 2-2v0c1.105 0 2 0.895 2 2s-0.895 2-2 2v0zM10 12c-1.105 0-2-0.895-2-2s0.895-2 2-2v0c1.105 0 2 0.895 2 2s-0.895 2-2 2v0zM16 12c-1.105 0-2-0.895-2-2s0.895-2 2-2v0c1.105 0 2 0.895 2 2s-0.895 2-2 2v0z" />
            </svg>
          </Link>
        </nav>
    );
  }
}

const App = () => (
  <div id="root">
    <Navbar />
    <Router>
      <Home path="/" />
      <AsyncRoute
        path="/about"
        getComponent={() =>
          import('./Components/About/About.jsx').then(module => module.default)
        }
      />
      <Error type="404" default />
    </Router>
  </div>
);

/** fall-back route (handles unroutable URLs) */
const Error = ({ type, url }) => (
  <main className="error">
    <h2>Error {type}</h2>
    <p>It looks like we hit a snag.</p>
    <pre>{url}</pre>
  </main>
);

render(<App />, document.body, NODE);

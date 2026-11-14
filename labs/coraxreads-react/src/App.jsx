import { useState } from "react";
import "./App.css";

const books = [
  { title: "The Quiet Launch", author: "M. Rivers", shelf: "Stories", tone: "coral" },
  { title: "Small Steps, Strong Systems", author: "A. Okafor", shelf: "Technology", tone: "blue" },
  { title: "A Map of Good Questions", author: "J. Chen", shelf: "Stories", tone: "gold" },
  { title: "The Patient Gardener", author: "N. Patel", shelf: "Everyday", tone: "green" },
];

const shelves = ["All books", "Stories", "Technology", "Everyday"];

function App() {
  const [query, setQuery] = useState("");
  const [activeShelf, setActiveShelf] = useState("All books");
  const displayName = "Your display name";

  const visibleBooks = books.filter((book) => {
    const matchesShelf = activeShelf === "All books" || book.shelf === activeShelf;
    const searchText = `${book.title} ${book.author} ${book.shelf}`.toLowerCase();
    return matchesShelf && searchText.includes(query.toLowerCase());
  });

  return (
    <div className="storefront">
      <header className="site-header">
        <a className="brand" href="/coraxreads/" aria-label="CoraxReads home">
          <span className="brand-mark" aria-hidden="true">C</span>
          <span>CoraxReads</span>
        </a>
        <span className="header-note">A neighborhood bookstore, online</span>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Good stories. Thoughtful shelves.</p>
            <h1 id="hero-title">A little room for your <span>next favorite.</span></h1>
            <p className="hero-description">
              Browse a small hand-picked shelf, search by title, and find a book
              for your next quiet moment.
            </p>
            <p className="deployed-by">Built by <strong>{displayName}</strong> for the Week 2 Linux lab.</p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <span className="sun"></span>
            <span className="book book-one"></span>
            <span className="book book-two"></span>
            <span className="book book-three"></span>
            <span className="shelf"></span>
          </div>
        </section>

        <section className="catalog" aria-labelledby="catalog-title">
          <div className="catalog-heading">
            <div>
              <p className="eyebrow">The CoraxReads shelf</p>
              <h2 id="catalog-title">Find a good read</h2>
            </div>
            <label className="search-label">
              <span>Search books</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Title, author, or shelf"
              />
            </label>
          </div>

          <div className="shelf-filters" aria-label="Filter by shelf">
            {shelves.map((shelf) => (
              <button
                className={activeShelf === shelf ? "filter active" : "filter"}
                key={shelf}
                onClick={() => setActiveShelf(shelf)}
                type="button"
              >
                {shelf}
              </button>
            ))}
          </div>

          {visibleBooks.length > 0 ? (
            <ul className="book-grid">
              {visibleBooks.map((book) => (
                <li className="book-card" key={book.title}>
                  <div className={`cover ${book.tone}`} aria-hidden="true">
                    <span className="cover-rule"></span>
                    <span className="cover-title">{book.title}</span>
                    <span className="cover-author">{book.author}</span>
                  </div>
                  <div className="book-details">
                    <p className="book-shelf">{book.shelf}</p>
                    <h3>{book.title}</h3>
                    <p>by {book.author}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state" role="status">No books match that search. Try another title or shelf.</p>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <span>CoraxReads</span>
        <span>A practice storefront for learning how websites are served.</span>
      </footer>
    </div>
  );
}

export default App;

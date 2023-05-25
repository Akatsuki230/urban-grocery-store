export function navbar() {
  // write a simple navbar using bootstrap
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand ml-8" href="/">Urban Grocery Store</a>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="/">Home</a>
        </li>
      </ul>
    </nav>
  )
}

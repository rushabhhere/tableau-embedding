import { Link } from 'wouter';

function NotFound() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">404 Not Found</h1>
      <Link className="text-blue-400 text-xl underline" href="/">
        Go home
      </Link>
    </div>
  );
}

export default NotFound;

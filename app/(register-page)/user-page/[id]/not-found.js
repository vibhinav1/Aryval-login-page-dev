export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h2 className="text-4xl mb-9">Sorry, this user doesn not exist.</h2>
        <a href="/" className="btn btn-primary">
          Go to Home
        </a>
      </div>
    </div>
  );
}

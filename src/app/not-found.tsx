import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-7xl font-extrabold text-red-500 mb-4">404</div>
      <div className="text-3xl font-bold mb-2">Page Not Found</div>
      <div className="text-6xl mb-4">😕</div>
      <p className="text-lg text-gray-500 mb-6">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
        Go to Home
      </Link>
    </main>
  );
} 

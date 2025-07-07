import { Card, CardContent } from "@/components/ui/card";

export default function Footer() {
  return (
    <footer className="w-full mt-8">
      <Card>
        <CardContent className="text-center py-6 text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} NewsSite. All rights reserved.
        </CardContent>
      </Card>
    </footer>
  );
} 
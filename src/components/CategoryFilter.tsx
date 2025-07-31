import { Button } from "@/components/ui/button";

export default function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => setSelectedCategory(null)}
        className="rounded-full"
        size="sm"
      >
        All
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={selectedCategory === cat ? "default" : "outline"}
          onClick={() => setSelectedCategory(cat)}
          className="rounded-full capitalize"
          size="sm"
        >
          {cat}
        </Button>
      ))}
    </div>
  );
} 
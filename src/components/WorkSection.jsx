import { categories } from '../data/projects';
import useStickyCarousel from '../hooks/useStickyCarousel';
import CategoryZone from './CategoryZone';

export default function WorkSection() {
  const activeCards = useStickyCarousel(categories.length);

  return (
    <section className="work" id="work">
      {categories.map((cat, i) => (
        <CategoryZone
          key={cat.id}
          category={cat}
          index={i}
          activeCard={activeCards[i]}
          isFirst={i === 0}
        />
      ))}
    </section>
  );
}

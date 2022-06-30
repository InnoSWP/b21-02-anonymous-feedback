import "./style.scss";

import Star from "./Star";

interface Props {
  /** A number in the range [1, 5]. */
  rating: number;
  id: string;
}

type Range = [number, number];

const inclusiveRange = function* ([from, to]: Range) {
  while (from <= to) {
    yield from;
    from++;
  }
};

const clamp = (value: number, [min, max]: Range) => {
  if (value > max) {
    return max;
  }

  if (value < min) {
    return min;
  }

  return value;
};

const Rating = ({ rating, id }: Props) => {
  return (
    <span
      className="rating"
      aria-label={`Rating of ${rating} stars`}
      role="img"
    >
      {[...inclusiveRange([1, 5])].map((nthStar) => (
        <Star
          key={nthStar}
          filled={clamp(rating - nthStar + 1, [0, 1])}
          id={`${id}-star${nthStar}`}
        />
      ))}
    </span>
  );
};

export default Rating;

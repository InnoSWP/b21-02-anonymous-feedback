import { useCallback, useState } from "react";
import { Message } from "../types";

interface AverageRating {
  rating: number | null;
  calculate(messages: Message[]): void;
  update(message: Message): void;
}

const useAverageRating = (): AverageRating => {
  const [stats, setStats] = useState({ count: 0, total: 0 });

  const calculate = useCallback((messages: Message[]) => {
    let count = 0;
    let total = 0;

    for (const message of messages) {
      if (`rating` in message.content) {
        count++;
        total += message.content.rating;
      }
    }

    setStats({ count, total });
  }, []);

  const update = useCallback((message: Message) => {
    if (`rating` in message.content) {
      const { rating } = message.content;
      setStats(({ count, total }) => ({
        count: count + 1,
        total: total + rating,
      }));
    }
  }, []);

  return {
    rating: stats.count === 0 ? null : stats.total / stats.count,
    calculate,
    update,
  };
};

export default useAverageRating;

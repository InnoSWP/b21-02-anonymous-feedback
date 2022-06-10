import { differenceInMilliseconds, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

const displayAge = (timestamp: Date) =>
  formatDistanceToNow(timestamp, { addSuffix: true, includeSeconds: true });

const DETAILED_SECONDS_STEPS = [5, 10, 20, 40, 60, 90];
const MAX_DETAILED_MINUTES = (44 * 60 + 30) * 1000;
const MAX_DETAILED_HOURS = (23 * 3600 + 59 * 50 + 30) * 1000;

const MINUTE = 60 * 1000;
const HOUR = 3600 * 1000;

const calculateNextRefresh = (timestamp: Date): number | null => {
  const age = differenceInMilliseconds(Date.now(), timestamp);

  for (const step of DETAILED_SECONDS_STEPS) {
    if (age < step * 1000) {
      return step * 1000 - age;
    }
  }

  if (age < MAX_DETAILED_MINUTES) {
    return MINUTE - (age % MINUTE);
  }

  if (age < MAX_DETAILED_HOURS) {
    return HOUR - (age % HOUR);
  }

  return null;
};

const useDisplayAge = (timestamp: Date) => {
  const [displayedAge, setDisplayedAge] = useState(() => displayAge(timestamp));

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const refresh = () => {
      const nextRefresh = calculateNextRefresh(timestamp);
      if (nextRefresh) {
        timeout = setTimeout(() => {
          setDisplayedAge(displayAge(timestamp));
          refresh();
        }, nextRefresh);
      }
    };

    refresh();

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [displayedAge, timestamp]);

  return displayedAge;
};

export default useDisplayAge;

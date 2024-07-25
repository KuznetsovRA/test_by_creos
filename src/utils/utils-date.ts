import { TypesDesignerFull, TypesDesignerIssues } from "../types/types-data.ts";
import { TypesLocale } from "../types/types-settings-site.ts";

export const getRelativeTime = (
  dateCreated: Date,
  language: TypesLocale,
): string => {
  const now = new Date();
  const date = new Date(dateCreated);

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    ru: [
      { label: ["год", "года", "лет"], seconds: 31536000 },
      { label: ["месяц", "месяца", "месяцев"], seconds: 2592000 },
      { label: ["день", "дня", "дней"], seconds: 86400 },
      { label: ["час", "часа", "часов"], seconds: 3600 },
      { label: ["минута", "минуты", "минут"], seconds: 60 },
      { label: ["секунда", "секунды", "секунд"], seconds: 1 },
    ],
    en: [
      { label: ["year", "years"], seconds: 31536000 },
      { label: ["month", "months"], seconds: 2592000 },
      { label: ["day", "days"], seconds: 86400 },
      { label: ["hour", "hours"], seconds: 3600 },
      { label: ["minute", "minutes"], seconds: 60 },
      { label: ["second", "seconds"], seconds: 1 },
    ],
  };

  const getDeclension = (number: number, titles: [string, string, string?]) => {
    if (language === "en") {
      return titles[number > 1 ? 1 : 0];
    } else {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ];
    }
  };

  const intervalsForLanguage = intervals[language];

  for (const interval of intervalsForLanguage) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) {
      const label = getDeclension(
        count,
        interval.label as [string, string, string?],
      );
      return language === "en"
        ? `${count} ${label} ago`
        : `${count} ${label} назад`;
    }
  }

  return language === "en" ? "just now" : "только что";
};

export const getMedianTime = (issues: TypesDesignerIssues[]): number => {
  const durations = issues
    .map((issue) => {
      if (issue.date_finished_by_designer) {
        return (
          (new Date(issue.date_finished_by_designer).getTime() -
            new Date(issue.date_started_by_designer).getTime()) /
          (1000 * 60 * 60)
        );
      } else {
        return null;
      }
    })
    .filter((duration) => duration !== null) as number[];

  durations.sort((a, b) => a - b);

  const middle = Math.floor(durations.length / 2);

  if (durations.length === 0) return 0;

  if (durations.length % 2 === 0) {
    return (durations[middle - 1] + durations[middle]) / 2;
  } else {
    return durations[middle];
  }
};

export const sortDesigners = (
  arr: TypesDesignerFull[],
  sortType: string,
  order: string,
): TypesDesignerFull[] => {
  switch (sortType) {
    case "email":
    case "username": {
      if (order === "descending") {
        return arr
          .slice()
          .sort((a: TypesDesignerFull, b: TypesDesignerFull) => {
            if (a[sortType].toLowerCase() < b[sortType].toLowerCase()) {
              return -1;
            }
            if (a[sortType].toLowerCase() > b[sortType].toLowerCase()) {
              return 1;
            }
            return 0;
          });
      }

      if (order === "ascending") {
        return arr
          .slice()
          .sort((a: TypesDesignerFull, b: TypesDesignerFull) => {
            if (a[sortType].toLowerCase() < b[sortType].toLowerCase()) {
              return 1;
            }
            if (a[sortType].toLowerCase() > b[sortType].toLowerCase()) {
              return -1;
            }
            return 0;
          });
      }
      break;
    }

    case "median-time": {
      if (order === "descending") {
        return arr
          .slice()
          .sort((a: TypesDesignerFull, b: TypesDesignerFull) => {
            if (getMedianTime(a.issues) < getMedianTime(b.issues)) {
              return -1;
            }
            if (getMedianTime(a.issues) > getMedianTime(b.issues)) {
              return 1;
            }
            return 0;
          });
      }

      if (order === "ascending") {
        return arr
          .slice()
          .sort((a: TypesDesignerFull, b: TypesDesignerFull) => {
            if (getMedianTime(a.issues) < getMedianTime(b.issues)) {
              return 1;
            }
            if (getMedianTime(a.issues) > getMedianTime(b.issues)) {
              return -1;
            }
            return 0;
          });
      }
      break;
    }
    case "tasks-completed": {
      if (order === "descending") {
        return arr
          .slice()
          .sort((a: TypesDesignerFull, b: TypesDesignerFull) => {
            if (
              a.issues.filter((item) => item.status === `Done`).length <
              b.issues.filter((item) => item.status === `Done`).length
            ) {
              return -1;
            }
            if (
              b.issues.filter((item) => item.status === `Done`).length <
              a.issues.filter((item) => item.status === `Done`).length
            ) {
              return 1;
            }
            return 0;
          });
      }

      if (order === "ascending") {
        return arr
          .slice()
          .sort((a: TypesDesignerFull, b: TypesDesignerFull) => {
            if (
              b.issues.filter((item) => item.status === `Done`).length <
              a.issues.filter((item) => item.status === `Done`).length
            ) {
              return -1;
            }
            if (
              a.issues.filter((item) => item.status === `Done`).length <
              b.issues.filter((item) => item.status === `Done`).length
            ) {
              return 1;
            }
            return 0;
          });
      }
    }
  }

  return arr;
};

export function getWeekNumber(date: Date): number {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000),
  );
  return Math.ceil((days + startDate.getDay() + 1) / 7);
}

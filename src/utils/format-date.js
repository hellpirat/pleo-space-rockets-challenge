export function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function formatDateTime(timestamp, options) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
    ...options,
  }).format(new Date(timestamp));
}

export function formatToLocalDateTime(timestamp) {
  const timeWithoutTimezone = timestamp.substring(0, 19);
  const timezone = Number(timestamp.substring(19, 22));
  const offset = timezone > 0 ? `+${timezone}` : timezone;

  const date = formatDateTime(timeWithoutTimezone, {
    timeZoneName: undefined,
  });

  const dateWithTimezone = `${date} GMT${offset}`;

  return dateWithTimezone;
}

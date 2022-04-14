export const isPaginatedDataReachingEnd = (data, pageSize) =>
  data?.[0]?.length === 0 || (data && data[data.length - 1]?.length < pageSize);

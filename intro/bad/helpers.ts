export const mergeHeaders = (...headersInits: HeadersInit[]) => {
  const allHeaders = new Headers();

  headersInits.forEach(headers => {
    new Headers(headers).forEach(
      (value, header) => allHeaders.set(header, value),
    );
  });

  return allHeaders;
};

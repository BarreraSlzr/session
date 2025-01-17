/**
 * Function to handle and validate `redirect` search parameters consistently.
 * @param {string} redirectUrl - The URL to validate.
 * @param {string} defaultUrl - The default URL to use if validation fails.
 * @returns {string} - The validated URL or the default URL.
 */
export function handleRedirect(redirectUrl: string, defaultUrl: string): string {
  const visitedUrls = new Set<string>();

  function isCircularRedirect(url: string): boolean {
    if (visitedUrls.has(url)) {
      return true;
    }
    visitedUrls.add(url);
    return false;
  }

  try {
    const url = new URL(redirectUrl);
    if (url.origin === window.location.origin && !isCircularRedirect(url.href)) {
      return url.href;
    }
  } catch (error) {
    // Invalid URL, fall back to default
  }
  return defaultUrl;
}

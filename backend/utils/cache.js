const YahooFinance = require("yahoo-finance2").default;
const yf = new YahooFinance();

// Simple in-memory cache for stock quotes to prevent redundant external API hits
const cache = {};
const CACHE_TTL = 10000; // 10 seconds cache time-to-live

/**
 * Fetches stock quotes via cache or Yahoo Finance API.
 * Handles both bulk arrays and single symbol strings.
 * Falls back to expired cache entries if Yahoo Finance API encounters issues.
 * 
 * @param {string|string[]} symbols Single stock symbol or array of stock symbols.
 * @returns {Promise<any|any[]>} The stock quote(s) retrieved.
 */
async function getCachedQuotes(symbols) {
  const now = Date.now();
  const isArray = Array.isArray(symbols);
  const symbolList = isArray ? symbols : [symbols];

  const results = [];
  const toFetch = [];

  // Check cache for each symbol
  for (const sym of symbolList) {
    const cachedItem = cache[sym];
    if (cachedItem && (now - cachedItem.timestamp < CACHE_TTL)) {
      results.push(cachedItem.data);
    } else {
      toFetch.push(sym);
    }
  }

  // If there are symbols to fetch, retrieve them from Yahoo Finance
  if (toFetch.length > 0) {
    try {
      // yf.quote accepts a string or an array of strings
      const fetchedQuotes = await yf.quote(toFetch);
      
      // If single symbol fetched, it might return a single object instead of array
      const quotesArray = Array.isArray(fetchedQuotes) ? fetchedQuotes : [fetchedQuotes];

      for (const quote of quotesArray) {
        if (quote && quote.symbol) {
          cache[quote.symbol] = {
            timestamp: now,
            data: quote
          };
          results.push(quote);
        }
      }
    } catch (err) {
      console.error("Yahoo Finance cache fetch failed for symbols:", toFetch, err.message);
      
      // Fallback: If external API fails, use expired cache entries if they exist
      for (const sym of toFetch) {
        if (cache[sym]) {
          console.log(`Using expired cache fallback for symbol: ${sym}`);
          results.push(cache[sym].data);
        }
      }

      // If we still have absolutely no results, re-throw the error
      if (results.length === 0) {
        throw err;
      }
    }
  }

  // Sort/align results in the order of input symbolList
  const orderedResults = symbolList.map(sym => results.find(r => r.symbol === sym)).filter(Boolean);

  return isArray ? orderedResults : orderedResults[0];
}

module.exports = {
  getCachedQuotes,
  yf // export the underlying instance in case it is needed elsewhere
};

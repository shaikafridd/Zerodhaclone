const { UserModel } = require("../models/UserModel");
const YahooFinance = require("yahoo-finance2").default;
const yf = new YahooFinance();

exports.searchSymbol = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.json([]);
        
        const result = await yf.search(query);
        const quotes = (result.quotes || [])
            .filter(quote => quote.symbol)
            .map(quote => ({
                symbol: quote.symbol,
                name: quote.symbol.replace(".NS", "").replace(".BO", ""),
                exchange: quote.exchange || "NSE"
            }));
        res.json(quotes);
    } catch (err) {
        console.error("Error searching symbol:", err);
        res.status(500).send("Error searching symbol");
    }
};

exports.addToWatchlist = async (req, res) => {
    try {
        const { symbol } = req.body;
        if (!symbol) return res.status(400).json({ success: false, message: "Symbol is required" });
        
        const user = await UserModel.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        if (!user.watchlist) {
            user.watchlist = ["RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS", "ICICIBANK.NS", "SBIN.NS", "BHARTIARTL.NS", "ITC.NS", "KOTAKBANK.NS"];
        }
        if (!user.watchlist.includes(symbol)) {
            user.watchlist.push(symbol);
            await user.save();
        }
        res.json({ success: true, message: "Added to watchlist", watchlist: user.watchlist });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error adding to watchlist" });
    }
};

exports.removeFromWatchlist = async (req, res) => {
    try {
        const { symbol } = req.body;
        if (!symbol) return res.status(400).json({ success: false, message: "Symbol is required" });

        const user = await UserModel.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        if (user.watchlist) {
            user.watchlist = user.watchlist.filter(sym => sym !== symbol);
            await user.save();
        }
        res.json({ success: true, message: "Removed from watchlist", watchlist: user.watchlist });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error removing from watchlist" });
    }
};

exports.getWatchlist = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id);
        if (!user) return res.status(404).send("User not found");

        if (!user.watchlist) {
            user.watchlist = ["RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS", "ICICIBANK.NS", "SBIN.NS", "BHARTIARTL.NS", "ITC.NS", "KOTAKBANK.NS"];
            await user.save();
        }

        const userWatchlist = user.watchlist;

        let quotes = [];
        try {
            quotes = await yf.quote(userWatchlist);
        } catch (quoteErr) {
            console.error("Yahoo Finance quote fetch error, trying individual symbols:", quoteErr);
            for (const sym of userWatchlist) {
                try {
                    const q = await yf.quote(sym);
                    if (q) quotes.push(q);
                } catch (e) {
                    // Ignore symbol error
                }
            }
        }
        
        const watchlistData = quotes.map(quote => ({
            name: quote.symbol.replace(".NS", ""),
            symbol: quote.symbol,
            price: quote.regularMarketPrice || 0,
            percent: (quote.regularMarketChangePercent || 0).toFixed(2) + "%",
            isDown: quote.regularMarketChangePercent < 0
        }));

        res.json(watchlistData);
    } catch (err) {
        console.error("Error fetching watchlist:", err);
        res.status(500).send("Error fetching watchlist");
    }
};

const { HoldingsModel } = require("../models/HoldingsModel");
const { PositionsModel } = require("../models/PositionsModel");
const { getCachedQuotes } = require("../utils/cache");

exports.allHoldings = async (req, res) => {
    try {
        let allHoldings = await HoldingsModel.find({ userId: req.user.id }).lean();
        
        // Seed holdings for new user if empty
        if (allHoldings.length === 0) {
            const { holdings } = require("../init/data");
            const seedHoldings = holdings.map(h => ({
                name: h.name,
                qty: h.qty,
                avg: h.avg,
                price: h.price,
                net: h.net,
                day: h.day,
                isLoss: h.isLoss,
                userId: req.user.id
            }));
            await HoldingsModel.insertMany(seedHoldings);
            allHoldings = await HoldingsModel.find({ userId: req.user.id }).lean();
        }
        
        const symbols = allHoldings.map(stock => `${stock.name}.NS`);
        if (symbols.length > 0) {
            try {
                const quotes = await getCachedQuotes(symbols);
                allHoldings = allHoldings.map(stock => {
                    const quote = quotes.find(q => q.symbol === `${stock.name}.NS`);
                    if (quote) {
                        stock.price = quote.regularMarketPrice || stock.price;
                        stock.net = (quote.regularMarketChangePercent || 0).toFixed(2) + "%";
                        stock.day = (quote.regularMarketChangePercent || 0).toFixed(2) + "%";
                        stock.isLoss = quote.regularMarketChangePercent < 0;
                    }
                    return stock;
                });
            } catch (quoteErr) {
                console.error("Error fetching live quotes for holdings:", quoteErr);
            }
        }
        res.json(allHoldings);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching holdings");
    }
};

exports.allPositions = async (req, res) => {
    try {
        let allPositions = await PositionsModel.find({ userId: req.user.id }).lean();
        
        // Seed positions for new user if empty
        if (allPositions.length === 0) {
            const { positions } = require("../init/data");
            const seedPositions = positions.map(p => ({
                product: p.product,
                name: p.name,
                qty: p.qty,
                avg: p.avg,
                price: p.price,
                net: p.net,
                day: p.day,
                isLoss: p.isLoss,
                userId: req.user.id
            }));
            await PositionsModel.insertMany(seedPositions);
            allPositions = await PositionsModel.find({ userId: req.user.id }).lean();
        }
        
        const symbols = allPositions.map(stock => `${stock.name}.NS`);
        if (symbols.length > 0) {
            try {
                const quotes = await getCachedQuotes(symbols);
                allPositions = allPositions.map(stock => {
                    const quote = quotes.find(q => q.symbol === `${stock.name}.NS`);
                    if (quote) {
                        stock.price = quote.regularMarketPrice || stock.price;
                        stock.net = (quote.regularMarketChangePercent || 0).toFixed(2) + "%";
                        stock.day = (quote.regularMarketChangePercent || 0).toFixed(2) + "%";
                        stock.isLoss = quote.regularMarketChangePercent < 0;
                    }
                    return stock;
                });
            } catch (quoteErr) {
                console.error("Error fetching live quotes for positions:", quoteErr);
            }
        }
        res.json(allPositions);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching positions");
    }
};

exports.indexIndices = async (req, res) => {
    try {
        const quotes = await getCachedQuotes(["^NSEI", "^BSESN"]);
        const indices = quotes.map(quote => ({
            name: quote.symbol === "^NSEI" ? "NIFTY 50" : "SENSEX",
            price: (quote.regularMarketPrice || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 }),
            change: (quote.regularMarketChangePercent || 0).toFixed(2) + "%",
            isDown: (quote.regularMarketChangePercent || 0) < 0
        }));
        res.json(indices);
    } catch (err) {
        console.error("Error fetching indices:", err);
        res.json([
            { name: "NIFTY 50", price: "22,040.70", change: "+0.35%", isDown: false },
            { name: "SENSEX", price: "72,641.10", change: "-0.12%", isDown: true }
        ]);
    }
};

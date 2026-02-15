import Url from '../models/urlModel.js';
import { nanoid } from 'nanoid';

async function handleGenerateShortUrl(req, res) {
    try {
        const shortId = nanoid(8); // Generate a unique short ID
        if (!req.body || !req.body.redirectUrl) {
            return res.status(400).json({ error: 'redirectUrl is required' });
        }
        await Url.create({
            shortId,
            redirectUrl: req.body.redirectUrl,
            visitHistory: [],
            createdBy: req.user._id, // Assuming req.user is set by auth middleware
        });
        res.render('home', {
            shortId,
            baseUrl: `${req.protocol}://${req.get('host')}`,
        });
        // res.json({ shortId }); // For API response
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleGetPerticularUrl(req, res) {
    try {
        const { shortId } = req.params;
        const entry = await Url.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { visitTime: Date.now() } } },
            { returnDocument: 'after' }
        );
        res.redirect(entry.redirectUrl);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleGetAnalytics(req, res) {
    try {
        const { shortId } = req.params;
        const entry = await Url.findOne({ shortId });
        console.log(entry);
        if (!entry) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.json({
            totalVisits: entry.visitHistory.length,
            visitTimestamps: entry.visitHistory.map(visit => visit.visitTime ),
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }   
}

async function handleGetAllUrls(req, res, viewName = 'test', isAdminRoute = false) {
    try {
        if (!isAdminRoute) {
            const allUrls = await Url.find({ createdBy: req.user._id });
            return res.render(viewName, { urls: allUrls });
        }
        const allUrls = await Url.find({});
        res.render(viewName, { urls: allUrls });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { handleGenerateShortUrl, handleGetPerticularUrl, handleGetAnalytics, handleGetAllUrls };

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ status: 'Order webhook is live!' });
});

app.post('/order-complete', (req, res) => {
    try {
        const order = req.body;
        
        // Get UTM from cookies
        const cookies = req.get('Cookie') || '';
        const utmCampaign = cookies.match(/utm_campaign=([^;]+)/)?.[1] ? decodeURIComponent(cookies.match(/utm_campaign=([^;]+)/)[1]) : 'Organic';
        
        const customerEmail = order.email || 'No email';
        const totalPrice = order.total_price || '0';
        const itemCount = order.line_items ? order.line_items.length : 0;
        
        const productNames = order.line_items 
            ? order.line_items.map(item => `${item.title} (x${item.quantity})`).join('\n')
            : 'Unknown';
        
        // Simple Discord message with UTM
        const discordContent = `💰 **ORDER COMPLETED** <@&1462928286324883528>\n📱 Campaign: ${utmCampaign}\n\nCustomer: ${customerEmail}\nRevenue: $${totalPrice}\nItems: ${itemCount}\n\n${productNames}`;
        
        fetch('https://discord.com/api/webhooks/1462766339734245450/tvQamu299eAdNOGw3jEWI97J0g4nAEvJVaXTLcJifK_v86Z0lgSu2mEJ1vJtCI9J-t0k', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: discordContent
            })
        }).catch(() => {});
        
        res.status(200).send('OK');
    } catch(e) {
        res.status(200).send('OK');
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log('Order webhook live on port ' + PORT);
});

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// SKU mapping for original product names (same as bridge)
const SKU_MAPPING = {
    // FRAGRANCES
    "VALENT1NO_SUPPLIER": { "displayProduct": "Valent1no", "realProduct": "BackedStock® Cologne" },
    "T0M_F0RD_SUPPLIER": { "displayProduct": "T0m F0rd", "realProduct": "BackedStock® Cologne" },
    "BAKARAT_SUPPLIER": { "displayProduct": "Bakarat", "realProduct": "BackedStock® Cologne" },
    "CR3EED_SUPPLIER": { "displayProduct": "Cr3eed", "realProduct": "BackedStock® Cologne" },
    "DI0R_SUPPLIER": { "displayProduct": "Di0r", "realProduct": "BackedStock® Cologne" },
    "JPG1_FRAGRANCE_SUPPLIER": { "displayProduct": "JPG1 Fragrance", "realProduct": "BackedStock® Cologne" },
    
    // WATCHES
    "U1TRA_WATCH_SUPPLIER": { "displayProduct": "U1tra Watch", "realProduct": "BackedStock® U Watch" },
    "R0LEX_WATCH_SUPPLIER": { "displayProduct": "R0lex Watch", "realProduct": "BackedStock® R Watch" },
    "MOSSINAITE_WATCH_SUPPLIER": { "displayProduct": "Mossinaite Watch", "realProduct": "BackedStock® M Watch" },
    
    // CHROME HEARTS
    "CHR0M3_BELT_SUPPLIER": { "displayProduct": "Chr0m3 Belt", "realProduct": "BackedStock® C Belt" },
    "CHR0M3_JEANS_SUPPLIER": { "displayProduct": "Chr0m3 Jeans", "realProduct": "BackedStock® Pants" },
    "CHR0M3_JERSEY_SUPPLIER": { "displayProduct": "Chr0m3 Jersey", "realProduct": "BackedStock® C Jersey" },
    "CHR0M3_JEWLERY_SUPPLIER": { "displayProduct": "Chr0m3 Jewlery", "realProduct": "BackedStock® C Jewelry" },
    "CHR0M3_T_SHIRTS_COPY_SUPPLIER": { "displayProduct": "Chr0m3 T-Shirts", "realProduct": "BackedStock® C Shirt" },
    "CHR0M3_TRUCKER_HAT_SUPPLIER": { "displayProduct": "Chr0m3 Trucker Hat", "realProduct": "BackedStock® C Hat" },
    
    // CLOTHING
    "DEN1M_SWEAT_PANTS_SUPPLIER": { "displayProduct": "Den1m Sweat Pants", "realProduct": "BackedStock® Pants" },
    "DEN1M_HOODIE_SUPPLIER": { "displayProduct": "Den1m hoodie", "realProduct": "BackedStock® Hoodie" },
    "ESSCENTIALS_HOODIE_SUPPLIER": { "displayProduct": "Esscentials Hoodie", "realProduct": "BackedStock® Hoodie" },
    "SPYDUR_SWEAT_PANTS_SUPPLIER": { "displayProduct": "Spydur Sweat Pants", "realProduct": "BackedStock® Pants" },
    "SPYDUR_HOODIE_SUPPLIER": { "displayProduct": "Spydur Hoodie", "realProduct": "BackedStock® Hoodie" },
    
    // LV ITEMS
    "LV1_BELT_SUPPLIER": { "displayProduct": "Lv1 Belt", "realProduct": "BackedStock® L Belt" },
    "LV1_BRACELET_SUPPLIER": { "displayProduct": "Lv1 Bracelet", "realProduct": "BackedStock® L Bracelet" },
    "LV1_WALLET_SUPPLIER": { "displayProduct": "Lv1 Wallet", "realProduct": "BackedStock® L Wallet" },
    
    // SHOES
    "J4_SHOES_SUPPLIER": { "displayProduct": "J4 shoes", "realProduct": "BackedStock® Shoes" },
    "MAXES_SUPPLIER": { "displayProduct": "Maxes", "realProduct": "BackedStock® Maxes" },
    "SLIDEZZ_SUPPLIER": { "displayProduct": "Slidezz", "realProduct": "BackedStock® Slides" },
    
    // TECH
    "J8L_SPEAKER_SUPPLIER": { "displayProduct": "J8L Speaker", "realProduct": "BackedStock® Speaker" },
    "PODS_3_SUPPLIER": { "displayProduct": "Pods 3", "realProduct": "BackedStock® Pods 3" },
    "PODS_PRO_2_SUPPLIER": { "displayProduct": "Pods Pro 2", "realProduct": "BackedStock® Pods 2" },
    "PODS_PROMOTION": { "displayProduct": "Free Pods Pro 3", "realProduct": "BackedStock® Free Pods Pro 3" },
    "PHONE_16_PRO_SUPPLIER": { "displayProduct": "Phone 16 Pro", "realProduct": "BackedStock® Phone" },
    "PHONE_16_PRO_MAX_SUPPLIER": { "displayProduct": "Phone 16 Pro Max", "realProduct": "BackedStock® Phone" },
    "M4CBOOK_AIR_SUPPLIER": { "displayProduct": "M4cBook Air", "realProduct": "BackedStock® Computer" },
    "M4CBOOK_PRO_SUPPLIER": { "displayProduct": "M4cBook Pro", "realProduct": "BackedStock® Computer" },
    "PODS_BUNDLE-3": { "displayProduct": "Pods Bundle (3-Pack)", "realProduct": "ProfitSupply® Pods Bundle (3-Pack)" },
    "PODS_BUNDLE-5": { "displayProduct": "Pods Bundle (5-Pack)", "realProduct": "ProfitSupply® Pods Bundle (5-Pack)" },
    "PODS_BUNDLE-10": { "displayProduct": "Pods Bundle (10-Pack)", "realProduct": "ProfitSupply® Pods Bundle (10-Pack)" },
    
    // ACCESSORIES
    "PR4DA_SUNGLASSES_SUPPLIER": { "displayProduct": "Pr4da Sunglasses", "realProduct": "BackedStock® P Glasses" },
    "N1KE_ELITE_BAG_SUPPLIER": { "displayProduct": "N1ke Elite bag", "realProduct": "BackedStock® N Bag" },
    "G0YARDDD_SUPPLIER": { "displayProduct": "G0yarddd", "realProduct": "BackedStock® G Bag" },
    "MOSSINAITE_T3NNIS_BRACLET_SUPPLIER": { "displayProduct": "Mossinaite T3nnis Braclet", "realProduct": "BackedStock® M Bracelet" },
    
    // MISC
    "LABUABABA_SUPPLIER": { "displayProduct": "Labuababa", "realProduct": "BackedStock® Plushie" },
    "LEGGO_SUPPLIER": { "displayProduct": "Large Bricks", "realProduct": "BackedStock® Bricks" },
    
    // BUNDLES
    "BEST_SELLER_ACCESSORIES_BUNDLE_SUPPLIER": { "displayProduct": "(BEST SELLER) Accessories Bundle", "realProduct": "BackedStock® Accessories Bundle" },
    "BEST_SELLER_ALL_ELECTRONICS_BUNDLE_PACK_SUPPLIER": { "displayProduct": "(BEST SELLER) All Electronics Bundle Pack", "realProduct": "BackedStock® Electronic Bundle" },
    "BEST_SELLER_CLOTHING_BUNDLE_SUPPLIER": { "displayProduct": "(BEST SELLER) Clothing Bundle", "realProduct": "BackedStock® Clothing Bundle" },
    "BEST_SELLER_FRAGRANCES_BUNDLE_SUPPLIER": { "displayProduct": "(BEST SELLER) Fragrances Bundle", "realProduct": "BackedStock® Cologne Bundle" },
    "BEST_SELLER_LV1_BUNDLE_PACK_SUPPLIER": { "displayProduct": "(BEST SELLER) Lv1 Bundle Pack", "realProduct": "BackedStock® L Bundle" }
};

// Function to find original product name by matching Shopify product title
function findOriginalProduct(shopifyTitle) {
    // Try exact match first
    for (const [sku, mapping] of Object.entries(SKU_MAPPING)) {
        if (shopifyTitle.includes(mapping.realProduct.replace('®', ''))) {
            return mapping.displayProduct;
        }
    }
    
    // Fallback mapping based on common patterns
    if (shopifyTitle.includes('Cologne')) return 'Fragrance Bundle';
    if (shopifyTitle.includes('Hoodie')) return 'Branded Hoodie';
    if (shopifyTitle.includes('Pants')) return 'Branded Pants';
    if (shopifyTitle.includes('Watch')) return 'Luxury Watch';
    if (shopifyTitle.includes('Belt')) return 'Designer Belt';
    if (shopifyTitle.includes('Phone')) return 'Premium Phone';
    if (shopifyTitle.includes('Computer')) return 'Laptop';
    if (shopifyTitle.includes('Pods')) return 'Wireless Earbuds';
    
    return shopifyTitle; // fallback to original
}

app.get('/', (req, res) => {
    res.json({ status: 'Order webhook is live!' });
});

app.post('/order-complete', (req, res) => {
    try {
        const order = req.body;
        
        // NEW: Get UTM from cookies (webhook runs on backend domain!)
        const cookies = req.get('Cookie') || '';
        const utmCampaign = cookies.match(/utm_campaign=([^;]+)/)?.[1] ? decodeURIComponent(cookies.match(/utm_campaign=([^;]+)/)[1]) : 'Organic';
        
        console.log('🎯 Order webhook - UTM Campaign:', utmCampaign);
        
        const customerEmail = order.email || 'No email';
        const totalPrice = order.total_price || '0';
        const itemCount = order.line_items ? order.line_items.length : 0;
        
        // NEW: Show original product names (SPYDUR Hoodie vs BackedStock® Hoodie)
        const productNames = order.line_items 
            ? order.line_items.map(item => {
                const originalProduct = findOriginalProduct(item.title);
                return `${originalProduct} → ${item.title} (x${item.quantity})`;
              }).join('\n')
            : 'Unknown';
        
        // ENHANCED Discord message with UTM attribution
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
        console.error('Order webhook error:', e);
        res.status(200).send('OK');
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log('🎯 Enhanced order webhook live on port ' + PORT);
});

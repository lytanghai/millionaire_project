<script setup>
import axios from 'axios'


const apiKey = '57cd5930-852b-478f-939e-0c96c37b0016';
const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/market-pairs/latest';

const params = {
    symbol: 'BNB',
    convert: 'USD',
};

const headers = {
    'X-CMC_PRO_API_KEY': apiKey,
    'Accept': 'application/json',
};

axios.get(url, { params, headers })
    .then(response => {
        const exchanges = response.data.data.BNB.market_pairs;
        exchanges.forEach(exchange => {
            console.log(`Exchange: ${exchange.exchange.name}`);
            console.log(`Trust Score: ${exchange.exchange.trust_score}`);
            console.log(`Price: $${exchange.market_pair.price}`);
            console.log(`24h Volume: $${exchange.market_pair.volume_24h}`);
            console.log('---');
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
</script>
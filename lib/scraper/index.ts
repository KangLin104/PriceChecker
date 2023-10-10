import axios from "axios";
import * as cheerio from 'cheerio';
import { extractPrice,extractCurrencies,extractDescription } from "../utils"; 

export async function scrapeAmazonProduct(url:string){
    if(!url) return;
    const username=String(process.env.BRIGHT_DATA_USERNAME)
    const password=String(process.env.BRIGHT_DATA_PASSWORD)
    const port=22225
    const session_id=(1000000*Math.random()) |0
    const option ={
        auth:{
            username:`${username}-session-${session_id}`,
            password
        },
        host:'brd.superproxy.io',
        port,
        rejectUnauthorized:false
    }

    try {
        const response=await axios.get(url,option)
        const getData=cheerio.load(response.data)

        // getting the title of the product
        const title=getData('#productTitle').text().trim()
        const currentPrice=extractPrice(
            getData('span.priceToPay span.a-price-whole'),
            getData('.a.size.base.a-color-price'),
            getData('.a-button-selected .a-color-base'),
        );
        console.log(currentPrice)
        // getting the original price of the product
        const originalPrice = extractPrice(
            getData('#priceblock_ourprice'),
            getData('.a-price.a-text-price span.a-offscreen'),
            getData('#listPrice'),
            getData('#priceblock_dealprice'),
            getData('.a-size-base.a-color-price')
        );

        // check if product out of stock
        const outOfStock = getData('#availability span').text().trim().toLowerCase() === 'currently unavailable';

        // getting images information of the product
        const images = 
        getData('#imgBlkFront').attr('data-a-dynamic-image') || 
        getData('#landingImage').attr('data-a-dynamic-image') ||
        '{}';
        const imageUrls=Object.keys(JSON.parse(images))
        
        // getting currency information, if the user is has a differernt currency in amazon
        const currency = extractCurrencies(getData('.a-price-symbol'))
        const discountRate = getData('.savingsPercentage').text().replace(/[-%]/g, "");

        const description=extractDescription(getData)
        //setting all the exctrated data within an object
        const data = {
            url,
            currency: currency || '$',
            image: imageUrls[0],
            title,
            currentPrice: Number(currentPrice) || Number(originalPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            priceHistory: [],
            discountRate: Number(discountRate),
            category: 'category',
            reviewsCount:100,
            stars: 4.5,
            isOutOfStock: outOfStock,
            description,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice) || Number(originalPrice),
          }
          
        return data
    } catch (error:any) {
        throw new Error(error.message)
    }
}
"use server"
import { scrapeAmazonProduct } from "../scraper";
import { connectToDB } from "../scraper/mongoose";
import Product from "../models/product.model";
import { revalidatePath } from "next/cache";

export async function scrapeAndStoreProduct(productUrl: string) {
    if(!productUrl) return;
  
    try {
      connectToDB();
  
      const scrapedProduct = await scrapeAmazonProduct(productUrl);
  
      if(!scrapedProduct) return;
  
      let product = scrapedProduct;
  
      const newProduct = await Product.findOneAndUpdate(
        { url: scrapedProduct.url },
        product,
        { upsert: true, new: true }
      );
  
      revalidatePath(`/products/${newProduct._id}`);
      
      return newProduct
    } catch (error: any) {
      throw new Error(`Failed to create/update product: ${error.message}`)
    }
  }

export async function getProductById(productId:string){
    try {
        connectToDB()
        const product= await Product.findOne({_id:productId})

        if(!product) return null

        return product
    } catch (error:any) {
        console.log(error.message)
    }
}

export async function getAllProducts(){
    try {
        connectToDB()

        const products= await Product.find()
        return products
    } catch (error:any) {
        console.log(error.message)
    }
}

export async function getSimilarProducts(productId: string) {
    try {
      connectToDB();
  
      const currentProduct = await Product.findById(productId);
  
      if(!currentProduct) return null;
  
      const similarProducts = await Product.find({
        _id: { $ne: productId },
      }).limit(3);
  
      return similarProducts;
    } catch (error) {
      console.log(error);
    }
  }




  

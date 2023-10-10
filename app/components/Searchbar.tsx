"use client"
import { scrapeAndStoreProduct } from "@/lib/actions"
import { useState,FormEvent } from "react"
import { useRouter } from "next/navigation";

const isValidURL=(url:string)=>{
    try {
        const parseURL=new URL(url)
        const hostname=parseURL.hostname

        if(hostname.includes('amazon.com') || hostname.includes('amazon.') ||hostname.endsWith('amazon')  ){
            return true
        }
    } catch (error) {
        return false
    }

    return false
}
const Searchbar = () => {
    const [searchPrompt, setsearchPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const handleSubmit=async(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault()

        const isValidLink=isValidURL(searchPrompt)
        
        if(!isValidLink) return alert("Please Enter a Valid Amazon Link ")
            
        try {
            setIsLoading(true)
            
            const product=await scrapeAndStoreProduct(searchPrompt)
            console.log(product)
            if(product){
                router.push(`/products/${product._id}`)
            }
        } catch (error) {
            
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <form className='flex flex-wrap gap-4 mt-12'  onSubmit={handleSubmit}>

        <input 
        type="text"
        value={searchPrompt}
        onChange={(e)=> setsearchPrompt(e.target.value)}
        placeholder="Enter a Amazon Product Link"
        className="searchbar-input"/>

        <button type="submit" className="searchbar-btn" disabled={searchPrompt===""}>
            {isLoading ? 'Searching...' : 'Search'}
        </button>
    </form>
  )
}

export default Searchbar
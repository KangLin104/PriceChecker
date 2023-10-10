import Image from "next/image"
import Searchbar from "./components/Searchbar"
import HeroCarousel from "./components/HeroCarousel"
import { getAllProducts } from "@/lib/actions"
import Productcard from "./components/Productcard"

const Home = async() => {
  const allProducts= await getAllProducts();
  return (
    <>
      <section className='px-6 md:px-20 py-24 '>
        <div className='flex max-xl:flex-col gap-16'>
          <div className='flex flex-col justify-center'>


            <h1 className="head-text">
              Time to find the Right Prices in
              <span className="text-primary-green"> PriceChecker</span>
            </h1>

            <p className="mt-6">
              Use this application to find the right prices in amazon

            </p>

            <Searchbar/>
            
          </div>

          
          <HeroCarousel/>
         

          
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product)=>(
            <Productcard key={product._id} product={product}/>
          ))}

        </div>
      </section>
    </>
  )
}

export default Home
import Link from "next/link"
import Image from "next/image"



const Navbar = () => {
  return (
    <header className='w-full'>
        <nav className='nav'>
            <Link href='/' className="flex items-center gap-1">

                <p className="nav-logo">
                    Price<span className="text-primary-green">Checker</span>
                </p>
            </Link>

        </nav>
    </header>
  )
}

export default Navbar
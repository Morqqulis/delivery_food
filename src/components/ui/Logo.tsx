import { IClassName } from '#types/index'
import Link from 'next/link'

const Logo: React.FC<IClassName> = ({ className = '' }): JSX.Element => {
   return (
      <Link className={`${className} group/logo`} href={'/'}>
         <svg
            className={`group-hover/logo:fill-mini-100 fill-[#065E7C] duration-300 ease-in`}
            width="25.980469"
            height="30.000000"
            viewBox="0 0 25.9805 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
         >
            <path
               id="Polygon 1"
               d="M12.99 0L0 7.5L0 22.5L12.99 30L25.98 22.5L25.98 7.5L12.99 0Z"
               fillOpacity="1.000000"
               fillRule="evenodd"
            />
         </svg>
         <span className={``}>food explorer</span>
      </Link>
   )
}

export default Logo

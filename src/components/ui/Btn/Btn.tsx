import { secondaryFont } from '#settings/fonts'
import { IBtn } from '#types/index'
import Link from 'next/link'
import { Button } from '../button'
import styles from './Btn.module.scss'

const Btn: React.FC<IBtn> = ({ type, className, ariaLabel, children, onClick, text, href }): JSX.Element => {
   if (href) {
      return (
         <Link
            className={`${styles.btn} ${className} ${secondaryFont.className}`}
            href={href}
            onClick={onClick}
            aria-label={ariaLabel}
         >
            {children}
            {text}
         </Link>
      )
   } else
      return (
         <Button
            className={`${styles.btn} ${className} ${secondaryFont.className}`}
            type={type}
            onClick={onClick}
            aria-label={ariaLabel}
         >
            {children}
            {text}
         </Button>
      )
}

export default Btn

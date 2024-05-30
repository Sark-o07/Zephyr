import './Breadcrumbs.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import { Link } from 'react-router-dom'

export const Breadcrumbs = (props) => {
    const { product } = props;
  return (
    <div className='breadcrumbs'>
        <Link to={'/'}>Home </Link><img src={arrow_icon} alt="" /> <Link to={'/'}>SHOP </Link><img src={arrow_icon} alt="" /> <Link to={`/${product.category}`}>{product.category}</Link><img src={arrow_icon} alt="" /> <Link to={`/product/${product.id}`}>{product.name}</Link>
    </div>
  )
}

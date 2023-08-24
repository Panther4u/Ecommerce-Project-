import DropDownMenu from './DropDownMenu'
import styles from './SectionsProducts.module.scss'

const SectionsProducts = () => {
  return (
    <nav className={styles.sectionsProducts}>
      <DropDownMenu nameMenu="Woman’s Fashion" >
        <ul className={styles.dropDownMenu}>
          <li><a href="\#">Elegant Evening Dress</a></li>
          <li><a href="\#">Chic Blouse and Tailored Trousers</a></li>
          <li><a href="\#">Statement Handbag</a></li>
          <li><a href="\#">Versatile Denim Jacket</a></li>
          <li><a href="\#">Comfortable Yet Stylish Sneakers</a></li>
        </ul>
      </DropDownMenu>

      <DropDownMenu nameMenu="Men’s Fashion" >
        <ul className={styles.dropDownMenu}>
          <li><a href="\#">Tailored Suit</a></li>
          <li><a href="\#">Casual Button-Down Shirts</a></li>
          <li><a href="\#">Slim-Fit Jeans</a></li>
          <li><a href="\#">Leather Accessories</a></li>
          <li><a href="\#">Modern Sneakers</a></li>
        </ul>
      </DropDownMenu>

      <a href="\#">Electronics</a>
      <a href="\#">Home & Lifestyle</a>
      <a href="\#">Medicine</a>
      <a href="\#">Sports & Outdoor</a>
      <a href="\#">Baby's & Toys</a>
      <a href="\#">Groceries & Pets</a>
      <a href="\#">Health & Beauty</a>
    </nav>
  )
}

export default SectionsProducts
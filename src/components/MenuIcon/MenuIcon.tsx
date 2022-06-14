import styles from './MenuIcon.module.css'

interface Props {
  onClick: () => void,
  checked: boolean
}

const MenuIcon = ({ onClick, checked }: Props) => {
  return (
    <label className={styles.label} htmlFor="check">
      <input type="checkbox" id="check" className={styles.check} onChange={onClick} checked={checked}/> 
      <span></span>
      <span></span>
      <span></span>
    </label>
  )
}

export default MenuIcon;
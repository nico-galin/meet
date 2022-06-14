import './MenuIcon.css';

interface Props {
  onClick: () => void,
  checked: boolean
}

const MenuIcon = ({ onClick, checked }: Props) => {
  return (
    <label htmlFor="check">
      <input type="checkbox" id="check" onChange={onClick} checked={checked}/> 
      <span></span>
      <span></span>
      <span></span>
    </label>
  )
}

export default MenuIcon;
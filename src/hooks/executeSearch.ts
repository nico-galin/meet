import { useNavigate } from 'react-router-dom'

interface Props {
  navigate: any
  destination?: string
  searchText?: string
  filters: any[]
}

const executeSearch = ({ navigate, destination = "", searchText, filters}: Props) => {
  let query = `?`;
  if (!!searchText) query += `search=${searchText}`
  navigate({
    pathname: destination,
    search: query
  })
}

export default executeSearch;
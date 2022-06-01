import { useNavigate } from 'react-router-dom'

interface Props {
  navigate: any
  options?: {
    destination?: string
    searchText?: string
    filters?: any
    id?: string
  }
}

const executeSearch = ({ navigate, options}: Props) => {
  let query = `?`;
  if (!!options?.id) query = `id=${options.id}`;
  if (!!options?.searchText) query += `&search=${options.searchText}`;
  navigate({
    pathname: options?.destination,
    search: query
  })
}

export default executeSearch;
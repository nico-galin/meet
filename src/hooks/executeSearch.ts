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
  if (!!options?.searchText) query += `search=${options.searchText}`
  navigate({
    pathname: options?.destination,
    search: !!options?.id ? `id=${options.id}` : query
  })
}

export default executeSearch;
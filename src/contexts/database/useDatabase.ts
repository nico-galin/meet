import { useContext } from 'react'

import DatabaseContext from './DatabaseContext'

const useDatabase = () => {
  const db = useContext(DatabaseContext);
  return db;
}

export default useDatabase

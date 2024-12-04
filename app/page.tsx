import { Pagination } from './components'

export default function Home() {
  return <Pagination currentPage={1} itemCount={20} pageSize={10} />
}

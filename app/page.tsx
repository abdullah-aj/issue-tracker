import { Pagination } from './components'

type Props = {
  searchParams: {
    page: string
  }
}

export default function Home({ searchParams }: Props) {
  return <Pagination currentPage={parseInt(searchParams.page)} itemCount={20} pageSize={5} />
}

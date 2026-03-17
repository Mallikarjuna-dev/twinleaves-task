import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { TextField, MenuItem, Container, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../api/productApi'
import Loader from '../components/Loader'
import Error from '../components/Error'

export default function Products() {
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowCount, setRowCount] = useState(0)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const getData = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getProducts({
        page: page + 1,
        search,
        category,
        sort,
      })
      setRows(data?.products || [])
      setRowCount(data?.total || 0)
    } catch (e) {
      setError('Failed to load products')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      getData()
    }, 500)

    return () => clearTimeout(delay)
  }, [page, search, category, sort])

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 120,
      renderCell: (params) => (
        <img
          src={params.value}
          alt=''
          width='70'
          height='70'
          style={{ objectFit: 'contain' }}
        />
      ),
    },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },

    {
      field: 'action',
      headerName: 'Details',
      renderCell: (params) => (
        <button onClick={() => navigate(`/details/${params.row.id}`)}>
          View
        </button>
      ),
    },
  ]

  if (loading) return <Loader />
  if (error) return <Error msg={error} />

  return (
    <Container>
      <Box display='flex' gap={2} flexWrap='wrap' mb={2} mt={2}>
        <TextField
          label='Search Product'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          select
          label='Category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value=''>All</MenuItem>
          <MenuItem value='electronics'>Electronics</MenuItem>
          <MenuItem value='fashion'>Fashion</MenuItem>
        </TextField>

        <TextField
          select
          label='Sort Price'
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value=''>None</MenuItem>
          <MenuItem value='asc'>Low → High</MenuItem>
          <MenuItem value='desc'>High → Low</MenuItem>
        </TextField>
      </Box>

      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          pageSize={10}
          rowsPerPageOptions={[10]}
          rowCount={rowCount}
          paginationMode='server'
        />
      </div>
    </Container>
  )
}

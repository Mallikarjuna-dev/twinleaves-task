import { useEffect, useState, useCallback, useMemo } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Container, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../api/productApi'
// import Loader from '../components/Loader'
import Error from '../components/Error'
import Filters from '../components/Filters'

export default function Products() {
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowCount, setRowCount] = useState(0)

  // const [search, setSearch] = useState('')
  // const [category, setCategory] = useState('')
  // const [sort, setSort] = useState('')

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sort: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const getData = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getProducts({
        page: page + 1,
        ...filters,
      })
      setRows(data?.products || [])
      setRowCount(data?.total || 0)
    } catch (e) {
      setError('Failed to load products')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [page, filters])

  useEffect(() => {
    const t = setTimeout(getData, 400)
    return () => clearTimeout(t)
  }, [getData])

  const handleFilterChange = useCallback((name, value) => {
    setPage(0)
    setFilters((prev) => ({ ...prev, [name]: value }))
  }, [])

  const columns = useMemo(
    () => [
      {
        field: 'image',
        headerName: 'Image',
        width: 130,
        renderCell: (params) => (
          <img
            src={params.value}
            alt=''
            width='80'
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
        width: 140,
        renderCell: (params) => (
          <button
            style={{
              padding: '6px 12px',
              cursor: 'pointer',
              borderRadius: 6,
            }}
            onClick={() => navigate(`/details/${params.row.id}`)}
          >
            View
          </button>
        ),
      },
    ],
    [navigate],
  )

  // if (loading) return <Loader />
  if (error) return <Error msg={error} />

  return (
    <Container>
      <Typography variant='h4' sx={{ mt: 3, mb: 2 }}>
        Product Catalog
      </Typography>

      <Filters filters={filters} onChange={handleFilterChange} />

      <Paper elevation={3} sx={{ height: 600 }}>
        <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
          pagination
          paginationMode='server'
          paginationModel={{ page: page, pageSize: 10 }}
          onPaginationModelChange={(model) => setPage(model.page)}
          pageSizeOptions={[10]}
          rowCount={rowCount}
        />
      </Paper>
    </Container>
  )
}

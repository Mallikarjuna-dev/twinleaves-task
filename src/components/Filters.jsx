import { TextField, MenuItem, Box } from '@mui/material'
import React from 'react'

function Filters({ filters, onChange }) {
  return (
    <Box display='flex' gap={2} flexWrap='wrap' mb={2}>
      <TextField
        label='Search'
        value={filters.search}
        onChange={(e) => onChange('search', e.target.value)}
      />

      <TextField
        select
        label='Category'
        value={filters.category}
        onChange={(e) => onChange('category', e.target.value)}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value=''>All</MenuItem>
        <MenuItem value='electronics'>Electronics</MenuItem>
        <MenuItem value='fashion'>Fashion</MenuItem>
      </TextField>

      <TextField
        select
        label='Sort Price'
        value={filters.sort}
        onChange={(e) => onChange('sort', e.target.value)}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value=''>None</MenuItem>
        <MenuItem value='asc'>Low → High</MenuItem>
        <MenuItem value='desc'>High → Low</MenuItem>
      </TextField>
    </Box>
  )
}

export default React.memo(Filters)

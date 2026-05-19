import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function NavBar() {
  const savedCount = useSelector((state) => state.saved.items.length)
  const location = useLocation()

  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight={800}>
          🥗 FoodFacts
        </Typography>
        <div>
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{ color: location.pathname === '/' ? 'secondary.main' : 'inherit' }}
          >
            Search
          </Button>
          <Button
            component={Link}
            to="/saved"
            color="inherit"
            sx={{ color: location.pathname === '/saved' ? 'secondary.main' : 'inherit' }}
            startIcon={
              <Badge badgeContent={savedCount} color="secondary" invisible={savedCount === 0}>
                <BookmarkIcon />
              </Badge>
            }
          >
            Saved
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar

import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import GroupIcon from '@mui/icons-material/Group'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export const NavBar = ({ onCreateClick }) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundImage: `
          linear-gradient(
            rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0.3)
          ),
          url('https://source.unsplash.com/1600x400/?technology,abstract')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        {/* Left side */}
        <Box display="flex" alignItems="center">
          <GroupIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" fontWeight="bold">
            Reactivities
          </Typography>
        </Box>

        {/* Right side */}
        <Box display="flex" gap={2} alignItems="center" ml="auto">
          <Button color="inherit">Activities</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact Us</Button>
          <Button
            variant="contained"
            onClick={onCreateClick} // open form
            sx={{
              backgroundColor: '#00cec9',
              color: 'white',
              '&:hover': {
                backgroundColor: '#00b894',
              },
            }}
          >
            Create Activity
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

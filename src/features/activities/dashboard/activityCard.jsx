import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import CategoryIcon from '@mui/icons-material/Category';
import axios from 'axios';

export default function ActivityCard({ activity, onSelect, onDeleted }) {
  const [openConfirm, setOpenConfirm] = useState(false);

  if (!activity) return null;

  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7104/api/Activity/${activity.id}`, {
        headers: { accept: '*/*' },
      });
      console.log('Activity deleted:', activity.id);

      // notify parent component so UI updates
      if (onDeleted) onDeleted(activity.id);

      setOpenConfirm(false);
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  return (
    <>
      <Card
        sx={{
          height: 240,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardContent sx={{ flex: 1, pb: 1.5 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {activity.title}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
            <EventIcon fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary">
              {new Date(activity.date).toLocaleString()}
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            sx={{
              mb: 0.8,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {activity.description}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 0.5 }}>
            <CategoryIcon fontSize="small" color="secondary" />
            <Typography variant="body2" color="text.secondary">
              {activity.category}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <PlaceIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {activity.venue}, {activity.city}
            </Typography>
          </Stack>
        </CardContent>

        <Divider sx={{ my: 0 }} />

        <Box display="flex" justifyContent="flex-end" gap={1} px={1} py={0.8}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              minWidth: 40,
              width: 40,
              height: 40,
              padding: 0,
              borderRadius: 1.2,
            }}
            onClick={onSelect}
          >
            <VisibilityIcon />
          </Button>

          <Button
            variant="outlined"
            color="error"
            sx={{
              minWidth: 40,
              width: 40,
              height: 40,
              padding: 0,
              borderRadius: 1.2,
            }}
            onClick={() => setOpenConfirm(true)}
          >
            <DeleteIcon />
          </Button>
        </Box>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <b>{activity.title}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

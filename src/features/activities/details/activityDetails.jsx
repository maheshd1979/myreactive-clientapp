// ActivityDetails.jsx
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box
} from '@mui/material';

// ActivityDetails.jsx
export default function ActivityDetails({ activity, onCancel, onEdit }) {
    if (!activity) return null;
  
    return (
      <Box>
        <Card sx={{ borderRadius: 3, width: '100%', boxShadow: 3, display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            component="img"
            height="120"
            image={`/images/categoryImages/${activity.category}.jpg`}
            alt={activity.category}
          />
  
          <CardContent sx={{ flex: 1, p: 1.2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {activity.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(activity.date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">{activity.description}</Typography>
          </CardContent>
  
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button size="small" variant="contained" color="primary" onClick={onEdit}>
              Edit
            </Button>
            <Button size="small" variant="outlined" color="error" onClick={onCancel}>
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  }
  
import React from 'react';
import { Box } from '@mui/material';   // ✅ FIX
import ActivityCard from './ActivityCard';   // ✅ make sure ActivityCard is imported

export default function ActivityList({ activities, onSelectActivity, onDeleted }) {
  return (
    <Box display="flex" flexDirection="column" gap={3} sx={{ flex: 1, width: '100%' }}>
    {activities.map(activity => (
      <ActivityCard 
        key={activity.id} 
        activity={activity} 
        onSelect={() => onSelectActivity(activity)} 
        onDeleted={onDeleted} 
      />
    ))}
    </Box>
  );
}

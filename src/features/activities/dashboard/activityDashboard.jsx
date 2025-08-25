import React from 'react';
import { Grid } from '@mui/material'; // ✅ FIX: Import Grid
import ActivityList from './ActivityList';
import ActivityDetails from '../details/activityDetails';
import ActivityForm from '../form/activityForm';

export default function ActivityDashboard({
  activities,
  selectedActivity,
  setSelectedActivity,
  formOpen,
  setFormOpen,
  onEdit,
  formActivity,
  onDeleted,   // 👈 add this
  onSaved      // 👈 add this
}) {
  return (
    <Grid container spacing={2} sx={{ height: '100%' }}>
      {/* Left column - List */}
      <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column' }}>
        <ActivityList
          activities={activities}
          onSelectActivity={setSelectedActivity}
          onDeleted={onDeleted}   // 👈 forward delete handler
        />
      </Grid>

      {/* Right column - Details / Form */}
      <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column' }}>
        {formOpen ? (
          <ActivityForm
            initialData={selectedActivity}
            onSaved={(savedActivity) => {
              onSaved(savedActivity);   // 👈 delegate to App
              setFormOpen(false);       // ✅ close form after save
            }}
            onCancel={() => setFormOpen(false)}
          />
        ) : (
          selectedActivity && (
            <ActivityDetails
              activity={selectedActivity}
              onCancel={() => setSelectedActivity(null)}
              onEdit={() => onEdit(selectedActivity)}
            />
          )
        )}
      </Grid>
    </Grid>
  );
}

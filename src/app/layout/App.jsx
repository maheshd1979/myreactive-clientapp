import { useEffect, useState } from 'react';
import './styles.css';
import { CssBaseline, Container } from '@mui/material';
import axios from 'axios';
import { NavBar } from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/activityDashboard';

function App() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formActivity, setFormActivity] = useState(null); // store form data

  useEffect(() => {
    axios
      .get('https://localhost:7104/api/Activity')
      .then((response) => setActivities(response.data))
      .catch((error) => console.error('Error fetching activities:', error));
  }, []);

  // handle edit
  const handleEdit = (activity) => {
    setFormActivity(activity);
    setFormOpen(true);
  };

  // handle create
  const handleCreate = () => {
    setSelectedActivity(null); // clear any previously selected activity
    setFormActivity(null);     // no prefill
    setFormOpen(true);
  };

  // ✅ handle save (different for add vs edit)
  const handleSaved = (savedActivity) => {
    setActivities((prevActivities) => {
      const exists = prevActivities.find((a) => a.id === savedActivity.id);

      if (exists) {
        // ✅ Edit case
        return prevActivities.map((a) =>
          a.id === savedActivity.id ? { ...savedActivity } : a
        );
      } else {
        // ✅ Add case
        return [...prevActivities, { ...savedActivity }];
      }
    });

    // 👉 Only show details if it was an edit
    if (activities.some((a) => a.id === savedActivity.id)) {
      setSelectedActivity({ ...savedActivity }); // edit → open details
    } else {
      setSelectedActivity(null); // create → no details
    }
  };

  // handle delete
  const handleDelete = (id) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
    if (selectedActivity?.id === id) {
      setSelectedActivity(null);
    }
  };

  return (
    <>
      <CssBaseline />
      <NavBar onCreateClick={handleCreate} />
      <Container
        maxWidth="xl"
        sx={{
          mt: 3,
          backgroundColor: '#f5f6fa',
          padding: 3,
          borderRadius: 2,
        }}
      >
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          onEdit={handleEdit}
          formActivity={formActivity}
          onDeleted={handleDelete}
          onSaved={handleSaved}   // ✅ updated handler
        />
      </Container>
    </>
  );
}

export default App;

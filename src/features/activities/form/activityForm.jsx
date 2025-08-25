import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

export default function ActivityForm({ onCancel, initialData, onSaved }) {
  const [formValues, setFormValues] = useState({
    id: 0,
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  });

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ✅ Pre-fill form when editing
  useEffect(() => {
    if (initialData) {
      setFormValues({
        ...initialData,
        date: initialData.date ? initialData.date.split("T")[0] : "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formValues.id && formValues.id !== 0) {
        // ✅ Update
        await axios.put(
          `https://localhost:7104/api/Activity/${formValues.id}`,
          formValues,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        setToast({
          open: true,
          message: "✅ Activity updated successfully!",
          severity: "success",
        });

        if (onSaved) onSaved(formValues); // pass updated values
      } else {
        // ✅ Create
        const response = await axios.post(
          "https://localhost:7104/api/Activity",
          formValues,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        setToast({
          open: true,
          message: "🎉 New activity added successfully!",
          severity: "success",
        });

        if (onSaved) onSaved(response.data); // use API response (with id)
      }

      // ✅ Close form after a delay
      setTimeout(() => {
        onCancel();
      }, 2000);
    } catch (error) {
      console.error("Error saving activity:", error);
      setToast({
        open: true,
        message: "❌ Failed to save activity.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          maxWidth: 500,
          mx: "auto",
          bgcolor: "#f9f9f9",
          boxShadow: 4,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="column">
            {["title", "date", "description", "category", "city", "venue"].map(
              (field) => (
                <Grid item xs={12} key={field}>
                  <TextField
                    fullWidth
                    size="small"
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    value={formValues[field]}
                    onChange={handleChange}
                    variant="outlined"
                    multiline={field === "description"}
                    rows={field === "description" ? 3 : 1}
                    type={field === "date" ? "date" : "text"}
                    InputLabelProps={
                      field === "date" ? { shrink: true } : {}
                    }
                    sx={{ bgcolor: "white", borderRadius: 1 }}
                  />
                </Grid>
              )
            )}

            <Grid item xs={12}>
              <Box
                sx={{ display: "flex", gap: 2, justifyContent: "center" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    bgcolor: "#1976d2",
                    "&:hover": { bgcolor: "#125ea2" },
                  }}
                >
                  Save
                </Button>

                <Button
                  variant="outlined"
                  onClick={onCancel}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    borderColor: "#1976d2",
                    color: "#1976d2",
                    "&:hover": { bgcolor: "#e3f2fd" },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* ✅ Snackbar Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={toast.severity}
          sx={{ width: "100%", borderRadius: 2, fontWeight: "bold" }}
          onClose={() => setToast({ ...toast, open: false })}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}

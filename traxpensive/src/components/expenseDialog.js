import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField,
  Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { uploadImage } from '../firebase/storage';
import { useAuth } from '../firebase/auth';

const DEFAULT_FORM_STATE = {
  name: '',
  amount: '',
  category: 'Food',
  receipt: null,
  date: '',
  receiptUrl: ''
};

const ExpenseDialog = ({ open, onClose, onSave, initialData }) => {
  const [formFields, setFormFields] = useState(DEFAULT_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { authUser } = useAuth();

  useEffect(() => {
    if (open) {
      setFormFields(initialData || DEFAULT_FORM_STATE);
    }
  }, [open, initialData]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFormFields(prevState => ({ ...prevState, receipt: file }));

    if (file) {
      try {
        const url = await uploadImage(file, authUser.uid);
        console.log("Upload successful, URL:", url); 
        setFormFields(prevState => ({ ...prevState, receiptUrl: url }));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSave(formFields);
      onClose();
    } catch (error) {
      console.error("Error saving expense:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Expense Name"
          type="text"
          fullWidth
          name="name"
          value={formFields.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Amount"
          type="number"
          fullWidth
          name="amount"
          value={formFields.amount}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formFields.category}
            onChange={handleChange}
          >
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
            <MenuItem value="Utilities">Utilities</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Date"
          type="date"
          fullWidth
          name="date"
          value={formFields.date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="outlined"
          component="label"
          fullWidth
          style={{ marginTop: '10px' }}
        >
          Upload Receipt
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseDialog;

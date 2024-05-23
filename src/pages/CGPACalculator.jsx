import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Container } from '@mui/material';

const CGPACalculator = () => {
  const [grades, setGrades] = useState(['', '', '', '', '']);
  const [cgpa, setCGPA] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const gradePoints = {
      'O': 10,
      'A+': 9,
      'A': 8,
      'B+': 7,
      'B': 6,
      'C': 5,
      'E': 0 // Assuming 'F' grade carries 0 grade points
    };

    // Convert grades to their respective grade points
    const gradePointsArray = grades.map(grade => gradePoints[grade]);

    // Calculate CGPA by averaging the grade points
    const totalGradePoints = gradePointsArray.reduce((acc, val) => acc + val, 0);
    const calculatedCGPA = totalGradePoints / grades.length;
    setCGPA(calculatedCGPA.toFixed(2)); // Round CGPA to two decimal places
  };

  const handleGradeChange = (index, value) => {
    const updatedGrades = [...grades];
    updatedGrades[index] = value;
    setGrades(updatedGrades);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          CGPA Calculator
        </Typography>
        <form onSubmit={handleSubmit}>
          {[1, 2, 3, 4, 5].map((subject, index) => (
            <TextField
              key={index}
              label={`Grade for Subject ${subject}`}
              variant="outlined"
              margin="normal"
              fullWidth
              value={grades[index]}
              onChange={(e) => handleGradeChange(index, e.target.value)}
              required
            />
          ))}
          <Button variant="contained" color="primary" type="submit">
            Calculate CGPA
          </Button>
        </form>

        {cgpa > 0 && (
          <Box mt={4}>
            <Typography variant="h5">Your CGPA: {cgpa}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CGPACalculator;

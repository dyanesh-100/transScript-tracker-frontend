import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import {useLocation} from "react-router-dom";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: '#F5F5F5',
}));

const PageContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#CAF1DE',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function InteractiveList() {
  const [dense, setDense] = useState(false);
  const [showGrades, setShowGrades] = useState(false);
  const [showInternalMarks, setShowInternalMarks] = useState(false);
  const [marks, setMarks] = useState([]);
  const [name, setName] = useState('');
  const [assesmentmarks, setAssesmentmarks] = useState([]);
  
  const [grades, setGrades] = useState([]);
  const [internalmarks, setInternalMarks] = useState([]);
  
  
  const location = useLocation()
  const studId = location.pathname.split("/")[2]

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3005/api/students/${studId}`);
      const data = await response.json();
      const { Name, sub1mark, sub2mark, sub3mark, sub4mark, sub5mark, sub1cia1, sub1cia2, sub1cia3, sub2cia1, sub2cia2, sub2cia3, sub3cia1, sub3cia2, sub3cia3, sub4cia1, sub4cia2, sub4cia3, sub5cia1, sub5cia2 ,sub5cia3, sub1assignment1,sub1assignment2,sub2assignment1,sub2assignment2,sub3assignment1,sub3assignment2,sub4assignment1,sub4assignment2,sub5assignment1,sub5assignment2 } = data[0];

      const InSub1 = ((sub1cia1 + sub1cia2 + sub1cia3 )/5 + sub1assignment1 + sub1assignment2);
      const InSub2 = ((sub2cia1 + sub2cia2 + sub2cia3 )/5 + sub2assignment1 + sub2assignment2);
      const InSub3 = ((sub3cia1 + sub3cia2 + sub3cia3 )/5 + sub3assignment1 + sub3assignment2);
      const InSub4 = ((sub4cia1 + sub4cia2 + sub4cia3 )/5 + sub4assignment1 + sub4assignment2);
      const InSub5 = ((sub5cia1 + sub5cia2 + sub5cia3 )/5 + sub5assignment1 + sub5assignment2);
      const marksArray = [(sub1mark/2)+InSub1, (sub2mark/2)+InSub2, (sub3mark/2)+InSub3, (sub4mark/2)+InSub4, (sub5mark/2)+InSub5];
      const assesmentmarksArray = [InSub1, InSub2, InSub3, InSub4, InSub5];
      
      setMarks(marksArray);
      setAssesmentmarks(assesmentmarksArray);
      setName(Name);

      const gradesArray = calculateGrades(marksArray);
      setGrades(gradesArray);

      const internalmarksArray = calculateInternalMarks(assesmentmarksArray);
      setInternalMarks(internalmarksArray);

    
    
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const calculateGrades = (marksArray) => {
    return marksArray.map((mark) => {
      if (mark >= 100) {
        return 'O';
      } else if (mark >= 90) {
        return 'A+';
      } else if (mark >= 85) {
        return 'A';
      } else if (mark >= 80) {
        return 'B+';
      } else if (mark >= 70) {
        return 'B';
      } else if (mark >= 50) {
        return 'C';
      } else {
        return 'E';
      }
    });
  };

  const i=0;
  const calculateInternalMarks = (assesmentmarksArray) => {
    return assesmentmarksArray.map((assesmentmarks) => {
        return assesmentmarksArray[i];
        i++;
    });
  };

  

  const handleShowGrades = () => {
    setShowGrades(!showGrades);
  };

  const handleShowInternalMarks = () => {
    setShowInternalMarks(!showInternalMarks);
  };

  return (
    <PageContainer>
      <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
        <Typography sx={{ mt: 2, mb: 2 }} variant="h4" component="div">
          {name}
        </Typography>
        <Typography sx={{ mt: 1, mb: 1 }} variant="h5" component="div">
          {studId}
        </Typography>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox checked={showGrades} onChange={handleShowGrades} />
            }
            label="Show Grades"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showInternalMarks}
                onChange={handleShowInternalMarks}
              />
            }
            label="Show Internal Marks"
          />
        </FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Marks
            </Typography>
            <Demo>
              <List dense={dense}>
                {marks.map((mark, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Subject ${index + 1}: ${mark}`}
                      secondary={showGrades ? `Grade: ${grades[index]}` : null}
                    />
                  </ListItem>
                ))}
              </List>
            </Demo>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Internal Marks
            </Typography>
            <Demo>
              <List dense={dense}>
                {assesmentmarks.map((mark, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={showInternalMarks ? `Internal mark sub${index + 1}: ${mark}` : null}
                      
                    />
                  </ListItem>
                ))}
              </List>
            </Demo>
          </Grid>
          
          
        </Grid>
      </Box>
    </PageContainer>
  );
}



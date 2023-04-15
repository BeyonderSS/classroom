import React from 'react';

const CoursesList = ({ courses }) => {
  return (
    <ul>
      {courses.map((course) => (
        <li key={course.id}>{course.name}</li>
      ))}
    </ul>
  );
};

export default CoursesList;

// components/CourseList.js 

import React from 'react';

const CoursesList = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white p-5 space-x-3 space-y-3">
      {courses.map((course) => (
        <div key={course.id} className="bg-gray-200 rounded-lg shadow-md p-4">
          <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
          <p className="text-gray-600">{course.description}</p>
          <div className="mt-4">
            <span className="text-sm font-medium text-gray-500">
              Teacher: {course.teacher}
            </span>
          </div>
          <div className="mt-2">
            <span className="text-sm font-medium text-gray-500">
              Section: {course.section}
            </span>
          </div>
          <div className="mt-2">
            <span className="text-sm font-medium text-gray-500">
              CourseID: {course.id}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesList;
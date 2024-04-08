# Student API

API for managing student data.
The API is deployed using render service, here is the base url: [https://school-allergies.onrender.com] (#https://school-allergies.onrender.com)

## Table of Contents

- [Overview](#overview)
- [API Paths](#api-paths)
  - [/students](#students)
  - [/students/{userId}](#students-userid)
- [Components](#components)
  - [Schemas](#schemas)
- [Usage](#usage)
- [License](#license)

## Overview

This API is designed to manage student data, including creating, retrieving, and updating student information. It follows the OpenAPI specification version 3.0.0.

## API Paths

### /students

- **GET**: Get all students.
  - **Summary**: Retrieves a list of all students.
  - **Responses**:
    - 200: A list of students.
      - Content: `application/json`
      - Schema: Array of Student objects.

- **POST**: Create a new student.
  - **Summary**: Creates a new student with the provided information.
  - **Request Body**: New student object.
    - Content: `application/json`
    - Schema: NewStudent object.
  - **Responses**:
    - 200: Successfully created student.
      - Content: `application/json`
      - Schema: SuccessResponse object.

### /students/{userId}

- **POST**: Get student by userId.
  - **Summary**: Retrieves a student with the specified userId.
  - **Parameters**:
    - Path: userId (required)
      - Type: string
      - Description: ID of the student to retrieve.
  - **Responses**:
    - 200: The student with the specified userId.
      - Content: `application/json`
      - Schema: Student object.

## Components

### Schemas

- **Student**: Represents a student object.
  - Properties:
    - studentName: string
    - studentSurname: string
    - studentBirth: string
    - studentGrade: string
    - allergies: Array of Allergy objects.

- **Allergy**: Represents an allergy object.
  - Properties:
    - allergy: string
    - medication: string
    - crisis: Array of Crisis objects.

- **Crisis**: Represents a crisis object.
  - Properties:
    - type: string
    - timestamp: string
    - information: string

- **NewStudent**: Represents a new student object used for creating a student.
  - Properties:
    - studentName: string
    - studentSurname: string
    - studentBirth: string
    - studentGrade: string

- **SuccessResponse**: Represents a success response object.
  - Properties:
    - error: boolean
    - message: string

## Usage

To use this API, make requests to the specified endpoints using the appropriate HTTP methods (GET, POST). Ensure that the request bodies and parameters match the specified schemas.

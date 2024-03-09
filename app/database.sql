-- Creating tables
CREATE TABLE IF NOT EXISTS Students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fName VARCHAR(20) NOT NULL,
    lName VARCHAR(20) NOT NULL,
    program VARCHAR(100),
    pass VARCHAR(255) NOT NULL,
    email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Courses (
    studentID INT NOT NULL,
    courseID INT AUTO_INCREMENT PRIMARY KEY,
    coursename VARCHAR(100),
    FOREIGN KEY studentID references Students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Assignements (
    courseID INT NOT NULL,
    assignmentName VARCHAR(100) NOT NULL,
    FOREIGN KEY courseID references Courses(courseID) ON DELETE CASCADE
);

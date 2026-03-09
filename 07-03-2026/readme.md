Question4
Student Eligibility Validation System
Description
1. Scenario Overview
You are building a Student Eligibility Validation System for a university admission portal.

Before allowing students to apply for courses, the system must validate eligibility conditions.

Different programs have different eligibility rules:

Engineering Program → Based on marks
Medical Program → Based on marks + age
Management Program → Based on marks + attendance
Key Constraints
Eligibility rules may change every academic year
Validation logic must be reusable
Core validation engine must remain unchanged
Validation logic should return true or false
This requirement demands condition-based validation, which is achieved using Predicate.

2. Functional Requirements
2.1 Entity Class
Student
Properties:

int StudentId
string Name
int Marks
int Age
int Attendance
This class represents student data for eligibility validation.

2.2 Predicate Definition
Predicate<Student>
Purpose:

Represents an eligibility condition
Accepts a Student object
Returns true if eligible, otherwise false
Enables flexible rule validation at runtime
2.3 Eligibility Rule Definitions
EngineeringEligibility
Rule:

Marks ≥ 60 → Eligible
MedicalEligibility
Rule:

Marks ≥ 70 AND Age ≥ 17 → Eligible
ManagementEligibility
Rule:

Marks ≥ 55 AND Attendance ≥ 75 → Eligible
3. Eligibility Engine (Core Component)
EligibilityEngine Responsibilities
Accept Student data
Accept a Predicate<Student>
Invoke predicate
Display eligibility status
Important Design Rule
EligibilityEngine must NOT contain eligibility rules
Core Method
CheckEligibility(Student student, string program, Predicate<Student> rule)
4. Main() Method – Runtime Configuration
Step-by-Step Operations in Main()
Create student object
Define eligibility predicates
Create eligibility engine
Validate eligibility for Engineering
Validate eligibility for Medical
Validate eligibility for Management
5. Hardcoded Dataset
StudentId  : 301
Name       : Ananya
Marks      : 78
Age        : 18
Attendance : 85
6. Expected Output
========= ELIGIBILITY CHECK =========
Student Name : Ananya
Program      : Engineering
Eligible     : True
-----------------------------------

========= ELIGIBILITY CHECK =========
Student Name : Ananya
Program      : Medical
Eligible     : True
-----------------------------------

========= ELIGIBILITY CHECK =========
Student Name : Ananya
Program      : Management
Eligible     : True
-----------------------------------



Question5
Student Performance Analysis System
Description
1. Scenario Overview
You are building a Student Performance Analysis System for a university.

The system must analyze student records stored in collections and generate insights using LINQ.

Different analysis requirements include:

Filtering students who passed
Identifying toppers
Sorting students by marks
Calculating average marks
Key Constraints
Data is stored in in-memory collections
Analysis rules may change
Queries must be readable and maintainable
No manual loops should be used
This requirement demands data querying using LINQ.

2. Functional Requirements
2.1 Entity Class
Student
Properties:

int StudentId
string Name
int Marks
This class represents student academic data.

2.2 LINQ Usage
LINQ is used to:

Filter data (Where)
Sort data (OrderByDescending)
Aggregate data (Average)
Project data (Select)
2.3 LINQ Operations Required
Pass Students
Marks ≥ 50
Topper Identification
Highest marks
Sorting
Sort students by marks (descending)
3. Analysis Engine (Core Component)
AnalysisEngine Responsibilities
Accept student collection
Apply LINQ queries
Display analysis results
Important Design Rule
AnalysisEngine must NOT use loops
All operations must be done using LINQ
4. Main() Method – Runtime Configuration
Step-by-Step Operations in Main()
Create student collection
Populate hardcoded student data
Create analysis engine
Apply LINQ query for passed students
Apply LINQ query for toppers
Apply LINQ query for sorted list
5. Hardcoded Dataset
101, Ananya, 78
102, Ravi, 45
103, Neha, 88
104, Arjun, 67
6. Expected Output
Passed Students:
Ananya
Neha
Arjun

Topper:
Neha - 88

Students Sorted by Marks:
Neha - 88
Ananya - 78
Arjun - 67
Ravi - 45



Question
6
Product Inventory Management System
Description
1. Scenario Overview
You are building a Product Inventory Management System for a retail store.

Products are stored in collections, and management needs real-time insights using LINQ.

Requirements include:

Filtering low-stock products
Sorting products by price
Calculating total inventory value
Key Constraints
Inventory data is in-memory
Queries must be concise and readable
Frequent changes in reporting requirements
This requires LINQ-based data querying.

2. Functional Requirements
2.1 Entity Class
Product
Properties:

int ProductId
string Name
double Price
int Quantity
2.2 LINQ Usage
LINQ is used to:

Filter (Where)
Sort (OrderBy)
Aggregate (Sum)
2.3 LINQ Operations Required
Low Stock Products
Quantity < 10
Price Sorting
Ascending order
Inventory Value
Price × Quantity
3. Inventory Engine (Core Component)
InventoryEngine Responsibilities
Accept product collection
Apply LINQ queries
Display inventory reports
Important Design Rule
No traditional loops
Only LINQ expressions allowed
4. Main() Method – Runtime Configuration
Step-by-Step Operations in Main()
Create product list
Add hardcoded inventory data
Create inventory engine
Filter low stock products using LINQ
Sort products using LINQ
Calculate total inventory value
5. Hardcoded Dataset
201, Laptop, 60000, 5
202, Mouse, 800, 25
203, Keyboard, 1500, 8
204, Monitor, 12000, 12
6. Expected Output
Low Stock Products:
Laptop
Keyboard

Products Sorted by Price:
Mouse - 800
Keyboard - 1500
Monitor - 12000
Laptop - 60000

Total Inventory Value:
Rs 476000



Question
7
Employee Promotion Validation System
Description
1. Scenario Overview
You are building an Employee Promotion Validation System for an organization.

Before promoting employees, HR must validate promotion eligibility rules.

Different departments follow different rules:

Technical Department → Experience-based
HR Department → Experience + performance
Management Department → Experience + salary
Key Constraints
Promotion rules change over time
Validation must be reusable
Core logic must not change
Rules return only true or false
This scenario uses Predicate for validation logic.

2. Functional Requirements
2.1 Entity Class
Employee
Properties:

int EmployeeId
string Name
int Experience
double Salary
int PerformanceRating
2.2 Predicate Definition
Predicate<Employee>
Purpose:

Represents a promotion eligibility condition
Returns boolean result
2.3 Promotion Rules
TechnicalPromotionRule
Rule:

Experience ≥ 3 → Eligible
HRPromotionRule
Rule:

Experience ≥ 2 AND PerformanceRating ≥ 4 → Eligible
ManagementPromotionRule
Rule:

Experience ≥ 5 AND Salary ≥ 60000 → Eligible
3. Promotion Engine (Core Component)
PromotionEngine Responsibilities
Accept Employee
Accept Predicate<Employee>
Invoke rule
Display promotion status
Important Design Rule
PromotionEngine must NOT contain rule logic
Core Method
Validate(Employee employee, string department, Predicate<Employee> rule)
4. Main() Method – Runtime Configuration
Step-by-Step Operations in Main()
Create employee object
Define promotion predicates
Create promotion engine
Validate for Technical department
Validate for HR department
Validate for Management department
5. Hardcoded Dataset
EmployeeId : 501
Name       : Ravi
Experience : 5
Salary     : 65000
Rating     : 4
6. Expected Output
========= PROMOTION VALIDATION =========
Employee Name : Ravi
Department    : Technical
Eligible      : True
--------------------------------------

========= PROMOTION VALIDATION =========
Employee Name : Ravi
Department    : HR
Eligible      : True
--------------------------------------

========= PROMOTION VALIDATION =========
Employee Name : Ravi
Department    : Management
Eligible      : True
--------------------------------------




Question
8
Employee Salary Analytics System
Description
1. Scenario Overview
You are building an Employee Salary Analytics System for an organization.

Employee records are stored in collections, and HR requires insights using LINQ.

Analytics requirements include:

Filtering high-salary employees
Sorting employees by salary
Calculating average salary
Key Constraints
Data stored in memory
No manual iteration
Queries should be flexible and readable
This scenario relies on LINQ over collections.

2. Functional Requirements
2.1 Entity Class
Employee
Properties:

int EmployeeId
string Name
double Salary
2.2 LINQ Usage
LINQ is used to:

Filter (Where)
Sort (OrderByDescending)
Aggregate (Average)
2.3 LINQ Operations Required
High Salary Employees
Salary ≥ 50000
Salary Sorting
Descending order
Average Salary
Compute average
3. Analytics Engine (Core Component)
AnalyticsEngine Responsibilities
Accept employee collection
Apply LINQ queries
Display analytics results
Important Design Rule
No loops
LINQ must be used for all processing
4. Main() Method – Runtime Configuration
Step-by-Step Operations in Main()
Create employee list
Populate hardcoded employee data
Create analytics engine
Filter high salary employees
Sort employees by salary
Calculate average salary
5. Hardcoded Dataset
301, Ramesh, 45000
302, Suresh, 52000
303, Kavya, 68000
304, Anita, 39000
6. Expected Output
High Salary Employees:
Suresh
Kavya

Employees Sorted by Salary:
Kavya - 68000
Suresh - 52000
Ramesh - 45000
Anita - 39000

Average Salary:
Rs 51000
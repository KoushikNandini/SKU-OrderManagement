SKU & OrderManagaement App
This App Includes - 
SKU Creation and Listing with Pagination
Customer And Address Details Form
Order Can be Selected From SKU List (Infinte Scroll)
Validation Of Froms And Toast Notifications

### Features ###

**........SKU Management..............**
User Can Add|Update SKUs By Providing Details (Name,Code,Price)
Paginated List (Item Per Page 10)

**.......Order Creation..............**
Fill Customer Details With Address
Add Order 
Can Search SKU With Listed Values with Quantity Controls
Auto Calculate Total
Validate Details
Toast Notification on Successfully Ordering Any Item

**.......Order Management..............**
List Of Created Orders By Customer
Display All The Details Of The Order
Search by ** customer name and order ID**
Sort by ** created date (ASC/DESC)**
Filter by ** order status (dropdown)**
Use pagination in the table (10 per page)

#### Tech Stack Used ###
React - Component Based JS Library
ReactHooks - Manage State
CustomHooks - useToast,useOrderFrom...
BootStrap/Custom CSS - UI Styling
ReactIcons - Icons For Toast and Currency.


**#SetUp Instructions**

### 1.Clone The Repositary
```bash
git clone https://github.com/KoushikNandini/SKU-OrderManagement.git
cd omnifulAssignment
### 2. Install Dependency
npm install

### 3.run server
npm start

### Assumtptions ###
In-Memory State Only: No backend or database used. All data is stored temporarily in React state.
No Edit/Delete Functionality: SKU editing and deletion features are not implemented — only creation is supported.
Volatile Data: Data will reset on page refresh.

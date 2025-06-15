# Bus Reservation System

A full-stack bus ticket booking application built for learning and showcase — with user registration, seat selection, real-time seat availability, downloadable ticket, and user ticket history views.

Check it out - [Click Here](https://bus-anywhere.netlify.app)
Hosted on 
- Netlify(Frontend)
- Render(Backend)
- Database(Railway)

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), React Router, react-hook-form, axios, jsPDF
- **Backend**: Node.js, Express, MySQL, bcrypt
- **Auth**: LocalStorage for session, password hashing
- **Tools**: dotenv, cors, react-hot-toast

---

## 🗂️ Repo Structure

    /your-repo
    │
    ├── frontend/ # React app (Vite)
    ├── backend/ # Node + Express API
    ├── .gitignore
    └── README.md

---

## 🚀 Getting Started

1. **Clone the repo**  
   ```bash
   git clone https://github.com/ankanaghosh2001/bus_reservation_system.git
   cd bus_reservation_system
2. **Backend Setup**
    ```bash
    cd server
    npm install
    cp .env.example .env
    # Fill in DB_HOST, DB_USER, DB_PASS, DB_NAME
    npm run start
    
(Make sure MySQL is running locally. Run bus_reservation_db.sql to create tables.) 
   
3. **Frontend Setup**
    ```bash
    cd ../client
    npm install
    npm run dev

4. **ER Diagram**
    ```mermaid
    erDiagram
    users {
        varchar phone PK
        varchar username
        varchar password
    }

    trip_details {
        int RID PK
        varchar source
        varchar destination
        int fare
    }

    trip_instances {
        int id PK
        int RID FK
        date tDate
    }

    booked_seats {
        int SID PK
        int trip_id FK
        varchar userID FK
        int seat_number
        timestamp booked_at
    }

    users ||--o{ booked_seats : "books"
    trip_details ||--o{ trip_instances : "has"
    trip_instances ||--o{ booked_seats : "includes"


5. **Usage**  
    Register / Log in → Choose your route & date → Select available seats (blocked seats greyed) → Click "Pay Now"(Payment Simulation) → View Ticket via user profile → Download PDF ticket



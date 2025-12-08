# Dashboard and Add Event - How It Works

This guide explains how the dashboard and add event pages work in simple terms.

## Files Created/Modified

### 1. **api.js** - Talks to the Backend
- **Location**: `src/api.js`
- **What it does**: Contains simple functions to communicate with your Laravel backend
- **Key functions**:
  - `eventAPI.getAll()` - Get all events
  - `eventAPI.create(data)` - Create new event
  - `ticketAPI.getAll()` - Get all tickets

### 2. **EventForm.jsx** - Add Event Page
- **Location**: `src/components/EventForm.jsx`
- **What it does**: Form to create new events
- **How it works**:
  1. User fills in event details (title, description, location, date, etc.)
  2. User uploads an image
  3. When user clicks "Create Event", the form:
     - Packages all data
     - Sends it to Laravel backend using `eventAPI.create()`
     - Shows success or error message
     - Redirects to dashboard after 2 seconds

### 3. **Cards.jsx** - Dashboard Display
- **Location**: `src/components/Cards.jsx`
- **What it does**: Shows events and tickets in cards
- **How it works**:
  1. When page loads, automatically calls backend to get data
  2. Shows "Loading..." while fetching
  3. Displays events and tickets in tables
  4. "Add Event" button takes you to the add event page

### 4. **App.jsx** - Routing
- **Location**: `src/App.jsx`
- **What it does**: Sets up page routes
- **Routes**:
  - `/dashboard` - Shows the dashboard
  - `/add-event` - Shows the add event form

## How to Use

### View Dashboard
1. Go to `http://localhost:5173/dashboard`
2. You'll see:
   - Events table on the left
   - Tickets table on the right
   - "Add Event" button

### Add New Event
1. Click "Add Event" button OR go to `http://localhost:5173/add-event`
2. Fill in all fields:
   - Event Title (e.g., "React Conference 2025")
   - Description (what the event is about)
   - Location (city, country)
   - Date & Time (when it happens)
   - Capacity (how many people can attend)
   - Price (ticket cost)
   - Status (pending/confirmed/cancelled)
   - Image (event poster/photo)
3. Click "Create Event"
4. Wait for success message
5. Automatically redirected to dashboard

## Code Explanation (Beginner Friendly)

### useState - Remembering Data
```javascript
const [events, setEvents] = useState([]);
```
- `events` - Current list of events
- `setEvents` - Function to update the list
- `useState([])` - Start with empty list

### useEffect - Do Something When Page Loads
```javascript
useEffect(() => {
  fetchData();
}, []);
```
- Runs `fetchData()` when component first appears
- `[]` means "only run once"

### async/await - Wait for Backend
```javascript
const response = await eventAPI.getAll();
```
- `await` means "wait for the backend to respond"
- `async` marks function as asynchronous

### try/catch - Handle Errors
```javascript
try {
  // Try to do this
  const response = await eventAPI.create(data);
  setMessage('Success!');
} catch (err) {
  // If it fails, do this instead
  setError('Failed!');
}
```

## Important Notes

1. **Backend Must Be Running**: Your Laravel server must be running on `http://127.0.0.1:8000`

2. **Login Required**: Admin must be logged in (token in localStorage) to:
   - Create events
   - View tickets

3. **Image Upload**: Uses `FormData` to send images to backend

4. **Auto-Refresh**: Dashboard automatically loads latest data when opened

## Troubleshooting

### "Failed to create event"
- Check if Laravel backend is running
- Check if you're logged in as admin
- Check browser console for detailed errors

### "No events yet"
- Normal if no events in database
- Click "Add Event" to create your first one

### "Could not load data"
- Check backend server is running
- Check API URL is correct (http://127.0.0.1:8000/api)
- Open browser console to see detailed error

## Next Steps

To extend this:
1. Add edit event functionality
2. Add delete event functionality  
3. Add filters/search
4. Add pagination for many events
5. Add event statistics

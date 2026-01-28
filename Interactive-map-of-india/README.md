# Interactive Map of India

A comprehensive web application featuring an interactive SVG map of India with detailed state information pages.

## Features

### 🗺️ Interactive Map
- **SVG-based map** with hover effects and tooltips
- **Click-to-navigate** functionality - clicking any state redirects to a dedicated state page
- **Responsive design** that works on desktop and mobile devices
- **Visual feedback** with color changes on hover and click

### 📊 State Information Pages
Each state page displays comprehensive information including:
- **Overview** - General description and significance
- **Districts** - Major administrative districts
- **Tourism** - Popular tourist destinations
- **Food** - Traditional cuisine and specialties
- **Culture** - Cultural heritage, arts, and traditions
- **Festivals** - Major festivals and celebrations
- **History** - Historical background and significance
- **Key Statistics** - Capital, population, area, official language

### ✏️ Content Management
- **Edit functionality** - Users can edit state information
- **Create new entries** - Add data for states without existing information
- **Automatic backups** - Previous versions are automatically saved
- **Real-time updates** - Changes are immediately reflected

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (jQuery)
- **Backend**: PHP
- **Data Storage**: JSON files with automatic backup system
- **Deployment**: Docker container with Apache server

## Getting Started

### Using Docker (Recommended)
```bash
# Build the Docker image
docker build -t india-map .

# Run the container
docker run -d -p 8080:80 --name india-map-container india-map

# Access the application
# Open http://localhost:8080 in your browser
```

### Using Local Server
```bash
# Using Python (if PHP is not available)
python -m http.server 8000

# Using PHP (if available)
php -S localhost:8000

# Access the application
# Open http://localhost:8000 in your browser
```

## Usage

1. **Navigate the Map**: 
   - Hover over states to see tooltips
   - Click on any state to view detailed information

2. **View State Information**:
   - Browse through different sections (Overview, Districts, Tourism, etc.)
   - Use the "Back to map" button to return to the main map

3. **Edit Content**:
   - Click "Edit this state" on any state page
   - Modify the information in the form
   - Click "Save" to update the data

4. **Create New Content**:
   - Click on a state without existing data
   - Click "Create it" to add new information

## File Structure

```
Interactive-map-of-india/
├── index.php              # Main map page
├── state.php              # State information and editing page
├── css/
│   └── map-style.css      # Styling for the application
├── js/
│   ├── jquery.min.js      # jQuery library
│   ├── map-config.js      # Map configuration
│   └── map-interact.js    # Map interaction logic
├── data/
│   ├── statesData.json    # State information database
│   └── backups/           # Automatic backup directory
├── image/                 # Image assets
└── Dockerfile             # Docker configuration
```

## Available States

The application currently includes detailed information for:
- Andhra Pradesh
- Gujarat
- Jammu and Kashmir
- Karnataka
- Maharashtra
- Rajasthan
- Tamil Nadu
- Uttarakhand
- Uttar Pradesh
- West Bengal

More states can be easily added by clicking on them in the map and creating new entries.

## Browser Support

- Chrome/Chromium (Recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Contributing

To add more state information:
1. Click on any state in the map
2. If no data exists, click "Create it"
3. Fill in the information form
4. Click "Save"

The application automatically creates backups before any changes, so data is always safe.

## License

This project is open source and available under the MIT License.

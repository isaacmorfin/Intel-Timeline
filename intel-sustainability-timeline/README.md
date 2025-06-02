# Intel Sustainability Timeline

This project presents Intel's sustainability goals in an interactive timeline format. The timeline is designed to be responsive, ensuring a seamless experience on both desktop and mobile devices.

## Project Structure

```
intel-sustainability-timeline
├── public
│   └── index.html          # Main HTML document for the webpage
├── src
│   ├── assets              # Directory for static assets (images/icons)
│   ├── components
│   │   └── Timeline.js     # React component for rendering the timeline
│   ├── styles
│   │   └── main.css        # CSS styles for the webpage
│   └── app.js              # Entry point for the JavaScript application
├── package.json            # Configuration file for npm
└── README.md               # Documentation for the project
```

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd intel-sustainability-timeline
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Features

- Interactive timeline showcasing Intel's sustainability goals.
- Responsive design for optimal viewing on various devices.
- Easy to extend and modify for future updates.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TimelineController {
    @GetMapping("/")
    public String timeline(Model model) {
        // Add sample data
        model.addAttribute("goals", new String[]{
            "2025: Achieve 100% renewable energy",
            "2030: Net positive water use",
            "2040: Net zero greenhouse gas emissions"
        });
        return "timeline";
    }
}
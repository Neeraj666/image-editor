## Canvas Image Editor
    This project is a web-based image editing application that allows users to add captions and shapes (circle, rectangle, triangle) to an image and download the edited image. The application is built using React and Fabric.js.

## Features
    - Add Caption: Users can add a text caption to the image.
    - Add Shapes: Users can add circles, rectangles, and triangles to the image.
    - Resize Canvas: The canvas automatically resizes to fit 80% of the viewport height.
    - Download Image: Users can download the edited image as a PNG file.
    - Log Layers: Users can log the layers (objects) on the canvas with their 
    attributes for debugging purposes.

## Installation
# Prerequisites
    - Node.js (version 12 or later)
    - npm (Node Package Manager)

# Steps

1. Clone the repository:

    git clone <repository-url>
    cd canvas-image-editor
    Install dependencies:

2. npm install
    Start the application:

3. npm start
    Open your browser and navigate to http://localhost:3000.

## Usage

# Uploading an Image
1. On the homepage, click on the "Choose File" button to upload an image.

2. Click on the "Edit Image" button to navigate to the canvas page where you can edit the image.

# Editing the Image
1. Add Caption: Click the "Add Caption" button to add a text box to the canvas. Enter your caption text in the prompt that appears.

2. Add Shapes:
    - Click the "Add Circle" button to add a circle to the canvas.
    - Click the "Add Rectangle" button to add a rectangle to the canvas.
    -Click the "Add Triangle" button to add a triangle to the canvas.

3. Download Image: Click the "Download" button to download the edited image as a PNG file.

4. Log Layers: Click the "Log Layers" button to log the details of all objects (layers) on the canvas in the console.

## Adjusting Canvas Size
    The canvas automatically resizes to fit 80% of the viewport height. If you resize your browser window, the canvas will adjust accordingly.

## Code Structure
    - CanvasPage.js: Contains the main logic for the canvas page, including adding text, shapes, resizing the canvas, and downloading the image.
    - App.css: Contains global styles for the application.
    - CanvasPage.css: Contains styles specific to the canvas page.


## Deployment
    To deploy the application, follow these steps:

1. Build the application:
npm run build

2. Deploy to a static server:
    - You can deploy the build folder to any static server such as Vercel, Netlify, GitHub Pages, etc.
    - Alternatively, you can use a simple static server like serve to test the build locally:
    npm install -g serve
    serve -s build

3. Open your browser and navigate to the deployed URL.


## Acknowledgments
    This project uses Fabric.js for canvas manipulation.
    The design and layout are inspired by various online image editing tools.
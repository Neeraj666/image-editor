import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { fabric } from 'fabric';
import './CanvasPage.css';
import "../App.css";

const CanvasPage = () => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null); // Ref to store the image object
  const location = useLocation();
  const { image } = location.state || {};
  let caption = null;

  useEffect(() => {
    if (!image) return;

    const canvas = new fabric.Canvas(canvasRef.current);
    const container = document.querySelector('.col-8');

    const resizeCanvas = () => {
      if (!imageRef.current) return;
      const img = imageRef.current;

      // Set canvas width to 80% of the viewport height
      const desiredHeight = window.innerHeight * 0.8;
      const scaleFactor = desiredHeight / img.height;

      canvas.setHeight(desiredHeight);
      canvas.setWidth(img.width * scaleFactor);

      // Scale the image
      img.scaleToHeight(desiredHeight);
      canvas.renderAll();
    };

    fabric.Image.fromURL(image.urls.full, (img) => {
      imageRef.current = img;
      resizeCanvas();
      canvas.add(img);
      canvas.renderAll();

      window.addEventListener('resize', resizeCanvas);
    }, { crossOrigin: 'anonymous' });

    const addText = () => {
      if (caption) {
        canvas.setActiveObject(caption);
        canvas.renderAll();
        return;
      }

      const userText = prompt('Enter your caption:');
      if (userText) {
        caption = new fabric.Textbox(userText, {
          left: 50,
          top: 50,
          width: 150,
          fontSize: 20,
          fill: '#000',
          borderColor: 'black',
          cornerColor: 'black',
          cornerSize: 6,
          transparentCorners: false,
          centeredScaling: true,
          selectable: true,
          editable: true,
          lockUniScaling: true,
          padding: 10,
          borderDashArray: [3, 3],
        });
        canvas.add(caption);
        canvas.setActiveObject(caption);
      }
    };

    const addShape = (shape) => {
      let shapeObj;
      if (shape === 'circle') {
        shapeObj = new fabric.Circle({
          radius: 50,
          fill: '#f00',
          left: 100,
          top: 100
        });
      } else if (shape === 'rectangle') {
        shapeObj = new fabric.Rect({
          width: 100,
          height: 50,
          fill: '#00f',
          left: 100,
          top: 100
        });
      } else if (shape === 'triangle') {
        shapeObj = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: '#0f0',
          left: 100,
          top: 100
        });
      }
      canvas.add(shapeObj);
      if (caption) canvas.bringToFront(caption);
    };

    const downloadCanvas = () => {
      const dataURL = canvas.toDataURL({ format: 'png', quality: 0.8 });
      const anchor = document.createElement('a');
      anchor.href = dataURL;
      anchor.download = 'image.png';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    };

    const logLayers = () => {
      const layers = canvas.getObjects().map(obj => obj.type);
      console.log(layers);
    };

    const addEventListeners = () => {
      const addTextBtn = document.getElementById('add-text');
      const addCircleBtn = document.getElementById('add-circle');
      const addRectangleBtn = document.getElementById('add-rectangle');
      const addTriangleBtn = document.getElementById('add-triangle');
      const downloadBtn = document.getElementById('download');
      const logLayersBtn = document.getElementById('log-layers');

      if (addTextBtn) addTextBtn.addEventListener('click', addText);
      if (addCircleBtn) addCircleBtn.addEventListener('click', () => addShape('circle'));
      if (addRectangleBtn) addRectangleBtn.addEventListener('click', () => addShape('rectangle'));
      if (addTriangleBtn) addTriangleBtn.addEventListener('click', () => addShape('triangle'));
      if (downloadBtn) downloadBtn.addEventListener('click', downloadCanvas);
      if (logLayersBtn) logLayersBtn.addEventListener('click', logLayers);
    };

    const removeEventListeners = () => {
      const addTextBtn = document.getElementById('add-text');
      const addCircleBtn = document.getElementById('add-circle');
      const addRectangleBtn = document.getElementById('add-rectangle');
      const addTriangleBtn = document.getElementById('add-triangle');
      const downloadBtn = document.getElementById('download');
      const logLayersBtn = document.getElementById('log-layers');

      if (addTextBtn) addTextBtn.removeEventListener('click', addText);
      if (addCircleBtn) addCircleBtn.removeEventListener('click', () => addShape('circle'));
      if (addRectangleBtn) addRectangleBtn.removeEventListener('click', () => addShape('rectangle'));
      if (addTriangleBtn) addTriangleBtn.removeEventListener('click', () => addShape('triangle'));
      if (downloadBtn) downloadBtn.removeEventListener('click', downloadCanvas);
      if (logLayersBtn) logLayersBtn.removeEventListener('click', logLayers);
    };

    addEventListeners();

    return () => {
      removeEventListeners();
      window.removeEventListener('resize', resizeCanvas);
    };

  }, [image]);

  if (!image) return <div>No image selected</div>;

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1>Edit Image</h1>
          </div>
        </div>

        <div className='row'>
          <div className='col-8 box'>
            <canvas ref={canvasRef} className='canvas'/>
          </div>

          <div className='col-4' style={{border:'1px'}}>
            <div className="controls">
              <button id="add-text">Add Caption</button><br />
              <button id="add-circle">Add Circle</button><br />
              <button id="add-rectangle">Add Rectangle</button><br />
              <button id="add-triangle">Add Triangle</button><br />
              <button id="download">Download</button><br />
              <button id="log-layers">Log Layers</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CanvasPage;



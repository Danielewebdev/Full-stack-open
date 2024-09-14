```mermaid
  sequenceDiagram
  participant Browser
  participant Server

  Browser->>Server: GET request to exampleapp/spa
  Server->>Browser: HTML file is sent

  Browser->>Server: GET request to exampleapp/main.css
  Server->>Browser: CSS file is sent

  Browser->>Server: GET request to exampleapp/spa.js
  Server->>Browser: JS file is sent

  Browser->>Server: GET request to exampleapp/data.json
  Server->>Browser: JSON file is sent

  Note right of Browser: Feels like I missed something? Looks like the first standard diagram, I followed actions through the "Network" tab and read the "Headers" tab. I am probably missing the point? 

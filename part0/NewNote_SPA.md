```mermaid
sequenceDiagram
    participant Browser
    participant Server

    Browser-->>Server: POST request to address new_note_spa
    Server-->>Browser: JSON data is sent directly
 
    Note right of Browser: The SPA app uses JS code which is fetched from the server.

```

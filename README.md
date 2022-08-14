# CS5800 Project

![Main Screen](docs/screen.png)

# Installation
1) Development version:

```bash
npm install
npm start
```

2) Docker Version
```
# Build the Docker Image
docker build . -t karger

# Run Docker [Clean up after terminated]
docker run --rm -p 3000:3000 --name karger karger
```
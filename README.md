# CS5800 Project - Minimum cut using Karger's Algorithm

From [Wikipedia](https://en.wikipedia.org/wiki/Karger%27s_algorithm) : 
> In computer science and graph theory, Karger's algorithm is a randomized algorithm to compute a minimum cut of a connected graph. It was invented by David Karger and first published in 1993.
>


## Material
1. [Paper](https://docs.google.com/document/d/1ZXbUOzQ2P3MaRV26hpiIbn_iK0J9fJSvKxT8lq-31Iw/edit?usp=sharing)
2. [Presentation](https://docs.google.com/presentation/d/1ZOi7D28v08VKO2dX48HvMhEawE8jbP2eBBL_o23YqZk/edit?usp=sharing)
3. [Live Demo](https://karger.herokuapp.com/)

![Main Screen](docs/screen.png)

## Installation
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
docker run --rm -p 8080:8080 --name karger karger
```

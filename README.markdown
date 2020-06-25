# Pomodoro Clock 1

A Pen created on CodePen.io. Original URL: [https://codepen.io/chaudha4/pen/bGdoJje](https://codepen.io/chaudha4/pen/bGdoJje).

Notes:
To run docker as non-root `sudo usermod -aG docker $USER`. Else use sudo with each command below.

Docker image `docker build -f Dockerfile.prod -t pclock-image:1.0 .`

Docker image tar was created using `docker save pclock-image > pclock-image.tar`

To load docker image from tar `docker load < pclock-image.tar`

To see the new image `docker images`

To run `docker run -it -p 80:80 --rm pclock-image:1.0`

The app is available in the browser at localhost:80

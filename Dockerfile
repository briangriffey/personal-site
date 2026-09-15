# The site is one self-contained HTML file. There is nothing to build, so there is no
# build stage -- just a static file server.
FROM docker.io/nginxinc/nginx-unprivileged:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY favicon.ico apple-touch-icon.png /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
